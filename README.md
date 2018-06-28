# govuk-content-quality-metrics
Prototype of API for content quality metrics based on retext

## Usage

Make a POST request with "Content-Type" : "application/json" to.

https://govuk-content-quality-metrics.cloudapps.digital/metrics

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

## Deploying the app

This application is hosted using GOV.UK Platform as a Service (PAAS).

In order to deploy new versions of this app you will need a PAAS account, which you can
request by emailing gov-uk-paas-support@digital.cabinet-office.gov.uk, and to have installed
the [Cloud Foundry CLI](https://github.com/cloudfoundry/cli#downloads).

When you have made changes and wish to deploy them simply run `cf push govuk-content-quality-metrics`
from the top level of the directory which contains all the code and configuration files.

For more information please see the [PAAS docs](https://docs.cloud.service.gov.uk/#technical-documentation-for-gov-uk-paas)

## TODO

* check if this fits in with the govuk guidelines on node apps.
