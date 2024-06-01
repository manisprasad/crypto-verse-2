// abbreviations.js
const abbreviation = {
    K: 1000,
    M: 1000000,
    B: 1000000000,
    T: 1000000000000,
    Q: 1000000000000000 // Quadrillion
};

export const numberAbbreviation = (number) => {
    // if (!Number.isFinite(number)) {
    //     throw new Error('Input must be a finite number');
    // }

    const tier = Math.floor(Math.log10(Math.abs(number)) / 3);

    if (tier === 0) return number.toString();

    const suffix = Object.keys(abbreviation)[tier - 1];
    if(suffix === 'Q') return (number / abbreviation.Q).toFixed(1) + suffix;
    const scale = Math.pow(10, tier * 3);
    const scaled = number / scale;

    return scaled.toFixed(1) + suffix;
};

export default numberAbbreviation;
