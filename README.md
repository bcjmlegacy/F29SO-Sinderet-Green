# F29SO-Sinderet-Green

Group Project for F29SO 2019

## `hub-api`

This directory contains the API server which runs internally on Uplink HUBs.
The purpose of this service is to communicate with and log MQTT messages on our home network.

### Requirements:

NPM packages:

- `mqtt`
- `mysql`
- `express`

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

- `Vue.js`
- `Bootstrap`
- `Bootstrap-vue`
- `Vue-CLI`
- `Angular.js`

To run the frontend using Vue-CLI, type:

`npm install` to install all the necessary packages
`npm run serve` to run the frontend server.
