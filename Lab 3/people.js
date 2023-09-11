const axios = require('axios');

async function getPeople(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json');
    return data;
}

async function getPersonById(id){
    //input handling
    if(typeof id != 'string'){
        throw 'Input must be of type string!';
    }
    id = id.trim();
    if(id.length == 0){
        return 'Input must not be an empty string!';
    }
    //function
    const people = await getPeople();
    for(let i=0; i<people.length; i++){
        if(people[i].id === id){
            return people[i];
        }
    }
    throw 'Person was not found!';
}

async function sameEmail(emailDomain){
    //input handling
    if(typeof emailDomain != 'string'){
        throw 'Input must be of type string!';
    }
    emailDomain = emailDomain.trim().toLowerCase();
    if(emailDomain.length == 0){
        return 'Input must not be an empty string!';
    }
    let containsDot = false;
    let lastDotIndex = 0;
    for(let i=0; i<emailDomain.length; i++){
        if(emailDomain.charAt(i) === '.'){
            containsDot = true;
            lastDotIndex = i;
        }
    }
    if(!containsDot){
        throw 'Input must contain a dot!';
    }
    if(emailDomain.length - lastDotIndex < 3){
        throw 'Input must have at least 2 letters after the last dot!';
    }
    //function
    const people = await getPeople();
    let result = [];
    for(let i=0; i<people.length; i++){
        let email = people[i].email;
        let domain = email.substr(email.indexOf('@') + 1).toLowerCase();
        if(domain === emailDomain){
            result.push(people[i]);
        }
    }
    if(result.length < 2){
        throw 'Atleast 2 people need to have the supplied domain name!';
    }
    return result
}

async function manipulateIp(){
    //function
    const people = await getPeople();
    const result = {highest: {}, lowest: {}};
    let highestNum;
    let lowestNum;
    let firstPerson = true;
    let sum = 0;
    for(let i=0; i<people.length; i++){
        //string manipulation
        people[i].ip_address = removeDots(people[i].ip_address);
        let array = people[i].ip_address.split('');
        array.forEach((element, index) => {
            array[index] = Number(element);
        });
        array = myBubbleSort(array);
        let ip = '';
        for(let j=0; j<array.length; j++){
            ip += array[j];
        }
        ip = Number(ip);
        people[i].ip_address= ip;
        sum += ip;
        //highest lowest check
        if(firstPerson){
            firstPerson = false;
            highestNum = ip;
            lowestNum = ip;
            result.highest.firstName = people[i].first_name;
            result.highest.lastName = people[i].last_name;
            result.lowest.firstName = people[i].first_name;
            result.lowest.lastName = people[i].last_name;
        }
        if(ip < lowestNum){
            lowestNum = ip;
            result.lowest.firstName = people[i].first_name;
            result.lowest.lastName = people[i].last_name;
        }
        if(ip > highestNum){
            highestNum = ip;
            result.highest.firstName = people[i].first_name;
            result.highest.lastName = people[i].last_name;
        }
    }
    //console.log(`highestNum ${highestNum}, lowestNum ${lowestNum}, sum ${sum}`);
    result.average = Math.floor(sum / people.length);
    return result;
}

function removeDots(string){
    let result = '';
    for(let i=0; i<string.length; i++){
        if(string.charAt(i) !== '.'){
            result += string.charAt(i);
        }
    }
    return result;
}

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

async function sameBirthday(month, day){
    //input handling
    if(typeof month == 'string'){
        month = month.trim();
        if(month.length == 0){
            throw 'Input1 must not be an empty string';
        }
        if(typeof Number(month) == 'number' && !isNaN(Number(month))){
            month = Number(month);
        }
    }
    if(typeof day == 'string'){
        day = day.trim();
        if(day.length == 0){
            throw 'Input2 must not be an empty string';
        }
        if(typeof Number(day) == 'number' && !isNaN(Number(day))){
            day = Number(day);
        }
    }
    if(typeof month != 'number'){
        throw 'Input1 must be a number!';
    }
    if(typeof day != 'number'){
        throw 'Input2 must be a number!';
    }
    if(!checkDate(month, day)){
        throw 'Invalid date format!';
    }
    //function
    const people = await getPeople();
    let result = [];
    for(let i=0; i<people.length; i++){
        let personMonth = Number(people[i].date_of_birth.substr(0,2));
        let personDay = Number(people[i].date_of_birth.substr(3,2));
        if(personMonth === month && personDay === day){
            let name = `${people[i].first_name} ${people[i].last_name}`;
            result.push(name);
        }
    }
    if(result.length == 0){
        throw 'There is no one with the specified birthday!';
    }
    return result;
}

function checkDate(month, day){
    if(month < 1 || month > 12){
        return false;
    }
    switch(month){
        case 1:
            if(day < 1 || day > 31){
                return false;
            }
            break;
        case 2:
            if(day < 1 || day > 28){
                return false;
            }
            break;
        case 3:
            if(day < 1 || day > 31){
                return false;
            }
            break;
        case 4:
            if(day < 1 || day > 30){
                return false;
            }
            break;
        case 5:
            if(day < 1 || day > 31){
                return false;
            }
            break;
        case 6:
            if(day < 1 || day > 30){
                return false;
            }
            break;
        case 7:
            if(day < 1 || day > 31){
                return false;
            }
            break;
        case 8:
            if(day < 1 || day > 31){
                return false;
            }
            break;
        case 9:
            if(day < 1 || day > 30){
                return false;
            }
            break;
        case 10:
            if(day < 1 || day > 31){
                return false;
            }
            break;
        case 11:
            if(day < 1 || day > 30){
                return false;
            }
            break;
        case 12:
            if(day < 1 || day > 31){
                return false;
            }
            break;
    }
    return true;
}

module.exports = {getPersonById, sameEmail, manipulateIp, sameBirthday};

//Debugging
//console.log(removeDots("159.113.166.2"));