import { useState, useEffect } from "react";
import { Token } from "./types";

// Hook to handle the tokens swapable
const useTokens = () => {
  const [tokens, setTokens] = useState<Array<Token> | []>([]);
  // The base token
  const [baseToken, setBaseToken] = useState<string>("");
  // The swap token
  const [swapToken, setSwapToken] = useState<string>("");
  // Token pair
  const [tokenPair, setTokenPair] = useState<
    Map<string, { baseToken: string; pool: any }>
  >();
  // Get our tokens
  useEffect(() => {
    setTokens([
      {
        name: "tokenA",
        mintAddress: "12345",
      },
      {
        name: "tokenB",
        mintAddress: "1234455",
      },
    ]);
    let mapping = new Map<string, { baseToken: string; pool: any }>();
    mapping.set("tokenA/tokenB", { baseToken: "tokenA", pool: null });
    mapping.set("tokenB/tokenA", { baseToken: "tokenA", pool: null });
    setTokenPair(mapping);
  }, []);
  return {
    tokens,
    tokenPair,
    setTokenPair,
    baseToken,
    setBaseToken,
    swapToken,
    setSwapToken,
  };
};

export default useTokens;
