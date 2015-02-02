var express = require('express');
var bodyParser = require('body-parser');
var gcloud = require('gcloud');
var app = express();

// Initialize the store
var dataset = gcloud.datastore.dataset({ 
  projectId: process.env.PROJECT_ID
});

// Add a book
function addBook(book, cb) {
  dataset.save({ key: dataset.key('Book'), data: book }, cb);
}

// Find all books
function findAllBooks(cb) {
  dataset.runQuery(dataset.createQuery(['Book']), cb);
}

// Find an author's books
function findAuthorBooks(author, cb) {
  dataset.runQuery(dataset.createQuery(['Book']).filter("author = ", author), cb);
}

// Add middle-ware
app.use(bodyParser.json());

// Add routes
app.get("/", function(req, res) {
  res.send('Hello World!\n');
});

// GET /books returns all books
app.get("/books", function (req, res) {
  findAllBooks(function (err, books) {
    if (err) return res.sendStatus(500);
    res.json(books.map(function (entity) {
      return entity.data;
    }));
  });
});

// GET /books/Leo%20Tolstoy returns all books where author="Leo Tolstoy"
app.get("/books/:author", function (req, res) {
  findAuthor(req.params.author, function (err, books) {
    if (err) return res.sendStatus(500);
    res.json(books.map(function (entity) {
      return entity.data;
    }));
  });
});

// Create a book with a given name and author
app.put("/books", function (req, res) {
  if (!req.body || !req.body.name || !req.body.author) return res.sendStatus(400);
  addBook({ author: req.body.author, name: req.body.name }, function (err) {
    if (err) return res.sendStatus(500);
    res.sendStatus(200);
  });
});

// Start server
var server = app.listen(8080, function () {
  console.log('Server running at http://localhost:%s', server.address().port);
});
