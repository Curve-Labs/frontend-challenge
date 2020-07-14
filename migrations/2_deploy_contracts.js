const TokenSwap = artifacts.require("TokenSwap");
const BancorFormula = artifacts.require("BancorFormula");
const TestTokenA = artifacts.require("TestTokenA");
const TestTokenB = artifacts.require("TestTokenB");

module.exports = function(deployer) {
	deployer.then(async () => {
	  await deployer.deploy(TestTokenA);		
	  await deployer.deploy(TestTokenB);
	  await deployer.deploy(BancorFormula);
	  await deployer.deploy(TokenSwap, BancorFormula.address);
	});
};