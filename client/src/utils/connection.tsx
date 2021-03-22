import React, { useState, useEffect, useContext } from "react";
import Web3 from "web3";
import useTokens from "../utils/useTokens";
// Types
import { ConnectionContextValues } from "./types";
// Contracts
import TestTokenA from "../build/TestTokenA.json";
import TestTokenB from "../build/TestTokenB.json";
import TokenSwap from "../build/TokenSwap.json";
import { notification } from "antd";

// Connection context
const ConnectionContext = React.createContext<ConnectionContextValues | null>(
  null
);

// TODO: Remove the ignore
// @ts-ignore
export function ConnectionProvider({ children }) {
  // Get web3
  const { web3, accounts } = useWeb3();
  // Get the tokens
  const {
    tokens,
    tokenPair,
    setTokenPair,
    baseToken,
    setBaseToken,
    swapToken,
    setSwapToken,
  } = useTokens();
  return (
    <ConnectionContext.Provider
      value={{
        web3,
        accounts,
        tokens,
        baseToken,
        swapToken,
        setBaseToken,
        setSwapToken,
        tokenPair,
        setTokenPair,
      }}
    >
      {children}
    </ConnectionContext.Provider>
  );
}

// Get web3 instance and listen on connection
const useWeb3 = () => {
  // Save the web3 instance
  const [web3, setWeb3] = useState<Web3 | null>(null);
  // Save the accounts
  const [accounts, setAccounts] = useState<Array<String> | []>([]);

  // Set effects
  useEffect(() => {
    // Set provider for web3
    const web3Instance = new Web3("http://localhost:8545");
    setWeb3(web3Instance);
    // Get the accounts
    web3Instance.eth.getAccounts().then((accounts) => {
      setAccounts(accounts);
    });
  }, []);
  return { web3, setWeb3, accounts };
};
// Connection hook
export const useConnection = () => {
  const connection = useContext(ConnectionContext);
  if (!connection) {
    throw Error("Connection context not found");
  }
  return {
    web3: connection.web3,
    accounts: connection.accounts,
    tokenPair: connection.tokenPair,
    setTokenPair: connection.setTokenPair,
    setBaseToken: connection.setBaseToken,
    setSwapToken: connection.setSwapToken,
    baseToken: connection.baseToken,
    swapToken: connection.swapToken,
    tokens: connection.tokens,
  };
};
// Load the on-chain contracts
export const useTokenContract = (): Map<
  string,
  { contract: any; address: string }
> | null => {
  const connection = useContext(ConnectionContext);
  // Save the contract instance in a mapping
  const [contractMapping, setContractMapping] = useState<Map<
    string,
    { contract: any; address: string }
  > | null>(null);
  const web3 = connection?.web3;
  useEffect(() => {
    if (web3) {
      // Load our contracts
      web3.eth.net.getId().then((netId: number) => {
        // Get the network data of the contract using the networkid
        // @ts-ignore
        let networkaData = TestTokenA.networks[String(netId)];
        // @ts-ignore
        let networkbData = TestTokenB.networks[String(netId)];
        // @ts-ignore
        let networkcData = TokenSwap.networks[String(netId)];
        // Get the tokenA contract
        let tokenaContract = new web3.eth.Contract(
          // @ts-ignore
          TestTokenA.abi,
          networkaData.address
        );
        let tokenbContract = new web3.eth.Contract(
          // @ts-ignore
          TestTokenB.abi,
          networkbData.address
        );
        let tokenSwap = new web3.eth.Contract(
          // @ts-ignore
          TokenSwap.abi,
          networkcData.address
        );
        // Build a mapping of tokens to contract instance
        let mappings = new Map<string, any>();
        mappings.set("tokenA", {
          contract: tokenaContract,
          address: networkaData.address,
        });
        mappings.set("tokenB", {
          contract: tokenbContract,
          address: networkbData.address,
        });
        mappings.set("tokenSwap", {
          contract: tokenSwap,
          address: networkcData.address,
        });
        setContractMapping(mappings);
      });
    }
  }, [web3]);

  return contractMapping;
};

// Set up test -- run just once
export const setUp = async (
  contracts: Map<string, { contract: any; address: string }> | null,
  web3: Web3 | null
) => {
  if (!contracts || !web3) {
    return;
  }
  // Get our contracts
  let tokenaContract = contracts.get("tokenA")?.contract;
  let addressA = contracts.get("tokenA")?.address;
  let tokenbContract = contracts.get("tokenB")?.contract;
  let addressB = contracts.get("tokenB")?.address;
  let tokenSwap = contracts.get("tokenSwap")?.contract;
  let addressC = contracts.get("tokenSwap")?.address;
  // Check it pool already exists
  let poolExists = false;
  try {
    await tokenSwap.methods.pools(0).call((err: any, res: any) => {
      if (err) {
        notification.open({
          description: "Could not send transaction to contract",
          message: "Error Ocurred",
          type: "error",
        });
        poolExists = true;
        return;
      }
      if (!res) {
        // No pool
        poolExists = false;
        return;
      }
      poolExists = res["isActive"];
    });
  } catch (err) {
    poolExists = false;
  }
  // TODO: Fix double spending
  if (poolExists) {
    // Pool is active
    return;
  }
  // Set up accounts with tokens
  web3.eth.getAccounts().then(async (acc) => {
    // Mint some tokens for account 0
    await tokenaContract.methods
      .mint(acc[0], web3.utils.toWei("20000"))
      .send({ from: acc[0] });
    await tokenbContract.methods
      .mint(acc[0], web3.utils.toWei("20000"))
      .send({ from: acc[0] });
    // Transfer some token A for account 1
    await tokenaContract.methods
      .transfer(acc[1], web3.utils.toWei("10000"))
      .send({ from: acc[0] });
    // Approve token swap to trade on behalf of account 0 and 1
    await tokenaContract.methods
      .approve(addressC, web3.utils.toWei("10000"))
      .send({ from: acc[0] });
    await tokenaContract.methods
      .approve(addressC, web3.utils.toWei("10000"))
      .send({ from: acc[1] });
    await tokenbContract.methods
      .approve(addressC, web3.utils.toWei("10000"))
      .send({ from: acc[0] });
    await tokenbContract.methods
      .approve(addressC, web3.utils.toWei("10000"))
      .send({ from: acc[1] });
    // Create a pool for token A and B
    await tokenSwap.methods
      .createPool(
        addressA,
        addressB,
        web3.utils.toWei("3000"),
        web3.utils.toWei("1500"),
        web3.utils.toBN(0.01 * 1000000),
        web3.utils.toBN(2 * 1000000)
      )
      .send({ from: acc[0], gas: 7984452, gasPrice: 2000000000 });
    // Get the pool provider
  });
};
