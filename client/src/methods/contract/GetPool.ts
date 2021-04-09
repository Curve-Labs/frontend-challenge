import ContractCreator from "./contract-creator";
import TokenSwapAbi from "./build/contracts/TokenSwap.json";
import TokenA from "./build/contracts/TestTokenA.json";
import TokenB from "./build/contracts/TestTokenB.json";
import { web3Connection } from "../redux/actions/connect-web3";
import { toBigNumber, fromBigNumber } from "../../utils/bignumber-converter";

async function GetPool() {
  try {
    let web3 = await web3Connection();

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

    //get past events for tokenSwap contract and get details about a pool

    let data = await tokenSwapContract.getPastEvents('PoolCreated', {fromBlock:0, toBlock:'latest'});

    console.log(data)

    let eventData = data[0].returnValues

    let exchangeRate = eventData.exchangeRate;

    let poolId = eventData.id;

    let tokenASupply = eventData.tokenAsupply;

    let tokenBSupply = eventData.tokenBsupply;

    return {poolId, exchangeRate, tokenASupply, tokenBSupply}

  } catch(err) {
    return {}
  }
}

export default GetPool