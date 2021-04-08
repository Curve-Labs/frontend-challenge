import ContractCreator from "./contract-creator";
import TokenSwapAbi from "./build/contracts/TokenSwap.json";
import TokenA from "./build/contracts/TestTokenA.json";
import TokenB from "./build/contracts/TestTokenB.json";
import {web3Connection} from '../redux/actions/connect-web3';
import { SWAP } from "./addresses";
import retrieveAddress from "../../utils/retrieve-address";
import { toBigNumber, fromBigNumber } from "../../utils/bignumber-converter";

async function CreatePool() {
  try {
    const PPM = 1000000;

    const INITIAL_TOKEN_BALANCE = toBigNumber(20000);

    let web3 = await web3Connection();

    let acconts = await web3.eth.getAccounts();

    let secondAccount = acconts[1];

    //get net ID
    let netId = await web3.eth.net.getId();

    //get the network data for the contracts
     // @ts-ignore
     let tokenAContractAddress = TokenA.networks[String(netId)].address
    let tokenAContract = await ContractCreator(TokenA.abi, tokenAContractAddress);

    // @ts-ignore
    let tokenBContractAddress = TokenB.networks[String(netId)].address
    console.log(tokenBContractAddress)
    let tokenBContract = await ContractCreator(TokenB.abi, tokenBContractAddress);

    // @ts-ignore
    let tokenSwapContractAddress = TokenSwapAbi.networks[String(netId)].address
    let tokenSwapContract = await ContractCreator( TokenSwapAbi.abi, tokenSwapContractAddress);

    //set token a supply
    let tokenASupply = toBigNumber(3000);

    //set token b supply
    let tokenBSupply = toBigNumber(1500);

    //set exchange rate
    let exchangeRate = BigInt(2 * PPM);
    
    //slippage
    let slippage = BigInt(0.01 * PPM);
 
    let account = retrieveAddress();

    await tokenAContract.methods
      .mint(account, INITIAL_TOKEN_BALANCE)
      .send({ from: account });

      // Transfer token A to second account 
    await tokenAContract.methods
      .transfer(secondAccount, toBigNumber(10000))
      .send({ from: account });

    await tokenBContract.methods
      .mint(account, INITIAL_TOKEN_BALANCE)
      .send({ from: account });

    await tokenAContract.methods
      .approve(tokenSwapContractAddress, INITIAL_TOKEN_BALANCE)
      .send({ from: account });

    await tokenBContract.methods
      .approve(tokenSwapContractAddress, INITIAL_TOKEN_BALANCE)
      .send({ from: account });

    let res = await tokenSwapContract.methods
      .createPool(
        SWAP.TokenA,
        SWAP.TokenB,
        tokenASupply,
        tokenBSupply,
        slippage,
        exchangeRate
      )
      .send({ from: account });

    console.log(res, "response");

    return res;
  } catch (err) {
    console.error(err);
    return {};
  }
}

export default CreatePool