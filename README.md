Project Description

This project is a Node.js web application that demonstrates server-side API integration and frontend data presentation.
The application retrieves a random user, enriches the data with country information, currency exchange rates, and related news headlines, and displays all information in a clean, user-friendly interface.

All external API requests are executed on the server side.
The frontend does not directly interact with any third-party APIs.

APIs Used

Random User Generator API
https://randomuser.me/api/

Used to generate random user data including personal and location details.

REST Countries API
https://restcountries.com/

Used to retrieve country information based on the user’s country.

ExchangeRate API
https://www.exchangerate-api.com/

Used to compare the user’s local currency with USD and KZT.

News API
https://newsapi.org/

Used to fetch recent news headlines related to the user’s country.

Setup Instructions
1. Clone the repository

2. Install dependencies
npm install

3. Create environment variables

Create a .env file in the root directory:

NEWS_API_KEY=your_news_api_key
EXCHANGE_API_KEY=your_exchange_api_key


Note:
The .env file is excluded from GitHub using .gitignore for security reasons.

Running the Application

Start the server:
node server.js


The server runs on:
http://localhost:3000

Open this URL in your browser and click the “Get Random User” button.
