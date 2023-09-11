//Tristan Kensinger
//I pledge my honor that I have abided by the Stevens Honor System

const questionOne = function questionOne(arr) {
    let total = 0;
    for(let i=0; i<arr.length; i++){
        arr[i] = Math.pow(arr[i], 2);
        total += arr[i];
    }
    return total;
}

const questionTwo = function questionTwo(num) {
    if(num < 1){
        return 0;
    }
    if(num == 1){
        return 1;
    }
    return questionTwo(num-1) + questionTwo(num-2);
}

const questionThree = function questionThree(text) {
    let total = 0;
    let vowels = "aeiou";
    let lowerText;
    lowerText = text.toLowerCase();
    for(let i=0; i<lowerText.length; i++){
        if(vowels.includes(lowerText[i])){
            total++;
        }
    }
    return total;
}

const questionFour = function questionFour(num) {
    if(num < 0){
        return NaN;
    }
    if(num == 0){
        return 1;
    }
    return questionFour(num-1) * num;
}

module.exports = {
    firstName: "Tristan", 
    lastName: "Kensinger", 
    studentId: "10443340",
    questionOne,
    questionTwo,
    questionThree,
    questionFour
};