import ContractCreator from "./contract-creator";
import TokenSwapAbi from "./build/contracts/TokenSwap.json";
import TokenA from "./build/contracts/TestTokenA.json";
import TokenB from "./build/contracts/TestTokenB.json";
import { web3Connection } from "../redux/actions/connect-web3";
import { SWAP } from "./addresses";
import retrieveAddress from "../../utils/retrieve-address";
import { toBigNumber, fromBigNumber } from "../../utils/bignumber-converter";

async function BuyToken(amount: number, tokenType: string) {
  try {
      console.log('got here')
    let web3 = await web3Connection();

    let account = retrieveAddress();

    //get net ID
    let netId = await web3.eth.net.getId();

    //get the network data for the contracts
    // @ts-ignore
    let tokenAContractAddress = TokenA.networks[String(netId)].address;
    let tokenAContract = await ContractCreator(
      TokenA.abi,
      tokenAContractAddress
    );

    // @ts-ignore
    let tokenBContractAddress = TokenB.networks[String(netId)].address;
    console.log(tokenBContractAddress);
    let tokenBContract = await ContractCreator(
      TokenB.abi,
      tokenBContractAddress
    );

    // @ts-ignore
    let tokenSwapContractAddress = TokenSwapAbi.networks[String(netId)].address;
    let tokenSwapContract = await ContractCreator(
      TokenSwapAbi.abi,
      tokenSwapContractAddress
    );

    if (tokenType === "TOKEN A") {
      await tokenAContract.methods.approve(tokenSwapContractAddress, toBigNumber(amount)).send({ from: account });

      let resA = await tokenSwapContract.methods.buy(0, amount).send({ from: account });
      return resA;
    } else if (tokenType === "TOKEN B") {
      await tokenBContract.methods
        .approve(tokenSwapContractAddress, toBigNumber(amount))
        .send({ from: account });
      let resb = await tokenSwapContract.methods
        .buy(0, amount)
        .send({ from: account });

      return resb;
    }
  } catch (err) {
    console.error(err);
    return {};
  }
}

export default BuyToken;
