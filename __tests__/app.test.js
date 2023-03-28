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

describe("Get review by ID", () => {
  it("200 should respond with an object containing a review_id that matches the given parametric input as well as properties for: title, review_body, designer, review_img_url, votes, category, owner and created_at", () => {
    return request(app)
      .get(`/api/reviews/4`)
      .expect(200)
      .then((resultResponse) => {
        const resultResponseBody = resultResponse.body;
        expect(resultResponseBody).toEqual({
          review_id: 4,
          title: "Dolor reprehenderit",
          designer: "Gamey McGameface",
          owner: "mallionaire",
          review_img_url:
            "https://images.pexels.com/photos/278918/pexels-photo-278918.jpeg?w=700&h=700",
          review_body:
            "Consequat velit occaecat voluptate do. Dolor pariatur fugiat sint et proident ex do consequat est. Nisi minim laboris mollit cupidatat et adipisicing laborum do. Sint sit tempor officia pariatur duis ullamco labore ipsum nisi voluptate nulla eu veniam. Et do ad id dolore id cillum non non culpa. Cillum mollit dolor dolore excepteur aliquip. Cillum aliquip quis aute enim anim ex laborum officia. Aliqua magna elit reprehenderit Lorem elit non laboris irure qui aliquip ad proident. Qui enim mollit Lorem labore eiusmod",
          category: "social deduction",
          created_at: "2021-01-22T11:35:50.936Z",
          votes: 7,
        });
      });
  });
  it("200 should respond with an object that has the following keys : review_id, title, review_body, designer, review_img_url, votes, category, owner and created_at ", () => {
    return request(app)
      .get(`/api/reviews/4`)
      .expect(200)
      .then((resultResponse) => {
        const reviewObject = resultResponse.body;
        expect(reviewObject).toMatchObject({
          review_id: expect.any(Number),
          title: expect.any(String),
          review_body: expect.any(String),
          designer: expect.any(String),
          review_img_url: expect.any(String),
          votes: expect.any(Number),
          category: expect.any(String),
          owner: expect.any(String),
          created_at: expect.any(String),
        });
      });
  });
  it("404 should respond with an error message if passed review_id does not match a review in the data", () => {
    return request(app)
      .get(`/api/reviews/150`)
      .expect(404)
      .then((resultResponse) => {
        const resultResponseBody = resultResponse.body;
        expect(resultResponseBody).toEqual({
          msg: " no review found for review_id",
        });
      });
  });
  it("400 should respond with an error message if passed review_id is not an appropriate type", () => {
    return request(app)
      .get(`/api/reviews/two`)
      .expect(400)
      .then((resultResponse) => {
        const resultResponseBody = resultResponse.body;
        expect(resultResponseBody).toEqual({
          msg: "Invalid input",
        });
      });
  });
});
describe("Get all categories", () => {
  it("200 should respond with an array of category objects, each of which should have a slug property and a description property", () => {
    return request(app)
      .get(`/api/categories`)
      .expect(200)
      .then((resultResponse) => {
        const resultResponseBody = resultResponse.body;
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
        expect(resultResponseBody).toEqual({ message: "Doesn't exist" });
      });
  });
  it("200 should respond with an array of category objects that has a length of 4 and 2 keys that are strings", () => {
    return request(app)
      .get(`/api/categories`)
      .expect(200)
      .then((resultResponse) => {
        const categories = resultResponse.body;
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
