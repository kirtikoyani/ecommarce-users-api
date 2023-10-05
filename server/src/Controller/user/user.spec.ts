import { User } from "../../Interface/user";
import request from "supertest";
import { app } from "../../app";

const user: User = {
  id: "1",
  name: "kirti",
  email: "kkk@gmail.com",
  phone: 9972356794,
  address: "abc",
  experience: "1 year",
};

describe("Test GET /user", () => {
  test("GetALL User ", async () => {
    const response = await request(app).get("/api/user").expect(200);
  });
  test("Get User by id ", async () => {
    const response = await request(app).get("/api/user/1").expect(200);
  });
});
describe("Test POST /user", () => {
  test("POST User", async () => {
    const response = await request(app)
      .post("/api/user")
      .send(user)
      .expect("Content-Type", /json/)
      .expect(201);
  });
});
describe("Test PUT /user", () => {
  test("PUT User", async () => {
    const response = await request(app)
      .put("/api/user/1")
      .send(user)
      .expect(200);
  });
  test("PUT User by worng id", async () => {
    const response = await request(app)
      .put("/api/user/2")
      .send(user)
      .expect(400);
  });
});
