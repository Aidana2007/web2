import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.static("public"));

app.get("/api/user", async (req, res) => {
  try {
    console.log('Fetching random user...');
    const userResponse = await axios.get("https://randomuser.me/api/");
    const user = userResponse.data.results[0];

    const userData = {
      firstName: user.name.first,
      lastName: user.name.last,
      gender: user.gender,
      age: user.dob.age,
      dob: user.dob.date,
      picture: user.picture.large,
      city: user.location.city,
      country: user.location.country,
      address: `${user.location.street.name} ${user.location.street.number}`
    };

    console.log('User data:', userData);

    console.log('Fetching country info for:', userData.country);
    const countryResponse = await axios.get(
      `https://restcountries.com/v3.1/name/${userData.country}`
    );

    const countryInfo = countryResponse.data[0];

    const currencyCode = Object.keys(countryInfo.currencies)[0];

    const countryData = {
      name: countryInfo.name.common,
      capital: countryInfo.capital ? countryInfo.capital[0] : "N/A",
      languages: countryInfo.languages
        ? Object.values(countryInfo.languages)
        : [],
      currencyCode: currencyCode,
      currencyName: countryInfo.currencies[currencyCode].name,
      flag: countryInfo.flags.png
    };

    console.log('Country data:', countryData);

    console.log('Fetching exchange for:', currencyCode);
    const exchangeResponse = await axios.get(
      `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_RATE_API_KEY}/latest/${currencyCode}`
    );

    if (exchangeResponse.data.result !== 'success') {
      throw new Error(`Exchange API error: ${exchangeResponse.data['error-type']}`);
    }

    const exchangeData = {
      USD: exchangeResponse.data.conversion_rates.USD,
      KZT: exchangeResponse.data.conversion_rates.KZT
    };

    console.log('Exchange data:', exchangeData);

    console.log('Fetching news for:', countryData.name);
    const newsResponse = await axios.get(
      "https://newsapi.org/v2/everything",
      {
        params: {
          q: countryData.name,
          language: "en",
          pageSize: 5,
          apiKey: process.env.NEWS_API_KEY
        }
      }
    );

    if (newsResponse.data.status !== 'ok') {
      throw new Error(`News API error: ${newsResponse.data.message || newsResponse.data.code}`);
    }

    const news = newsResponse.data.articles.map(a => ({
      title: a.title,
      description: a.description,
      image: a.urlToImage,
      url: a.url
    }));

    console.log('News data:', news.length, 'articles');

    res.json({
      user: userData,
      country: countryData,
      exchange: exchangeData,
      news: news
    });

  } catch (error) {
    console.error('Error in /api/user:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
