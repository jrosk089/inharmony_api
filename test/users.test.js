process.env.NODE_ENV = "test";

const chai = require("chai");
const { expect } = chai;
const chaiHttp = require("chai-http");
const knex = require("../db/knex");
const app = require("../index");

const { getUserByEmail } = require("../util/knexQueries");

const userOneCredentials = require("../util/userOneCredentials");
const userTwoCredentials = { email: "email2@email.com", password: "password2" };

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

  /*
  //BASIC GET - This would only be accessible by admins. That's a later TODO - a problem for future Jon.
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
  */

  //GET BY ID
  describe("GET users/me", () => {
    it("should return a single, logged-in user (user 1)", (done) => {
      chai
        .request(app)
        .get("/api/users/me")
        .send(userOneCredentials)
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

    it("should return a single, logged-in user (user 2)", (done) => {
      chai
        .request(app)
        .get("/api/users/me")
        .send(userTwoCredentials)
        .end((err, res) => {
          if (err) {
            throw err;
          }
          expect(res).to.have.status(200);
          expect(res).to.be.an("object");
          expect(res.body).to.haveOwnProperty("user_id");
          expect(res.body.user_id).to.equal(
            "123e4567-e89b-12d3-a456-426614174002"
          );
          expect(res.body).to.haveOwnProperty("email");
          expect(res.body.email).to.equal("email2@email.com");
          expect(res.body).to.haveOwnProperty("last_name");
          expect(res.body.last_name).to.equal("lastname2");
          expect(res.body).to.haveOwnProperty("first_name");
          expect(res.body.first_name).to.equal("firstname2");
          done();
        });
    });
  });

  //GET BY EMAIL -- note: I should probably have done a lot more tests like this on the actual queries.

  describe("getUserByEmail function", () => {
    it("should return a user by their email address", async () => {
      //SETUP
      const [userId, email, password, lastName, firstName] = [
        "123e4567-e89b-12d3-a456-426614174001",
        "email1@email.com",
        "$2a$10$rhwgGNyNte3ut2CxSV4z5OVlHlHZ4pJ7unFaomq2JITkFI1snC8A6",
        "lastname1",
        "firstname1",
      ];
      //EXERCISE
      const user = await getUserByEmail(email);
      //VERIFY
      expect(user).to.haveOwnProperty("user_id");
      expect(user.user_id).to.equal(userId);
      expect(user).to.haveOwnProperty("email");
      expect(user.email).to.equal(email);
      expect(user).to.haveOwnProperty("password");
      expect(user.password).to.equal(password);
      expect(user).to.haveOwnProperty("last_name");
      expect(user.last_name).to.equal(lastName);
      expect(user).to.haveOwnProperty("first_name");
      expect(user.first_name).to.equal(firstName);
    });
  });

  //POST
  describe("POST users/register", () => {
    it("should add a user", (done) => {
      chai
        .request(app)
        .post("/api/users/register")
        .send({
          email: "email4@email.com",
          password: "password4",
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
          expect(res.body).to.haveOwnProperty("password");
          expect(res.body.password).to.not.equal("password4");
          expect(res.body).to.haveOwnProperty("last_name");
          expect(res.body.last_name).to.equal("lastname4");
          expect(res.body).to.haveOwnProperty("first_name");
          expect(res.body.first_name).to.equal("firstname4");
          done();
        });
    });
  });

  //PUT -- these tests fail because I need to work out how to log in and then run the test. However, this functionality works with Postman.
  describe("PUT users/me", () => {
    it("should update a user", async () => {
      const agent = chai.request.agent(app);
      await agent.post("/api/login").send(userOneCredentials);
      agent
        .put("/api/users/me")
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
          agent.close();
        });
    });

    it("should not update a user if user_id is included in the body", async () => {
      const agent = chai.request.agent(app);
      const response = await agent.post("/api/login").send(userOneCredentials);
      agent
        .put("/api/users/me")
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
          agent.close();
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
          done();
        });
    });
  });
});
