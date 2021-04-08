
import tokenABalance from "../../contract/GetTokenABalance";
import _const from "../../_const";

function getTokenABalance() {
  return async (dispatch: Function) => {

    try {

      let res = await tokenABalance();
      console.log(res, "balance")

      dispatch({
        type: _const.BALANCE_A,
        payload: res
      })

    } catch (e) {
      throw e;
    }

  }
}


export default getTokenABalance;