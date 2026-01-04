// import "cypress-file-upload";
// describe('Login Page Tests', () => {
//   beforeEach(() => {
//     cy.visit(Cypress.env('CYPRESS_BASE_URL') + '/login');
//   })
// });
import Login from '../POMpages/Login';
describe('Login Page Tests', () => {
  it ('should load the login page', () => {
    cy.visit("http://localhost:3000/login");
   
    const ln =new Login();
    ln.Title();
    ln.Username="admin";
    ln.Password="admin123";
    ln.clickSignIn();
  })
});