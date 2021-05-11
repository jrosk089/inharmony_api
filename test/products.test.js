process.env.NODE_ENV = "test";

const chai = require("chai");
const { expect } = chai;
const chaiHttp = require("chai-http");
const knex = require("../db/knex");
const app = require("../index");

chai.use(chaiHttp);

describe("Product routes", () => {
  beforeEach(async () => {
    await knex.migrate.rollback();
    await knex.migrate.latest();
    await knex.seed.run();
  });

  afterEach(async () => {
    await knex.migrate.rollback();
  });

  //BASIC GET
  describe("GET products", () => {
    it("should return all products", (done) => {
      chai
        .request(app)
        .get("/api/products")
        .end((err, res) => {
          if (err) {
            throw err;
          }
          expect(res).to.have.status(200);
          expect(res).to.be.an("object");
          expect(res.body).to.be.an("array");
          expect(res.body).to.have.lengthOf(3);
          expect(res.body[0]).to.haveOwnProperty("product_id");
          expect(res.body[0]["product_id"]).to.equal(1);
          done();
        });
    });
  });

  //GET BY ID
  describe("GET products/:id", () => {
    it("should return a single product", (done) => {
      chai
        .request(app)
        .get("/api/products/1")
        .end((err, res) => {
          if (err) {
            throw err;
          }
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body).to.haveOwnProperty("product_id");
          expect(res.body["product_id"]).to.equal(1);
          expect(res.body).to.haveOwnProperty("name");
          expect(res.body.name).to.equal("testname1");
          expect(res.body).to.haveOwnProperty("category");
          expect(res.body.category).to.equal("testcat1");
          expect(res.body).to.haveOwnProperty("description");
          expect(res.body.description).to.equal("descript1");
          expect(res.body).to.haveOwnProperty("price");
          expect(res.body.price).to.equal("400.00");
          expect(res.body).to.haveOwnProperty("num_in_stock");
          expect(res.body["num_in_stock"]).to.equal(1);
          done();
        });
    });

    it("should return 404 if id is invalid", (done) => {
      chai
        .request(app)
        .get("/api/products/204")
        .end((err, res) => {
          if (err) {
            throw err;
          }
          expect(res).to.have.status(404);
          expect(res.body).to.be.an("object").and.to.be.empty;
          done();
        });
    });

    it("should return status 404 if product_id is not a number", (done) => {
      chai
        .request(app)
        .get("/api/products/bolivia")
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
  describe("POST products", () => {
    it("should add a product", (done) => {
      chai
        .request(app)
        .post("/api/products")
        .send({
          name: "Newname",
          category: "Newcat",
          description: "Describe",
          price: 1000.0,
          num_in_stock: 10,
        })
        .end((err, res) => {
          if (err) {
            throw err;
          }
          expect(res).to.have.status(201);
          expect(res.body).to.be.an("object");
          expect(res.body).to.haveOwnProperty("product_id");
          expect(res.body["product_id"]).to.equal(4);
          expect(res.body).to.haveOwnProperty("name");
          expect(res.body.name).to.equal("Newname");
          expect(res.body).to.haveOwnProperty("category");
          expect(res.body.category).to.equal("Newcat");
          expect(res.body).to.haveOwnProperty("description");
          expect(res.body.description).to.equal("Describe");
          expect(res.body).to.haveOwnProperty("price");
          expect(res.body.price).to.equal("1000.00");
          expect(res.body).to.haveOwnProperty("num_in_stock");
          expect(res.body["num_in_stock"]).to.equal(10);
          done();
        });
    });
  });

  //PUT
  describe("PUT products/:id", () => {
    it("should update a product", (done) => {
      chai
        .request(app)
        .put("/api/products/1")
        .send({
          name: "updated",
          price: 11.11,
        })
        .end((err, res) => {
          if (err) {
            throw err;
          }
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body).to.haveOwnProperty("product_id");
          expect(res.body["product_id"]).to.equal(1);
          expect(res.body).to.haveOwnProperty("name");
          expect(res.body.name).to.equal("updated");
          expect(res.body).to.haveOwnProperty("category");
          expect(res.body.category).to.equal("testcat1");
          expect(res.body).to.haveOwnProperty("description");
          expect(res.body.description).to.equal("descript1");
          expect(res.body).to.haveOwnProperty("price");
          expect(res.body.price).to.equal("11.11");
          expect(res.body).to.haveOwnProperty("num_in_stock");
          expect(res.body["num_in_stock"]).to.equal(1);
          done();
        });
    });

    it("should not update a product if product_id is included in the body", (done) => {
      chai
        .request(app)
        .put("/api/products/1")
        .send({
          product_id: 10,
          name: "updated",
          price: 11.11,
        })
        .end((err, res) => {
          if (err) {
            throw err;
          }
          expect(res).to.have.status(422);
          expect(res.body).to.be.an("object");
          expect(res.body).to.haveOwnProperty("error");
          expect(res.body.error).to.equal("ID cannot be updated");
          done();
        });
    });
  });

  //DELETE
  describe("DELETE products/:id", () => {
    it("should delete a product", (done) => {
      chai
        .request(app)
        .delete("/api/products/1")
        .end((err, res) => {
          if (err) {
            throw err;
          }
          expect(res).to.have.status(200);
          expect(res.body).to.haveOwnProperty("message");
          expect(res.body.message).to.equal("Product with id 1 deleted");
          chai
            .request(app)
            .get("/api/products")
            .end((err, res) => {
              if (err) {
                throw err;
              }
              expect(res).to.have.status(200);
              expect(res.body).to.be.an("array");
              expect(res.body).to.have.lengthOf(2);
              expect(res.body[0]["product_id"]).to.equal(2);
              done();
            });
        });
    });
  });
});
