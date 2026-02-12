class AdminLogin {
  
//   CheckTitle = ".text-xl.font-mediumd";
  UsernameField = "input[placeholder='email@example.com']";
  PasswordField = '#password';
  SignInBtn = 'button[type="submit"]';
  ErrorMessage = '.text-sm.text-red-600.dark:text-red-400.absolute.mt-0.5';
  LoginCardTitle = '.text-xl.font-mediumd';
  LCSubtitleText = '.text-muted-foreground.text-center.text-sm';

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
    cy.on('window:alert', (alertText) => {
    expect(alertText).to.eq('');
    });
    // cy.get(this.ErrorMessage).eq(0).should("be.visible").and("have.text", "Email is required");
    // cy.get(this.ErrorMessage).eq(1).should("be.visible").and("have.text", "Password must be at least 8 characters");
  }

  InvalidCredentials(email, password) {
    this.Username = email;
    this.Password = password;
    this.clickSignIn();
    cy.on('window:alert', (alertText) => {
    expect(alertText).to.eq('Please fill out this field');
    });
    // cy.get(this.ErrorMessage).should("contain.text", "Email is invalid");
  }

  ValidLogin(email, password) {
    this.Username = email;
    this.Password = password;
    this.clickSignIn();
    cy.url().should("not.include", "/login");
  }

  verifyBrand() {
    // this.Title();
    cy.get(".text-xl.font-medium").should("contain.text", "Log in to your account");
    cy.get(".text-muted-foreground.text-center.text-sm").should("contain.text", "Enter your email and password below to log in");
  }

  verifyLinks() {
    cy.get(this.ForgotPasswordLink).should("be.visible").and("contain.text", "Forgot Password");
    cy.get(this.RegisterLink).should("be.visible").and("contain.text", "Register");
  }

  verifyFocusOrder() {
    cy.get(this.UsernameField).focus().should("have.attr", "placeholder", "email@example.com");
    cy.get(this.PasswordField).focus().should("have.attr", "placeholder", "Password");
    cy.get(this.SignInBtn).focus().should("contain.text", "Login");
  }

 
  SqlInjectionTest(payload) {
    this.Username = payload;
    this.Password = "dummyPassword";
    this.clickSignIn();
    // cy.get(this.ErrorMessage).should("exist").and("contain.text", "").and("be.visible");
    cy.get(".text-xl.font-medium")
      .should("be.visible")
      .and("contain.text", "Log in to your account")
    cy.on('window:alert', (alertText) => {
    expect(alertText).to.eq('Please include an \'@\' in the email address. \'' + payload + '\' is missing an \'@\'.');
    });
  }

 
  XssInjectionTest(payload) {
    this.Username = payload;
    this.Password = "anyPass";
    this.clickSignIn();

    // cy.get(this.CheckTitle)
    //   .should("be.visible")
    //   .and("contain.text", "De Heus")
    //   .and("not.contain.text", "script");
    cy.on('window:alert', (alertText) => {
    expect(alertText).to.eq('Please include an \'@\' in the email address. \'&lt;script&gt;alert("XSS")&lt;/script&gt;\' is missing an \'@\'.');
    });
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
    cy.on('window:alert', (alertText) => {
    expect(alertText).to.eq('Please fill out this field');
    });

  //  cy.get(this.ErrorMessage)
  //   .should("be.visible")
  //   .and("contain.text", "Email is required");
  }

  EmptyPasswordOnly(email) {
   this.Username = email;
   cy.get(this.PasswordField).clear();
   this.clickSignIn();
    cy.on('window:alert', (alertText) => {
    expect(alertText).to.eq('Please fill out this field');
    });
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
    .and("contain.text", "The password field must be at least 8 characters.");
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
    .should('have.attr', 'placeholder', 'email@example.com')
    .focus();

  // Press Tab should move focus to password field
  cy.focused().tab();
  cy.focused()
    .should('have.attr', 'placeholder', 'Password');

  cy.focused().tab();
  // cy.focused()
  //   .should('have.attr', 'type', 'button');
  cy.focused().tab();
  cy.focused()
    .should('have.attr', 'type', 'checkbox');
    cy.focused().tab();

  cy.focused().tab();
  cy.focused()
    .should('contain.text', 'Sign In');
}

  
}

export default AdminLogin;
