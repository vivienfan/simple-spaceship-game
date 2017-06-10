process.env.PWD = process.cwd();
var express = require('express');
var app = express();
var path = require('path');
app.use(express.static(process.env.PWD+ + '/src'));
app.get('/', function(req, res) {
    res.sendFile(path.join(process.env.PWD+'/index.html'));
});

app.listen(process.env.PORT || 8080);
