var express = require('express');
var app = express();
const hbs = require('hbs');
const path = require('path');

const port = process.env.PORT || 3000;

// tell express where our static files are (js, images, css etc)
app.use(express.static(path.join(__dirname, '/public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});


app.listen(port, () => {
    console.log(`app is running on ${port}`);
})


