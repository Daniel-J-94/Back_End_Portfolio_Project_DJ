const request = require("supertest");
const app = require("../app.js");
// const runSeed = require("../db/seeds/run-seed.js");
const seed = require("../db/seeds/seed.js");
const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");

beforeEach(() => {
  return seed(testData);
});
afterAll(() => {
  db.end();
});

describe("Get all categories", () => {
  it("200 should respond with an array of category objects, each of which should have a slug property and a description property", () => {
    return request(app)
      .get(`/api/categories`)
      .expect(200)
      .then((resultResponse) => {
        const resultResponseBody = resultResponse.body;
        console.log(
          "I'm in the first test! Here is the resultResponseBody",
          resultResponseBody
        );
        expect(resultResponseBody).toEqual([
          {
            slug: "euro game",
            description: "Abstact games that involve little luck",
          },
          {
            slug: "social deduction",
            description: "Players attempt to uncover each other's hidden role",
          },
          { slug: "dexterity", description: "Games involving physical skill" },
          {
            slug: "children's games",
            description: "Games suitable for children",
          },
        ]);
      });
  });
  it("404 should respond with an error message if path is spelled incorrectly", () => {
    return request(app)
      .get(`/api/ctegories`)
      .expect(404)
      .then((resultResponse) => {
        const resultResponseBody = resultResponse.body;
        console.log(
          "I'm in the second test! Here is the resultResponseBody",
          resultResponseBody
        );
        expect(resultResponseBody).toEqual({ message: "Doesn't exist" });
      });
  });
  it("200 should respond with an array of category objects that has a length of 4 and 2 keys that are strings", () => {
    return request(app)
      .get(`/api/categories`)
      .expect(200)
      .then((resultResponse) => {
        const categories = resultResponse.body;
        console.log(
          "I'm in the third test! Here is the categories",
          categories
        );
        expect(categories).toHaveLength(4);
        categories.forEach((category) => {
          expect(category).toMatchObject({
            slug: expect.any(String),
            description: expect.any(String),
          });
        });
      });
  });
});
