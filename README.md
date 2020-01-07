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