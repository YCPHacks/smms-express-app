const express = require('express');
const { auth } = require('express-openid-connect');
const { fetch } = require('undici');

const app = express();

app.use(express.json());

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

app.get('/', async (req, res) => {
  const result = await fetch(process.env.SCHEDULED_MESSAGES_URL);
  const data = await result.json();

  res.status(200).json(data);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
