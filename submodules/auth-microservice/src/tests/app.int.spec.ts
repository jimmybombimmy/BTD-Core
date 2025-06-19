import { app } from "../app"
import request from "supertest"

process.env.NODE_ENV = "test"

describe("GET /ping", () => {
  test("Should return 'pinged'", async () => {

    const response = {
      message: "pinged"
    }

    await request(app)
      .get("/ping")
      .expect(200)
      .then(({body}) => {
        expect(body).toEqual(response)
      })
  })
})