FROM node:carbon
MAINTAINER Max Neuvians <max.neuvians@tbs-sct.gc.ca>
LABEL Description="Government of Canada VAC Proof of Concept" Vendor="Canadian Digital Service"

WORKDIR /app
ADD . .

RUN yarn install && yarn build
USER node

EXPOSE 3000
CMD yarn start
