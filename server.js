const express = require('express');
const mongoose = require('mongoose');
const ShortUrl = require('./models/shortUrl');
const app = express();

app.use(express.urlencoded({ extended: false }));

mongoose.connect('mongodb://localhost/urlShortener', {
    useNewUrlParser: true, useUnifiedTopology: true
})
app.set('view engine', 'ejs');

//routs
app.get('/', (req, res) => {
    res.render('index');
});

//post requist end point handling
app.post('/shortUrls', async (req, res) => {
    await ShortUrl.create({ full: req.body.fullUrl,  })
    res.redirect('/')
});


const port = process.env.PORT || 5000;

app.listen(port, () => {console.log(`Server started on port ${port}`)});