import Web3Modal from "web3modal";
import Web3 from "web3";
import saveAddress from "../../../utils/save-address";
import removeAddress from "../../../utils/remove-address";
import _const from "../../_const";
import Swal from "sweetalert2";

export const web3Connection = async function () {
  const provider = _const.PROVIDER;
  const web3 = new Web3(provider);
  const accounts = await web3.eth.getAccounts();
  console.log(accounts, "accounts")
  return web3;
};

//this method connects the clients crypto wallet to the app
export const connectWallet = () => async (dispatch: Function) => {
  if (typeof window.ethereum !== "undefined") {
    const web3 = await web3Connection();
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];

    saveAddress(account);

    dispatch({
      type: _const.ADDRESS,
      payload: account,
    });
  } else {
    Swal.fire({
      title: "Metamask not found",
      showConfirmButton: false,
      text: "Please install Metamask",
      showCloseButton: false,
      footer:
        '<a href="https://metamask.io/download.html" target="_blank">Install Metamask</a>',
    });
  }
};

export const disconnect = () => async (dispatch: Function) => {
  removeAddress();

  dispatch({
    type: _const.PRISTINE,
  });
};
