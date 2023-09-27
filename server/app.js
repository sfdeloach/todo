const express = require('express');
const session = require('express-session');

const app = express();

const port = 3000;
const cookieLifespan = 2; // cookies will persist for two hours

const { todos, roles, sessions, users } = require('./dummyData');
const { display } = require('./views/display');

app.use(
  session({
    cookie: { maxAge: cookieLifespan * 3600000 },
    resave: false,
    saveUninitialized: true,
    secret: 'foo bar baz'
  })
);

app.get('/session', (req, res) => res.json(req.session));

app.get('/', (req, res) => {
  if (req.session.counter !== undefined) {
    ++req.session.counter;
  } else {
    req.session.counter = 0;
  }
  return res.send(display(req.session.counter));
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
