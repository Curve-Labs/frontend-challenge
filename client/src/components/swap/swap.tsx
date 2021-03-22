import React, { useRef, useEffect, useState } from "react";
import { Button, Card, notification } from "antd";
import { ArrowDownOutlined } from "@ant-design/icons";
import useTokens from "../../utils/useTokens";
// Styles
import "../../styles/swap.css";
// Hooks
import TokenInput from "../tokeninput";
import { useTokenContract, useConnection, setUp } from "../../utils/connection";

const SwapComponent = () => {
  // Get our currencies
  const { tokens, tokenPair } = useTokens();
  // Get our web3 instance
  const { web3, accounts } = useConnection();
  // Get our contracts
  const contracts = useTokenContract();
  // Ref for tokenInput
  const inputRef = useRef(null);
  // Ref for swapped token
  const swappedTokRef = useRef(null);
  // The base token
  const [baseToken, setBaseToken] = useState<string>("");
  // The swap token
  const [swapToken, setSwapToken] = useState<string>("");
  // Save the value of token A in token B
  const [tokenBVal, setTokenBVal] = useState<number | undefined>(undefined);
  // Save the value of token B in token A
  const [tokenAVal, setTokenAVal] = useState<number | undefined>(undefined);
  // Loading state
  const [loading, setLoading] = useState<boolean>(false);
  // SWap function
  const swap = () => {
    setLoading(true);
    // Get the token pair base token
    let bToken = tokenPair?.get(baseToken + "/" + swapToken)?.baseToken;
    let orderType = "buy";
    if (baseToken === bToken) {
      // This is a buy order
      orderType = "buy";
    } else {
      orderType = "sell";
    }
    if (!contracts || !accounts) {
      notification.open({
        description: "Pool not found",
        message: "Error swapping token",
        type: "error",
      });
      return;
    }
    // Get the token swap contract
    let contract = contracts.get("tokenSwap")?.contract;
    if (!contract) {
      notification.open({
        description: "Pool not found",
        message: "Error swapping token",
        type: "error",
      });
      return;
    }
    // Buy the token from the pool
    if (orderType === "buy") {
      contract.methods
        .buy(0, web3?.utils.toWei("" + tokenAVal))
        .send({ from: accounts[1], gas: 7984452, gasPrice: 2000000000 })
        .once("receipt", () => {
          setLoading(false);
          notification.open({
            message: "Token Swapped",
            description: `${swapToken} has been given`,
            type: "info",
          });
        });
    } else {
      contract.methods
        .sell(0, web3?.utils.toWei("" + tokenAVal))
        .send({ from: accounts[1], gas: 7984452, gasPrice: 2000000000 })
        .once("receipt", () => {
          setLoading(false);
          notification.open({
            message: "Token Swapped",
            description: `${swapToken} has been given`,
            type: "info",
          });
        });
    }
  };
  useEffect(() => {
    // Set up test
    if (contracts && web3) {
      setUp(contracts, web3);
    }
  }, [contracts, web3]);

  return (
    <Card title="Swap" className="card" bordered={false}>
      <TokenInput
        tokens={tokens || []}
        type="From"
        ref={inputRef}
        contracts={contracts}
        value={tokenAVal}
        setValue={setTokenBVal}
        setValueSelf={setTokenAVal}
        loading={loading}
        baseToken={baseToken}
        swapToken={swapToken}
        setBaseToken={setBaseToken}
        setSwapToken={setSwapToken}
      />
      <ArrowDownOutlined />
      <TokenInput
        tokens={tokens}
        type="To (estimated) "
        contracts={contracts}
        ref={swappedTokRef}
        value={tokenBVal}
        setValue={setTokenAVal}
        setValueSelf={setTokenBVal}
        loading={loading}
        baseToken={baseToken}
        swapToken={swapToken}
        setBaseToken={setBaseToken}
        setSwapToken={setSwapToken}
      />
      <Button type="primary" size="large" onClick={swap} loading={loading}>
        Swap
      </Button>
    </Card>
  );
};

export default SwapComponent;
