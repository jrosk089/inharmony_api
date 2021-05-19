process.env.NODE_ENV = "test";

const chai = require("chai");
const { expect } = chai;
const chaiHttp = require("chai-http");
const knex = require("../db/knex");
const app = require("../index");

chai.use(chaiHttp);

const userOneCredentials = { email: "email1@email.com", password: "password1" };

describe("Orders routes", () => {
  beforeEach(async () => {
    await knex.migrate.rollback();
    await knex.migrate.latest();
    await knex.seed.run();
  });

  afterEach(async () => {
    await knex.migrate.rollback();
  });

  describe("GET orders", () => {
    it("should return all orders for a specific user", (done) => {
      chai
        .request(app)
        .get("/api/orders")
        .send(userOneCredentials)
        .end((err, res) => {
          if (err) {
            throw err;
          }
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("array");
          expect(res.body).to.have.lengthOf(3);
          expect(res.body[0]).to.haveOwnProperty("order_id");
          expect(res.body[0].order_id).to.equal(1);
          expect(res.body[0]).to.haveOwnProperty("user_id");
          expect(res.body[0]).to.haveOwnProperty("num_items");
          expect(res.body[0]).to.haveOwnProperty("total_price");
          done();
        });
    });

    it("should not return orders if user not logged in", (done) => {
      chai
        .request(app)
        .get("/api/users/orders")
        .end((err, res) => {
          if (err) {
            throw err;
          }
          expect(res).to.have.status(404);
          done();
        });
    });
  });

  describe("GET orders/:id", () => {
    it("should return a single order", (done) => {
      chai
        .request(app)
        .get("/api/orders/1")
        .send(userOneCredentials)
        .end((err, res) => {
          if (err) {
            throw err;
          }
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("array");
          expect(res.body).to.have.lengthOf(3);
          expect(res.body[0]).to.haveOwnProperty("order_id");
          expect(res.body[0].order_id).to.equal(1);
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

    it("should return status 404 if order_id is invalid", (done) => {
      chai
        .request(app)
        .get("/api/orders/299")
        .send(userOneCredentials)
        .end((err, res) => {
          if (err) {
            throw err;
          }
          expect(res).to.have.status(404);
          expect(res.body).to.be.an("object").and.to.be.empty;
          done();
        });
    });

    it("should return status 404 if order_id is not a number", (done) => {
      chai
        .request(app)
        .get("/api/orders/bolivia")
        .send(userOneCredentials)
        .end((err, res) => {
          if (err) {
            throw err;
          }
          expect(res).to.have.status(404);
          expect(res.body).to.be.an("object").and.to.be.empty;
          done();
        });
    });

    it("should return status 404 if user tries to access an order that isn't theirs", (done) => {
      chai
        .request(app)
        .get("/api/orders/2")
        .send(userOneCredentials)
        .end((err, res) => {
          if (err) {
            throw err;
          }
          expect(res).to.have.status(404);
          expect(res.body).to.be.an("object").and.to.be.empty;
          done();
        });
    });
  });
});
