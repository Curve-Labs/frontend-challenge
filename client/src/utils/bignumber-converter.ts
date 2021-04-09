function toBigNumber(amount: number) {
    return BigInt(amount * Math.pow(10, 18));
}

function fromBigNumber(amount: number) {
    return amount * Math.pow(10, -18);
}

export { toBigNumber, fromBigNumber };
