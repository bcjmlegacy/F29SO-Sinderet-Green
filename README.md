# F29SO-Sinderet-Green

Group Project for F29SO 2019

## `hub-api`

This directory contains the API server which runs internally on Uplink HUBs.
The purpose of this service is to communicate with and log MQTT messages on our home network.

### Requirements:

NPM packages:

- `mqtt`
- `better-sqlite3`
- `express`
- `cors`
- `web-push`

### Testing:

To test login / generate a token with `curl`:

`curl --data "username=Test_user&password=password" http://localhost:5552/login`

To use the token, use the command:

`curl -H "Authorization: <TOKEN>" http://localhost:5552/<QUERY>`

To rebuild the database, use the command:

`node main.js [-r|--rebuild]`

To add demo data to the database, use the command (you only need to do this once!):

`node main.js [-d|--demo]`

You can rebuild and add demo data in the same command like so:

`node main.js [-r|--rebuild] [-d|--demo]`

## `mock-serv`

**This is not for production distribution.**

This service produces mock MQTT data, mimicking a range of devices expected on a home network.

### Requirements:

NPM packages:

- `mqtt`

## `uplink-project-vue`

This directory contains the frontend of the application

### Requirements:

NPM packages

- `vue.js`
- `bootstrap`
- `bootstrap-vue`
- `vue-cli`
- `vue-cookies`
- `vue-router`

To run the frontend using Vue-CLI, type:

`npm install` to install all the necessary packages
`npm run serve` to run the frontend server.
