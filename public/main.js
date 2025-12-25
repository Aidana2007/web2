function displayData(data) {
  document.getElementById("output").innerHTML = `
    <div class="card profile">
      <img src="${data.user.picture}" width="150">
      <div>
        <h2>${data.user.firstName} ${data.user.lastName}</h2>
        <p>Gender: ${data.user.gender}</p>
        <p>Age: ${data.user.age}</p>
        <p>Date of Birth: ${new Date(data.user.dob).toDateString()}</p>
        <p>Address: ${data.user.address}, ${data.user.city}, ${data.user.country}</p>
      </div>
    </div>

    <div class="card">
      <h3 class="section-title">Country Information</h3>
      <p>Capital: ${data.country.capital}</p>
      <p>Languages: ${data.country.languages.join(", ")}</p>
      <p>Currency: ${data.country.currencyName}</p>
      <img src="${data.country.flag}" width="120">
    </div>

    <div class="card">
      <h3 class="section-title">Exchange Rates</h3>
      <p>1 ${data.country.currencyCode} = ${data.exchange.USD} USD</p>
      <p>1 ${data.country.currencyCode} = ${data.exchange.KZT} KZT</p>
    </div>

    <div class="card">
      <h3 class="section-title">Top News</h3>
      <div class="news-grid">
        ${data.news.map(n => `
          <div class="news-card">
            ${n.image ? `<img src="${n.image}">` : ""}
            <h4>${n.title}</h4>
            <p>${n.description || ""}</p>
            <a href="${n.url}" target="_blank">Read full article</a>
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

async function fetchUserData() {
  try {
    const response = await fetch('/api/user');
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Server error');
    }

    displayData(data);
  } catch (error) {
    document.getElementById("output").innerHTML = `<p>Error: ${error.message}</p>`;
  }
}

document.getElementById("btn").addEventListener("click", fetchUserData);
