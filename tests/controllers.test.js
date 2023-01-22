const request = require("supertest");
const app = require("../source/app");

const { any, arrayContaining } = expect;

describe("Testing the getAllBooks route", () => {
    it("Should return a success answer with or without all books", async () => {
        const res = await request(app).get("/books");

        const book = expect.objectContaining({
            id: any(Number),
            title: any(String),
            author: any(String),
            pages: any(Number),
            published: any(Number)
        });

        expect(res.status).toBe(200);
        expect(res.body).toMatchObject({
            response: true,
            status: "Ok",
            books: res.body.books.length > 0 ?
                arrayContaining([book]) : arrayContaining([])
        });
    });
});
