const validateJSON = require("../source/middlewares/validateJSON");

test("Testing 'validateJSON'", async () => {
    const next = () => { };
    const res = {};
    const req = {
        body: book = {
            title: "",
            author: "",
            published: 0,
            pages: 0
        }
    };

    expect(() => validateJSON(req, res, next))
        .toThrow();
});
