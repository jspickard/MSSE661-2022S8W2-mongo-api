const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('Quotes API Service', function() {
    it('should GET all quotes', function(done) {
        chai
            .request('http://localhost:3000')
            .get('/api/quotes')
            .end(function(err,resp) {
                expect(resp.status).to.be.eql(200);
                expect(resp.body).to.be.a('array');
                expect(resp.body.length).to.not.be.eql(0);
                done();
            });
    });

    it('should GET a random quote', function(done) {
        chai
            .request('http://localhost:3000')
            .get('/api/quotes/getrandom')
            .end(function(err,resp) {
                expect(resp.status).to.be.eql(200);
                expect(resp.body.quote).to.not.be.eql("");
                done();
            });
    })

    it('should GET a single quote', function(done) {
        chai
            .request('http://localhost:3000')
            .get('/api/quotes/getrandom') //MongoDB auto assigns _id, get from random
            .end(function(err,resp) {
                const requested = resp.body._id
                console.log(requested);
                const expected = resp.body;
                console.log(resp.body.quote);
                chai
                    .request('http://localhost:3000')
                    .get('/api/quotes/'+requested)
                    .end(function (errSignle, respSingle) {
                        expect(resp.status).to.be.eql(200);
                        expect(resp.body).to.be.eql(expected);
                        done();
                    })
            });
    })
});