//takes in an array of objects, returns an array of arrays where an array is each key value pair
function makeArrays(array){
    if(Object.prototype.toString.call(array) != '[object Array]') {
        throw 'Input must be an array!';
    }
    if(array.length < 2){
        throw 'Array length must be greater than 1!';
    }
    let result = [];
    for(let i=0; i<array.length; i++){
        if(typeof array[i] != 'object'){
            throw 'All elements of the array should be objects!';
        }
        if(Object.keys(array[i]).length === 0){
            throw 'Objects in the array must not be empty!';
        }
        result = result.concat(Object.entries(array[i]));
    }
    return result;
}

//isDeepEqual recursive helper function
function deepEqual(obj1, obj2){
    //base case
    let obj1Keys = Object.keys(obj1);
    let obj2Keys = Object.keys(obj2);
    if(obj1Keys.length === 0 && obj2Keys.length === 0){
        return true;
    }
    //check if key is in both objects
    let key = obj1Keys[0];
    if(!(key in obj2)){
        return false;
    }
    //check type of value associated with key
    if(typeof obj1[key] == 'object' && typeof obj2[key] == 'object'){
        if(!(deepEqual(obj1[key], obj2[key]))){
            return false;
        }
    } else if(Object.prototype.toString.call(obj1[key]) == '[object Array]' && Object.prototype.toString.call(obj2[key]) == '[object Array]'){
        if(obj1[key].length != obj2[key].length){
            return false;
        }
        for(let i=0; i<obj1[key].length; i++){
            if(obj1[key][i] !== obj2[key][i]){
                return false;
            }
        }
    } else if(typeof obj1[key] === typeof obj2[key]){
        if(typeof obj1[key] == 'string'){
            obj1[key] = obj1[key].trim();
            obj2[key] = obj2[key].trim();
        }
        if(obj1[key] !== obj2[key]){
            return false;
        }
    } else{
        return false;
    }
    delete obj1[key];
    delete obj2[key];
    return deepEqual(obj1, obj2);
}

//returns true if two objects are equal at every level deep
function isDeepEqual(obj1, obj2){
    if(typeof obj1 != 'object'){
        throw 'Input1 must be an object!';
    }
    if(typeof obj2 != 'object'){
        throw 'Input2 must be an object!';
    }
    if(Object.prototype.toString.call(obj1) == '[object Array]') {
        throw 'Input1 must not be an array!';
    }
    if(Object.prototype.toString.call(obj2) == '[object Array]') {
        throw 'Input2 must not be an array!';
    }
    return deepEqual(obj1, obj2);
}

//applies a function to all values of an object
function computeObject(object, func){
    if(typeof object != 'object'){
        throw 'Input1 must be an object!';
    }
    if(Object.prototype.toString.call(object) == '[object Array]') {
        throw 'Input1 must not be an array!';
    }
    if(typeof func != 'function'){
        throw 'Input2 must be a function!';
    }
    let objectKeys = Object.keys(object);
    if(objectKeys.length === 0){
        throw 'Object must not be empty!';
    }
    for(let i=0; i<objectKeys.length; i++){
        let key = objectKeys[i];
        if(typeof object[key] != 'number'){
            throw 'All object values must be numbers!';
        }
        object[key] = func(object[key]);
    }
    return object;
}

module.exports = {makeArrays, isDeepEqual, computeObject};

//Debugging
//const first = { x: 2, y: 3};
//const second = { a: 70, x: 4, z: 5 };
//const third = { x: 0, y: 9, q: 10 };
//console.log(makeArrays([third, first, second, 1]));

//const first = {a: 2, b: 'hello'};
//const second = {a: 2, b: '   hello   '};
//const third = {a: 2, b: 3};
//const forth = {a: {sA: "Hello", sB: "There", sC: "Class", test: {z: [1,2,[7,8,9,{ag: 'apple'}]]}}, b: 7, c: true, d: "Test", e: [1,2,3]};
//const fifth  = {c: true, b: 7, d: "Test", a: {sB: "There", sC: "Class", sA: "Hello", test: {z: [1,2,[7,8,9,{ag: 'apple'}]]}}, e: [1,2,3]};
//console.log(isDeepEqual(fifth, forth));

//console.log(computeObject({ a: 3, b: 7, c: 5 }, n => n * 2));