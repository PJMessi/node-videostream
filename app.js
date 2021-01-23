require('dotenv').config();
const express = require('express');
const handlebars = require('express-handlebars');
const router = require('./routes');

const app = express();

// handlebars configurations.
app.engine('handlebars', handlebars({
  layoutsDir: `${__dirname}/views/layouts`,
  defaultLayout: 'index',
  partialsDir: `${__dirname}/views/partials`,
}));

// configuring server to use static file.
app.use(express.static('public'));

// setting up server to use the handlebars engine
app.set('view engine', 'handlebars');

// initializing routes.
app.use(router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started at port ${PORT}`);
});
