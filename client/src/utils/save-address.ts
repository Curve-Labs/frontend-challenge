import _const from '../methods/_const';

/**
 *
 * Keeps the logged in clients address to the browsers localStorage
 * @param address
 */
function saveAddress(address: string) {
    sessionStorage.setItem(_const.TOKEN, address);
}

export default saveAddress;