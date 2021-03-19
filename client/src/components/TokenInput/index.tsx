// For the deposit component
import React, { useMemo } from "react";
import { Card, Select } from "antd";
import { NumericInput } from "../NumericInput";
// TYpe annotation
import { TokenAccount } from "../../utils/types";
// import "./styles.css";
import logo from "../../assets/icons/tokena.svg";
// import useMangoTokenAccount from '../../../utils/mangoTokenAccounts';
// import { TokenAccount } from '../../../utils/types';
const { Option } = Select;

export const TokenInput = React.forwardRef(
  (
    props: {
      tokens: Array<TokenAccount>; // The tokens to swap
      //   setCurrency: (value: string) => void;
      token: string;
      //   userUiBalance: () => void; // The token balance of the user
      //   setTokenAccount: any;
      //   customTokenAccounts: any;
    },
    ref: any
  ) => {
    // const {
    //   currencies,
    //   currency,
    //   setCurrency,
    //   userUiBalance,
    //   customTokenAccounts,
    //   setTokenAccount,
    // } = props;
    const { tokens, token } = props;
    // const { mangoGroupTokenAccounts, tokenAccountsMapping } = useMangoTokenAccount();
    // const tokenAccounts = customTokenAccounts.SRM ? customTokenAccounts : mangoGroupTokenAccounts;

    // const handleCurrencyChange = (value) => {
    //   // Set the first account for the token
    //   if (tokenAccounts[value] && tokenAccounts[value].length > 0) {
    //     // Set the account with highest balance
    //     let hAccount: TokenAccount = tokenAccounts[value][0];
    //     tokenAccounts[value].forEach((account: TokenAccount, i: number) => {
    //       if (i === 0 || !tokenAccountsMapping.current[account.pubkey.toString()]) {
    //         return;
    //       }
    //       hAccount =
    //         tokenAccountsMapping.current[account.pubkey.toString()].balance >
    //         tokenAccountsMapping.current[hAccount.pubkey.toString()].balance
    //           ? tokenAccountsMapping.current[account.pubkey.toString()].account
    //           : hAccount;
    //     });

    //     setTokenAccount(hAccount);
    //   } else {
    //     setTokenAccount(null);
    //   }
    //   setCurrency(value);
    // };

    // Let's create a memoized select and options for each mango group currency
    const createCurrencyOptions = useMemo(() => {
      return (
        <Select
          size="large"
          style={{ minWidth: 150 }}
          value={token}
          // onChange={handleCurrencyChange}
        >
          {tokens.map((token: TokenAccount, i: number) => {
            return (
              <Option
                key={i}
                value={token.mintAddress}
                name={token.name}
                title={token.name}
              >
                <img
                  alt=""
                  width="20"
                  height="20"
                  src={require(`../../assets/icons/${token.name.toLowerCase()}.svg`)}
                  style={{
                    marginRight: 5,
                    alignSelf: "center",
                  }}
                />
                {token.name}
              </Option>
            );
          })}
        </Select>
      );
    }, [token, tokens]);

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
          ref={ref}
        />
      ),
      [ref]
    );

    return (
      <Card style={{ borderRadius: 20 }} bodyStyle={{ padding: 0 }}>
        {/* <div className="ccy-input-header">
          <div className="ccy-input-header-left">Amount</div>
          <div className="ccy-input-header-right">Balance: 2000</div>
        </div>
        <div
          className="ccy-input-header"
          style={{ padding: "0px 10px 5px 7px" }}
        >
          {NumInput} */}
        <img
          alt=""
          width="20"
          height="20"
          src={logo}
          style={{
            marginRight: 5,
            alignSelf: "center",
          }}
        />
        {/* <div className="ccy-input-header-right" style={{ display: "felx" }}>
            {createCurrencyOptions}
          </div>
        </div> */}
      </Card>
    );
  }
);
