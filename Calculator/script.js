let displayValue = '0';
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;

const display = document.getElementById('display');

function appendToDisplay(value) {
    if (waitingForSecondOperand === true) {
        displayValue = value;
        waitingForSecondOperand = false;
    } else {
        displayValue === '0' ? displayValue = value : displayValue += value;
    }
    display.textContent = displayValue;
}

function operation(op) {
    if (operator !== null && waitingForSecondOperand) {
        operator = op;
        return;
    }
    
    const inputValue = parseFloat(displayValue);
    
    if (firstOperand === null && !isNaN(inputValue)) {
        firstOperand = inputValue;
    } else if (operator) {
        const result = calculateResult(firstOperand, inputValue, operator);
        displayValue = `${parseFloat(result.toFixed(7))}`;
        display.textContent = displayValue;
        firstOperand = parseFloat(result.toFixed(7));
    }
    
    waitingForSecondOperand = true;
    operator = op;
}

function calculateResult(first, second, op) {
    switch(op) {
        case '+':
            return first + second;
        case '-':
            return first - second;
        case '*':
            return first * second;
        case '/':
            return first / second;
        default:
            return second;
    }
}

function calculate() {
    const inputValue = parseFloat(displayValue);
    if (firstOperand === null || isNaN(inputValue)) {
        return;
    }
    
    displayValue = calculateResult(firstOperand, inputValue, operator);
    display.textContent = displayValue;
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
}

function clearDisplay() {
    displayValue = '0';
    display.textContent = displayValue;
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
}

function buttonPressed(value) {
    display.textContent = value;
    setTimeout(() => {
        display.textContent = displayValue;
    }, 200);
}
