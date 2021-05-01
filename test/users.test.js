process.env.NODE_ENV = 'test';

const chai = require('chai');
const { expect } = chai;
const chaiHttp = require('chai-http');
const { request } = require('../index');
const app = require('../index');

chai.use(chaiHttp);

describe('User routes', () => {
    //Basic Get
    describe('Basic GET route', () => {
        it('responds with status 200', (done) => {
            chai.request(app)
                .get('/users')
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
                .get('/users')
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
                .get('/users')
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
        it('responds with status 200 for first UUID', (done) => {
            chai.request(app)
                .get('/users/29d2f4b2-3ecf-451e-85d2-94b318eb9e73')
                .end((err, res) => {
                    if (err){
                        throw err
                    };
                    expect(res).to.have.status(200);
                    done();
                })
        });

        it('responds with an object for first UUID', (done) => {
            chai.request(app)
                .get('/users/29d2f4b2-3ecf-451e-85d2-94b318eb9e73')
                .end((err, res) => {
                    if (err){
                        throw err
                    };
                    expect(res).to.be.a('object');
                    done();
                })
        });

        it('responds with an object for first UUID that has an email address', (done) => {
            chai.request(app)
                .get('/users/29d2f4b2-3ecf-451e-85d2-94b318eb9e73')
                .end((err, res) => {
                    if (err){
                        throw err
                    };
                    expect(res.body[0]).to.have.own.property('email');
                    done();
                })
        });

        it('responds with status 200 for second UUID', (done) => {
            chai.request(app)
                .get('/users/dca36c6b-10e4-403f-9c10-72f04886f60b')
                .end((err, res) => {
                    if (err){
                        throw err
                    };
                    expect(res).to.have.status(200);
                    done();
                })
        });

        it('responds with an object for second UUID', (done) => {
            chai.request(app)
                .get('/users/dca36c6b-10e4-403f-9c10-72f04886f60b')
                .end((err, res) => {
                    if (err){
                        throw err
                    };
                    expect(res).to.be.a('object');
                    done();
                })
        });


        it('responds with an object for second UUID that has an email address', (done) => {
            chai.request(app)
                .get('/users/dca36c6b-10e4-403f-9c10-72f04886f60b')
                .end((err, res) => {
                    if (err){
                        throw err
                    };
                    expect(res.body[0]).to.have.own.property('email');
                    done();
                })
        });
    });

    //Post
    describe('Post user', () => {
        it('returns a status of 201', (done) => {
            const testUser = {
                last_name: 'Lastname',
                first_name: 'Firstname',
                email: 'email@email.com'
            };

            chai.request(app)
                .post('/users')
                .send(testUser)
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
                last_name: 'Tester',
                email: 'nope@nope.com'
            };

            chai.request(app)
                .post('/users')
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
})