export const toFixedNum = (rawNumber, precision = 5) => {
    if(isNaN(rawNumber)) return rawNumber;

    const number = Number(rawNumber);
    const fixedNumber = Number(number.toFixed(precision));

    return number !== 0 && fixedNumber === 0 ? 1 / Math.pow(10, precision) : fixedNumber;
};