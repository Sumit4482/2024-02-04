
    /**
     * Prints a Two's Complement of Decimal Number.
     * @param {Number} number - The Decimal Number to get Result for.
     * @param {Number} length - The Length of result which is going to be printed.
     */
function getSimpleTwosComplement(number,length){
    let temp = number;
    if(number>=0){
        let ans = new  Array(length).fill(0);
        for(let i = length;i>0;i--){
            ans[i]=number%2;
            number=Math.floor(number/2);
        }   
        console.log("Binary Representation of " + temp +" is :",ans);
    }else{
        number = Math.abs(number);
        number--;
        let ans = new  Array(length).fill(0);
        for(let i = length;i>0;i--){
            ans[i]=number%2;
            number=Math.floor(number/2);
        }   
     console.log("Binary Representation of " + temp +" is :",ans);
    }
    // return ans;s
}



function getSimpleDecimalForm(){

}


getSimpleTwosComplement(1,52);
