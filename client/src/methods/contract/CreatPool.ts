import ContractCreator from './contract-creator';
import TokenSwapAbi from './abi/TokenSwapAbi.json'
import TokenA from './abi/TokenA.json'
import TokenB from './abi/TokenB.json'
import {SWAP} from './addresses'

async function CreatePool() {
    
    let tokenAContract = ContractCreator(TokenA.abi, SWAP.TokenA);

    let tokenBContract = ContractCreator(TokenB.abi, SWAP.TokenB);

    let TokenASupply = 
}