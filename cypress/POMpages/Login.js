class Login{
    CheckTitle=".text-5xl.font-bold.mb-4";
    UsernameField='input[name="Username"]';
    PasswordField='input[name="Password"]';
    SignInBtn='button[type="submit"]';
    
    Title(){
     cy.get(this.CheckTitle).should("have.text", 'De Heus');
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
export default Login();