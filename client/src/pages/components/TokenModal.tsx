import React, { useState } from 'react';
import Logo from '../../images/logo.png'

type Props = {
  token: any
  name:"from"|"to"
  nonSelectToken?:string
  selected?: Function
}

function TokenSelect(props: Props) {
  const { token, name, selected, nonSelectToken } = props;
  const [visible, setVisible] = useState(false);


  const selectToken = (data: any) => {
    selected && selected(data, name, () => setVisible(false));
  }

  const selectDisabled = (tokenName:string) => tokenName === token.name;
const selectChoosen = (tokenName:string) => tokenName === nonSelectToken || tokenName === token.name;


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
                    <button disabled={selectDisabled(item.name)} onClick={() => selectToken(item)} className={selectChoosen(item.name) ? "choosen":""}>
                      <figure>
                        <img src={item.logo} alt="" />
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
    logo: Logo,
    name: "Token A",
    desc: "Token A"
  },
  {
    logo: Logo,
    name: "Token B",
    desc: "Token B"
  },
]