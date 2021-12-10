export const toFixedNum = (rawNumber, precision = 5) => {
    if(isNaN(rawNumber)) return rawNumber;
    const number = Number(rawNumber);
    const fixedNumber = number.toFixed(precision);
    return number ? +(fixedNumber) : fixedNumber;
};