import React, { useContext, useEffect, useState } from 'react';
import  {ThemeContext} from './components/ThemeWrapper';


function Home() {

  const { theme, toggle } = useContext(ThemeContext);
  const [from, setFrom] = useState<any>({});
  const [to, setTo] = useState<any>({});

  useEffect(() => {
    setFrom(tokens[0]);
    // eslint-disable-next-line
  }, [])

  return (
    <div className="Home">
      <header className="Home-header">
        <figure>
          <img src="https://app.uniswap.org/static/media/logo.742edb09.svg" alt="" />
        </figure>
        <ul>
          <li>
            <a href="#">Swap</a>
          </li>
         
          <li className="charts">
            <a href="#">Charts</a>
          </li>
        </ul>
      </header>
      <section className="wallet">
        <button>Connect wallet</button>
        <button onClick={toggle}>
          <span className="material-icons">light_mode</span>
          <span className="material-icons">dark_mode</span>
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
            {
              from && Object.keys(from).length === 0 ?
                <button>Select a token</button> :
                <button className="selected-token">
                  <figure>
                    <img src="https://app.uniswap.org/static/media/logo.742edb09.svg" alt="" />
                  </figure>
                  <p>{from.name}</p>
                </button>
            }
          </section>

          <div>
            <span
              className="material-icons arrow-downward">arrow_downward</span>
          </div>

          <section className="swaps">
            <h3>To</h3>
            <h3>Balance</h3>
            <input type="text" placeholder="0.00" />
            {
              to && Object.keys(to).length === 0 ?
                <button>Select a token</button> :
                <button className="selected-token">
                  <figure>
                    <img src="https://app.uniswap.org/static/media/logo.742edb09.svg" alt="" />
                  </figure>
                  <p>{to.name}</p>
                </button>
            }
          </section>

          <section>
            <button className="submit-button">Connect Wallet</button>
          </section>
        </section>
      </main>
    </div>
  );
}

export default Home;


const tokens = [
  {
    logo: "",
    name: "ETH"
  },
  {
    logo: "",
    name: "ANT"
  },
  {
    logo: "",
    name: "AAVE"
  },
]
