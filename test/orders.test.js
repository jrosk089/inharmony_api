process.env.NODE_ENV = 'test';

const chai = require('chai');
const { expect } = chai;
const chaiHttp = require('chai-http');
const { request } = require('../index');
const app = require('../index');

chai.use(chaiHttp);

describe('Orders routes', () => {
    describe('Basic GET', () => {
        it('should respond with status 200', (done) => {
            chai.request(app)
                .get('/orders')
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
                .get('/orders')
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
                .get('/orders')
                .end((err, res) => {
                    if (err){
                        throw err
                    };
                    expect(res.body).to.have.lengthOf.at.least(2);
                    done();
                })
        })
    });
    
})