const request = require("supertest");
const app = require("../src/server");

describe("API tests", () => {

    test("GET / should return application message", async () => {

        const response = await request(app)
            .get("/");

        expect(response.statusCode).toBe(200);

        expect(response.body.message)
            .toBe("Hello from CI/CD");

    });

    test("GET /health should return ok", async () => {

        const response = await request(app)
            .get("/health");

        expect(response.statusCode).toBe(200);

        expect(response.body.status)
            .toBe("ok");

    });

});