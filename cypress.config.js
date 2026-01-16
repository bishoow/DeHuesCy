const { defineConfig } = require('cypress');
require('dotenv').config(); // load .env file

module.exports = defineConfig({
  // ✅ Reporter configuration
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports/html', // match your workflow path
    overwrite: true,
    html: true,
    json: false,
    inline: true, // ✅ embed CSS & JS so email attachment works
    charts: true, // optional – adds pass/fail charts to HTML
  },

  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL,

    env: {
      username: process.env.CYPRESS_USERNAME,
      password: process.env.CYPRESS_PASSWORD,
    },

    setupNodeEvents(on, config) {
      // ✅ Initialize the Mochawesome reporter plugin
      require('cypress-mochawesome-reporter/plugin')(on);

      // Optional: log environment variables for debugging
      console.log('Loaded ENV:', config.env);

      return config;
    },
  },
});
