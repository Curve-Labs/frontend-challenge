import React, { useState } from 'react';
import Logo from '../../images/logo.png'

type Props = {
  token: any
  selected?: Function
}

function TokenSelect(props: Props) {
  const { token, selected } = props;
  const [visible, setVisible] = useState(false);


  const selectToken = (data: any) => {
    selected && selected(data);
    setVisible(false);
  }


  return (
    <React.Fragment>

      {
        token && Object.keys(token).length === 0 ?
          <button onClick={() => setVisible(true)} className="select-a-token">
            <p>Select a token</p>
            <span className="material-icons">expand_more</span>
          </button> :
          <button onClick={() => setVisible(true)} className="selected-token">
            <figure>
              <img src={Logo} alt="" />
            </figure>
            <p>{token.name}</p>
          </button>
      }
      {
        visible &&
        <div className="modal">
          <section>
            <h3 className="title">Select a token</h3>
            <button
              className="close-modal"
              onClick={() => setVisible(false)}>
              <span className="material-icons">close</span>
            </button>
            <ul className="token-selection">
              {
                tokens.map((item, i) => (
                  <li key={i}>
                    <button onClick={() => selectToken(item)}>
                      <figure>
                        <img src="https://app.uniswap.org/static/media/logo.742edb09.svg" alt="" />
                      </figure>
                      <div>
                        <p className="token-name">{item.name}</p>
                        <p className="token-desc">{item.desc}</p>
                      </div>
                    </button>
                  </li>
                ))
              }
            </ul>
          </section>
        </div>
      }
    </React.Fragment>
  )
}

export default TokenSelect;



const tokens = [
  {
    logo: "",
    name: "Token A",
    desc: "Token A"
  },
  {
    logo: "",
    name: "Token B",
    desc: "Token B"
  },

]