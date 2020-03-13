# News Digest
### A Natural Language Processing Project

For this project I created a web app which uses the Aylien Natural Language Processing API to provide summary information about news articles.

Go to https://news-digest.netlify.com/ to view the app.

The key learning points were:
* Using Webpack to create development and production environments for the app
* Using SASS for clearer, simpler styling
* Using service workers to ensure the site isn't affected by temporary server disconnects
* Testing using Jest and Supertest
* Using APIs and creating requests to external URLs

To run the app:
1. Clone the repo
2. Navigate to the repo directory on your machine
3. Type 'npm run build-dev' into the console to run the front end
4. Type 'npm run build-prod' to generate a production build in /dist
5. Type 'npm run start' to run the express back end

NB. By default the front end is set up so requests hit my Heroku hosted server. To make these requests to your local express back end, go into /src/client/index.js and change the baseUrl const to "http://localhost:8081/" as indicated in the file.
