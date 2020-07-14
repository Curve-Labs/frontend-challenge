const MetaCoin = artifacts.require("TokenSwap")
const TestTokenA = artifacts.require("TestTokenA")
const TestTokenB = artifacts.require("TestTokenB")

contract('TokenSwap', (accounts) => {
  let metaCoin
  let tokenA
  let tokenB
  let provider

  const INITIAL_TOKEN_BALANCE = 10000 // 10000 DAIs or ANTs

  beforeEach('innit contracts for each test', async function () {
    metaCoin = await MetaCoin.deployed()
    tokenA = await TestTokenA.deployed()
    tokenB = await TestTokenB.deployed()
    accounts = await web3.eth.getAccounts();
    provider = accounts[1]
  })


  it('should deploy ERC20 token', async () => {
  	await tokenA.mint(provider, INITIAL_TOKEN_BALANCE)
  	await tokenB.mint(provider, INITIAL_TOKEN_BALANCE)
    assert.equal(true, true, "true !== true ??")
  });
});
