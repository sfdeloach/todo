const express = require('express');
const session = require('express-session');
const MemoryStore = require('memorystore')(session);
const bcrypt = require('bcrypt');
const cors = require('cors');
const graphql_http = require('graphql-http/lib/use/express');

const { schema } = require('./schemas/schema');
const { users } = require('./schemas/dummyData');

const app = express();
const corsOptions = {
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173']
};
const port = process.env.PORT || 3000;
const mode = process.env.MODE || 'dev';
const sessionLife = 12 * 3600000; // twelve hours

// enable reading of req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    cookie: { maxAge: sessionLife },
    store: new MemoryStore({ checkPeriod: 2 * sessionLife }),
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET || 'foo bar baz'
  })
);

switch (mode) {
  case 'dev':
    app.use(cors(corsOptions));
    app.use((req, res, next) => {
      console.log(`(${res.statusCode}) id:${req.sessionID}`);
      next();
    });
    break;
  case 'prod':
    app.use(express.static('../client/dist'));
    app.use((req, res, next) => {
      const timestamp = new Date();
      console.log(`[${timestamp.toLocaleString()}] ${req.ip}`);
      next();
    });
    break;
  default:
    throw Error("$MODE must be 'dev' or 'prod'");
}

app.get('/session', (req, res) => {
  res.json(req.session);
});

app.post('/login', (req, res) => {
  let userInfo;
  // TODO - db call
  const user = users.find(user => user.username === req.body.username);

  if (
    typeof user === 'undefined' ||
    bcrypt.compareSync(req.body.password, user.hash) === false
  ) {
    userInfo = { loggedIn: false };
  } else {
    userInfo = { ...user, loggedIn: true };
    delete userInfo.hash;
  }

  req.session.user = userInfo;
  res.json(userInfo);
});

app.get('/logout', (req, res) => {
  if (req.session.user && req.session.user.loggedIn) {
    req.session.user.loggedIn = false;
  }

  res.json(req.session.user);
});

app.all(
  '/graphql',
  (req, res, next) => {
    if (req.session.user && req.session.user.loggedIn) {
      next();
    } else {
      res.json({ error: 'session has no user data' });
    }
  },
  graphql_http.createHandler({ schema })
);

app.listen(port, () => {
  console.log(`server started in ${mode} mode, listening on port ${port}`);
});
