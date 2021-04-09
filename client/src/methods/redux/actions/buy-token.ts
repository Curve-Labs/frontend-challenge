import BuyToken from "../../contract/BuyToken";
import loader from "../../../utils/loader";
import randomgen from "../../../utils/random-gen";

function BuyTokenFromPool(amount : number, tokenType:string, poolId: number) {
  return async (dispatch: Function) => {
    const id = randomgen();
    dispatch(loader(id));

    try {
      let res = await BuyToken(amount, tokenType, poolId);

      const arrayOfResProperties = Object.keys(res);

      if (arrayOfResProperties.includes("status") && res.status === true) {
        console.log(res, "res from action");
      }

      dispatch(loader(id));
    } catch (err) {
      dispatch(loader(id));
    }
  };
}

export default BuyTokenFromPool;
