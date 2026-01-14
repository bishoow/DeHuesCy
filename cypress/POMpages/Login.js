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
    cy.get(this.ErrorMessage).eq(1).should("be.visible").and("have.text", "Password must be at least 6 characters");
  }

  InvalidCredentials(email, password) {
    this.Username = email;
    this.Password = password;
    this.clickSignIn();
    cy.get(this.ErrorMessage).should("contain.text", "These credentials do not match our records");
  }

  ValidLogin(email, password) {
    this.Username = email;
    this.Password = password;
    this.clickSignIn();
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
    cy.get(this.ErrorMessage).should("exist").and("not.contain.text", "SQL").and("be.visible");
  }

 
  XssInjectionTest(payload) {
    this.Username = payload;
    this.Password = "anyPass";
    this.clickSignIn();

  
    cy.on("window:alert", () => {
      throw new Error("XSS vulnerability detected!");
    });

    cy.get(this.ErrorMessage)
      .should("be.visible")
      .and("contain.text", "valid email address")
      .and("not.contain.text", "script");
  }


  BruteForceThrottle(email, password, attempts = 6) {
    for (let i = 0; i < attempts; i++) {
      this.Username = email;
      this.Password = password;
      this.clickSignIn();
      cy.wait(3000); 
    }

    cy.get(this.ErrorMessage)
      .should("contain.text", "Too many failed attempts")
      .and("be.visible");
  }
}

export default Login;
