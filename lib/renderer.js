var jsdom = require('jsdom');
var fs = require('fs');
var extend = require('extend');
var chartJsScriptLocation = require.resolve('chart.js/dist/Chart.bundle.js');
var implUtils = require('jsdom/lib/jsdom/living/generated/utils');
var PassThrough = require('stream').PassThrough;

var chartJsScript = new Promise((resolve, reject) => {
  fs.readFile(chartJsScriptLocation, 'utf-8', (err, content) => {
    if (err) return reject(err);
    resolve(content);
  });
});

function render (chartConfig, options) {
  options = extend({
    width: 600,
    height: 300
  }, options);

  var result = new PassThrough();

  chartJsScript.then(chartJs => {
    return new Promise((resolve, reject) => {
      jsdom.env({
        virtualConsole: jsdom.createVirtualConsole().sendTo(console),
        html: '<html><body><canvas id="graph"></canvas></body></html>',
        src: [ chartJs ],
        done: function (err, window) {
          if (err) return reject(err);
          var Chart = window.Chart;
          Chart.defaults.global.responsive = false;
          Chart.defaults.global.animation = false;
          var canvas = window.document.getElementById('graph');
          canvas.width = options.width;
          canvas.height = options.height;
          var ctx = canvas.getContext('2d');
          try {
            new Chart(ctx, chartConfig);
          } catch (err) {
            return reject(err);
          }
          var nodeCanvas = implUtils.implForWrapper(canvas)._canvas;
          nodeCanvas.createPNGStream().pipe(result);
        }
      });
    });
  })
    .catch(error => result.emit('error', error));

  return result;
}

module.exports = {
  render
};
