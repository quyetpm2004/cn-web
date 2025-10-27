const Blog = require("../models/Blog");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
chai.should();

chai.use(chaiHttp);

describe("Blogs", function () {
  // Xóa dữ liệu trước mỗi test
  beforeEach(async function () {
    await Blog.deleteMany({});
  });

  // 🧪 Test GET all blogs
  describe("/GET blog", function () {
    it("it should GET all the blogs", async function () {
      const res = await chai.request(app).get("/api/blogs");
      res.should.have.status(200);
      res.body.data.should.be.a("array");
      res.body.data.length.should.be.eql(0);
    });
  });

  // 🧪 Test POST blog
  describe("/POST blog", function () {
    it("it should POST a new blog", async function () {
      const blog = {
        title: "This is the first blog",
        body: "This is a blog post",
        image:
          "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      };

      const res = await chai.request(app).post("/api/blogs").send(blog);

      res.should.have.status(200);
      res.body.should.have.property("status").eql("success");
      res.body.data.should.be.a("object");
      res.body.data.should.have.property("title").eql(blog.title);
    });
  });

  // 🧪 Test GET blog by ID
  describe("/GET/:id blog", function () {
    it("it should GET a blog by the id", async function () {
      const blog = await Blog.create({
        title: "This is the first blog",
        body: "This is a blog post",
        image:
          "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      });

      const res = await chai.request(app).get("/api/blogs/" + blog.id);

      res.should.have.status(200);
      res.body.should.have.property("status").eql("success");
      res.body.data.should.be.a("object");
      res.body.data.should.have.property("_id").eql(blog.id);
    });
  });

  // 🧪 Test PUT blog by ID
  describe("/PUT/:id blog", function () {
    it("it should UPDATE a blog given the id", async function () {
      const blog = await Blog.create({
        title: "This is the first blog",
        body: "This is a blog post",
        image:
          "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      });

      const updatedData = {
        title: "The first blog was updated",
        body: "Updated body content",
        image:
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=60",
      };

      const res = await chai
        .request(app)
        .put("/api/blogs/" + blog.id)
        .send(updatedData);

      res.should.have.status(200);
      res.body.should.have.property("status").eql("success");
      res.body.data.should.be.a("object");
      res.body.data.should.have.property("title").eql(updatedData.title);
    });
  });

  // 🧪 Test DELETE blog by ID
  describe("/DELETE/:id blog", function () {
    it("it should DELETE a blog given the id", async function () {
      const blog = await Blog.create({
        title: "This is the first blog",
        body: "This is a blog post",
        image:
          "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      });

      const res = await chai.request(app).delete("/api/blogs/" + blog.id);

      res.should.have.status(200);
      res.body.should.have.property("status").eql("success");
      res.body.data.should.be.a("object");
      res.body.data.should.have.property("_id").eql(blog.id);
    });
  });
});
