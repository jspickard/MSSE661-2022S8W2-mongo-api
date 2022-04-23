const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('Auth API Service', function() {
    it('should POST a new user', function(done) {
        const testUser = { //must manually delete after each test
            username: 'jerry',
            password: 'seinfeld',
            email:'jerry@seinfeld.com',
        };
        const expectedUser = {
                username: 'jerry',
                email:'jerry@seinfeld.com',
        };

        chai
            .request('http://localhost:3000')
            .post('/api/auth/register')
            .send(testUser)
            .end(function(err,resp) {
                expect(resp.body.user.username).to.eql(expectedUser.username);
                expect(resp.body.user.email).to.eql(expectedUser.email);
                done();
            });
    });

    it('should not POST a new user if no username is given', function (done) {
        const testUser = {
            password: 'seinfeld',
            email:'jerry@seinfeld.com',
        };
        const expectedStatus = 500;

        chai
            .request('http://localhost:3000')
            .post('/api/auth/register')
            .send(testUser)
            .end(function(err,resp) {
                expect(resp.status).to.eql(expectedStatus);
                done();
            });
    });

    it('should login an existing user with matching password', (done) => {
        const testUser = {
            username: 'jerry',
            password: 'seinfeld',
        };
    
        chai
          .request('http://localhost:3000')
          .post('/api/auth/login')
          .send(testUser)
          .end((err, resp) => {
            console.log('err: ' + err);
            console.log('resp: ' + resp);
            console.log(resp.body);
            expect(!!resp.body.auth).to.be.true;
            expect(resp.body.access_token).to.be.a('string');
            done();
          });
    });

    it('should not login an existing user with non-matching password', (done) => {
        const testUser = {
            username: 'jerry',
            password: 'castanza',
        };
        const expectedStatus = 402;
    
        chai
          .request('http://localhost:3000')
          .post('/api/auth/login')
          .send(testUser)
          .end((err, resp) => {
            expect(resp.status).to.eql(expectedStatus);
            done();
          });
    });

    //UPDATE WIP
    /*it('should update user info', (done) => {
    }*/

    //LOGOUT
    it('should logout current user', (done) => {
        const testUser = {
            username: 'jerry',
            password: 'seinfeld',
        };
    
        chai
          .request('http://localhost:3000')
          .post('/api/auth/logout')
          .end((err, resp) => {
            expect(resp.body.msg).to.eql('Logout successful');
            done();
          });
    });
});