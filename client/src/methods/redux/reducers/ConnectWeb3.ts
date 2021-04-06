import _const from '../../_const';

type Action = {
    type: string;
    payload: any;
};

const initialState = {
    address: '',
};

const ConnectWeb3 = (state = initialState, action: Action) => {
    switch (action.type) {
        case _const.ADDRESS:
            return { ...state, address: action.payload };
        default:
            return state;
    }
};

export default ConnectWeb3;