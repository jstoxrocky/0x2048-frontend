# 0x2048-frontend

The 0x2048 project is a decentralized game of 2048 played over a state channel between a server and users. 0x2048-frontend is the frontend code base for the the 0x2048 project. 

The meat of the module is found in `src/package`. This directory contains scripts that communicate with the deployed smart contract on the Ethereum network, and with the backend endpoints over a state-channel.


## 0x2048-Project

[Contracts](https://github.com/jstoxrocky/0x2048-contracts)

[Frontend](https://github.com/jstoxrocky/0x2048-frontend)

[Webserver](https://github.com/jstoxrocky/0x2048-webserver)

[Game](https://github.com/jstoxrocky/0x2048-game)


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

```bash
$ npm run test
```












# 0x2048

https://jstoxrocky.github.io/0x2048-frontend/

0x2048 is centralized, but trustless, pay-per-play game of 2048 in which valu...the highest scorer is awarded proceeds from all others playing.

### Trustless but Centralized

0x2048 works much like a state-channel does. Instead of two users exchanging signed messages, the backend server hosting the game logic signs player scores after each move and sends them to the player. These scores can be verified at any point during gameplay - even before the first move has taken place! State-channels are necessarily centralized since they rely on the signature of a specific user, but they are trustless in the sense that you do not need to trust the other person, only the state-channel contract itself. 0x2048 works in a similar way, as long as you hold a signature for a score above the current highscore. You can redeem the jackpot. IF however the 0x2048 server goes down, then signatures will be temprarly unavailable.

### Does this game need blockchain?

Yes and no. 0x2048 only uses the blockchain to hold value and to keep track of the highest score. If the highscore was kept on a server, then players would need to trust that 0x2048 is showing them the 'real' highcore. Value could be passed around with paypal instead, but bliockchain makes value transfer very easy, less ToS, API keys, venmo could cancel API token. There could exists a version of this game without blockchain, but it would no longer be trustless and no longer be at the whim of Paypal or Venmo ToS.

### How Payment works

I once tried to build something in the past, a double sided market place for interview questins, using the Venmo API...

The game is simple. Clicking New Game will issue a call the the /nonce endpoint, generating a new random nonce for the user. The user is then prompted to execute the pay function on the smart contract. To execute the pay function, a user must submit ETH value equal to the price specified in the contract along with a nonce value. This nonce is then associated with the users address ina soliduty mapping. After this tx is mined, the user is prompted to sign the nonce value. Once signed, this is submitted to the /paymentConfirmation endpoint. This endpoint recovers the signer address from the provided signature, and then checks to see that the nonce associated with the user in the contracrt is in fact the original nonce. If this checks out, then the server has verified that the user has completed payment. Once this check is complete, the server will start a new game for the user. 

### Gameplay

After each move, the server signs the users score and sends it to her. This can be uploaded at any time by the user.