/* global describe, it, beforeEach, afterEach */

'use strict';

var createApp = require('..');
var request = require('request');
var PNG = require('pngjs').PNG;
var assert = require('assert');

describe('renderer', () => {
  var server;

  beforeEach(done => {
    server = createApp().listen(0, error => {
      if (error) return done(error);
      done();
    });
  });

  afterEach(done => {
    if (server) {
      server.close(done);
    }
  });

  function getUrl () {
    return `http://localhost:${server.address().port}`;
  }

  it('should render charts', done => {
    return request.post({
      url: getUrl(),
      body: {
        type: 'bar',
        data: {
          labels: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July' ],
          datasets: [ { label: 'hello', data: [ 28, 48, 40, 19, 86, 27, 90 ] } ]
        }
      },
      json: true,
      encoding: null
    }, (error, response) => {
      if (error) return done(error);

      var png = new PNG();
      png.parse(response.body, (error, data) => {
        if (error) return done(error);

        assert.strictEqual(png.width, 600);
        assert.strictEqual(png.height, 300);
        done();
      });
    });
  });

  it('should accept width and height', done => {
    return request.post({
      url: getUrl(),
      qs: {
        width: 200,
        height: 100
      },
      body: {
        type: 'bar',
        data: {
          labels: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July' ],
          datasets: [ { label: 'hello', data: [ 28, 48, 40, 19, 86, 27, 90 ] } ]
        }
      },
      json: true,
      encoding: null
    }, (error, response) => {
      if (error) return done(error);

      var png = new PNG();
      png.parse(response.body, (error, data) => {
        if (error) return done(error);

        assert.strictEqual(png.width, 200);
        assert.strictEqual(png.height, 100);
        done();
      });
    });
  });
});
