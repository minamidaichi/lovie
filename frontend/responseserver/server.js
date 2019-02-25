const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');

let upload = JSON.parse(fs.readFileSync('upload.json'));
let index = JSON.parse(fs.readFileSync('index.json'));


app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


app.get('/', function (req, res) {
  res.json(index);
});

app.get('/upload', function(req, res) {
    res.json(upload);
})

app.post('/upload', function(req, res) {
    res.json(upload);
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
