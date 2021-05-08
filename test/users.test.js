process.env.NODE_ENV = "test";

const chai = require("chai");
const { expect } = chai;
const chaiHttp = require("chai-http");
const knex = require("../db/knex");
const app = require("../index");

chai.use(chaiHttp);

describe("Users routes", () => {
  beforeEach(async () => {
    await knex.migrate.rollback();
    await knex.migrate.latest();
    await knex.seed.run();
  });

  afterEach(async () => {
    await knex.migrate.rollback();
  });

  //BASIC GET
  describe("GET users", () => {
    it("should return all users", (done) => {
      chai
        .request(app)
        .get("/api/users")
        .end((err, res) => {
          if (err) {
            throw err;
          }
          expect(res).to.have.status(200);
          expect(res).to.be.an("object");
          expect(res.body).to.be.an("array");
          expect(res.body).to.have.lengthOf(3);
          expect(res.body[0]).to.haveOwnProperty("user_id");
          expect(res.body[0]["user_id"]).to.equal(
            "123e4567-e89b-12d3-a456-426614174001"
          );
          done();
        });
    });
  });

  //GET BY ID
  describe("GET users/:id", () => {
    it("should return a single user", (done) => {
      chai
        .request(app)
        .get("/api/users/123e4567-e89b-12d3-a456-426614174001")
        .end((err, res) => {
          if (err) {
            throw err;
          }
          expect(res).to.have.status(200);
          expect(res).to.be.an("object");
          expect(res.body).to.haveOwnProperty("user_id");
          expect(res.body.user_id).to.equal(
            "123e4567-e89b-12d3-a456-426614174001"
          );
          expect(res.body).to.haveOwnProperty("email");
          expect(res.body.email).to.equal("email1@email.com");
          expect(res.body).to.haveOwnProperty("last_name");
          expect(res.body.last_name).to.equal("lastname1");
          expect(res.body).to.haveOwnProperty("first_name");
          expect(res.body.first_name).to.equal("firstname1");
          done();
        });
    });

    it("should return 404 if id is invalid", (done) => {
      chai
        .request(app)
        .get("/api/users/1234567")
        .end((err, res) => {
          if (err) {
            throw err;
          }
          expect(res).to.have.status(404);
          done();
        });
    });
  });

  //POST
  describe("POST users", () => {
    it("should add a user", (done) => {
      chai
        .request(app)
        .post("/api/users")
        .send({
          email: "email4@email.com",
          last_name: "lastname4",
          first_name: "firstname4",
        })
        .end((err, res) => {
          if (err) {
            throw err;
          }
          expect(res).to.have.status(201);
          expect(res).to.be.an("object");
          expect(res.body).to.haveOwnProperty("user_id");
          expect(res.body.user_id).to.have.lengthOf(36);
          expect(res.body).to.haveOwnProperty("email");
          expect(res.body.email).to.equal("email4@email.com");
          expect(res.body).to.haveOwnProperty("last_name");
          expect(res.body.last_name).to.equal("lastname4");
          expect(res.body).to.haveOwnProperty("first_name");
          expect(res.body.first_name).to.equal("firstname4");
          done();
        });
    });
  });

  //PUT
  describe("PUT users/:id", () => {
    it("should update a user", (done) => {
      chai
        .request(app)
        .put("/api/users/123e4567-e89b-12d3-a456-426614174001")
        .send({
          email: "up@dated.com",
          last_name: "updatedname",
        })
        .end((err, res) => {
          if (err) {
            throw err;
          }
          expect(res).to.have.status(200);
          expect(res).to.be.an("object");
          expect(res.body).to.haveOwnProperty("user_id");
          expect(res.body.user_id).to.equal(
            "123e4567-e89b-12d3-a456-426614174001"
          );
          expect(res.body).to.haveOwnProperty("email");
          expect(res.body.email).to.equal("up@dated.com");
          expect(res.body).to.haveOwnProperty("last_name");
          expect(res.body.last_name).to.equal("updatedname");
          expect(res.body).to.haveOwnProperty("first_name");
          expect(res.body.first_name).to.equal("firstname1");
          done();
        });
    });

    it("should not update a user if user_id is included in the body", (done) => {
      chai
        .request(app)
        .put("/api/users/123e4567-e89b-12d3-a456-426614174001")
        .send({
          user_id: "123e4567-e89b-12d3-a456-426614174009",
          email: "up@dated.com",
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

    it("should return 404 if id is invalid", (done) => {
      chai
        .request(app)
        .put("/api/users/1234567")
        .send({
          email: "up@dated.com",
          last_name: "updatedname",
        })
        .end((err, res) => {
          if (err) {
            throw err;
          }
          expect(res).to.have.status(404);
          done();
        });
    });
  });

  describe("DELETE users/:id", () => {
    it("should delete a user", (done) => {
      chai
        .request(app)
        .delete("/api/users/123e4567-e89b-12d3-a456-426614174001")
        .end((err, res) => {
          if (err) {
            throw err;
          }
          expect(res).to.have.status(200);
          expect(res.body).to.haveOwnProperty("message");
          expect(res.body.message).to.equal(
            "User with ID 123e4567-e89b-12d3-a456-426614174001 deleted"
          );
          chai
            .request(app)
            .get("/api/users")
            .end((err, res) => {
              if (err) {
                throw err;
              }
              expect(res).to.have.status(200);
              expect(res.body).to.be.an("array");
              expect(res.body).to.have.lengthOf(2);
              done();
            });
        });
    });
  });
});
