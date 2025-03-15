document.addEventListener("DomContentLoad",()=>{
    console.log("DOM Loaded");
})
//Get DOm Elements
const display = document.getElementById("display")
const numberButtons = document.querySelectorAll(".number-btn")
const operatorButtons = document.querySelectorAll(".operator-btn")
const equalsButton = document.getElementById("equals-btn")
const clearButton = document.getElementById("clear-btn")
const deleteButton = document.getElementById("delete-btn")
const decimalButton = document.getElementById("decimal-btn")
const percentButton = document.getElementById("percent-btn")

console.log("Display Element",display);
console.log("Number Buttons",numberButtons.length);
console.log("Operator Buttons",operatorButtons.length);

//Variables To Store Calculate Store
let currentInput = "0";
let previousInput = "";
let calculationOperator = "";
let resetScreen = false;

function updateDisplay()
{
    console.log("Update Display :",currentInput);
    display.textContent = currentInput;
}

//this function handles Button Clicks
function inputNumber(number)
{
    console.log("Input Number :",number);
    if(resetScreen)
    {
        currentInput = number;
        resetScreen = false;
    }
    else{
        currentInput = currentInput === "0" ? number : currentInput + number;
    }
}

 function inputOperator(operator)
 {
    console.log("Input Operator :", operator);
    if(calculationOperator !== 0)  {
        calculate();
    }
    previousInput = currentInput;
    calculationOperator = operator;
    resetScreen = true;
 }

 //this functionhelp you to put decimal points
 function inputDecimal()
 {
    console.log("Input Decimal");
  //if we restart the screen , start with 0
    if(resetScreen)
    {
        currentInput  = "0.";
        resetScreen = false;
        return
    }
    if(!currentInput.includes(".")){
        currentInput += "."
    }
 }
 function calculatePercentage() {
    console.log("Calculate percentage")
    // Convert current input to a percentage value
    const value = Number.parseFloat(currentInput) / 100
    currentInput = value.toString()
  }

//function to calculate percentage
function calculate(){
    console.log("Calculating",calculationOperator,previousInput,currentInput);
    
    let result
    const prev = Number.parseFloat(previousInput);
    const current = Number.parseFloat(currentInput);

    //its check input are valid numbers
    if(isNaN(prev) || isNaN(current)){
        console.log("Invalid Number For Calculation");
        return
    }

switch(calculationOperator)
{
    case "+":
        result = prev + current;
        break
    
    case "-":
        result = prev - current;
        break
    
    case "*":
        result = prev * current;
        break
    
    case "/":
        if(current === 0)
        {
            alert("Cannot Divide By Zero!.")
            clearAll();
            return
        }
        result = prev / current;
        break
        default:
            console.log("No Operator Specified");
            return
            

        }
        console.log("Calculation Result: ", display);
        //updation of current input
        currentInput = result.toString();
        calculationOperator = "";

    }
    //function To Clear ALl 
    function clearAll()
    {
        console.log("Clearing All :");
        currentInput = "0";
        previousInput = "";
        calculationOperator = "";
        
    }

    function deleteChar()
{
    console.log("Deleting Last Char");
    if(currentInput.length === 1)
    {
        currentInput = "0"
    }
    else{
        currentInput = currentInput.slice(0,-1)
    }
}
//Add Events Listener Inplementation
numberButtons.forEach((button)=>{
    button.addEventListener("click",()=>{
        console.log("Button Was Clicked",button.value);
        inputNumber(button.value);
        updateDisplay();
    })
})
operatorButtons.forEach((button) => {
    button.addEventListener("click", () => {
      console.log("Operator button clicked:", button.value)
      inputOperator(button.value)
      updateDisplay()
    })
  })
equalsButton.addEventListener("click",()=>{
    console.log("Equal Button Was Clicked");
    calculate();
    updateDisplay();
    
})
clearButton.addEventListener("click",()=>{
    console.log("Clear Button Was Clicked");
    clearAll();
    updateDisplay();
})
deleteButton.addEventListener("click",()=>{
    console.log("Delete Button Was Clicked");
    deleteChar();
    updateDisplay();
})
decimalButton.addEventListener("click",()=>{
    console.log("Decimal Button Was Clicked");
    inputDecimal();
    updateDisplay();
})
percentButton.addEventListener("click",()=>{
    console.log("Percent Was Clicked");
    calculate();
    updateDisplay();
})

document.addEventListener("keydown",(event)=>{
    console.log("Key Was Pressed",event.key);
    if (/^[0-9]$/.test(event.key)) {
        inputNumber(event.key)
        updateDisplay();
    }
    else if(["+","-","*","/"].includes(event.key)){
        inputOperator(event.key)
        updateDisplay();
    }
    else if(event.key === "."){
        inputDecimal();
        updateDisplay();
    }
    else if(event.key === "Enter" || event.key === "="){
        event.preventDefault();
        calculate();
        updateDisplay();
    }
    else if(event.key === "Escape"){
        clearAll();
        updateDisplay();
    }
    else if(event.key === "BackSpace"){
        deleteChar();
        updateDisplay();
    }
    else if(event.key === "%"){
        calculatePercentage();
        updateDisplay();
    }
})
//Initialize 
updateDisplay();
console.log("Calculator Ready");
