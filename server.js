const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

app.use((req, res, next) => {

    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);    
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append server.log')
        }
    });
    next();

});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Hello! Welcome to my site!'
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

app.get('/products', (req, res) => {
    res.render('products.hbs', {
        pageTitle: 'Products Page',
        welcomeMessage: 'Hello! Welcome to the products page!'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to fetch',
    });
});

// /bad - send back json with errorMessage

app.listen(port, () => {
    console.log(`Server is running on port ${port}!`);
});