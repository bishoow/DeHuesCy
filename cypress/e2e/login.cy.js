import Login from '../POMpages/Login';

describe('Login Page Tests', () => {

  beforeEach(() => {
    cy.visit("https://bootcamp-frontend.proshore.site/login");
  });

//   it('TC-101: Should verify login functionality with invalid credentials', () => {
//     const ln = new Login();
//     ln.Title();
//     ln.Username = "Shresthabishow11gmail.com";
//     ln.Password = "bishow11";
//     ln.clickSignIn();
//   });

//   it('TC-102: Should navigate fields with Tab key and verify placeholders', () => {
//     const ln = new Login();
//     ln.verifyTabNavigation(); 
//   });

//   it('TC-103:To verify login without credentials', () => {
//     const ln = new Login();
//     ln.WithoutCredentials();
    


//   });
// });

  it('TC_Login_001: Verify login page URL accessibility', () => {
    const ln = new Login();
    cy.url().should('include', '/login');
  });

  it('TC_Login_002: Verify brand name and title', () => {
    const ln = new Login();
    ln.verifyBrand();
  });

  it('TC_Login_003: Verify placeholders and focus order', () => {
    const ln = new Login();
    ln.verifyFocusOrder();
  });

  it('TC_Login_004: Verify login without credentials', () => {
    const ln = new Login();
    ln.WithoutCredentials();
  });
//not handled properly for now
  it('TC_Login_005: Verify invalid credentials handling', () => {
    const ln = new Login();
    ln.InvalidCredentials("invalidemail@gmail.com", "wrongpass");
  });

  it('TC_Login_006: Verify valid login works correctly', () => {
    const ln = new Login();
    ln.ValidLogin("johndoe@deheus.com", "johndoe@123");
  });

  
  it('TC_Login_007: Verify XSS protection', () => {
    const ln = new Login();
    ln.XssInjectionTest('<script>alert("XSS")</script>');
  });

  it('TC_Login_008: Verify SQL injection protection', () => {
    const ln = new Login();
    const payloads = [
      "' OR '1'='1",
      "';--",
      "--",
      'asd" OR "1"="1" --',
      "'; DROP TABLE users; --"
    ];

    payloads.forEach(payload => {
      ln.SqlInjectionTest(payload);
    });
  });

  it('TC_Login_009: Verify brute-force throttle protection', () => {
    const ln = new Login();
    ln.BruteForceThrottle("invalid@user.com", "wrongpass", 6);
  });

});

