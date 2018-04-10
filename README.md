# 0x2048

[Play it now!](https://jstoxrocky.github.io/0x2048-frontend/)

0x2048 is a semi-trustless, pay-per-play game of 2048 in which each new high scorer is awarded a jackpot of ETH accumulated from the game's pay-per-play revenue.  

*0x2048 is a **proof of concept**. It is not meant to be fully decentralized. It is not meant to work better than a payment channel for micro payments. It is not meant to be completely trustless. 0x2048 is an experiment. It exists to **increase the level of trustlessness** in payments and rewards tied to online gaming by taking advantage of Ethereum's smart contract logic, storage, and cryptographic signatures*


### Trustless but Centralized

0x2048 maintains the same degree of trustlessness as a payment-channel. Payment channels are centralized in the sense that they rely on another user or server providing cryptographic signatures at specific intervals, but trustless in the sense that your value is always kept under your control.

Specifically, game logic for 0x2048 is hosted on an AWS server. Instead of two users exchanging signed messages, the game server cryptographically signs player scores after each move and sends them to the player. These scores can be verified at any point during gameplay - even before the first move has taken place! As long as a user holds a signature for a score above the current highscore, they can redeem the jackpot. 


### Does this Game Really Need a Blockchain?

This game is a **proof-of-concept** project to add trustless payment and reward mechanics to an online game. It is not meant to be a decentralized gaming platform nor is it meant to be an off-chain payment channel.

Value transfer over the Ethereum blockchain is used by 0x2048 to add transparency and trustlessness to payments and rewards. It is akin to a game server who's bank account offers read (and limited write access) to all observers. Players can verify exactly where their money goes when they pay, how much money the jackpot holds, and how to claim the pot with a winning score.

To answer the question, no, it does not need blockchain to function - but merely functioning is not the purpose of this project. This point of this project is to take advantage of many aspects of blockchain and cryptography to increase the trustlessness in an otherwise fully trusted environment.

### How Payment works

User's pay for each game played. Payment works by requesting a random 32-byte nonce value from the game server. Submission of this nonce along with 0.0001 ETH to a game [smart contract's](https://rinkeby.etherscan.io/address/0x38353e87173b67db5fa11c1807dd53da8736e726) `pay` function will associate this nonce it with the transaction sender's address. The game server will then look for user's address in the contract and verify that it is associated with correct nonce value. If this checks out, the server will start a new game for the user. [See here for more detail on the payment mechanism](https://github.com/jstoxrocky/pay-per-play/blob/master/README.md)


### Gameplay

After successful payment, users can play a round of 2048. After each move, the server signs the user's score and sends it back. This can be uploaded at any time by the user. In fact, a signed score of zero can be uploaded to the smart contract immediately after payment for the round is complete. The `uploadScore` function in the game's smart contract will only accept scores that have been signed by the game server.


### Some Self-Criticism

This experiment is not perfect and here are my thoughts on some of the biggest flaws.

<ul>
<li>
0x2048 servers may experience down time. In this event, players will not be able to receive signatures. However, since gameplay logic also lives on servers, players will not be able to play the game during down time anyways.
</li>
<li>
There is no guarantee that players will actually be able to play the game after they complete payment. The logic to start a new game lives on the server and users have no proof (they must trust) that the server will in fact start a new game for them after they pay.
</li>
<li>
There is no guarantee that the server will send a signed score back to the user after a move. There is no guarantee that this signed score will be validate against the smart contract. Users must trust that the server will fulfill its duty. This risk is inherit to all payment and state channels, not just 0x2048.
</li>
<li>
There is nothing stopping the server owner from just submitting a signed score themselves and claiming the jackpot.
</li>
</ul>


### Connected Repositories

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
