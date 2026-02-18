# DeHeus Automation

# DeHuesCy – Cypress Automation with CI/CD

This repository contains Cypress automated test scripts for validating the functionality and performance of the DeHues application.  
It includes Mochawesome report generation and a CI/CD pipeline implemented using GitHub Actions for automated test execution and reporting.

---

## Features

- Automated End-to-End Testing using [Cypress](https://www.cypress.io/)  
- HTML Reports generated via [Mochawesome](https://www.npmjs.com/package/mochawesome)  
- Continuous Integration & Delivery (CI/CD) using GitHub Actions  
- Scheduled Test Runs – pipeline triggers daily at around 9:00 AM or on every new code push and pull. 

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| Cypress | End-to-end test automation |
| Mochawesome | Test result reporting |
| GitHub Actions | CI/CD automation |
| Node.js | Runtime environment |

---

## Project Structure
DeHuesCy/
├── .github/
│ └── workflows/
│ └── test.yml # GitHub Actions CI/CD workflow
├── cypress/
│ ├── e2e/
│ │ ├── Adminlogin.cy.js
│ │ ├── Dashboard.cy.js
│ │ └── login.cy.js
│ ├── fixtures/ # Test data
│ ├── POMPages/ # Page Object Model files
│ │ ├── AdminLogin.js
│ │ ├── Dashboard.js
│ │ └── Login.js
│ ├── reports/html/ # Mochawesome HTML reports
│ ├── screenshots/ # Test screenshots
│ │ ├── Adminlogin.cy.js
│ │ └── login.cy.js
│ └── support/ # Cypress support files
├── node_modules/
├── .env # Environment variables
├── .gitignore
├── cypress.config.js
├── package.json
├── package-lock.json
└── README.md

---

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/bishoow/DeHuesCy.git
cd DeHuesCy

2. Install Dependencies
npm install

3. Run Tests Locally
Open Cypress Test Runner(bash):
  npx cypress open
Run in headless mode:
  npx cypress run

## Report Generation (Mochawesome)

After running tests, Mochawesome HTML reports will be generated automatically under:
cypress/reports/html/
The final report will be available at:
cypress/reports/html/index.html

## CI/CD with GitHub Actions

This repository includes a GitHub Actions workflow (.github/workflows/test.yml) that:
a. Runs Cypress tests automatically
b. Generates Mochawesome reports
c. Stores reports as workflow artifacts
d. Automatically sends an email to the QA team along with the generated test report
e. Executes daily at 9:00 AM or on every push/merge to the main branch

## GitHub Secrets Configuration

To enable the CI/CD pipeline and automated email functionality, add the following repository secrets under
Settings → Secrets and variables → Actions → New repository secret:

Secret Name	Description
GMAIL_USER	The Gmail address used to send automated test reports.
GMAIL_PASS	The app password generated from Gmail (for secure authentication).

These secrets are accessed securely in the GitHub Actions workflow to send emails with test reports to developers, QA, and stakeholders.


## Future Enhancements
Environment-Based Testing: Configure pipelines to test across multiple environments (e.g staging, production).
Real-Time Slack Alerts: Notify developers immediately when a test fails.
Integration with Analytics Dashboards: Visualize historical test results and performance over time.
AI-Based Test Failure Analysis: Use AI tools to identify common failure patterns and suggest fixes.
Automated Email Notifications: Send test reports and status updates to developers and stakeholders to ensure transparency across the application lifecycle.