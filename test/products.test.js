process.env.NODE_ENV = 'test';

const chai = require('chai');
const { expect } = chai;
const chaiHttp = require('chai-http');
const { request } = require('../index');
const app = require('../index');

chai.use(chaiHttp);

describe('Product routes', () => {
    //Products - Basic GET
    describe('basic GET', () => {
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
                    expect(res.body).to.have.lengthOf.at.least(2);
                    done();
                })
        });
    });

    //Products - GET for ID
    describe('GET by ID', () => {
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
    });

    //Post
    describe('Post product', () => {
        it('returns a status of 201', (done) => {
            const testObject = {
                name: 'Testname',
                family: 'Testfamily',
                description: 'Blahblah',
                price: 200.00,
                num_in_stock: 4
            };

            chai.request(app)
                .post('/products')
                .send(testObject)
                .end((err, res) => {
                     if (err){
                         throw err
                     };
                     expect(res).to.have.status(201);
                     done();
                 })
        });

        it('returns an error if incomplete object is added', (done) =>{
            const incomplete = {
                name: 'Test',
                description: 'Not a complete item'
            };

            chai.request(app)
                .post('/products')
                .send(incomplete)
                .end((err, res) => {
                    if (err){
                        throw err
                    };
                    expect(res).to.have.status(400);
                    done();
                })
        })
    })
});