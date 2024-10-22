/// <reference types="cypress"/>

describe('Testing Login Feature', () => {
    it('TC-001 : User Login with valid credentials', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get('h5').contains('Login').should('have.text','Login');
        cy.get('[name="username"]').type('Admin');
        cy.get('[name="password"]').type('admin123');
        cy.get('button[type="submit"]').click();
        cy.url().should('include', '/dashboard');
        cy.get('h6').contains('Dashboard').should('have.text','Dashboard');
    });

    it('TC-002 : User Login with valid username and invalid password', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get('h5').contains('Login').should('have.text','Login');
        cy.get('[name="username"]').type('Admin');
        cy.get('[name="password"]').type('miftah23');
        cy.get('button[type="submit"]').click();
        cy.get('[class="oxd-alert oxd-alert--error"]').contains('Invalid credentials').should('have.text','Invalid credentials').and('be.visible');
        cy.url().should('include', '/login'); //tetap di halaman login
    });

    it('TC-003 : User Login with invalid username and valid password', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get('h5').contains('Login').should('have.text','Login');
        cy.get('[name="username"]').type('Miftah');
        cy.get('[name="password"]').type('admin123');
        cy.get('button[type="submit"]').click();
        cy.get('[class="oxd-alert oxd-alert--error"]').contains('Invalid credentials').should('be.visible').and('have.text','Invalid credentials');
        cy.url().should('include', '/login'); 
    });

    it('TC-004 : User Login with username and password are invalid', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get('h5').contains('Login').should('have.text','Login');
        cy.get('[name="username"]').type('Miftah');
        cy.get('[name="password"]').type('miftah123');
        cy.get('button[type="submit"]').click();
        cy.get('[class="oxd-alert oxd-alert--error"]').contains('Invalid credentials').should('have.text','Invalid credentials').and('be.visible');
        cy.url().should('include', '/login'); 
    });

    it('TC-005 : User Login with username and password are empty', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get('h5').contains('Login').should('have.text','Login');
        cy.get('[type="submit"]').click();
        cy.get('[class="oxd-text oxd-text--span oxd-input-field-error-message oxd-input-group__message"]').contains('Required').should('have.text','Required').and('be.visible');
        cy.url().should('include', '/login'); 
    });

    it('TC-006 : Click forgot password', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get('h5').contains('Login').should('have.text','Login');
        cy.get('[class="oxd-text oxd-text--p orangehrm-login-forgot-header"]').click();
        cy.get('h6').contains('Reset Password').should('have.text','Reset Password');
    });

    it('TC-007 : Reset password', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get('h5').contains('Login').should('have.text','Login');
        cy.get('[class="oxd-text oxd-text--p orangehrm-login-forgot-header"]').click();
        cy.get('h6').contains('Reset Password').should('have.text','Reset Password');
        cy.get('[name="username"]').type('Admin');
        cy.get('[type="submit"]').click();
        cy.get('h6').contains('Reset Password link sent successfully').should('have.text','Reset Password link sent successfully');
    });

    it('TC-008 : Measure Login Process Time', () => {
        let startTime, endTime;
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login').then(() => {
            startTime = new Date().getTime();
        });
        cy.get('h5').contains('Login').should('have.text','Login');
        cy.get('[name="username"]').type('Admin');
        cy.get('[name="password"]').type('admin123');
        cy.get('button[type="submit"]').click();
        cy.url().should('include', '/dashboard');
        cy.get('h6').contains('Dashboard').should('have.text','Dashboard').then(() => {
            endTime = new Date().getTime();
            const duration = endTime - startTime;
            cy.log('Login process took: ' + duration + ' ms');
            expect(duration).to.be.lessThan(5000);
        });
    });
});