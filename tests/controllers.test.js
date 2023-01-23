const request = require("supertest");
const app = require("../source/app");

const { any, arrayContaining } = expect;

describe("Testing the getAllBooks method that gets (if any) all books", () => {
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

describe("Testing the createBook method that creates a book", () => {
    it("It should be possible to create a book", async () => {
        const randomNum = () => Math.round(Math.random() * 1000)
        const book = {
            title: `Book ${randomNum()}`,
            author: `Author ${randomNum()}`,
            pages: randomNum(),
            published: 1995
        };
        const res = await request(app).post("/books").send(book);

        expect(res.status).toBe(201);
        expect(res.body).toMatchObject({
            response: true,
            status: "Created",
            book: book
        });
    });
});
