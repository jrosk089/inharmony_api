process.env.NODE_ENV = 'test';

const chai = require('chai');
const { expect } = chai;
const chaiHttp = require('chai-http');
const { request } = require('../index');
const app = require('../index');

chai.use(chaiHttp);

//Test server
describe('App', () => {
    //Products - Basic GET
    describe('basic GET for Products', () => {
        it('responds with status 200', (done) => {
            chai.request(app)
                .get('/products')
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
                .get('/products')
                .end((err, res) => {
                    if (err){
                        throw err
                    };
                    expect(res).to.be.a('object');
                    done();
                })
        });

        it('responds with an object containing multiple items', (done) => {
            chai.request(app)
                .get('/products')
                .end((err, res) => {
                    if (err){
                        throw err
                    };
                    expect(res.body).to.have.lengthOf.at.least(1);
                    done();
                })
        });
    });

    //Products - GET for ID
    describe('GET by ID for Products', () => {
        it('responds with status 200 for ID 1', (done) => {
            chai.request(app)
                .get('/products/1')
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
                .get('/products/1')
                .end((err, res) => {
                    if (err){
                        throw err
                    };
                    expect(res).to.be.a('object');
                    done();
                })
        });

        it('responds with an object for ID 1 that has a name', (done) => {
            chai.request(app)
                .get('/products/1')
                .end((err, res) => {
                    if (err){
                        throw err
                    };
                    expect(res.body[0]).to.have.own.property('name');
                    done();
                })
        });

        it('responds with status 200 for ID 2', (done) => {
            chai.request(app)
                .get('/products/2')
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
                .get('/products/2')
                .end((err, res) => {
                    if (err){
                        throw err
                    };
                    expect(res).to.be.a('object');
                    done();
                })
        });


        it('responds with an object for ID 2 that has a name', (done) => {
            chai.request(app)
                .get('/products/2')
                .end((err, res) => {
                    if (err){
                        throw err
                    };
                    expect(res.body[0]).to.have.own.property('name');
                    done();
                })
        });
    })
});