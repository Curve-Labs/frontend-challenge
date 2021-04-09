const TokenSwap = artifacts.require("TokenSwap")
const TestTokenA = artifacts.require("TestTokenA")
const TestTokenB = artifacts.require("TestTokenB")
const BigNumber = require('bn.js')

contract('TokenSwap', (accounts) => {
  let metaCoin
  let tokenA
  let tokenB
  let provider
  let tokenAsupply
  let tokenBsupply
  let tokenAamount
  let tokenBamount
  let exchangeRate
  let slippage

  const decimals = new BigNumber(18)
  const decimalsBN = new BigNumber(10).pow(decimals)
  
  const INITIAL_TOKEN_BALANCE = new BigNumber(10000).mul(decimalsBN)// 10000 DAIs or ANTs
  const PPM = 1000000


  beforeEach('innit contracts for each test', async function () {
    tokenSwap = await TokenSwap.deployed()
    tokenA = await TestTokenA.deployed()
    tokenB = await TestTokenB.deployed()
    accounts = await web3.eth.getAccounts();
    provider = accounts[1]
    buyer = accounts[2]


    tokenAsupply = new BigNumber(3000).mul(decimalsBN) 
    tokenBsupply = new BigNumber(1500).mul(decimalsBN) 

    exchangeRate = new BigNumber(2*PPM) 

    console.log(exchangeRate, "exchange rate")
    slippage = new BigNumber(0.01*PPM);
  })


  it('create a simple pool', async () => {
  	await tokenA.mint(provider, INITIAL_TOKEN_BALANCE)
  	await tokenB.mint(provider, INITIAL_TOKEN_BALANCE)

    await tokenA.approve(tokenSwap.address, INITIAL_TOKEN_BALANCE, { from: provider })
	await tokenB.approve(tokenSwap.address, INITIAL_TOKEN_BALANCE, { from: provider })

    let receipt = await tokenSwap.createPool(tokenA.address, tokenB.address, tokenAsupply, tokenBsupply, slippage, exchangeRate, { from: provider })

    console.log(receipt, "receipt")

    let balanceA = await tokenA.balanceOf(tokenSwap.address);
    let balanceB = await tokenB.balanceOf(tokenSwap.address);

    assert.equal(await balanceA.toString(), tokenAsupply.toString())
    assert.equal(await balanceB.toString(), tokenBsupply.toString())
  });

it('it should buy tokens from the pool and pass slippage limit', async () => {

    tokenAamount = new BigNumber(2).mul(decimalsBN)

	await tokenA.transfer(buyer, tokenAamount, { from: provider })

	await tokenA.approve(tokenSwap.address, INITIAL_TOKEN_BALANCE, { from: buyer })
    await tokenSwap.buy(0, tokenAamount, { from: buyer })

    let boughtB = await tokenB.balanceOf(buyer);
    let actualPrice  = await boughtB*exchangeRate/PPM;

    let price = new BigNumber(actualPrice)
    console.log(price, "actual price")
    let expectedPrice = tokenAamount //-(slippage*PCT_BASE/PPM)
    let slippageLimitPassed = await (expectedPrice-actualPrice <= (slippage/PPM)*expectedPrice)

  	assert.equal(slippageLimitPassed, true);
  })

});
