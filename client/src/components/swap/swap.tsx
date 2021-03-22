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
  // Get our web3 instance
  const { web3, accounts } = useConnection();
  // Get our contracts
  const contracts = useTokenContract();
  // Ref for tokenInput
  const inputRef = useRef(null);
  // Ref for swapped token
  const swappedTokRef = useRef(null);
  // Save the value of token A in token B
  const [tokenBVal, setTokenBVal] = useState<number | undefined>(undefined);
  // Save the value of token B in token A
  const [tokenAVal, setTokenAVal] = useState<number | undefined>(undefined);
  // SWap function
  const swap = () => {
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
    contract.methods
      .buy(0, web3?.utils.toWei("" + tokenAVal))
      .send({ from: accounts[1], gas: 7984452, gasPrice: 2000000000 });
  };
  useEffect(() => {
    // Set up test
    if (contracts && web3) {
      setUp(contracts, web3);
    }
  }, [contracts, web3]);
  // Get our currencies
  const { tokens } = useTokens();
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
      />
      <Button type="primary" size="large" onClick={swap}>
        Swap
      </Button>
    </Card>
  );
};

export default SwapComponent;
