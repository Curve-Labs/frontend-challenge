import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "./components/ThemeWrapper";
import TokenModal from "./components/TokenModal";
import {connectWallet, disconnect} from '../methods/redux/actions/connect-web3';
import retrieveAddress from '../utils/retrieve-address';
import truncateAddress from '../utils/truncate-address';
import TokenSelect from "./components/TokenModal";
import Logo from "../images/logo.png";
import ConnectModal from "./components/ConnectModal";
import Metamask from "../images/metamask.svg";


function Home() {
  const { theme, toggle } = useContext(ThemeContext);
  const [from, setFrom] = useState<any>({});
  const [to, setTo] = useState<any>({});
  const [visible, setVisible] = useState(false);

  function openConnectionModal() {
    setVisible(true);
  }

  const handleTokenSelection = (token:any, dest:"from"|"to", callback?:Function) => {
    if(dest === "from"){
      if(token.name === to.name){
        // switch the tokens
        const currentFrom = from;
        setFrom(to);
        setTo(currentFrom);
      } else {
        setFrom(token);
      }
      callback && callback();
    }

    if(dest === "to"){
      if(token.name === from.name){
        // switch the tokens
        const currentTo = to;
        setTo(from);
        setFrom(currentTo);
      } else {
        setTo(token);
      }
      callback && callback();
    }

  }

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
        <button className="connect-wallet" onClick={openConnectionModal}>
          Connect wallet
        </button>
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
            <TokenSelect name="from" token={from} selected={handleTokenSelection} nonSelectToken={to.name} />
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
            <TokenSelect name="to" token={to} selected={handleTokenSelection} nonSelectToken={from.name} />
          </section>

          <section>
            <button className="submit-button" onClick={openConnectionModal}>
              Connect Wallet
            </button>
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
                 // dispatch(connectWallet());
                  setVisible(false); // close the modal
                  // history.push("/");
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
