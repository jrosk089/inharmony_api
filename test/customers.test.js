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
                .get('/')
                .end((err, res) => {
                    if (err){
                        throw err
                    };
                    expect(res).to.have.status(200);
                    done();
                });

        })
    })
})