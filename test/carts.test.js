process.env.NODE_ENV = "test";

const chai = require("chai");
const { expect } = chai;
const knex = require("../db/knex");
const app = require("../index");

describe("Carts routes", () => {
  beforeEach(async () => {
    await knex.migrate.rollback();
    await knex.migrate.latest();
    await knex.seed.run();
  });

  afterEach(async () => {
    await knex.migrate.rollback;
  });

  //GET
  describe("GET carts", () => {
    it("should return all carts", (done) => {
      chai
        .request(app)
        .get("/api/carts")
        .end((err, res) => {
          if (err) {
            throw err;
          }
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("array");
          expect(res.body).to.have.lengthOf(3);
          expect(res.body[0]).to.haveOwnProperty("cart_id");
          expect(res.body[0].cart_id).to.equal(1);
          expect(res.body[0]).to.haveOwnProperty("user_id");
          expect(res.body[0]).to.haveOwnProperty("num_items");
          expect(res.body[0]).to.haveOwnProperty("total_price");
          done();
        });
    });
  });

  // GET BY ID
  describe("GET carts/:id", () => {
    it("should return a single cart", (done) => {
      chai
        .request(app)
        .get("/api/carts/1")
        .end((err, res) => {
          if (err) {
            throw err;
          }
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("array");
          expect(res.body).to.have.lengthOf(3);
          expect(res.body[0]).to.haveOwnProperty("cart_id");
          expect(res.body[0].cart_id).to.equal(1);
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

    it("should return status 404 if cart_id is invalid", (done) => {
      chai
        .request(app)
        .get("/api/carts/299")
        .end((err, res) => {
          if (err) {
            throw err;
          }
          expect(res).to.have.status(404);
          expect(res.body).to.be.an("object").and.to.be.empty;
          done();
        });
    });

    it("should return status 404 if cart_id is not a number", (done) => {
      chai
        .request(app)
        .get("/api/carts/bolivia")
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

  //POST
  describe("POST carts", () => {
    it("should add a cart with products", (done) => {
      chai
        .request(app)
        .post("/api/carts")
        .send({
          user_id: "123e4567-e89b-12d3-a456-426614174001",
          product_ids: [1, 1, 2, 3],
        })
        .end((err, res) => {
          if (err) {
            throw err;
          }
          expect(res).to.have.status(201);
          expect(res.body).to.haveOwnProperty("cart_id");
          expect(res.body.cart_id).to.equal(4);
          chai
            .request(app)
            .get("/api/carts/4")
            .end((err, res) => {
              if (err) {
                throw err;
              }
              expect(res).to.have.status(200);
              expect(res.body).to.be.an("array");
              expect(res.body[0]).to.haveOwnProperty("product_name");
              expect(res.body[0]).to.haveOwnProperty("cart_id");
              expect(res.body[0].cart_id).to.equal(4);
              expect(res.body[0]).to.haveOwnProperty("user_id");
              expect(res.body[0].user_id).to.equal(
                "123e4567-e89b-12d3-a456-426614174001"
              );
              expect(res.body[0]).to.haveOwnProperty("product_name");
              expect(res.body[0].product_name).to.equal("testname1");
              expect(res.body[0]).to.haveOwnProperty("unit_price");
              expect(res.body[0].unit_price).to.equal("400.00");
              expect(res.body[0]).to.haveOwnProperty("num_units");
              expect(res.body[0].num_units).to.equal("2");
              done();
            });
        });
    });

    it("should not add a cart if no products are specified", (done) => {
      chai
        .request(app)
        .post("/api/carts")
        .send({
          user_id: "123e4567-e89b-12d3-a456-426614174001",
        })
        .end((err, res) => {
          if (err) {
            throw err;
          }
          expect(res).to.have.status(400);
          expect(res.body).to.be.empty;
          chai
            .request(app)
            .get("/api/carts")
            .end((err, res) => {
              expect(res).to.have.status(200);
              expect(res.body).to.have.lengthOf(3);
              done();
            });
        });
    });

    it("should not add a cart if an empty array is passed to products", (done) => {
      chai
        .request(app)
        .post("/api/carts")
        .send({
          user_id: "123e4567-e89b-12d3-a456-426614174001",
          product_ids: [],
        })
        .end((err, res) => {
          if (err) {
            throw err;
          }
          expect(res).to.have.status(400);
          expect(res.body).to.be.empty;
          chai
            .request(app)
            .get("/api/carts")
            .end((err, res) => {
              if (err) {
                throw err;
              }
              expect(res).to.have.status(200);
              expect(res.body).to.have.lengthOf(3);
              done();
            });
        });
    });
  });

  //POST BY ID
  describe("POST carts/:id", () => {
    it("should add a product into a cart", (done) => {
      chai
        .request(app)
        .post("/api/carts/1")
        .send({
          cart_id: 1,
          product_id: 1,
        })
        .end((err, res) => {
          if (err) {
            throw err;
          }
          expect(res).to.have.status(201);
          expect(res.body).to.be.an("object");
          expect(res.body).to.haveOwnProperty("cart_id");
          expect(res.body.cart_id).to.equal(1);
          expect(res.body).to.haveOwnProperty("product_id");
          expect(res.body.product_id).to.equal(1);
          chai
            .request(app)
            .get("/api/carts/1")
            .end((err, res) => {
              if (err) {
                throw err;
              }
              expect(res).to.have.status(200);
              expect(res.body).to.be.an("array");
              expect(res.body[0]).to.haveOwnProperty("cart_id");
              expect(res.body[0].cart_id).to.equal(1);
              expect(res.body[0]).to.haveOwnProperty("user_id");
              expect(res.body[0].user_id).to.equal(
                "123e4567-e89b-12d3-a456-426614174001"
              );
              expect(res.body[0]).to.haveOwnProperty("product_name");
              expect(res.body[0].product_name).to.equal("testname1");
              expect(res.body[0]).to.haveOwnProperty("unit_price");
              expect(res.body[0].unit_price).to.equal("400.00");
              expect(res.body[0]).to.haveOwnProperty("num_units");
              expect(res.body[0].num_units).to.equal("2");
              done();
            });
        });
    });
  });

  //DELETE BY ID
  describe("DELETE carts/:id", () => {
    it("should delete a product from a cart", (done) => {
      chai
        .request(app)
        .delete("/api/carts/1")
        .send({ cart_id: 1, product_id: 1 })
        .end((err, res) => {
          if (err) {
            throw err;
          }
          expect(res).to.have.status(204);
          chai
            .request(app)
            .get("/api/carts/1")
            .end((err, res) => {
              if (err) {
                throw err;
              }
              expect(res).to.have.status(200);
              expect(res.body).to.have.lengthOf(2);
              expect(res.body[0]).to.haveOwnProperty("product_name");
              expect(res.body[0].product_name).to.not.equal(1);
              done();
            });
        });
    });
  });
});
