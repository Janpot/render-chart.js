# render-chart.js

Rendering service for static [chart.js](http://nnnick.github.io/Chart.js/docs-v2/) charts

## How to use:

Start the service

```sh
$ docker run -p 3000:3000 janpot/chartjs
```

Post chart configuration to get the rendered chart as a png

```sh
curl -X POST \
  -d '{"type":"bar","data":{"labels":["1","2","3"],"datasets":[{"label":"label","data":[1,20,11]}]}}' \
  http://localhost:3000?width=500&height=250 > ./output.png
```
