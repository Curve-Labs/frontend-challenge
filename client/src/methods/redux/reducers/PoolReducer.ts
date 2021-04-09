import _const from "../../_const";

const initialData = {
  poolData: {},
  balance_a:"0",
  balance_b:"0"
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
      case _const.BALANCE_A:
        return {
          ...state,
          balance_a:action.payload,
        }
        case _const.BALANCE_B:
          return {
            ...state,
            balance_b:action.payload,
          }
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
