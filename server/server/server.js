'use strict';
const express = require('express');
const path = require('path');
const logger = require('morgan');
const movies = require('./movies.json');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();
app.use(cookieParser());
app.use(session({secret: "Movies dashboard secret"}));
app.use(cors());
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/movies', (req, res) => {
    const start = req.query.start;
    const end = req.query.end;
    const searchTerm = req.query.search;
    if (searchTerm) {
        let moviesResults = movies.filter((movie) => movie.title.toLowerCase().includes(searchTerm.toLowerCase()));
        if (!moviesResults.length) {
            moviesResults = movies.filter((movie) => movie.synopsis.toLowerCase().includes(searchTerm.toLowerCase()));
            if (!moviesResults.length) {
                if (Number(searchTerm)) {
                    moviesResults = movies.filter((movie) => movie.released === searchTerm);
                }
            }
        }
        res.send(moviesResults);
    }
    else if (start && end) {
        if (end <= movies.length) {
            res.send(movies.slice(start, end));
        } else {
            res.send([]);
        }
    } else {
        res.send(movies);
    }
});

app.get('/movies/:id', (req, res) => res.send(movies.filter(movie => movie.id === req.params.id)));

app.listen(3000, function () {
    console.log(`app listening on port ${3000}!`);
});

module.exports = app;
