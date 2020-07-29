
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Cypres Testaaja',
      username: 'ctest',
      password: 'psswrd'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login from is shown', function() {
    cy.get('#login-form')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('ctest')
      cy.get('#password').type('psswrd')
      cy.get('#login-button').click()

      cy.contains('logged in as Cypres Testaaja')
    })
    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('ctest')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'ctest', password: 'psswrd' })
    })
    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('uusi blogi')
      cy.get('#author').type('kirjoittaja')
      cy.get('#url').type('google.com')
      cy.get('#create-button').click()
      cy.get('.blog')
        .should('contain', 'uusi blogi by kirjoittaja')
    })
    describe.only('and a blog exists', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'a good blog',
          author: 'writer',
          url: 'duckduckgo.com'
        })
      })

      it('it can be liked', function() {
        cy.contains('a good blog').parent().find('button').click()
        cy.contains('0').contains('like').click()
        cy.get('.notif')
          .should('contain', 'liked a good blog, thanks')
        cy.contains('1')
      })
    })
  })
})