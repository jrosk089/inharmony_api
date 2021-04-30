process.env.NODE_ENV = 'test';

const chai = require('chai');
const { expect } = chai;
const chaiHttp = require('chai-http');
const { request } = require('../index');
const app = require('../index');

chai.use(chaiHttp);

describe('Customer routes', () => {
    //Basic Get
    describe('Basic GET route', () => {
        it('responds with status 200', (done) => {
            chai.request(app)
                .get('/customers')
                .end((err, res) => {
                    if (err){
                        throw err
                    };
                    expect(res).to.have.status(200);
                    done();
                })
        });

        it('responds with an object', (done) => {
            chai.request(app)
                .get('/customers')
                .end((err, res) => {
                    if (err){
                        throw err
                    };
                    expect(res).to.be.a('object');
                    done();
                })
        });

        it('responds with an object with multiple items', (done) => {
            chai.request(app)
                .get('/customers')
                .end((err, res) => {
                    if (err){
                        throw err
                    };
                    expect(res.body).to.have.lengthOf.at.least(2);
                    done();
                })
        })
    });

    describe('GET by ID', () => {
        it('responds with status 200 for ID 1', (done) => {
            chai.request(app)
                .get('/customers/1')
                .end((err, res) => {
                    if (err){
                        throw err
                    };
                    expect(res).to.have.status(200);
                    done();
                })
        });

        it('responds with an object for ID 1', (done) => {
            chai.request(app)
                .get('/customers/1')
                .end((err, res) => {
                    if (err){
                        throw err
                    };
                    expect(res).to.be.a('object');
                    done();
                })
        });

        it('responds with an object for ID 1 that has an email address', (done) => {
            chai.request(app)
                .get('/customers/1')
                .end((err, res) => {
                    if (err){
                        throw err
                    };
                    expect(res.body[0]).to.have.own.property('email');
                    done();
                })
        });

        it('responds with status 200 for ID 2', (done) => {
            chai.request(app)
                .get('/customers/2')
                .end((err, res) => {
                    if (err){
                        throw err
                    };
                    expect(res).to.have.status(200);
                    done();
                })
        });

        it('responds with an object for ID 2', (done) => {
            chai.request(app)
                .get('/customers/2')
                .end((err, res) => {
                    if (err){
                        throw err
                    };
                    expect(res).to.be.a('object');
                    done();
                })
        });


        it('responds with an object for ID 2 that has an email address', (done) => {
            chai.request(app)
                .get('/customers/2')
                .end((err, res) => {
                    if (err){
                        throw err
                    };
                    expect(res.body[0]).to.have.own.property('email');
                    done();
                })
        });
    })
})