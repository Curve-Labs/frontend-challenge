import Web3 from "web3";

export interface Token {
  name: string; // Name of the token
  mintAddress: string;
}

export interface ConnectionContextValues {
  web3: Web3 | null; // web3 instance
  accounts: Array<String> | [];
  tokens: Array<Token>;
  tokenPair: Map<string, { baseToken: string; pool: any }> | undefined;
  setTokenPair: (pair: Map<string, { baseToken: string; pool: any }>) => void;
  baseToken: string;
  setBaseToken: (val: string) => void;
  swapToken: string;
  setSwapToken: (val: string) => void;
}
