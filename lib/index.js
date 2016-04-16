var express = require('express');
var bodyParser = require('body-parser');
var renderer = require('./renderer');

function createApp () {
  var app = express();
  app.use(bodyParser.json({ type: '*/*' }));

  app.post('/', (req, res, next) => {
    res.set('content-type', 'image/png');
    renderer.render(req.body, req.query)
      .on('error', next)
      .pipe(res);
  });

  return app;
}

module.exports = createApp;
