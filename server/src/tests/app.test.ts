import request from "supertest";
import app from "../app";

describe("App routes", () => {
  it("should return API running message", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toBe("API is running 🚀");
  });
});