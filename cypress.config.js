const { defineConfig } = require('cypress');
require('dotenv').config(); // load .env file

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports/html',
    overwrite: false,
    html: true,
    json: true,                  
    embeddedScreenshots: true,   
    inlineAssets: true,          
    charts: true,                
  },

  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL,

    env: {
      username: process.env.CYPRESS_USERNAME,
      password: process.env.CYPRESS_PASSWORD,
    },

    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      console.log('Loaded ENV:', config.env);
      return config;
    },
  },
});
