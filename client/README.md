# Simple Swap UI
This client uses ganache-cli to spin up a blockchain server using the following command
```bash
ganache-cli  --port="8545"  --gasLimit=7984452 --gasPrice=2000000000
```

Then the contract is deployed to the blockchain using truffle using the following commands
```bash
truffle console --network test
truffle compile
truffle test
truffle migrate
```
The the cleint can be run using the following commad in the __/client__ folder
```bash
yarn start
```
1. Ganache provides 10 account preloaded with 100 eth each. The first account is used to deploy the contract and the second account is made your default account by the ui.
2. The UI automatically provides your default account (second account provided by ganache) with 1000 tokenA and 0 tokenB
