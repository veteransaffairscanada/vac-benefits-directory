# VAC Benefits Directory

CircleCI Status: [![CircleCI](https://circleci.com/gh/cds-snc/vac-benefits-directory.svg?style=svg)](https://circleci.com/gh/cds-snc/vac-benefits-directory)

This is a proof of concept for the VAC project, currently hosted at
https://cdsvacpoc.azurewebsites.net/

## Quickstart

* `yarn install`
* `yarn dev`

## How to get VAC Benefits Directory to work on VAC machines(May 31, 2018)

* download Node.JS of version 9 or newer(as .zip since .msi is blocked)

* following steps required tp set up the newly installed Node cmd line commands such as npm globally

  > Start menu > Control Panel > User accounts > user accounts > change my environment variables >
  > select path > Edit > Now enter the location of where you have Node installed with a ; to seperate
  > between any other entries here.
  > EX: C:\dev ; C:\Node

* `npm install -g yarn`
* `yarn install` (While in project main directory, takes a while, especially on building packages)

* `yarn dev` (run while CD'd in project folder used to start the local server)

* If you run into syntax errors chances are there are missing packages/dependencies and you may want to try
  running a clean yarn install. Delete Node_modules folder and then re run `yarn install` in the main folder.

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
