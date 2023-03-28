const request = require("supertest");
const app = require("../app.js");

const seed = require("../db/seeds/seed.js");
const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");

beforeEach(() => {
  return seed(testData);
});
afterAll(() => {
  db.end();
});

describe("Get comments by review ID", () => {
  it("200 should respond with an array of comment objects that have the passed review_id and the following properties: comment_id, votes, created_at, author and body and should be sorted by date desc", () => {
    return request(app)
      .get(`/api/reviews/3/comments`)
      .expect(200)
      .then((resultResponse) => {
        const body = resultResponse.body;
        body.forEach((result) => {
          expect(result).toHaveProperty("comment_id", expect.any(Number));
          expect(result).toHaveProperty("votes", expect.any(Number));
          expect(result).toHaveProperty("author", expect.any(String));
          expect(result).toHaveProperty("body", expect.any(String));
          expect(result).toHaveProperty("created_at", expect.any(String));
          expect(result.review_id).toBe(3);
        });
      });
  });
  it("404 should respond with an error message if passed review_id is not an appropriate type", () => {
    return request(app)
      .get(`/api/reviews/five/comments`)
      .expect(404)
      .then((resultResponse) => {
        const resultResponseBody = resultResponse.body;
        expect(resultResponseBody).toEqual({
          message: "Doesn't exist",
        });
      });
  });
});
