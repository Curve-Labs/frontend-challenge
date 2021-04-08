import ContractCreator from "./contract-creator";
import TokenSwapAbi from "./build/contracts/TokenSwap.json";
import TokenA from "./build/contracts/TestTokenA.json";
import TokenB from "./build/contracts/TestTokenB.json";
import retrieveAddress from '../../utils/retrieve-address';
import { web3Connection } from "../redux/actions/connect-web3";
import { toBigNumber, fromBigNumber } from "../../utils/bignumber-converter";
async function TokenABalance() {

  try {
    //

    let web3 = await web3Connection();

    //get net ID
    let netId = await web3.eth.net.getId();

    const memberAddress = retrieveAddress();
     //get the network data for the contracts
    // @ts-ignore
    let tokenAContractAddress = TokenA.networks[String(netId)].address;
    let tokenAContract = await ContractCreator(
      TokenA.abi,
      tokenAContractAddress
    );

    const balance = await tokenAContract.methods.balanceOf(memberAddress).call();

    return balance;

  } catch (e) {
    console.log(e);
    return 0;
  }

}


export default TokenABalance;