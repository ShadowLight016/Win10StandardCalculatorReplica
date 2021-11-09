var currentNum = "0";
var currentEquation = [];
var completeNum = "";
var periodOnce = 0;

function calculate(){
    console.log('Compute')
    var completeEquation;
    for (let i = 0; i < currentEquation.length; i++) {
        console.log(currentEquation[i]);
    }
    completeEquation =  currentEquation.join('');
    document.getElementById("current-entry").value = eval(completeEquation);
}

function enterNum(num) {
    if(currentNum == "0") currentNum = "";
    if(num == "."){
        if(periodOnce > 0 || currentNum == "0"){
            document.getElementById("current-entry").value = currentNum;
            document.getElementById("complete-input").value = completeNum;
        }
        else{
            periodOnce++;
            currentNum += num;
            document.getElementById("current-entry").value = currentNum;
            document.getElementById("complete-input").value = completeNum;
        }
    }else {
        currentNum += num;
        document.getElementById("current-entry").value = currentNum;
        document.getElementById("complete-input").value = completeNum;
    }
}

function compute() {
    completeNum += document.getElementById("current-entry").value;
    if(document.getElementById("current-entry").value != "") currentEquation.push(currentNum)
    document.getElementById("complete-input").value = completeNum;
    calculate();
    completeNum = "";
    currentNum = "0";
    periodOnce = 0;
    currentEquation = [];
}

function operator(entry) {
    completeNum += document.getElementById("current-entry").value + " " + entry + " ";
    if(document.getElementById("current-entry").value != "") currentEquation.push(currentNum);
    document.getElementById("current-entry").value = eval(currentEquation.join(''));
    currentEquation.push(entry);
    console.log('New Instance')
    for (let i = 0; i < currentEquation.length; i++) {
        console.log(currentEquation[i])
    }

    document.getElementById("complete-input").value = completeNum;

    currentNum = "0";
    periodOnce = 0;
}

function clearAll() {
    currentNum = "0"
    completeNum = ""
    currentEquation = [];
    document.getElementById("complete-input").value = "";
    document.getElementById("current-entry").value = currentNum;
}

function clearCurrent() {
    currentNum = "0"
    document.getElementById("current-entry").value = currentNum;
    document.getElementById("complete-input").value = completeNum;
}

function fractionNum() {
    completeNum += "1/" + currentNum;
    currentEquation.push(eval(1/currentNum))
    document.getElementById("current-entry").placeholder = eval(1 / currentNum);
    document.getElementById("current-entry").value = "";
    document.getElementById("complete-input").value = completeNum;
    currentNum = "0";
}

function posneg() {
    if (currentNum[0] == "-") currentNum = currentNum.substring(1);
    else if (currentNum != "0") currentNum = "-" + currentNum;
    document.getElementById("current-entry").value = currentNum;
}

function deleteLastEntered() {
    currentNum = currentNum.substring(0, currentNum.length - 1);
    if (currentNum == "") currentNum = "0";
    document.getElementById("current-entry").value = currentNum;
}

function calSquared() {
    currentEquation.push(eval(currentNum * currentNum));
    completeNum += "sqr("+currentNum+")"
    document.getElementById("current-entry").placeholder = eval(currentNum * currentNum);
    document.getElementById("current-entry").value = "";
    document.getElementById("complete-input").value = completeNum;
    currentNum = "0";
}

function calSquareRoot() {
    currentEquation.push(Math.sqrt(currentNum));
    completeNum += "√"+currentNum;
    document.getElementById("current-entry").placeholder = Math.sqrt(currentNum);
    document.getElementById("current-entry").value = "";
    document.getElementById("complete-input").value = completeNum;
    currentNum = "0";
}

function calPercent() {
    if (currentEquation.length > 0) {
        let percentDecimal = currentNum / 100;
        let tempErase = currentEquation.pop();
        let tempCompleteEquation = currentEquation.join('');
        let currentNumPercent = percentDecimal *  eval(tempCompleteEquation);
        completeNum += currentNumPercent;
        currentEquation.push(tempErase);
        currentEquation.push(currentNumPercent.toString());
        document.getElementById("current-entry").placeholder = currentNumPercent;
        document.getElementById("current-entry").value = "";
        document.getElementById("complete-input").value = completeNum;
        currentNum = "0";
    }
}