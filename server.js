var express = require('express');
var app = express();

// Book data
var books = [
    { name: "War and Peace", author: "Leo Tolstoy" },
    { name: "The Count of Monte Cristo", author: "Alexandre Dumas" }
  ];

// Add routes
app.get("/", function(req, res) {
  res.send('Hello World!\n');
});

// GET /books returns all books
app.get("/books", function (req, res) {
  res.json(books);
});

// GET /books/Leo%20Tolstoy returns all books where author="Leo Tolstoy"
app.get("/books/:author", function (req, res) {
  res.json(books.filter(function (book) {
    return book.author == req.params.author
  }));
});

// Start server
var server = app.listen(8080, function () {
  console.log('Server running at http://localhost:%s', server.address().port);
});
