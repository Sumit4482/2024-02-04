/**
 * Problem Statement : 
 * We need to create functions for performing basic arithmetic
 * operations (addition, subtraction, and multiplication) on
 * two arrays. Each array represents a number, with digits indicating the
 * place value.
 * 
 *  Example :
 *  Addition :
     [1,0,0]
    +[1,0,1]
    ----------
     [2,0,1]
 */

/**
 * Implementation of Infinite Precision Arithmetic
 * using classes
 */

class ArithmeticOperations {
  /**
   * Adds two arrays of numbers.
   * @param {Array} array1 - The First Array to Add.
   * @param {Array} array2 - The Second Array to Add.
   * @returns {Array} - The result of summing array1 and array2.
   * @throws {Error} - If Any of the Array is Empty
   * @throws {Error} - If Any of the Array does not contain Number
   * @throws {Error} - If Any of the Array Contains Negative Number
   */
  static addTwoArray(array1, array2) {
    const lengthOfArray1 = array1.length;
    const lengthOfArray2 = array2.length;

    this.validateArray(array1, array2);

    let result = []; //Hold the Result {Addition of Two Array}
    let carry = 0; // Hold the Carry Sum
    let sum, remainder; //Holds the Sum,Remainder
    let array1Ptr = lengthOfArray1 - 1; // Pointer fo  array1 to keep track
    let array2Ptr = lengthOfArray2 - 1; // Pointer fo  array2 to keep track

    for (let i = Math.min(lengthOfArray1, lengthOfArray2); i > 0; i--) {
      sum = array1[array1Ptr] + array2[array2Ptr] + carry;
      remainder = sum % 10;
      carry = Math.floor(sum / 10);
      result.unshift(remainder);
      array1Ptr--;
      array2Ptr--;
    }

    for (let i = array1Ptr; i >= 0; i--) {
      sum = array1[i] + carry;
      remainder = sum % 10;
      carry = Math.floor(sum / 10);
      result.unshift(remainder);
    }
    for (let i = array2Ptr; i >= 0; i--) {
      sum = array2[i] + carry;
      remainder = sum % 10;
      carry = Math.floor(sum / 10);
      result.unshift(remainder);
    }
    //IF After adding both arrays if carry is remaining then we will append carry
    if (carry !== 0) {
      if (carry < 9) {
        result.unshift(carry);
      } else {
        while (carry > 0) {
          let rem = carry % 10;
          result.unshift(rem);
          carry = Math.floor(carry / 10);
        }
      }
    }
    return result;
  }

  /**
   * Subtracts array2 from array1.
   * @param {Array} array1 - The array to subtract from.
   * @param {Array} array2 - The array to subtract.
   * @returns {Array} - The result of subtracting array2 from array1.
   * @throws {Error} - If Any of the Array is Empty
   * @throws {Error} - If Any of the Array does not contain Number
   * @throws {Error} - If Any of the Array Contains Negative Number
   */
  static subtractTwoArray(array1, array2) {
    const lengthOfArray1 = array1.length;
    const lengthOfArray2 = array2.length;

    // Removes Leading Zeros
    array1 = this.removeLeadingZeros(array1);
    array2 = this.removeLeadingZeros(array2);

    this.validateArray(array1, array2);

    // Check if array2 is greater than array1
    if (this.compareArrays(array2, array1)) {
      const result = this.subtractTwoArray(array2, array1);
      return result[0] === 0 ? result : [-result[0]].concat(result.slice(1));
    }

    let result = [];
    let borrow = 0;

    // Perform subtraction digit by digit
    for (let i = lengthOfArray1 - 1, j = lengthOfArray2 - 1; i >= 0; i--, j--) {
      let diff = (array1[i] || 0) - (array2[j] || 0) - borrow;
      if (diff < 0) {
        diff += 10;
        borrow = 1;
      } else {
        borrow = 0;
      }
      result.unshift(diff);
    }

    while (result[0] === 0) {
      result.shift();
    }
    return result;
  }

  /**
   * Multiplies two arrays of numbers.
   * @param {Array} a1 - The first array to multiply.
   * @param {Array} a2 - The second array to multiply.
   * @returns {Array} - The result of multiplying a1 and a2.
   * @throws {Error} - If any of the arrays is empty or contains NaN values.
   */
  static multiplyTwoArrays(a1, a2) {
    this.validateArray(a1, a2);
    let result = [0];
    // Iterate through the digits of the second array
    for (let i = a2.length - 1; i >= 0; i--) {
      // Multiply the first array by a single digit of the second array
      const temp = this.multiplySingleDigit(a1, a2[i]);
      for (let j = 0; j < a2.length - 1 - i; j++) {
        temp.push(0);
      }
      // Add the temporary result to the final result
      // Calling AddTwoArray Function which is already defined
      result = this.addTwoArray(result, temp);
    }
    return result;
  }

  /**
   * Multiply a number array by a single digit
   * Helper Function for Multiply Two Array
   * @param {Array} array1 - The first array to compare.
   * @param {Number} digit - The second array to compare.
   * @returns {Array} - Result of Multiplying a number array by digit
   */
  static multiplySingleDigit(numArr, digit) {
    let result = [];
    let carry = 0;
    for (let i = numArr.length - 1; i >= 0; i--) {
      const product = numArr[i] * digit + carry;
      result.unshift(product % 10);
      carry = Math.floor(product / 10);
    }
    while (carry > 0) {
      result.unshift(carry % 10);
      carry = Math.floor(carry / 10);
    }
    return result;
  }

  /**
   * Remove Leading zeros  from the input array.
   * @param {Array} array - The first array to remove leading zeros.
   * @returns {Array} - Array after removing leading zeros
   */
  static removeLeadingZeros(array) {
    let i = 0;
    while (array[i] === 0 && i < array.length - 1) {
      i++;
    }
    return array.slice(i);
  }

  /**
   * Compares two arrays of numbers.
   * @param {Array} array1 - The first array to compare.
   * @param {Array} array2 - The second array to compare.
   * @returns {boolean} - true if array1 is greater than array2, false otherwise.
   */
  static compareArrays(array1, array2) {
    if (array1.length !== array2.length) {
      return array1.length > array2.length;
    }
    for (let i = 0; i < array1.length; i++) {
      if (array1[i] !== array2[i]) {
        return array1[i] > array2[i];
      }
    }
    return false;
  }

  /**
   * This Function do all the Validation Operations
   * @param {Array} arr1 - The first array to Validate
   * @param {Array} arr2 - The second array to Validate
   * @throws {Error} - If Any of the Array is Empty
   * @throws {Error} - If Any of the Array does not contain Number
   * @throws {Error} - If Any of the Array Contains Negative Number or Decimal
   */
  static validateArray(array1, array2) {
    const lengthOfArray1 = array1.length;
    const lengthOfArray2 = array2.length;

    if (lengthOfArray1 === 0 || lengthOfArray2 === 0) {
      throw new Error("Arrays should not be empty");
    }

    if (
      !array1.every((num) => typeof num === "number") ||
      !array2.every((num) => typeof num === "number")
    ) {
      throw new Error("Arrays should contain only numbers");
    }

    for (let i = 0; i < lengthOfArray1; i++) {
      if (array1[i] < 0) {
        throw new Error("Arrays Should Contains Positive Values");
      }
      if (array1[i] % 1 !== 0) {
        throw new Error("Arrays Should Not Contains Decimal Values");
      }
    }
    for (let i = 0; i < lengthOfArray2; i++) {
      if (array2[i] < 0) {
        throw new Error("Arrays Should Contains Positive Values");
      }
      if (array2[i] % 1 !== 0) {
        throw new Error("Arrays Should Not Contains Decimal Values");
      }
    }
  }

  /**
   * Divide two Arrays of Numbers
   * @param {Array} array1 - The First Array acts as Numerator
   * @param {Array} array2 - The Second Array acts as Denominator
   * @throws {Error} - If the Denominator is Zero
   */
  static divideTwoArray(array1, array2) {
    this.validateArray(array1, array2);
    const isAllZero = array2.every((item) => item === 0);
    if (!isAllZero) {
      throw new Error("Denominator Cannot be Negative");
    }
  }
}

const s1 = [9, 9, 9, 9];
const s2 = [1, 0, 0, 0, 0];

console.log(ArithmeticOperations.addTwoArray(s1, s2));
console.log(ArithmeticOperations.subtractTwoArray(s1, s2));
console.log(ArithmeticOperations.multiplyTwoArrays(s1, s2));
