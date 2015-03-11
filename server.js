var express = require('express'),
    bodyParser = require('body-parser'),
    exhbrs = require('express-handlebars');

var gcloud = require('gcloud');

// Initialize the store
var dataset = gcloud.datastore.dataset({
  projectId: 'chuckj-node-scratch',
  credentials: require('./keyfile.json')
});

// Add a book
function addBook(book, cb) {
  dataset.save({ key: dataset.key('Book'), data: book }, cb);
}

// Find all books
function findAllBooks(cb) {
  dataset.runQuery(dataset.createQuery(['Book']), function (err, books) {
    if (err) cb(err)
    cb(null, books.map(function(item) { return item.data; }));
  });
}

var app = express();

app.use(bodyParser.urlencoded({extended: true}))

app.use("/css", express.static("static/css"));

app.engine('handlebars', exhbrs({ defaultLayout: 'main'}));

app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
  findAllBooks(function (err, books) {
    if (err) return res.sendStatus(500);
    res.render('main', { books: books });
  })
})

app.post('/add', function (req, res) {
  addBook({ author: req.body.author, title: req.body.title }, function (err) {
    if (err) return res.sendStatus(500);
    res.redirect('/')
  })
})

app.listen(8080);
