const express = require('express');
const session = require('express-session');
const graphql_http = require('graphql-http/lib/use/express');
const cors = require('cors');

const { schema } = require('./schema');
const { todos, roles, sessions, users } = require('./dummyData');
const { display } = require('./views/display');

const corsOptions = { origin: ['http://localhost:5173', 'http://127.0.0.1:5173'] };
const port = 3000;
const sessionLife = 12 * 3600000; // twelve hours
const app = express();

app.use(
  session({
    cookie: { maxAge: sessionLife },
    resave: false,
    saveUninitialized: true,
    secret: 'foo bar baz'
  })
);

switch (process.env.MODE) {
  case 'development':
    app.use(cors(corsOptions));
    break;
  case 'production':
    app.use(express.static('../client/dist'));
    break;
  default:
    throw Error('must specify environment variable MODE');
}

app.use('/api', graphql_http.createHandler({ schema }));

app.get('/get-session', (req, res) => {
  console.dir(req);
  return res.json({ sessionID: req.sessionID });
});

// TODO: convert to graphQL
app.get('/session', (req, res) => {
  console.log('req.sessionID = ' + req.sessionID);
  const findSession = session => session._id === req.sessionID; // remove after db conversion
  let sessionIndex = sessions.findIndex(findSession); // remove after db conversion
  let session = sessions.find(findSession); // convert to db call

  if (session) {
    if (Date.now() < Date.parse(session.expires)) {
      console.log(`found non-expired session ${req.sessionID}`);
      session.loggedIn = true;

      // update expiration
      const updatedExpiration = new Date(Date.now() + sessionLife);
      sessions[sessionIndex].expires = updatedExpiration.toISOString(); // convert to db call
    } else {
      console.log(`found expired session ${req.sessionID}`);
      session.loggedIn = false;

      // remove the expired record from db
      -1 !== sessionIndex && sessions.splice(sessionIndex, 1); // convert to db call
    }
  } else {
    console.log(`did not find session ${req.sessionID}`);
    session = { loggedIn: false };
  }

  return res.json(session);
});

app.listen(port, () => {
  console.log(`server started in ${process.env.MODE} mode, listening on port ${port}`);
});
