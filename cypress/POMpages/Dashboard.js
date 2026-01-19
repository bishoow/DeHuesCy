class Dashboard{
    // DeHuesLogo = "img[alt="De Hues"]";
    DeHuesTitle = ".font-semibold.text-primary-blue";
    DeHuesSubtitle = ".text-primary-blue.text-xl.md:text-2xl.font-semibold";//eq 0
    DeHuessubMessage = ".text-primary-sub-heading";//eq 0
    ProfileIcon = '#radix-_R_16ivbH1_';

    Logo(){
        cy.get(this.DeHuesLogo).should("be.visible");
    }
    Titlee(){
        cy.get(this.DeHuesTitle).should("have.text","Dashboard");
    }
    DeHuesSubtitlee(){
        cy.get(this.DeHuesSubtitle).eq(0).should("have.text","Dashboard");
    }
    DeHuessubMessagee(){
        cy.get(this.DeHuessubMessage).eq(0).should("have.text","This is Dashboard Section.");
    }
    ProfileIconn(){
        cy.get(this.ProfileIcon).should("be.visible").click();
        cy.contains("Logout").should("be.visible");
    }

}
export default Dashboard;