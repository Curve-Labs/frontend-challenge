// For handling the list of all swapable tokens
import { useState } from "react";
// Type annotations
import { TokenAccount } from "../utils/types";

/**
 * @summary Get all swapable tokens
 */
const useTokens = () => {
  const [tokens, setTokens] = useState<Array<TokenAccount>>(() => {
    return [
      {
        name: "tokenA",
        mintAddress: "12345",
      },
      {
        name: "tokenB",
        mintAddress: "65753434",
      },
    ];
  });
  return { tokens };
};

export default useTokens;
