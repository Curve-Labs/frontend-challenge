
import _const from "../methods/_const";

const loader = (id: string) => (dispatch: Function) => {
  dispatch({
    type: _const.QUEUE,
    payload: id
  })
}

export default loader;