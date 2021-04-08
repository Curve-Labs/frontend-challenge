import _const from "../../_const";

const initialData = {
  poolData: {},
};

type Action = {
  type: string;
  payload: any;
};

function PoolReducer(state = initialData, action: Action) {
  switch (action.type) {
    case _const.POOL_DATA:
      return {
        ...state,
        poolData: action.payload,
      };
    case _const.PRISTINE:
      return {
        ...state,
        ...initialData,
      };

    default:
      return state;
  }
}
export default PoolReducer
