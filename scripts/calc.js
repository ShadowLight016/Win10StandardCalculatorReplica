let currentNum = "";
let completeEquation = new Array(3); //[num1, op, num2]
let periodOnce = 0;
let reset = true;
let percentPressed = false;
let fractionPressed = false;
let sqrPressed = false;
let sqrtPressed = false;
const sum = (a, b) => a + b;
const minus = (a, b) => a - b;
const div = (a, b) => a / b;
const multiply = (a, b) => a * b;
const modulo = (a, b) => a % b;
const square = (x) => x * x;
const squareRt = (x) => Math.sqrt(x);
const fract = (x) => 1 / x;
const percent = (a, b) => {
    let x = a / 100;
    return x * b;
}


function enterNum(num) {
    if (reset) {
        reset = false;
        document.getElementById("complete-input").value = "";
        completeEquation[0] = completeEquation[1] = completeEquation[2] = undefined;
    }
    if(percentPressed || fractionPressed || sqrPressed || sqrtPressed){
        document.getElementById("complete-input").value = document.getElementById("complete-input").value.substring(0, document.getElementById("complete-input").value.lastIndexOf(" "));
        percentPressed = fractionPressed = sqrPressed = sqrtPressed = false;
        currentNum = "";
    }
    if(num == ".") {
        if(!(periodOnce > 0 || currentNum == "")){
            periodOnce++;
            currentNum += num;
            document.getElementById("current-entry").value = currentNum;
        }
    }else {
        currentNum += num;
        document.getElementById("current-entry").value = currentNum;
    }
}

function compute(equationArr) {
    switch (equationArr[1]) { //[0]123, [1]+, [2]3
        case "+": equationArr[0] = sum(equationArr[0], equationArr[2]); break;
        case "-": equationArr[0] = minus(equationArr[0], equationArr[2]); break;
        case "*": equationArr[0] = multiply(equationArr[0], equationArr[2]); break;
        case "/": equationArr[0] = div(equationArr[0], equationArr[2]); break;
        case "mod": equationArr[0] = modulo(equationArr[0], equationArr[2]);break;
        default: break;
    }
}

function clearEntry() {
    currentNum = "";
    document.getElementById("current-entry").value = "0";
    periodOnce = 0;
}

function clearAll() {
    clearEntry();
    completeEquation[0] = completeEquation[1] = completeEquation[2] = undefined;
    document.getElementById("complete-input").value = "";
}

function deleteLastEntered() {
    currentNum = currentNum.substring(0, currentNum.length - 1);
    if (currentNum == "") document.getElementById("current-entry").value = "0";
    else document.getElementById("current-entry").value = currentNum;
}

function posneg() {
    if (currentNum[0] == "-") currentNum = currentNum.substring(1);
    else if (currentNum != "0") currentNum = "-" + currentNum;
    document.getElementById("current-entry").value = currentNum;
}

function operator(op) {
    if (currentNum == "" && !reset && op != "=") {
        document.getElementById("complete-input").value = document.getElementById("complete-input").value.substring(0, document.getElementById("complete-input").value.length - 1);
        document.getElementById("complete-input").value += op;
    }else if (op == "=") {
        if(completeEquation[2] == undefined) {
            completeEquation[2] = parseFloat(document.getElementById("current-entry").value);
            document.getElementById("complete-input") += completeEquation[2];
        }
        if (reset) {
            document.getElementById("complete-input").value = completeEquation[0] + " " + completeEquation[1] + " " + completeEquation[2];
        }
        if(percentPressed || fractionPressed || sqrPressed || sqrtPressed){
            compute(completeEquation);
            percentPressed = fractionPressed = sqrPressed = sqrtPressed = false;
        }else if (completeEquation[1] != undefined){
            if(currentNum != "") completeEquation[2] = parseFloat(currentNum);
            compute(completeEquation);
            document.getElementById("complete-input").value += " "+ currentNum; 
        }
        document.getElementById("current-entry").value = completeEquation[0];
        document.getElementById("complete-input").value += " "+ "="; 
        reset = true;
    }else {
        if(reset){
            console.log('Reset');
            for (let i = 0; i < completeEquation.length; i++) {
                console.log(completeEquation[i])
            }
            document.getElementById("complete-input").value = "";
            currentNum = completeEquation[0];
            completeEquation[2] = document.getElementById("current-entry").value;
            reset = false;
        }
        if (completeEquation[0] == undefined) {
            if(percentPressed || fractionPressed || sqrPressed || sqrtPressed) {
                document.getElementById("complete-input").value += " " + op;
            }else if(currentNum != ""){
                document.getElementById("complete-input").value = currentNum + " " + op;
                completeEquation[0] = parseFloat(currentNum)
                completeEquation[1] = op;
            } 
        }else {
            if(!percentPressed && !fractionPressed && !sqrPressed && !sqrtPressed) {
                document.getElementById("complete-input").value += " " + currentNum;
            }
            document.getElementById("complete-input").value += " " + op;
            completeEquation[2] = parseFloat(currentNum);
            compute(completeEquation);
            document.getElementById("current-entry").value = completeEquation[0];
            completeEquation[1] = op;
            completeEquation[2] = undefined;
        }
    }
    percentPressed = fractionPressed = sqrPressed = sqrtPressed = false;
    currentNum = "";
    periodOnce = 0; 
}

function calPercent() {
    if(!reset && !percentPressed){
        if (completeEquation[0] == undefined) {
            document.getElementById("current-entry").value = "0";
            document.getElementById("complete-input").value = "0";
            currentNum = "";
            reset = true;
        }else {
            percentPressed = true;
            completeEquation[2] = percent(parseFloat(currentNum), completeEquation[0]);
            if(document.getElementById("complete-input").value == "") document.getElementById("complete-input").value = completeEquation[2];
            else document.getElementById("complete-input").value += " " + completeEquation[2];
            document.getElementById("current-entry").value = completeEquation[2];
            currentNum = completeEquation[2];
        }
    }
}

function fractionNum() {
    if(currentNum != ""){
        fractionPressed = true;
        completeEquation[2] = fract(parseFloat(currentNum));
        if(document.getElementById("complete-input").value == "") document.getElementById("complete-input").value = "1/" + currentNum;
        else document.getElementById("complete-input").value += " 1/" + currentNum;
        document.getElementById("current-entry").value = completeEquation[2];
        currentNum = completeEquation[2];
    }
}

function calSquared() {
    if(currentNum != ""){    
        sqrPressed = true;
        completeEquation[2] = square(parseFloat(currentNum));
        if(document.getElementById("complete-input").value == "") document.getElementById("complete-input").value = "sqr(" + currentNum + ")";
        else document.getElementById("complete-input").value += " " + "sqr(" + currentNum + ")";
        document.getElementById("current-entry").value = completeEquation[2];
        currentNum = completeEquation[2];
    }
}

function calSquareRoot() {
    if(currentNum != ""){    
        sqrtPressed = true;
        completeEquation[2] = squareRt(parseFloat(currentNum));
        if(document.getElementById("complete-input").value == "") document.getElementById("complete-input").value = "√" + currentNum;
        else document.getElementById("complete-input").value += " " + "√" + currentNum;
        document.getElementById("current-entry").value = completeEquation[2];
        currentNum = completeEquation[2];
    }
}