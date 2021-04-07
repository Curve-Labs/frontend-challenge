import ContractCreator from "./contract-creator";
import TokenSwapAbi from "./abi/TokenSwapAbi.json";
import TokenA from "./abi/TokenA.json";
import TokenB from "./abi/TokenB.json";
import { SWAP } from "./addresses";
import retrieveAddress from "../../utils/retrieve-address";
import { toBigNumber, fromBigNumber } from "../../utils/bignumber-converter";

async function CreatePool() {
  try {
    const PPM = 1000000;

    const INITIAL_TOKEN_BALANCE = toBigNumber(10000);

    let tokenAContract = await ContractCreator(TokenA.abi, SWAP.TokenA);

    let tokenBContract = await ContractCreator(TokenB.abi, SWAP.TokenB);

    let tokenSwapContract = await ContractCreator(
      TokenSwapAbi.abi,
      SWAP.TokenSwap
    );

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