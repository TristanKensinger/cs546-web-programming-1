const express = require('express');
const app = express();
const static = express.static(__dirname + '/public');
const session = require('express-session');
const path = require('path');

const configRoutes = require('./routes');
const exphbs = require('express-handlebars');

app.use('/public', static);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    name: 'AuthCookie',
    secret: 'some secret string!',
    resave: false,
    saveUninitialized: true
}))

app.use(async (req, res, next) => {
  let time = new Date().toUTCString();
  let method = req.method;
  let route = req.originalUrl;
  let authenticated = '';
  if(req.session.user){
    authenticated = '(Authenticated User)';
  } else {
    authenticated = '(Non-Authenticated User)';
  }
  console.log(`[${time}]: ${method} ${route} ${authenticated}`);
  next();
});

app.use('/', (req, res, next) => {
  if(req.session.user && req.path == '/'){
    return res.redirect('/private');
  } else {
    next();
  }
});

app.use('/private', (req, res, next) => {
  if(!req.session.user){
    return res.status(403).sendFile(path.resolve('static/error.html'));
  } else {
    next();
  }
});

app.use('/signup', (req, res, next) => {
  if(req.session.user) {
    return res.redirect('/private');
  } else {
    next();
  }
});

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});