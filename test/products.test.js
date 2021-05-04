process.env.NODE_ENV = 'test';

const chai = require('chai');
const { expect } = chai;
const chaiHttp = require('chai-http');
const app = require('../index');

chai.use(chaiHttp);

describe('Product routes',  () => {
    describe('GET products', () => {
        it('should return all products', (done) => {
           chai.request(app)
            .get('/api/products')
            .end((err, res) => {
                if (err) {
                    throw err
                };
                expect(res).to.have.status(200);
                expect(res).to.be.an('object');
                expect(res.body).to.be.an('array');
                expect(res.body).to.have.lengthOf(3);
                expect(res.body[0]).to.haveOwnProperty('id');
                expect(res.body[0].id).to.equal(1);
                done();
            })
        })
    })
});

