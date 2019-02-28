const express = require('express'),
      http = require('http'),
      path = require('path'),
      bodyParser = require('body-parser');

const app = express(),
      server = http.Server(app),
      publicPath = path.join(__dirname, `./../public`),
      port = process.env.PORT || 3000;

const webpack = require('webpack'),
      config = require('./../webpack.config.js'),
      compiler = webpack(config),
      webpackDevMiddleware = require('webpack-dev-middleware');

server.listen(port, (err) => {
  if (err) {
    throw err;
  }
  console.log(`listening on port %d`, port); // eslint-disable-line no-console
});

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));

app.use(express.static(publicPath));

app.get(`/`, (req, res) => {
  res.sendFile(path.join(publicPath, `index.html`));
});

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.post('/submit', (req, res) => {
  res.end();
});
