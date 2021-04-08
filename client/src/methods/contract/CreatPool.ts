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

    const INITIAL_TOKEN_BALANCE = toBigNumber(10000);

    let web3 = await web3Connection();

    //get net ID
    let netId = await web3.eth.net.getId();

    //get the network data for the contracts
     // @ts-ignore
    let tokenAContract = await ContractCreator(TokenA.abi, TokenA.networks[String(netId)].address);

    // @ts-ignore
    let tokenBContract = await ContractCreator(TokenB.abi, TokenB.networks[String(netId)].address);

    // @ts-ignore
    let tokenSwapContract = await ContractCreator( TokenSwapAbi.abi, TokenSwapAbi.networks[String(netId)].address);

    let tokenASupply = toBigNumber(3000);

    let tokenBSupply = toBigNumber(1500);

    let exchangeRate = toBigNumber(2 * PPM);
    
    console.log(exchangeRate)

    let slippage = toBigNumber(0.01 * PPM);
    console.log(slippage)
    let account = retrieveAddress();

    await tokenAContract.methods
      .mint(account, INITIAL_TOKEN_BALANCE)
      .send({ from: account });

    await tokenBContract.methods
      .mint(account, INITIAL_TOKEN_BALANCE)
      .send({ from: account });

    await tokenAContract.methods
      .approve(SWAP.TokenSwap, INITIAL_TOKEN_BALANCE)
      .send({ from: account });

    await tokenBContract.methods
      .approve(SWAP.TokenSwap, INITIAL_TOKEN_BALANCE)
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