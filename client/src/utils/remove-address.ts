import _const from '../methods/_const';

function removeAddress() {
    sessionStorage.removeItem(_const.TOKEN);
}

export default removeAddress;