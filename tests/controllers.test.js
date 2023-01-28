const request = require("supertest");
const app = require("../source/app");

const randomNum = () => Math.round(Math.random() * 1000);
const book = {
    title: `Book ${randomNum()}`,
    author: `Author ${randomNum()}`,
    pages: randomNum(),
    published: 1995
};

/* const { any, arrayContaining } = expect;
const book = expect.objectContaining({
    id: any(Number),
    title: any(String),
    author: any(String),
    pages: any(Number),
    published: any(Number)
});
length > 0 ? arrayContaining([book]) : arrayContaining([]) */

test("Should return all books", async () => {
    const res = await request(app).get("/books");

    expect(res.status).toBe(200);
});

describe("Testing 'createBook'", () => {
    it("Should add a book", async () => {
        const res = await request(app)
            .post("/books")
            .send(book);

        expect(res.status).toBe(201);
    });

    it("Should not add a book", async () => {
        const res = await request(app)
            .post("/books")
            .send({
                title: "book 1",
                author: "",
                pages: 300,
                published: 1995
            });

        expect(res.status).toBe(400);
    });
});

describe("Testing 'getBook'", () => {
    it("Should return a book", async () => {
        const res = await request(app).get("/books/1");

        expect(res.status).toBe(200);
    });

    it("Should not return a book", async () => {
        const res = await request(app).get("/books/one");

        expect(res.status).toBe(400);
    });
});
