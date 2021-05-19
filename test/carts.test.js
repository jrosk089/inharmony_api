process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const { agent } = require("supertest");
const { expect } = chai;
const knex = require("../db/knex");
const app = require("../index");

chai.use(chaiHttp);

const userOneCredentials = require("../util/userOneCredentials");

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
    it("should return all carts for a user", (done) => {
      chai
        .request(app)
        .get("/api/carts")
        .send(userOneCredentials)
        .end((err, res) => {
          if (err) {
            throw err;
          }
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("array");
          expect(res.body).to.have.lengthOf(1);
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
        .send(userOneCredentials)
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

    it("should return status 404 if cart_id is not a number", (done) => {
      chai
        .request(app)
        .get("/api/carts/bolivia")
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

  //POST
  describe("POST carts", () => {
    it("should add a cart with products", async () => {
      const agent = chai.request.agent(app);
      await agent.post("/api/login").send(userOneCredentials);
      agent
        .post("/api/carts")
        .send({
          product_ids: [1, 1, 2, 3],
        })
        .end((err, res) => {
          if (err) {
            throw err;
          }
          expect(res).to.have.status(201);
          expect(res.body).to.haveOwnProperty("cart_id");
          expect(res.body.cart_id).to.equal(4);
          agent.close();
        });
    });

    it("should not add a cart if no products are specified", async () => {
      const agent = chai.request.agent(app);
      await agent.post("/api/login").send(userOneCredentials);
      agent
        .post("/api/carts")
        .send()
        .end((err, res) => {
          if (err) {
            throw err;
          }
          expect(res).to.have.status(400);
          expect(res.body).to.be.empty;
          agent.close();
        });
    });
  });

  //POST BY ID
  describe("POST carts/:id", () => {
    it("should add a product into a cart", async () => {
      const agent = chai.request.agent(app);
      await agent.post("/api/login").send(userOneCredentials);
      agent
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
          agent.close();
        });
    });
  });

  //DELETE BY ID
  describe("DELETE carts/:id", () => {
    it("should delete a product from a cart", async () => {
      const agent = chai.request.agent(app);
      await agent.post("/api/login").send(userOneCredentials);
      agent
        .delete("/api/carts/1")
        .send({ cart_id: 1, product_id: 1 })
        .end((err, res) => {
          if (err) {
            throw err;
          }
          expect(res).to.have.status(204);
          agent.close();
        });
    });
  });
});
