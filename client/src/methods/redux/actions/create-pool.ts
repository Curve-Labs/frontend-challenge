import CreatePool from "../../contract/CreatPool";
import loader from "../../../utils/loader";
import randomgen from "../../../utils/random-gen";

function CreateSwapPool() {
  return async (dispatch: Function) => {
    const id = randomgen();
    dispatch(loader(id));

    try {
      let res = await CreatePool();

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

export default CreateSwapPool;
