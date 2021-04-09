import web3 from 'web3';

/**
 * This function is used to create contracts web3 objects used for calling contract methods.
 * @param abi
 * @param contractAddress
 */

async function createContract(abi: Array<any>, contractAddress: any) {
    const w3 = new web3(web3.givenProvider);

    // create and return the contract using the abi and web3 instance
    return new w3.eth.Contract(abi, contractAddress);
}

export default createContract;