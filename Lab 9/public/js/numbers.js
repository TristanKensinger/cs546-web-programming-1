let form = document.getElementById("form");
let inputNumber = document.getElementById("inputNumber");
let attempts = document.getElementById("attempts");
let error = document.getElementById("error");

if(form){
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        if(inputNumber.value){
            attempts.hidden = false;
            error.hidden = true;
            let li = document.createElement('li');
            li.innerHTML = inputNumber.value;
            if(isPrime(inputNumber.value)){
                li.className = 'is-prime';
            } else {
                li.className = 'not-prime';
            }
            attempts.appendChild(li);
            form.reset();
            inputNumber.focus();
        } else {
            error.hidden = false;
            error.innerHTML = 'You must enter a Number!';
            inputNumber.focus();
        }
    });
}

function isPrime(num){
    if(num < 2){
        return false;
    }
    let prime = true;
    for(let i=2; i<=Math.floor(Math.sqrt(num)); i++){
        if(num % i == 0){
            prime = false;
        }
    }
    return prime;
}