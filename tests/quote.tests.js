const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require('chai-http');
const { generateAccessToken } = require('../src/jwt-config');

chai.use(chaiHttp);

describe('Quotes API Service', function() {
    it('should GET all quotes', function(done) {
        
        const testGenToken = generateAccessToken("1337",)
        const testSendToken ="testToken "+testGenToken;

        chai
            .request('http://localhost:3000')
            .get('/api/quotes')
            .set('auth-token', testSendToken)
            .end(function(err,resp) {
                console.log("GET all msg: "+resp.msg);
                console.log("GET all body.msg: "+resp.body.msg);
                expect(resp.status).to.be.eql(200);
                expect(resp.body).to.be.a('array');
                expect(resp.body.length).to.not.be.eql(0);
                done();
            });
    });

    it('should GET a random quote', function(done) {

        const testGenToken = generateAccessToken("1337",)
        const testSendToken ="testToken "+testGenToken;

        chai
            .request('http://localhost:3000')
            .get('/api/quotes/getrandom')
            .set('auth-token', testSendToken)
            .end(function(err,resp) {
                expect(resp.status).to.be.eql(200);
                expect(resp.body.quote).to.not.be.eql("");
                done();
            });
    })

    it('should GET a single quote', function(done) {

        const testGenToken = generateAccessToken("1337",)
        const testSendToken ="testToken "+testGenToken;

        chai
            .request('http://localhost:3000')
            .get('/api/quotes/getrandom') //MongoDB auto assigns _id, get from random
            .set('auth-token', testSendToken)
            .end(function(err,resp) {
                const requested = resp.body._id
                console.log(requested);
                const expected = resp.body;
                console.log(resp.body.quote);
                chai
                    .request('http://localhost:3000')
                    .get('/api/quotes/'+requested)
                    .set('auth-token', testSendToken)
                    .end(function (errSignle, respSingle) {
                        expect(resp.status).to.be.eql(200);
                        expect(resp.body).to.be.eql(expected);
                        done();
                    })
            });
    })
});