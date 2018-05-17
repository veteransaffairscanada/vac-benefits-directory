# VAC-POC

CircleCI Status: [![CircleCI](https://circleci.com/gh/cds-snc/vac-poc.svg?style=svg)](https://circleci.com/gh/cds-snc/vac-poc)

This is a proof of concept for the VAC project, currently hosted at
https://cdsvacpoc.azurewebsites.net/

## Quickstart

* `yarn install`
* `yarn dev`

## Configuration

The application uses Sentry.io for error logging. If you would also like to use sentry, make sure your public client key is the `SENTRY_DSN` enviroment variable.

Google Analytics is used for behaviour tracking, ex: How many people switch between languages. If you would like to include your own GA key set the `GA_UA` environment variable.

## Reference

This application uses the following resources:

* NextJS [https://learnnextjs.com/](https://learnnextjs.com/)
* Jest [https://facebook.github.io/jest/](https://facebook.github.io/jest/)
* React i18next [https://react.i18next.com/](https://react.i18next.com/)
* Prettier [https://prettier.io/](https://prettier.io/)
* Flow [https://flow.org/](https://flow.org/)
