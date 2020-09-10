const supertest = require("supertest");
const server = require("../server");
const db = require("../data/config");

beforeEach(async () => {
  // run the seeds programatically before each test to start fresh
  await db.seed.run();
});

afterAll(async () => {
  // close the database connection so the test process doesn't hang or givee a warning
  await db.destroy();
});

describe("users integration tests", () => {
  it("GET /users", async () => {
    const res = await supertest(server).get("/users");
    console.log("TEST RES", res);
    expect(res.statusCode).toBe(200);
    expect(res.type).toBe("application/json");
    expect(res.body.length).toBeGreaterThanOrEqual(4);
    expect(res.body[0].username).toBe("sam");
  });

  it("POST /users", async () => {
    const res = await supertest(server).post("/users").send({
      username: "Milosz",
    });
    expect(res.statusCode).toBe(201);
    expect(res.type).toBe("application/json");
    expect(res.body.username).toBe("Milosz");
  });

  it("DELETE /users/5", async () => {
    const res = await supertest(server).delete("/users/5").send({
      id: 5,
    });
    expect(res.statusCode).toBe(201);
    expect(res.type).toBe("application/json");
    expect(res.body.msg).toBe("User Removed");
  });
});
