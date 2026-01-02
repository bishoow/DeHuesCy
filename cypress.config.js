const { defineConfig } = require('cypress');
require('dotenv').config(); // load .env file

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL,
    env: {
      username: process.env.CYPRESS_USERNAME,
      password: process.env.CYPRESS_PASSWORD,
    },
    setupNodeEvents(on, config) {
       require('cypress-mochawesome-reporter/plugin')(on);
      // You can log for debugging
      console.log('Loaded ENV:', config.env);
      return config;
    },
  },
});
