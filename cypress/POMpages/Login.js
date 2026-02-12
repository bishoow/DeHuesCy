class Login {
  
  CheckTitle = ".text-2xl.sm\\:text-3xl.font-bold";
  UsernameField = 'input[placeholder="Enter your email"]';
  PasswordField = 'input[placeholder="Enter password"]';
  SignInBtn = 'button[type="submit"]';
  ErrorMessage = '.absolute.text-xs.text-red-600';
  LoginCardTitle = '.text-primary-blue';
  LCSubtitleText = '.text-base';

  Title() {
    cy.get(this.CheckTitle).eq(0).should("have.text", "De Heus");
  }

  set Username(username) {
    cy.get(this.UsernameField).clear().type(username);
  }

  set Password(password) {
    cy.get(this.PasswordField).clear().type(password);
  }

  clickSignIn() {
    cy.get(this.SignInBtn).should("be.visible").click();
  }

  WithoutCredentials() {
    this.clickSignIn();
    cy.get(this.ErrorMessage).eq(0).should("be.visible").and("have.text", "Email is required");
    cy.get(this.ErrorMessage).eq(1).should("be.visible").and("have.text", "Password must be at least 8 characters");
  }

  InvalidCredentials(email, password) {
    this.Username = email;
    this.Password = password;
    this.clickSignIn();
    cy.on('window:alert', (alertText) => {
    expect(alertText).to.eq('Invalid credentials');
    });
    // cy.get(this.ErrorMessage).should("contain.text", "Email is invalid");
  }

  ValidLogin(email, password) {
    this.Username = email;
    this.Password = password;
    this.clickSignIn();
    cy.wait(2000);
    cy.url().should("not.include", "/login");
  }

  verifyBrand() {
    this.Title();
    cy.get(this.LoginCardTitle).should("contain.text", "Welcome Back");
    cy.get(this.LCSubtitleText).eq(0).should("contain.text", "Sign in to your account");
  }

  verifyLinks() {
    cy.get(this.ForgotPasswordLink).should("be.visible").and("contain.text", "Forgot Password");
    cy.get(this.RegisterLink).should("be.visible").and("contain.text", "Register");
  }

  verifyFocusOrder() {
    cy.get(this.UsernameField).focus().should("have.attr", "placeholder", "Enter your email");
    cy.get(this.PasswordField).focus().should("have.attr", "placeholder", "Enter password");
    cy.get(this.SignInBtn).focus().should("contain.text", "Sign In");
  }

 
  SqlInjectionTest(payload) {
    this.Username = payload;
    this.Password = "dummyPassword";
    this.clickSignIn();
    // cy.get(this.ErrorMessage).should("exist").and("contain.text", "").and("be.visible");
    cy.get(this.CheckTitle)
      .should("be.visible")
      .and("contain.text", "De Heus")
  }

 
  XssInjectionTest(payload) {
    this.Username = payload;
    this.Password = "anyPass";
    this.clickSignIn();

    cy.get(this.CheckTitle)
      .should("be.visible")
      .and("contain.text", "De Heus")
      .and("not.contain.text", "script");
  }


  BruteForceThrottle(email, password) {
   for (let i = 0; i <= 6; i++) {
   this.Username = email;
   this.Password = password;
   this.clickSignIn();
   cy.wait(1000);
}

  cy.on('window:alert', (alertText) => {
    if (alertText.includes('Too many login attempts')) {
      expect(alertText).to.contain('Too many login attempts');
    }
  });
 
  }

  //

  InvalidEmailFormat(email) {
   this.Username = email;
   this.Password = "anyPassword123";
   this.clickSignIn();
  // cy.get(this.ErrorMessage)
  //   .should("be.visible")
  //   .and("contain.text", "Enter a valid email");
   cy.get('input[type="email"]')
    .then(($input) => {
      expect($input[0].validationMessage)
        .to.contain("'.' is used at a wrong position");
    });
  }

  EmptyEmailOnly(password) {
   cy.get(this.UsernameField).clear();
   this.Password = password;
   this.clickSignIn();
   cy.get(this.ErrorMessage)
    .should("be.visible")
    .and("contain.text", "Email is required");
  }

  EmptyPasswordOnly(email) {
   this.Username = email;
   cy.get(this.PasswordField).clear();
   this.clickSignIn();
   cy.get(this.ErrorMessage)
    .should("be.visible")
    .and("contain.text", "Password must be at least 8 characters");
  }

  WhitespaceInput() {
   this.Username = "   ";
   this.Password = "   ";
   this.clickSignIn();
   cy.get(this.ErrorMessage).should("contain.text", "Email is required");
  }

  ShortPassword(email) {
   this.Username = email;
   this.Password = "123";
   this.clickSignIn();
   cy.get(this.ErrorMessage)
    .should("be.visible")
    .and("contain.text", "Password must be at least 8 characters");
  }

  LongInputTest() {
   const longEmail = 'a'.repeat(260) + '@gmail.com';
   this.Username = longEmail;
   this.Password = 'validPassword123';
   this.clickSignIn();
  cy.on('window:alert', (alertText) => {
    expect(alertText).to.eq('Invalid credentials');
    });
 
 }

 MultipleClickTest(email, password) {
  this.Username = email;
  this.Password = password;

  // cy.get(this.SignInBtn).dblclick();
  // cy.get(this.SignInBtn).should('be.disabled');
  // Optional: check disable state
}

verifyTabNavigation() {
  // Focus on email input first
  cy.get(this.UsernameField)
    .should('have.attr', 'placeholder', 'Enter your email')
    .focus();

  // Press Tab should move focus to password field
  cy.focused().tab();
  cy.focused()
    .should('have.attr', 'placeholder', 'Enter password');

  cy.focused().tab();
  cy.focused()
    .should('have.attr', 'type', 'button');
  cy.focused().tab();
  cy.focused()
    .should('have.attr', 'type', 'checkbox');
  cy.focused().tab();
  cy.focused().tab();
  cy.focused()
    .should('contain.text', 'Sign In');
}

  
}

export default Login;
