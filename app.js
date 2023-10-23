const express = require('express');
const { auth } = require('express-openid-connect');

const app = express();

const port = process.env.PORT;

app.use(
  auth({
    authorizationParams: {
      response_type: 'code',
      audience: process.env.AUDIENCE,
      scope: 'openid profile email scheduled_messages:list scheduled_messages:create'
    }
  })
);

app.get('/', (req, res) => {
  res.status(200).send('OK');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
