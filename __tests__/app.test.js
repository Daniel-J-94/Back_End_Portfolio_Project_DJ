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

describe("Get all Reviews", () => {
  it("200 should respond with an array of review objects, each of which should have a the following properties: owner, title, review_id, category, review_img_url, created_at, votes, designer and comment_count, sorted by date in desc order", () => {
    return request(app)
      .get(`/api/reviews`)
      .expect(200)
      .then((resultResponse) => {
        const { reviews } = resultResponse.body;
        reviews.forEach((review) => {
          expect(review).toMatchObject({
            review_id: expect.any(Number),
            title: expect.any(String),
            designer: expect.any(String),
            owner: expect.any(String),
            review_img_url: expect.any(String),
            category: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            comment_count: expect.any(Number),
          });
        });
      });
  });
  it("200 should respond with an array of review objects, each of which should be ordered by date desc", () => {
    return request(app)
      .get(`/api/reviews`)
      .expect(200)
      .then((resultResponse) => {
        const { reviews } = resultResponse.body;
        expect(reviews[0].created_at >= reviews[1].created_at).toBe(true);
        expect(reviews[1].created_at >= reviews[2].created_at).toBe(true);
        expect(reviews[2].created_at >= reviews[3].created_at).toBe(true);
        expect(reviews[4].created_at >= reviews[5].created_at).toBe(true);
      });
  });
  it("404 should respond with an error message if path is spelled incorrectly", () => {
    return request(app)
      .get(`/api/reiews`)
      .expect(404)
      .then((resultResponse) => {
        const resultResponseBody = resultResponse.body;
        expect(resultResponseBody).toEqual({ message: "Doesn't exist" });
      });
  });
});
