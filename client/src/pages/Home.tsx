import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from './components/ThemeWrapper';
import TokenModal from './components/TokenModal';
import TokenSelect from './components/TokenModal';
import Logo from '../images/logo.png'
import ConnectModal from './components/ConnectModal';

function Home() {

  const { theme, toggle } = useContext(ThemeContext);
  const [from, setFrom] = useState<any>({});
  const [to, setTo] = useState<any>({});
  const [visible, setVisible] = useState(false);


    function openConnectionModal() {
      setVisible(true);
    }

  useEffect(() => {
    setFrom(tokens[0]);
    // eslint-disable-next-line
  }, [])

  return (
    <div className="Home">
      <header className="Home-header">
        <figure>
          <img src={Logo} style={{width:35}} alt="logo" />
        </figure>
        <ul>
          <li>
            <a href="#">ZSwap</a>
          </li>
         
        </ul>
      </header>
      <section className="wallet">
        <button className="z-swap">ZSwap</button>
        <button className="connect-wallet" onClick={openConnectionModal}>Connect wallet</button>
        <button onClick={toggle}>
          {
            theme === "light" ?
              <span className="material-icons">light_mode</span> :
              <span className="material-icons">dark_mode</span>
          }
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
            <TokenSelect token={from} selected={setFrom} />
          </section>

          <div>
            <span
              className="material-icons arrow-downward">arrow_downward</span>
          </div>

          <section className="swaps">
            <h3>To</h3>
            <h3>Balance</h3>
            <input type="text" placeholder="0.00" />
            <TokenSelect token={to} selected={setTo} />
          </section>

          <section>
            <button className="submit-button" onClick={openConnectionModal}>Connect Wallet</button>
          </section>
        </section>
        <ConnectModal visible={visible} title="Connect Wallet" onCancel={() => setVisible(false)}>
          <div></div>
        </ConnectModal>
      </main>
    </div>
  );
}

export default Home;


const tokens = [
  {
    logo: "",
    name: "Token A"
  },
  {
    logo: "",
    name: "Token B"
  },

]
