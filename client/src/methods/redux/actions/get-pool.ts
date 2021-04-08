import GetPool from "../../contract/GetPool";
import loader from "../../../utils/loader";
import randomgen from "../../../utils/random-gen";
import _const from "../../_const";

function GetPoolData() {
  return async (dispatch: Function) => {
    const id = randomgen();
    dispatch(loader(id));

    try {
      let res = await GetPool();

      dispatch({ type: _const.POOL_DATA, payload: res });

      dispatch(loader(id));
    } catch (err) {
      dispatch(loader(id));
    }
  };
}

export default GetPoolData;
