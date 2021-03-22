import React, { useMemo, useState } from "react";
import { Select, Card, notification } from "antd";
// TYpe annotations
import { Token } from "../../utils/types";
// Connection hooks
import { useConnection } from "../../utils/connection";
import { NumericInput } from "../numericinput";
// Style
import "../../styles/tokeninput.css";
import useTokens from "../../utils/useTokens";
const { Option } = Select;
// Our token input
const TokenInput = React.forwardRef(
  (
    props: {
      tokens: Array<Token> | [];
      type: string; // lable on input
      contracts: Map<string, { contract: any; address: string }> | null;
      value: number | undefined;
      setValueSelf: (val: number | undefined) => void;
      setValue: (val: number | undefined) => void;
      loading: boolean; // Are we done swapping ?
      baseToken: string; // The base token in this swap
      setBaseToken: (val: string) => void;
      swapToken: string; // The token to swap to
      setSwapToken: (val: string) => void;
    },
    ref: any
  ) => {
    const {
      tokens,
      type,
      contracts,
      value,
      setValue,
      setValueSelf,
      loading,
      baseToken,
      setBaseToken,
      swapToken,
      setSwapToken,
    } = props;
    // Get the token pair
    const { tokenPair } = useTokens();
    const { web3, accounts } = useConnection();
    // Hold user balance
    const [balance, setBalance] = useState<{
      balance: string;
      uiBalance: string;
    }>({ balance: "0", uiBalance: "0" });
    // Hold the current token
    const [token, setToken] = useState<string>("");
    // Set the token
    const settoken = (token: any) => {
      if (type === "From") {
        // If this is the base token input, set the base token
        setBaseToken(token);
        setToken(token);
        setValue(undefined);
        setValueSelf(undefined);
      } else {
        setSwapToken(token);
        setToken(token);
        setValue(undefined);
        setValueSelf(undefined);
      }
    };
    // Let's create a memoized select and options for each mango group currency
    const createCurrencyOptions = useMemo(() => {
      return (
        <Select
          size="large"
          style={{ minWidth: 150 }}
          // value={token ? token.name : "No token"}
          onChange={settoken}
          placeholder="Select a token"
        >
          {tokens.length > 0 ? (
            tokens.map((token: Token, i: number) => {
              return (
                <Option
                  key={i}
                  value={token.name}
                  name={token.name}
                  title={token.name}
                >
                  <img
                    alt=""
                    width="20"
                    height="20"
                    src={
                      require(`../../assets/icons/${token.name.toLowerCase()}.svg`)
                        .default
                    }
                    style={{
                      marginRight: 5,
                      alignSelf: "center",
                    }}
                  />
                  {token.name}
                </Option>
              );
            })
          ) : (
            <Option value="No token">No token</Option>
          )}
        </Select>
      );
    }, [tokens, token]);

    // Get the users balance for this token
    const uiBalance = useMemo(() => {
      if (accounts && token && contracts && web3) {
        if (loading) {
          return;
        }
        let contract = contracts.get(token)?.contract;
        // Return the amount of tokens this account has
        contract.methods
          .balanceOf(accounts[1])
          .call((err: any, res: string) => {
            if (err) {
              console.error(err);
              return;
            }
            setBalance({
              balance: web3.utils.fromWei(res, "ether"),
              uiBalance: Number(web3.utils.fromWei(res, "ether")).toFixed(2),
            });
          });
      }
    }, [contracts, accounts, token, web3, loading]);

    // Calculate the excahnge value for the swapped token
    const getExchangeValue = (value: number) => {
      // Check that a vallue has been selected
      if (!value || value <= 0) {
        setValue(undefined);
        notification.open({
          description: "Please input an amount to swap",
          message: "No Amount selected",
        });
        return;
      } else if (value > Number(balance.balance)) {
        // check that the input value is less than balance
        setValue(undefined);
        notification.open({
          description: "Please input an amount less than your wallet",
          message: "Insufficient Funds",
        });
        return;
      }

      // Let's get the exchange rate from the pool
      let contract = contracts?.get("tokenSwap")?.contract;
      contract.methods.pools(0).call((err: any, res: any) => {
        let swapVal = 0;
        console.log(
          token,
          // @ts-ignore
          tokenPair.get(baseToken + "/" + swapToken)?.baseToken
        );
        if (
          tokenPair &&
          token === tokenPair.get(baseToken + "/" + swapToken)?.baseToken
        ) {
          swapVal = (value * Number(res["exchageRate"])) / 1000000;
        } else {
          swapVal = value / (Number(res["exchageRate"]) / 1000000);
        }
        // @ts-ignore
        setValue(swapVal);
      });
      // Now perfrom the swap
    };
    // Create a memoized currency input
    const NumInput = useMemo(
      () => (
        <NumericInput
          style={{
            fontSize: 20,
            boxShadow: "none",
            borderColor: "transparent",
            outline: "transpaernt",
          }}
          placeholder="0.00"
          value={value}
          ref={ref}
          onChange={getExchangeValue}
          setValue={setValueSelf}
        />
      ),
      [ref, value, setValueSelf, contracts]
    );
    return (
      <Card
        className="ccy-input"
        style={{ borderRadius: 20, marginBottom: 20 }}
        bodyStyle={{ padding: 0 }}
      >
        <div className="ccy-input-header">
          <div className="ccy-input-header-left">{type}</div>
          <div className="ccy-input-header-right">
            Balance: {balance.uiBalance}
          </div>
        </div>
        <div
          className="ccy-input-header"
          style={{ padding: "0px 10px 5px 7px" }}
        >
          {NumInput}
          <div className="ccy-input-header-right" style={{ display: "flex" }}>
            {createCurrencyOptions}
          </div>
        </div>
      </Card>
    );
  }
);

export default TokenInput;
