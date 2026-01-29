import Login from '../POMpages/Login';

describe('Login Page Tests', () => {

  beforeEach(() => {
    cy.visit("https://staging-frontend.proshore.site/login");
    // cy.visit("/login");
  });
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

    it('TC_Login_007: Verify valid uppercase email works correctly', () => {
    const ln = new Login();
    ln.ValidLogin("JOHNDOE@deheus.com", "johndoe@123");
  });
  it('TC_Login_008: Verify valid uppercase password doesnot work', () => {
    const ln = new Login();
    ln.InvalidCredentials("johndoe@deheus.com", "JOHNDOE@123");
   
  });

   it('TC_Login_009: Verify valid uppercase (email,password ) login works correctly', () => {
    const ln = new Login();
    ln.InvalidCredentials("JOHNDOE@deheus.com", "JOHNDOE@123");
  });

  
  it('TC_Login_010: Verify XSS protection', () => {
    const ln = new Login();
    ln.XssInjectionTest('<script>alert("XSS")</script>');
  });

  it('TC_Login_011: Verify SQL injection protection', () => {
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

  it('TC_Login_012: Verify brute-force throttle protection', () => {
    const ln = new Login();
    ln.BruteForceThrottle("invalid@user.com", "wrongpass");
    // cy.contains('Too many login attempts. Please try again in')
    //   .should('be.visible');
  });

  it('TC-Login-013: Should navigate fields with Tab key and verify placeholders', () => {
    const ln = new Login();
    ln.verifyTabNavigation(); 
  });


  //
    it('TC_Login_014: Verify invalid email format', () => {
    const ln = new Login();
    ln.InvalidEmailFormat("abc@.com");
  });

  it('TC_Login_015: Verify empty email only', () => {
    const ln = new Login();
    ln.EmptyEmailOnly("password123");
  });

  it('TC_Login_016: Verify empty password only', () => {
    const ln = new Login();
    ln.EmptyPasswordOnly("johndoe@deheus.com");
  });

  it('TC_Login_017: Verify whitespace-only input', () => {
    const ln = new Login();
    ln.WhitespaceInput();
  });

  it('TC_Login_018: Verify short password validation', () => {
    const ln = new Login();
    ln.ShortPassword("johndoe@deheus.com");
  });

  it('TC_Login_019: Verify long input validation', () => {
    const ln = new Login();
    ln.LongInputTest();
  });

  // it.only('TC_Login_020: Verify multiple click protection', () => {
  //   const ln = new Login();
  //   ln.MultipleClickTest("johndoe@deheus.com", "wrongpass");
  // });

});

