let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index.js");
const { expect } = require("chai");
let should = chai.should();

chai.use(chaiHttp);

describe("Tags", () => {
  let testTagId;

  describe("/POST tag", () => {
    it("it should POST a tag and return an _id", (done) => {
      let testTag = {
        tagName: "test_name",
        color: "test_color",
        description: "test_description",
        tagGroup: "test_group",
      };
      chai
        .request(server)
        .post("/diary/tags")
        .send(testTag)
        .end((err, res) => {
          if (err) return done(err);
          res.should.have.status(201);
          res.body.should.have.property("_id");
          testTagId = res.body._id;
          done();
        });
    });
  });
  describe("/GET tag", () => {
    it("it should GET all the tags", (done) => {
      chai
        .request(server)
        .get("/diary/tags")
        .end((err, res) => {
          if (err) return done(err);
          res.should.have.status(200);
          res.body.should.be.a("array");
          done();
        });
    });
  });
  describe("/PUT tag", () => {
    it("it should update a tag", (done) => {
      chai
        .request(server)
        .put("/diary/tags")
        .query({ _id: testTagId })
        .send({ tagName: "changed-test-tag-name" })
        .end((err, res) => {
          if (err) return done(err);
          res.should.have.status(204);
          done();
        });
    });
  });
  describe("/DELETE tag", () => {
    it("it should DELETE a tag", (done) => {
      chai
        .request(server)
        .delete("/diary/tags")
        .query({ _id: testTagId })
        .end((err, res) => {
          if (err) return done(err);
          res.should.have.status(204);
          done();
        });
    });
  });
});
