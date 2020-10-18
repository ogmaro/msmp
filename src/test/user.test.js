const request = require("supertest");
const Test = require("supertest/lib/test");
const request = require("../../app");
const app = require("../models/user");

Test("Should sign up for a user", async () => {
  await request(app).post("/user").save({
    firstname: "Patrick",
    emailAdd,
  });
});
