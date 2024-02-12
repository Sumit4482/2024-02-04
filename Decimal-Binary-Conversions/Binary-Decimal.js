/**
 * Converts a decimal number to its binary representation with the specified length.
 * @param {Number} num - Decimal number to convert.
 * @param {Number} length - Length of bits for the binary representation.
 * @returns {Array} - Binary representation of num with the specified length.
 * @throws {Error} - Throws an error if num cannot fit into the specified length.
 */
function decimalToBinary(num, length) {
    let binary = [];
    let numCopy = num;

    // Calculate binary representation
    while (num !== 0) {
        binary.unshift(num % 2);
        num = Math.floor(num / 2);
    }

    // Pad the output array if necessary
    if (length !== undefined && length - binary.length < 0) {
        throw new Error(`The ${numCopy} cannot be fit into an array of ` +
            `length ${length}`);
    } else if (length !== undefined) {
        let iterations = length - binary.length;
        for (let i = 0; i < iterations; i++) {
            binary.unshift(0);
        }
    }

    return binary;
}

/**
 * Converts an array to a human-readable string format.
 * @param {Array} arr - The array to be converted to a string.
 * @return {String} - A human-readable string representation of the given array.
 */
function toReadableArray(arr) {
    return "[" + arr.join(", ") + "]";
}

/**
 * Computes the Two's Complement representation of a binary array.
 * @param {Array} binary - Binary array.
 * @returns {Array} - Two's Complement of the given binary array.
 */
function twosComplement(binary) {
    // Perform 1's complement
    for (let i = 0; i < binary.length; i++) {
        binary[i] = (binary[i] === 0) ? 1 : 0;
    }

    // Perform 2's complement by adding 1 to the last bit
    let carry = 1;
    for (let i = binary.length - 1; i >= 0; i--) {
        let sum = binary[i] + carry;
        binary[i] = sum % 2;
        carry = Math.floor(sum / 2);
    }

    return binary;
}

/**
 * Computes the Two's Complement representation of a decimal number.
 * @param {Number} num - Decimal number.
 * @param {Number} length - Length of bits for the Two's Complement representation.
 * @returns {Array} - Binary Two's Complement.
 * @throws {Error} - Throws an error if the length of the output exceeds 52.
 */
function simpleTwosComplement(num, length) {
    if (length > 52) {
        throw new Error("Length of digits should not exceed 52");
    }

    if (num >= 0) {
        return decimalToBinary(num, length);
    } else {
        num = -num;
        let outputBinary = decimalToBinary(num, length);
        return twosComplement(outputBinary);
    }
}

/**
 * Converts a binary array to its decimal representation.
 * @param {Array} binary - Binary array.
 * @returns {Number} - Decimal representation.
 */
function binaryToDecimal(binary) {
    let power = 1;
    let sum = 0;
    for (let i = binary.length - 1; i >= 0; i--) {
        sum = power * binary[i] + sum;
        power *= 2;
    }
    return sum;
}

/**
 * Converts a binary array into a decimal number by performing Two's Complement.
 * @param {Array} binary - Binary array.
 * @returns {Number} - Decimal representation.
 */
function decimalFromTwosComplement(binary) {
    if (binary[0] === 0) {
        return binaryToDecimal(binary);
    } else {
        twosComplement(binary);
        return -binaryToDecimal(binary);
    }
}

/**
 * Splits a decimal number into its integer and fractional parts.
 * @param {Number} num - Decimal number.
 * @returns {Array} - Array containing integer and fractional parts.
 */
function splitDecimalIntoParts(num) {
    let strNum = num.toString();
    let parts = strNum.split('.');
    parts[1] = "0." + parts[1];
    for (let i = 0; i < parts.length; i++) {
        parts[i] = parseFloat(parts[i]);
    }
    return parts;
}

/**
 * Handles the fractional part of a decimal number after the radix point.
 * @param {Number} floatNum - Decimal number after the radix point.
 * @returns {Array} - Array of numbers representing binary.
 */
function handleFractionalPart(floatNum) {
    let count = 0;
    let result = [];
    while (floatNum !== 1 && count !== 10) {
        floatNum *= 2;
        result.push(Math.floor(floatNum));
        if (floatNum > 1) {
            floatNum -= 1;
        }
        count++;
    }
    return result;
}

/**
 * Converts a decimal number to its JavaScript number representation.
 * @param {Number} num - Decimal number.
 * @returns {Array} - Array representing the JavaScript number.
 */
function jsNumberRepresentation(num) {
    let signFlag = 0;
    if (Math.sign(num) === -1) {
        num = -num;
        signFlag = -1;
    }

    let parts = splitDecimalIntoParts(num);
    let integerPartBinary = decimalToBinary(parts[0]);
    let fractionalPartBinary = handleFractionalPart(parts[1]);

    for (let i = 0; i < 4; i++) {
        integerPartBinary.unshift(0);
    }
    let lengthTillRadixPoint = integerPartBinary.length;

    let combinedBinary = [...integerPartBinary, ...fractionalPartBinary];
    if (signFlag === -1) {
        combinedBinary = twosComplement(combinedBinary);
    }

    let leadingOnePosition;
    for (let i = 0; i < combinedBinary.length; i++) {
        if (combinedBinary[i] === 1) {
            leadingOnePosition = i;
            break;
        }
    }

    let exponent = (lengthTillRadixPoint - 1) - leadingOnePosition;
    let exponentBinary = simpleTwosComplement(exponent, 11);
    let jsRepresentation = [...exponentBinary];

    for (let i = leadingOnePosition - 1; i < combinedBinary.length; i++) {
        jsRepresentation.push(combinedBinary[i]);
    }

    if (jsRepresentation.length !== 16) {
        let jsRepresentationLength = jsRepresentation.length;
        for (let i = 0; i < (16 - jsRepresentationLength); i++) {
            jsRepresentation.push(0);
        }
    }

    return jsRepresentation;
}
