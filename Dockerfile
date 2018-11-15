FROM node:10-alpine
MAINTAINER Max Neuvians <max.neuvians@tbs-sct.gc.ca>
LABEL Description="Government of Canada VAC Proof of Concept" Vendor="Canadian Digital Service"

WORKDIR /app
ADD . .

ARG SENTRY_DSN
ENV SENTRY_DSN ${SENTRY_DSN}

ARG GA_UA
ENV GA_UA ${GA_UA}

ARG AIRTABLE_READ_KEY
ENV AIRTABLE_READ_KEY ${AIRTABLE_READ_KEY}

ARG GOOGLE_MAPS_KEY
ENV GOOGLE_MAPS_KEY ${GOOGLE_MAPS_KEY}

RUN yarn install && yarn build
USER node

EXPOSE 3000
CMD yarn start
