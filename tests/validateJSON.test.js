const express = require("express");
const request = require("supertest");
const validateJSON = require("../source/middlewares/validateJSON");

const app = express();

beforeAll(() => {
    app.get("/", validateJSON, (req, res) => res.send("Ok"));
    app.listen(3002);
});

test("Testing 'validateJSON'", async () => {
    const book = {
        title: "book 1",
        author: "author 1",
        published: 1995,
        pages: 300
    };

    const res = await request(app).get("/").send(book);

    console.log(res.body);

    //expect(() => { validateJSON({ body: book }) }).toThrow();
});
