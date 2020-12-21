const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const cart = require('./cart.json');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

const newResponse = (isError, success, message, errorType) => ({
  isError,
  success,
  message,
  errorType,
});
const createLag = callback => (req, resp) =>
  setTimeout(
    () => callback(req, resp),
    Math.ceil(1000 * Math.random()) + Math.ceil((1000 * Math.random()) / 2)
  );

const handleApiProductCheck = createLag((req, resp) => {
  let body = [];
  req
    .on('data', chunk => {
      body.push(chunk);
    })
    .on('end', () => {
      try {
        body = JSON.parse(Buffer.concat(body).toString());
      } catch {
        return resp
          .status(406)
          .json(
            newResponse(true, false, 'Incorrect input data', 'INCORRECT_BODY')
          );
      }

      if (!typeof body === 'object' || !body.pid || !body.quantity) {
        return resp
          .status(406)
          .json(newResponse(true, false, 'Incorrect type', 'INCORRECT_TYPE'));
      }
      if (!body.pid || !body.quantity) {
        return resp
          .status(406)
          .json(
            newResponse(true, false, 'Missing property', 'MISSING_PROPERTY')
          );
      }
      const product = cart.find(product => product.pid === body.pid);

      if (!product) {
        return resp
          .status(404)
          .json(newResponse(true, false, 'Product not found', 'NOT_FOUND'));
      }

      if (body.quantity < product.min || body.quantity > product.max) {
        return resp
          .status(404)
          .json(
            newResponse(
              true,
              false,
              'Incorrect product quantity',
              'INCORRECT_QUANTITY'
            )
          );
      }
      resp.status(200).json(newResponse(false, true, 'Correct product', ''));
    });
});

app.get('/api/cart', (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  res.send(JSON.stringify(cart));
});
app.get('/api/product/check', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  console.log(handleApiProductCheck(req, res));
  res.send(handleApiProductCheck(req, res));
  //res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

app.listen(4000, () =>
  console.log('Express server is running on localhost:4000')
);
