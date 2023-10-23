const express = require('express');
const session = require('express-session');
const graphql_http = require('graphql-http/lib/use/express');
const cors = require('cors');
const { schema } = require('./schema');

const app = express();
const corsOptions = { origin: ['http://localhost:5173', 'http://127.0.0.1:5173'] };
const port = process.env.PORT || 3000;
const mode = process.env.MODE || 'dev';
const sessionLife = 4 * 3600000; // four hours

app.use(
  session({
    cookie: { maxAge: sessionLife },
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET || 'foo bar baz'
  })
);

switch (mode) {
  case 'dev':
    // intended to be used with the client in dev mode
    app.use(cors(corsOptions));
    break;
  case 'prod':
    app.use(express.static('../client/dist'));
    break;
  default:
    throw Error("process.env.MODE must be either 'dev' or 'prod'");
}

app.use('/api', graphql_http.createHandler({ schema }));

app.get('/get-session', (req, res) => {
  return res.json({ sessionID: req.sessionID });
});

app.listen(port, () => {
  console.log(`server started in ${mode} mode, listening on port ${port}`);
});
