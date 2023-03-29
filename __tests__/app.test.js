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

describe("Post comment", () => {
  it("201 should post a new comment on the review with the given review_id param, should respond with the added comment", () => {
    const newComment = {
      username: "mallionaire",
      body: "I used to love playing this game, but then I took an arrow to the knee",
    };

    return request(app)
      .post("/api/reviews/2/comments")
      .send(newComment)
      .expect(201)
      .then((resultResponse) => {
        const resultResponseBody = resultResponse.body.new_comment[0];
        const resultForLengthCheck = resultResponse.body.new_comment;
        expect(resultForLengthCheck.length).toBe(1);
        expect(resultResponseBody).toEqual({
          comment_id: 7,
          body: "I used to love playing this game, but then I took an arrow to the knee",
          votes: 0,
          author: "mallionaire",
          review_id: 2,
          created_at: expect.any(String),
        });
      });
  });
  //
  it("404 should respond with an error message if given a review_id that does not exist", () => {
    const newComment = {
      username: "mallionaire",
      body: "more like I'm bored games",
    };

    return request(app)
      .post("/api/reviews/1000/comments")
      .send(newComment)
      .expect(404)
      .then((resultResponse) => {
        console.log("res", resultResponse);
        expect(resultResponse.body).toStrictEqual({
          msg: "Invalid username or review ID",
        });
      });
  });
  it("404 should respond with an error message if given a username that does not exist", () => {
    const newComment = {
      username: "John_Doe_88",
      body: "A spooky experience for the whole family",
    };

    return request(app)
      .post("/api/reviews/3/comments")
      .send(newComment)
      .expect(404)
      .then((resultResponse) => {
        console.log("res", resultResponse);
        expect(resultResponse.body).toStrictEqual({
          msg: "Invalid username or review ID",
        });
      });
  });
  it("404 should respond with an error message if user posts an empty comment", () => {
    const newComment = {
      username: "mallionaire",
      body: undefined,
    };

    return request(app)
      .post("/api/reviews/3/comments")
      .send(newComment)
      .expect(400)
      .then((resultResponse) => {
        console.log("res", resultResponse);
        expect(resultResponse.body).toStrictEqual({
          msg: "Please enter a valid comment",
        });
      });
  });
});
