function truncateAddress(address: string) {
    if (address.length > 15) {
        address = address.slice(0, 6) + '...' + address.slice(-4);
    }

    return address;
}

export default truncateAddress;