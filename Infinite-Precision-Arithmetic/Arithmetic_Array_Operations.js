/**
 * Problem Statement : 
 * We need to create functions for performing basic arithmetic
 * operations (addition, subtraction, and multiplication) on
 * two arrays.Each array represents a number, with digits indicating the
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
 * Adds two arrays of numbers.
 * @param {Array} array1 - The First Array to Add.
 * @param {Array} array2 - The Second Array to Add.
 * @returns {Array} - The result of summing array1 and array2.
 * @throws {Error} - If Any of the  Array is Empty
 * @throws {Error} - If Any of the Array does not contain Number
 * @throws {Error} - If Any of the Array Contains Negative Number
 */
function addTwoArray(array1, array2) {

	const lengthOfArray1 = array1.length; // Represents Length of Array1
  const lengthOfArray2 = array2.length; // Represents Length of Array2
 
  validateArray(array1,array2);  // Calling User Defined Validation Funtion

  let result = []; //Hold the Result {Addition of Two Array}
  let carry = 0; // Hold the Carry Sum
  let sum = 0; // Holds the Temporary Sum
  let remainder = 0; //Holds the Remainder
  let array1Ptr = array1.length - 1; // Pointer for array1 to keep track
  let array2Ptr = array2.length - 1; // Pointer fo  array2 to keep track

  for (let i = Math.min(lengthOfArray1,lengthOfArray2); i > 0; i--) {
    sum = array1[array1Ptr] + array2[array2Ptr] + carry;
    remainder = sum % 10;
    carry = Math.floor(sum / 10);
    result.unshift(remainder);
    array1Ptr--;
    array2Ptr--;
  }

  /* For Remaining Values Just append Them
   */
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
  if (carry != 0) {
    if (carry < 9) {
      result.unshift(carry);
    } else {
      let temp1 = carry;
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
function subtractTwoArray(array1, array2) {
  const lengthOfArray1 = array1.length; // Represents Length of Array1
  const lengthOfArray2 = array2.length; // Represents Length of Array2

  // Removes Leading Zeros
  array1=removeLeadingZeros(array1); 
  array2 = removeLeadingZeros(array2); 

  validateArray(array1,array2); // Calling User Defined Validation Funtion

  // Check if array2 is greater than array1
  if (compareArrays(array2, array1)) {
    const result = subtractTwoArray(array2, array1);  // swap the arrays
    // Add negative sign only before the first digit
    return result[0] === 0 ? result : [-result[0]].concat(result.slice(1)); 
  }

  let result = [];
  let borrow = 0;

  // Perform subtraction digit by digit
  for (let i = lengthOfArray1 - 1, j = lengthOfArray2 - 1; i >= 0; i--, j--){
    let diff = (array1[i] || 0) - (array2[j] || 0) - borrow;
    if (diff < 0) {
      diff += 10;
      borrow = 1;
    } else {
      borrow = 0;
    }
    result.unshift(diff);
  }
  // Remove leading zeros
  while (result[0] === 0) {
    result.shift();
  }
  return result;
}

/**
 *  Remove Leading zeros  from the input array.
 * @param {Array} array - The first array to remove leading zeros.
 * @returns {Array} - Array after removing leading zeros
 */
function removeLeadingZeros(array) {
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
function compareArrays(array1, array2) {
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
 * Multiplies two arrays of numbers.
 * @param {Array} a1 - The first array to multiply.
 * @param {Array} a2 - The second array to multiply.
 * @returns {Array} - The result of multiplying a1 and a2.
 * @throws {Error} - If any of the arrays is empty or contains NaN values.
 */
function multiplyTwoArrays(a1, a2) {

  validateArray(a1,a2); // Calling User Defined Validation Funtion
  let result = [0];
  // Iterate through the digits of the second array
  for (let i = a2.length - 1; i >= 0; i--) {
  // Multiply the first array by a single digit of the second array
  const temp = multiplySingleDigit(a1, a2[i]);

  for (let j = 0; j < a2.length - 1 - i; j++) {
    temp.push(0); // Add zeros to the end of temp
  }
  // Add the temporary result to the final result
  // Calling AddTwoArray Function which is already defined
  result = addTwoArray(result, temp); 
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
  function multiplySingleDigit(numArr, digit) {
    let result = [];
    let carry = 0;
    for (let i = numArr.length - 1; i >= 0; i--) {
      const product = numArr[i] * digit + carry;
      result.unshift(product % 10); // Keep only the ones digit
      carry = Math.floor(product / 10);  // Store the carry
    }
     // Store any remaining carry
    while (carry > 0) {
      result.unshift(carry % 10);
      carry = Math.floor(carry / 10);
    }
    return result;
  }




/**
 * This Function do all the Validation Opeations
 * @param {Array} arr1 - The first array to Validate
 * @param {Array} arr2 - The second array to Validate
 * @throws {Error} - If Any of the Array is Empty
 * @throws {Error} - If Any of the Array does not contain Number
 * @throws {Error} - If Any of the Array Contains Negative Number or Decimal
 */

function validateArray(array1,array2){
  
  const lengthOfArray1 = array1.length; // Represents Length of Array1
  const lengthOfArray2 = array2.length; // Represents Length of Array2

  // Check if either array is empty
  if (lengthOfArray1 === 0 || lengthOfArray2 === 0) {
    throw new Error("Arrays should not be empty");
  }

  // Check If Both the Arrays Contain Only Numbers
  if (!array1.every((num) => typeof num === "number") ||
    !array2.every((num) => typeof num === "number")) {
    throw new Error("Arrays should contain only numbers");
  }

  //Check If array contains Only Positive Value
  for (let i = 0; i < lengthOfArray1; i++) {
    if (array1[i] < 0) {
      throw new Error("Arrays Should Contains Positive Values");
    }
  }
  for (let i = 0; i < lengthOfArray2; i++) {
    if (array2[i] < 0) {
      throw new Error("Arrays Should Contains Positive Values");
    }
  }

	//Check If array should not contains Decimal Value
	for (let i = 0; i < lengthOfArray1; i++) {
		if (array1[i] % 1!==0) {
			throw new Error("Arrays Should Not Contains Decimal Values");
		}
	}

	for (let i = 0; i < lengthOfArray2; i++) {
		if (array2[i] % 1!==0) {
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
function divideTwoArray(array1,array2){

  //Validate Both Arrays
  validateArray(array1,array2);

  //Check if the Denominator is Zero
  const isAllZero = array2.every(item => item === 0);
    if(isAllZero == false){
      throw new Error ("Denominator Cannot be Negative");
    }

    

}



s1=[9,9,9,9];
s2 =[1,0,0,0,0];

console.log(addTwoArray(s1,s2));
console.log(subtractTwoArray(s1,s2));
console.log(multiplyTwoArrays(s1,s2));



