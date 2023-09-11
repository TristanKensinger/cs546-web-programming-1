//returns the mean value of the elements of an array
function mean(array){
    //https://stackoverflow.com/questions/4775722/how-can-i-check-if-an-object-is-an-array
    if(Object.prototype.toString.call(array) != '[object Array]') {
        throw 'Input must be an array!';
    }
    if(array.length < 1){
        throw 'Array must not be empty!';
    }
    let total = 0;
    for(let i=0; i<array.length; i++){
        if(typeof array[i] != 'number'){
            throw 'All elements of the array must be numbers!';
        }
        total += array[i];
    }
    return total/array.length;
}

//returns the median value of the elements of an array squared
function medianSquared(array){
    if(Object.prototype.toString.call(array) != '[object Array]') {
        throw 'Input must be an array!';
    }
    if(array.length < 1){
        throw 'Array must not be empty!';
    }
    for(let i=0; i<array.length; i++){
        if(typeof array[i] != 'number'){
            throw 'All elements of the array must be numbers!';
        }
    }
    array = myBubbleSort(array);
    return Math.pow(array[Math.floor(array.length/2)], 2);
}

//bubble sorts an array of numbers in ascending order
function myBubbleSort(array){
    //https://www.geeksforgeeks.org/bubble-sort-algorithms-by-using-javascript/
    for(let i=0; i<array.length; i++){
        for(let j=0; j<array.length-i-1; j++){
            if(array[j] > array[j+1]){
                let temp = array[j];
                array[j] = array[j+1];
                array[j+1] = temp;
            }
        }
    }
    return array;
}

//returns the largest element and its index of an array
function maxElement(array){
    if(Object.prototype.toString.call(array) != '[object Array]') {
        throw 'Input must be an array!';
    }
    if(array.length < 1){
        throw 'Array must not be empty!';
    }
    let maxValue = array[0];
    let maxIndex = 0;
    for(let i=0; i<array.length; i++){
        if(typeof array[i] != 'number'){
            throw 'All elements of the array must be numbers!';
        }
        if(array[i] > maxValue){
            maxValue = array[i];
            maxIndex = i;
        }
    }
    let result = {};
    result[maxValue] = maxIndex;
    return result;
}

//creates an end length array with elements of value
function fill(end, value){
    if(typeof end != 'number'){
        throw 'End must be a number!';
    }
    if(end < 1){
        throw 'End must be a positive number greater than 0!'
    }
    array = [];
    if(arguments.length == 1){
        for(let i=0; i<end; i++){
            array.push(i);
        }
    } else {
        for(let i=0; i<end; i++){
            array.push(value);
        }
    }
    return array;
}

//returns an object with the count of each element that is repeating in the array
function countRepeating(array){
    if(Object.prototype.toString.call(array) != '[object Array]') {
        throw 'Input must be an array!';
    }
    let result = {};
    if(array.length > 0){
        //add all instances to result with proper counts
        for(let i=0; i<array.length; i++){
            let key = array[i];
            if(!(key in result)){
                result[key] = 1;
            } else {
                result[key] = result[key] + 1;
            }
        }
        //remove keys with one instance
        let keys = Object.keys(result);
        for(let i=0; i<keys.length; i++){
            let key = keys[i];
            if(result[key] < 2){
                delete result[key];
            }
        }
    }
    return result;
}

//breaks a list into numbers, strings, and subarrays, bubble sorts them, and returns the concatenation of them
function sortArray(array){
    //breaking up elements
    let numbers = [];
    let strings = [];
    let subarrays = [];
    for(let i=0; i<array.length; i++){
        if(typeof array[i] == 'number'){
            numbers.push(array[i]);
        } else if(typeof array[i] == 'string'){
            strings.push(array[i].trim());
        } else if(Object.prototype.toString.call(array[i]) == '[object Array]'){
            subarrays = subarrays.concat([sortArray(array[i])]);
        }
    }
    //sorting
    numbers = myBubbleSort(numbers);
    strings = myBubbleSort(strings);
    return numbers.concat(strings).concat(subarrays);
}

//returns whether two arrays are equal in size and in elements
function isEqual(arrayOne, arrayTwo){
    if(Object.prototype.toString.call(arrayOne) != '[object Array]') {
        throw 'Input1 must be an array!';
    }
    if(Object.prototype.toString.call(arrayTwo) != '[object Array]') {
        throw 'Input2 must be an array!';
    }
    arrayOne = sortArray(arrayOne);
    arrayTwo = sortArray(arrayTwo);
    if(arrayOne.length != arrayTwo.length){
        return false;
    }
    for(let i=0; i<arrayOne.length; i++){
        //check for subarrays
        if(Object.prototype.toString.call(arrayOne[i]) == '[object Array]' && Object.prototype.toString.call(arrayTwo[i]) == '[object Array]') {
            if(!isEqual(arrayOne[i], arrayTwo[i])){
                return false;
            }
        } else if(Object.prototype.toString.call(arrayOne[i]) == '[object Array]'){
            return false;
        } else if(Object.prototype.toString.call(arrayTwo[i]) == '[object Array]'){
            return false;
        } else if(arrayOne[i] !== arrayTwo[i]){
            return false;
        }
    }
    return true;
}

module.exports = {mean, medianSquared, maxElement, fill, countRepeating, isEqual};

//Debugging
//console.log(mean());
//console.log(medianSquared());
//console.log(maxElement([1,2,"nope"]));
//console.log(fill(-4));
//console.log(countRepeating({a: 1, b: 2, c: "Patrick"}));
//console.log(isEqual([1, 2, 3], [3, 1, 2]));