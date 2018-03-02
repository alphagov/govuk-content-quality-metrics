# govuk-content-quality-metrics
Prototype of API for content quality metrics based on retext

## Usage

Make a POST request with "Content-Type" : "application/json" to.

https://gov-quality-metrics.herokuapp.com/metrics

## Testing

Specs are written using mocha/chai/chaiHttp.

you can install mocha with

```
npm install --global mocha
```

Then you can use:

```
mocha ./**/*.spec.js -w
```

to watch the tests and run them on any changes.

## TODO

* work out how to deploy the thing
* check if this fits in with the govuk guidelines on node apps.
