require("dotenv").config();
const express = require('express');
const app = express();

//parse incoming requests
app.use(express.json());

// sample data
let books = [{
    id: 1,
    title: 'Book 1',
    author: 'Author 1'
},
{
    id: 2,
    title: 'Book 2',
    author: 'Author 2'
},
{
    id: 3,
    title: 'Book 3',
    author: 'Author 3'
}
];

// route to get all books
app.get('/books', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) res.status(404).send('Book not found');
    res.json(book);
});

// route to create a new book
app.post('/book', (req, res) => {
    const book = {
        id: books.length + 1,
        title: req.body.title,
        author: req.body.author
    };
    books.push(book);
    res.send(book);
});

// route to update a book
app.put('/book/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) res.status(404).send('Book not found');
    book.title = req.body.title;
    book.author = req.body.author;
    res.send(book);
});

// route to delete a book
app.delete('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) res.status(404).send('Book not found');
    const index = books.indexOf(book);
    books.splice(index, 1);
    res.send(book);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listen on port ${port}...`));