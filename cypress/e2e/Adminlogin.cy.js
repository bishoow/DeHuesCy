import AdminLogin from '../POMpages/AdminLogin';

describe('Login Page Tests', () => {

  beforeEach(() => {
    cy.visit("https://staging-backend.proshore.site/login");
    // cy.visit("/login");
  });
  it('TC_Login_001: Verify login page URL accessibility', () => {
    const ln = new AdminLogin();
    cy.url().should('include', '/login');
  });

  it('TC_Login_002: Verify brand name and title', () => {
    const ln = new AdminLogin();
    ln.verifyBrand();
  });

  it('TC_Login_003: Verify placeholders and focus order', () => {
    const ln = new AdminLogin();
    ln.verifyFocusOrder();
  });

  it('TC_Login_004: Verify login without credentials', () => {
    const ln = new AdminLogin();
    ln.WithoutCredentials();
  });
//not handled properly for now
  it('TC_Login_005: Verify invalid credentials handling', () => {
    const ln = new AdminLogin();
    ln.InvalidCredentials("invalidemail@gmail.com", "wrongpass");
  });

  it('TC_Login_006: Verify valid login works correctly', () => {
    const ln = new AdminLogin();
    ln.ValidLogin("admin@deheus.com", "deheus@admin");
  });

    it('TC_Login_007: Verify valid uppercase email works correctly', () => {
    const ln = new AdminLogin();
    ln.ValidLogin("Admin@deheus.com", "deheus@admin");
  });
  it('TC_Login_008: Verify valid uppercase password doesnot work', () => {
    const ln = new AdminLogin();
    ln.InvalidCredentials("admin@deheus.com", "DEHEUS@ADMIN");
   
  });

   it('TC_Login_009: Verify valid uppercase (email,password ) login works correctly', () => {
    const ln = new AdminLogin();
    ln.InvalidCredentials("Admin@deheus.com", "DEHEUS@ADMIN");
  });

  
  it('TC_Login_010: Verify XSS protection', () => {
    const ln = new AdminLogin();
    ln.XssInjectionTest('<script>alert("XSS")</script>');
  });

  it('TC_Login_011: Verify SQL injection protection', () => {
    const ln = new AdminLogin();
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
    const ln = new AdminLogin();
    ln.BruteForceThrottle("invalid@user.com", "wrongpass");
    // cy.contains('Too many login attempts. Please try again in')
    //   .should('be.visible');
  });

  it('TC-Login-013: Should navigate fields with Tab key and verify placeholders', () => {
    const ln = new AdminLogin();
    ln.verifyTabNavigation(); 
  });


  //
    it('TC_Login_014: Verify invalid email format', () => {
    const ln = new AdminLogin();
    ln.InvalidEmailFormat("abc@.com");
  });

  it('TC_Login_015: Verify empty email only', () => {
    const ln = new AdminLogin();
    ln.EmptyEmailOnly("password123");
  });

  it('TC_Login_016: Verify empty password only', () => {
    const ln = new AdminLogin();
    ln.EmptyPasswordOnly("johndoe@deheus.com");
  });

  it('TC_Login_017: Verify whitespace-only input', () => {
    const ln = new AdminLogin();
    ln.WhitespaceInput();
  });

  it('TC_Login_018: Verify short password validation', () => {
    const ln = new AdminLogin();
    ln.ShortPassword("johndoe@deheus.com");
  });

  it('TC_Login_019: Verify long input validation', () => {
    const ln = new AdminLogin();
    ln.LongInputTest();
  });

  // it.only('TC_Login_020: Verify multiple click protection', () => {
  //   const ln = new Login();
  //   ln.MultipleClickTest("johndoe@deheus.com", "wrongpass");
  // });

});

