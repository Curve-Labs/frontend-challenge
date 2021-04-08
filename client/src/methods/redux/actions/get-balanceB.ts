
import tokenBBalance from "../../contract/GetTokenBBalance";
import _const from "../../_const";

function gettokenBBalance() {
  return async (dispatch: Function) => {

    try {

      let res = await tokenBBalance();
      console.log(res, "balance")

      dispatch({
        type: _const.BALANCE_B,
        payload: res
      })

    } catch (e) {
      throw e;
    }

  }
}


export default gettokenBBalance;