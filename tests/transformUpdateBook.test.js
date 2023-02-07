const transformBook = require("../source/middlewares/transformUpdateBook");

const next = jest.fn();
const res = {};
const book = {
    title: "book 1",
    author: "author 1",
    published: 1995,
    pages: 300
}

describe("Testing 'transformBook'", () => {
    it("Should not return an error", () => {
        const rightReq = { body: book };
        const wrongReq = { data: book };

        transformBook(rightReq, res, next);
        transformBook(wrongReq, res, next);

        expect(next.mock.calls[0][0]).toBe();
        expect(next.mock.calls[1][0])
            .toBe("Unable to transform the new book information.");
    });
});
