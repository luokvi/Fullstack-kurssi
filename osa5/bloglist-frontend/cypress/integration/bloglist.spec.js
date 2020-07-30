const { func } = require("prop-types")

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Cypres Testaaja',
      username: 'ctest',
      password: 'psswrd'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    const secondUser = {
      name: 'Other User',
      username: 'other',
      password: 'otherpass'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', secondUser)
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
    describe('and when a couple blogs exist', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'a good blog',
          author: 'writer',
          url: 'duckduckgo.com',
          likes: 0
        })
        cy.createBlog({
          title: 'a very liked blog',
          author: 'celebrity',
          url: 'wordpress.com',
          likes: 23
        })
        cy.createBlog({
          title: 'a second blog',
          author: 'auteur',
          url: 'google.com',
          likes: 2
        })
      })

      it('one can be liked', function() {
        cy.contains('a good blog').parent().find('button').click()
        cy.contains('0').contains('like').click()
        cy.get('.notif')
          .should('contain', 'liked a good blog, thanks')
        cy.contains('1')
      })

      it('one can be deleted', function() {
        cy.contains('a good blog').parent().find('button').click()
        cy.contains('remove').click()
        cy.on('window:confirm', (str) => {
          expect(str).to.eq('Remove blog a good blog by writer?')
        })
        cy.get('.notif').should('contain', 'removed a good blog')
        cy.get('.blog').should('not.contain', 'a good blog')
      })

      it.only('a blog from another user cannot be deleted', function() {
        cy.contains('logout').click()
        cy.login({ username: 'other', password: 'otherpass' })
        cy.contains('a good blog').parent().find('button').click()
        cy.get('.blog').should('not.contain', 'remove')
      })
    })
  })
})