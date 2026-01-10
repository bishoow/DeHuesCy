class Login{
    CheckTitle=".text-2xl.sm\\:text-3xl.font-bold";
    UsernameField='input[placeholder="Enter your email"]';
    PasswordField='input[placeholder="Enter password"]';
    SignInBtn='button[type="submit"]';
    
    Title(){
     cy.get(this.CheckTitle).eq(0).should("have.text", 'De Heus');
    }

    set Username(username){
        cy.get(this.UsernameField).clear().type(username);
    }
    set Password(password){
        cy.get(this.PasswordField).clear().type(password);
    }
    clickSignIn(){
        cy.get(this.SignInBtn).click();
    }
}
export default Login;