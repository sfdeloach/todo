const express = require('express');
const session = require('express-session');
const cors = require('cors');

const { todos, roles, sessions, users } = require('./dummyData');
const { display } = require('./views/display');
const port = 3000;
const cookieLifeInHours = 1;
const corsOptions = {
  origin: 'http://localhost:5173'
};

const app = express();

app.use(express.static('public'));

app.use(
  session({
    cookie: { maxAge: cookieLifeInHours * 3600000 },
    resave: false,
    saveUninitialized: true,
    secret: 'foo bar baz'
  })
);

app.use(cors(corsOptions));

app.get('/session-info', (req, res) => {
  console.dir(req.sessionStore.sessions);

  const sessionInfo = {
    sessionID: req.sessionID,
    session: req.session
  };

  return res.json(sessionInfo);
});

app.get('/counter', (req, res) => {
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
