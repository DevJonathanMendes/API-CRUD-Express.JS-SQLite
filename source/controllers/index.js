const db = require("../models/index");

const controllers = {
    createBook: (req, res) => {
        new Promise((resolve, reject) => {
            const { title, author, pages, published } = req.body;
            const columns = "title, author, pages, published";
            const values = `'${title.toLowerCase()}', '${author.toLowerCase()}', ${pages}, ${published}`;
            const insert = `INSERT INTO books (${columns}) VALUES (${values});`;

            db.run(insert, err => err ? reject() : resolve());
        })
            .then(suc => res.status(200).send())
            .catch(err => res.status(400).send());
    }
};

module.exports = controllers;