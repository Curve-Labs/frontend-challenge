import { useState, useEffect } from "react";
import { Token } from "./types";

// Hook to handle the tokens swapable
const useTokens = () => {
  const [tokens, setTokens] = useState<Array<Token> | []>([]);
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
  }, []);
  return { tokens };
};

export default useTokens;
