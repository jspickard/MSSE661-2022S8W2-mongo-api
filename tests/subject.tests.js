const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require('chai-http');
const { generateAccessToken } = require('../src/jwt-config');

chai.use(chaiHttp);

describe('Subjects API Service', function() {
    it('should GET all subjects', function(done) {
        
        const testGenToken = generateAccessToken("1337",)
        const testSendToken ="testToken "+testGenToken;

        chai
            .request('http://localhost:3000')
            .get('/api/subjects')
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

    it('should GET a random subject', function(done) {

        const testGenToken = generateAccessToken("1337",)
        const testSendToken ="testToken "+testGenToken;

        chai
            .request('http://localhost:3000')
            .get('/api/subjects/getrandom')
            .set('auth-token', testSendToken)
            .end(function(err,resp) {
                expect(resp.status).to.be.eql(200);
                expect(resp.body.subject).to.not.be.eql("");
                done();
            });
    })

    it('should GET a single subject', function(done) {

        const testGenToken = generateAccessToken("1337",)
        const testSendToken ="testToken "+testGenToken;

        chai
            .request('http://localhost:3000')
            .get('/api/subjects/getrandom') //MongoDB auto assigns _id, get from random
            .set('auth-token', testSendToken)
            .end(function(err,resp) {
                const requested = resp.body._id
                console.log(requested);
                const expected = resp.body;
                console.log(resp.body.subject);
                chai
                    .request('http://localhost:3000')
                    .get('/api/subjects/'+requested)
                    .set('auth-token', testSendToken)
                    .end(function (errSignle, respSingle) {
                        expect(resp.status).to.be.eql(200);
                        expect(resp.body).to.be.eql(expected);
                        done();
                    })
            });
    })
});