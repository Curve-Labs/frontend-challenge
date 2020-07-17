# Curve Labs Frontend Developer Challenge

This repo contains a simplified version of a [TokenSwap](https://github.com/arsenyjin/tokenswap) dApp that incorporates the Bancor bonding curve formula in order to implement a simple token swap exchange. 

Current version is a smart contracts only `truffle` dApp that lacks any DAO frameworks compared to the original implementation. 

Current version lacks complete unit testing coverage and has two simple tests in order to make sure that dApp is working, more tests could be found in the original implementation. 

## Usage

Prerequisites: `node`. `npm`, `truffle`, `ganache-cli`

Clone the repo:
`git clone https://github.com/Curve-Labs/frontend-challenge.git && cd frontend-challenge`

Install dependencies:

`npm install`

`npm install openzeppelin-solidity@2.0.0`

Run truffle develop:
`truffle develop`


In the cli interface run:
`compile`

`migrate`

`test`

## Challenge

The challenge would be to develop a simple [Uniswap](http://uniswap.exchange/) like interface for the existing dApp that will work with Metamask on a private ganache network.

Front-end app should use `React` & `TypeScript`

## Bonus

Bonus to the challenge would be to have a complete integration tests for the dApp.

## Submission

To submit the challenge please:

1. Fork the repo
2. Build a front-end app
3. Open a PR to the existing repo
