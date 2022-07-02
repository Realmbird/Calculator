function add(a,b){
    return Math.round((a + b)*1000)/1000;
}
function subtract(a,b){
    return Math.round((a - b)*1000)/1000;
}
function multiply(a,b){
    return Math.round((a * b)*1000)/1000;
}
function divide(a,b){
    if(b == 0){
        alert("You can't divide by 0")
        return a;
    }
    return Math.round((a / b)*1000)/1000;
}
function operate(operator, num1, num2){
    if(operator.toLowerCase() == "+"){
        return add(parseFloat(num1),parseFloat(num2));
    }

    if (operator.toLowerCase() == "-"){
        return subtract(parseFloat(num1),parseFloat(num2));
    }
    if(operator.toLowerCase() == "*"){
        return multiply(parseFloat(num1),parseFloat(num2));
    }

    if (operator.toLowerCase() == "/"){
        return divide(parseFloat(num1),parseFloat(num2));
    }
    return 0;
    /* what to know if this is posssible
    operator(num1, num2); can the operator parameter be a function not sure.
    Can functions be parameters since objects can?
     */
}
let tempNum = 0;

let displayNum = "";
let display = document.querySelector(".display");
let store = document.querySelector(".store");
const operators = Array.from(document.querySelectorAll(".operators button"));
let message = document.querySelector('.promp');
const numbers = Array.from(document.querySelectorAll('.row_1 button, .row_2 button, .row_3 button'));
const equal = document.querySelector(".equal"); 
let oper = "";
const clear = document.querySelector(".Clear");
const del = document.querySelector(".Delete");
clear.addEventListener('click', () => {
    displayNum = "";
    display.textContent = displayNum;
});
del.addEventListener('click', () => {
    displayNum = displayNum.slice(0,-1);
    display.textContent = displayNum;
});
message.addEventListener('click', function(e){
    displayNum = prompt("Enter a number");
    display.textContent = displayNum;
});
function addNum(e){
    let number = this.textContent;
    if(isNaN(number)){
        if(number == '.' && displayNum.indexOf('.') == -1){
            displayNum += number;
            display.textContent = displayNum;
        }
        return;
    }
    
    displayNum += number;
    display.textContent = displayNum;
}

function addOpperator(e){
    oper = this.textContent;
    console.log(oper);
    tempNum = displayNum;
    displayNum = "";
    store.textContent += `${tempNum} ${oper} `;
    display.textContent = displayNum;
}
function solution(){
    if(displayNum == ""){
        return;
    }
    let numArray = Array.from(store.textContent.split(" "));
    console.log(numArray);
    let solution = numArray[0];
    for(let i = 1; i < numArray.length - 2; i++){
        if(i % 2 == 0){
            tempNum = numArray[i];
        }
        if(i % 2 == 1){
            solution = (operate(numArray[i], solution, tempNum));
        }
    }
    solution = operate(oper, solution, display.textContent);
    display.textContent = solution;
    displayNum = solution;
    store.textContent = "";
}
console.log(numbers);
console.log(operators);
console.log(equal);
operators.forEach((operator) => operator.addEventListener('click',addOpperator));
numbers.forEach(num => num.addEventListener('click',addNum));
equal.addEventListener('click', solution);