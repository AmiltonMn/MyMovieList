const express = require('express');
const routes = require('./routes');
const port = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static('public'));

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use(routes);

app.listen(port, () => console.log('Acesse: http://localhost:'+ port + '/'));