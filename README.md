# 0x2048-frontend

The 0x2048 project is a decentralized game of 2048 played over a state channel between a server and users. 0x2048-frontend is the frontend code base for the the 0x2048 project. 

The meat of the module is found in `src/package`. This directory contains scripts that communicate with the deployed smart contract on the Ethereum network, and with the backend endpoints over a state-channel.

## Setup

```bash
$ npm install
```

## Run

```bash
$ npm run dev
```

And navigate the `http://localhost:8080/`

## Test

Clone the repository

```bash
$ npm run test
```
