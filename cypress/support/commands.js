// // cypress/support/commands.js

// import { LoginPage } from '../POMpages/loginpage'
// import { forgotpassword } from '../POMpages/forgot'

// // ============================================
// // REUSABLE HELPER COMMANDS
// // ============================================

// // Visit base URL - reusable command to avoid repetition
// Cypress.Commands.add('visitBaseUrl', () => {
//   cy.visit(Cypress.config('baseUrl'))
// })

// // ============================================
// // LOGIN COMMANDS
// // ============================================

// // LOGIN command - valid credentials
// Cypress.Commands.add('login', () => {
//   const loginPage = new LoginPage()
//   cy.visitBaseUrl()

//   loginPage.Ulogin(
//     Cypress.env('username'),
//     Cypress.env('password')
//   )
// })

// // LOGIN command - invalid credentials
// Cypress.Commands.add('logininvalid', (username, password) => {
//   const loginPage = new LoginPage()
//   cy.visitBaseUrl()
//   loginPage.Ulogininvalid(username, password)
// })

// // LOGIN command - without username
// Cypress.Commands.add('loginWithoutUsername', () => {
//   const loginPage = new LoginPage()
//   cy.visitBaseUrl()
//   loginPage.loginWithoutUsername("password")
// })

// // LOGIN command - without password
// Cypress.Commands.add('loginWithoutPassword', () => {
//   const loginPage = new LoginPage()
//   cy.visitBaseUrl()
//   loginPage.loginWithoutPass("Username")
// })

// // LOGIN command - with lowercase username
// Cypress.Commands.add('loginWithlowercaseUsername', (username) => {
//   const loginPage = new LoginPage()
//   cy.visitBaseUrl()
//   loginPage.loginWithlowercaseUsername(username, Cypress.env('password'))
// })

// // ============================================
// // FORGOT PASSWORD COMMAND
// // ============================================

// Cypress.Commands.add('forgot', () => {
//   const forgotPage = new forgotpassword()
//   cy.visitBaseUrl()
//   forgotPagge.Forgot()
// })