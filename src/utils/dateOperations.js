
export const secondsToStr = (secondsLeft) => {
    const addZero = (num) => {
        const numStr = String(num);
        return numStr.length === 1 ? `0${numStr}` : numStr;
    }

    const seconds = secondsLeft % 60;
    const minutes = (secondsLeft - seconds) / 60 || 0;

    return `${addZero(minutes)}:${addZero(seconds)}`;
}