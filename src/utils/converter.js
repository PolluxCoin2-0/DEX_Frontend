export function to6Decimal(amount) {
    let result = amount * Math.pow(10, 6);
    return result;
}

export function to18Decimal(amount) {
    let result = amount * Math.pow(10, 18);
    return result;
}

export function without6Decimal(amount) {
    let result = amount / Math.pow(10, 6);
    return result;
}

export function without18Decimal(amount) {
    let result = amount / Math.pow(10, 18);
    return result;
}