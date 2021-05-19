process.env.NODE_ENV = "test";

const chai = require("chai");
const { expect } = chai;
const knex = require("../db/knex");
const app = require("../index");

const userOneCredentials = require("../util/userOneCredentials");

describe("Checkout", () => {
  beforeEach(async () => {
    await knex.migrate.rollback();
    await knex.migrate.latest();
    await knex.seed.run();
  });

  afterEach(async () => {
    await knex.migrate.rollback();
  });

  it("should create a new order from a cart", (done) => {
    chai
      .request(app)
      .post("/api/checkout")
      .send({ cart_id: 1 })
      .end((err, res) => {
        if (err) {
          throw err;
        }
        expect(res).to.have.status(201);
        expect(res.body).to.be.an("object");
        expect(res.body).to.haveOwnProperty("order_id");
        expect(res.body.order_id).to.equal(6);
        chai
          .request(app)
          .get("/api/orders/6")
          .send(userOneCredentials)
          .end((err, res) => {
            if (err) {
              throw err;
            }
            expect(res).to.have.status(200);
            expect(res.body).to.be.an("array");
            expect(res.body).to.have.lengthOf(3);
            expect(res.body[0]).to.haveOwnProperty("order_id");
            expect(res.body[0].order_id).to.equal(6);
            expect(res.body[0]).to.haveOwnProperty("user_id");
            expect(res.body[0].user_id).to.equal(
              "123e4567-e89b-12d3-a456-426614174001"
            );
            expect(res.body[0]).to.haveOwnProperty("product_name");
            expect(res.body[0].product_name).to.equal("testname1");
            expect(res.body[0]).to.haveOwnProperty("unit_price");
            expect(res.body[0].unit_price).to.equal("400.00");
            expect(res.body[0]).to.haveOwnProperty("num_units");
            expect(res.body[0].num_units).to.equal("1");
            done();
          });
      });
  });

  it("should delete the products from the old cart after placing an order", (done) => {
    chai
      .request(app)
      .post("/api/checkout")
      .send({ cart_id: 1 })
      .end((err, res) => {
        if (err) {
          throw err;
        }
        expect(res).to.have.status(201);
        expect(res.body).to.be.an("object");
        expect(res.body).to.haveOwnProperty("order_id");
        expect(res.body.order_id).to.equal(6);
        chai
          .request(app)
          .get("/api/carts/1")
          .send(userOneCredentials)
          .end((err, res) => {
            if (err) {
              throw err;
            }
            expect(res).to.have.status(404);
            done();
          });
      });
  });
});
