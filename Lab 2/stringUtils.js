//returns the camelCase of a string
function camelCase(string){
    if(typeof string != 'string'){
        throw 'Input must be a string!';
    }
    string = string.trim();
    if(string.length < 1){
        throw 'The length of the string must be greater than 0!';
    }
    array = string.split(' ');
    result = array[0].toLowerCase();
    for(let i=1; i<array.length; i++){
        let temp = array[i].toLowerCase();
        temp = temp.substr(0,1).toUpperCase() + temp.substr(1);
        result += temp;
    }
    return result;
}

//replaces any characters in a string that are the same as the first character with * or $
function replaceChar(string){
    if(typeof string != 'string'){
        throw 'Input must be a string!';
    }
    string = string.trim();
    if(string.length < 1){
        throw 'The length of the string must be greater than 0!';
    }
    let firstChar = string.charAt(0).toLowerCase();
    let symbol = 0;
    let result = string.charAt(0);
    for(let i=1; i<string.length; i++){
        if(string.charAt(i).toLowerCase() === firstChar){
            if(symbol == 0){
                result += '*';
                symbol = 1;
            } else {
                result += '$';
                symbol = 0;
            }
        } else {
            result += string.charAt(i);
        }
    }
    return result;
}

//given two strings, returns the both with the first two characters swapped
function mashUp(string1, string2){
    if(typeof string1 != 'string'){
        throw 'Input1 must be a string!';
    }
    string1 = string1.trim();
    if(string1.length < 2){
        throw 'The length of string1 must be greater than 1!';
    }
    if(typeof string2 != 'string'){
        throw 'Input2 must be a string!';
    }
    string2 = string2.trim();
    if(string2.length < 2){
        throw 'The length of string2 must be greater than 1!';
    }
    return string2.substr(0,2)+string1.substr(2)+' '+string1.substr(0,2)+string2.substr(2);
}

module.exports = {camelCase, replaceChar, mashUp};

//Debugging
//console.log(camelCase(["Hello", "World"]));
//console.log(replaceChar(123));
//console.log(mashUp ("h","e"));