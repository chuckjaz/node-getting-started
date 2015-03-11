var express = require('express'),
    bodyParser = require('body-parser'),
    exhbrs = require('express-handlebars');

var books = [
    { title: "War and Peace", author: "Leo Tolstoy" },
    { title: "The Count of Monte Cristo", author: "Alexandre Dumas" }
  ];

var app = express();

app.use(bodyParser.urlencoded({extended: true}))

app.use("/css", express.static("static/css"));

app.engine('handlebars', exhbrs(
  { defaultLayout: 'main',
    helpers: {
      rpt: function (a, options) {
        return a.map(function(item) {
          return options.fn(item);
        }).join("");
      }
    }
  }));

app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
  res.render('main', { books: books });
})

app.post('/add', function (req, res) {
  books.push({ author: req.body.author, title: req.body.title })
  res.redirect('/')
})


app.listen(8080);
