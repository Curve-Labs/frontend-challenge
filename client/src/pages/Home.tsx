import React, { useContext, useEffect, useState } from "react";
import {useHistory} from 'react-router-dom'
import { ThemeContext } from "./components/ThemeWrapper";
import { useSelector, useDispatch } from "react-redux";
import {
  connectWallet,
  disconnect,
} from "../methods/redux/actions/connect-web3";
import createPool from '../methods/redux/actions/create-pool';
import retrieveAddress from "../utils/retrieve-address";
import _const from "../methods/_const";
import truncateAddress from "../utils/truncate-address";
import TokenSelect from "./components/TokenModal";
import Logo from "../images/logo.png";
import ConnectModal from "./components/ConnectModal";
import Metamask from "../images/metamask.svg";
import BuyToken from "../methods/contract/GetPool";
import GetPool from "../methods/contract/GetPool";

function Home() {
  const { theme, toggle } = useContext(ThemeContext);
  const [from, setFrom] = useState<any>({});
  const [to, setTo] = useState<any>({});
  const [visible, setVisible] = useState(false);

  function openConnectionModal() {
    setVisible(true);
  }
  function addressWork() {
    const localAddress = retrieveAddress();
    dispatch({
      type: _const.ADDRESS,
      payload: localAddress,
    });
  }

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      window.ethereum.on("accountsChanged", () => {
        dispatch(connectWallet());
      });
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      window.ethereum.on("chainChanged", () => {
        dispatch(connectWallet());
      });
    }

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    addressWork();

    dispatch(createPool());

    // eslint-disable-next-line
  }, []);

  const dispatch = useDispatch();

  const onClick = async() =>{
    await GetPool();
  }

  const history = useHistory();

  const { address } = useSelector((state: any) => state.ConnectWeb3);

  console.log(address, "address");

  const handleTokenSelection = (
    token: any,
    dest: "from" | "to",
    callback?: Function
  ) => {
    if (dest === "from") {
      if (token.name === to.name) {
        // switch the tokens
        const currentFrom = from;
        setFrom(to);
        setTo(currentFrom);
      } else {
        setFrom(token);
      }
      callback && callback();
    }

    if (dest === "to") {
      if (token.name === from.name) {
        // switch the tokens
        const currentTo = to;
        setTo(from);
        setFrom(currentTo);
      } else {
        setTo(token);
      }
      callback && callback();
    }
  };

  useEffect(() => {
    setFrom(tokens[0]);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="Home">
      <header className="Home-header">
        <figure>
          <img src={Logo} style={{ width: 35 }} alt="logo" />
        </figure>
        <ul>
          <li>
            <a href="#">ZSwap</a>
          </li>
        </ul>
      </header>
      <section className="wallet">
        <button className="z-swap">ZSwap</button>
        {address.length === 0 ? (
          <button className="connect-wallet" onClick={openConnectionModal}>
            Connect wallet
          </button>
        ) : (
          <button className="connect-wallet" onClick={openConnectionModal}>
            <div className="connected"></div>
            {truncateAddress(address)}
          </button>
        )}
        <button onClick={toggle}>
          {theme === "light" ? (
            <span className="material-icons">light_mode</span>
          ) : (
            <span className="material-icons">dark_mode</span>
          )}
        </button>
      </section>
      <main>
        <section className="swapper">
          <div>
            <h1>Swap</h1>
          </div>

          <section className="swaps">
            <h3>From</h3>
            <h3>Balance</h3>
            <input type="text" placeholder="0.00" />
            <TokenSelect
              name="from"
              token={from}
              selected={handleTokenSelection}
              nonSelectToken={to.name}
            />
          </section>

          <div>
            {/* <span className="material-icons arrow-downward">
              arrow_downward
            </span> */}
          </div>

          <section className="swaps">
            <h3>To</h3>
            <h3>Balance</h3>
            <input type="text" placeholder="0.00" />
            <TokenSelect
              name="to"
              token={to}
              selected={handleTokenSelection}
              nonSelectToken={from.name}
            />
          </section>

          <section>
            {address.length === 0 ? (
              <button className="submit-button" onClick={openConnectionModal}>
                Connect Wallet
              </button>
            ) : (
              <button className="submit-button" onClick={onClick}>
                Swap Token
              </button>
            )}
          </section>
        </section>
        <ConnectModal
          visible={visible}
          title="Connect Wallet"
          onCancel={() => setVisible(false)}
        >
          <>
            <div className="flex align-center mt2">
              <div style={{ color: "#575757" }}>
                <a
                  className="text-center text-decoration-none link-color"
                  href="https://www.trufflesuite.com/docs/truffle/getting-started/truffle-with-metamask"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn how to configure your metamask wallet
                </a>
              </div>
            </div>
            <div className="connection-channels">
              <div
                onClick={() => {
                  dispatch(connectWallet());
                  setVisible(false); // close the modal
                  history.push("/");
                }}
              >
                <div className="flex justify-space-between align-center">
                  <div>
                    <div className="font16">MetaMask</div>
                    <div style={{ color: "#FF6600", fontSize: 10 }}>
                      Recommended
                    </div>
                  </div>
                  <div>
                    <img src={Metamask} alt="metamask" />
                  </div>
                </div>
              </div>
              <button
                style={{
                  background: "transparent",
                  fontWeight: "bold",
                  cursor: "pointer",
                  color: "red",
                  display: "flex",
                  alignItems: "center",
                }}
                onClick={() => {
                  dispatch(disconnect());
                  history.push('/');
                  setVisible(false);
                }}
              >
                {address.length === 0 ? "" : "Disconnect"}
              </button>
            </div>
          </>
        </ConnectModal>
      </main>
    </div>
  );
}

export default Home;

const tokens = [
  {
    logo: "",
    name: "Token A",
  },
  {
    logo: "",
    name: "Token B",
  },
];
