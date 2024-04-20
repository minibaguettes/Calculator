


const btnsTop = document.getElementById('btns-top');
const numbers = document.getElementById('numbers');
const btnsR = document.getElementById('btns-r');

for (var i = 9; i >= 0; i--) {
  let digit = document.createElement('button');
  digit.textContent = i;
  digit.setAttribute('id', 'btn' + i);
  numbers.appendChild(digit);
}

const decimal = document.getElementById('decimal');
const percent = document.getElementById('percent');
const changeSign = document.getElementById('change-sign');

const display = document.getElementById('display');
const displayText = display.querySelector('p');
displayText.textContent = 0;

const container = document.getElementById('container');


let activeBtnR;


let var2 = '';
let temp = '';
let o = '';
let oId = '';
let end = false;
let var1 = '';
let neg = false;




btnsTop.addEventListener('click', (e) => {
  let el = e.target;
  // only highlight the btns, not the board
  if (el.id != 'btns-top') {
    el.style.animation = 'none';
    // get and play animation; works when spammed
    window.requestAnimationFrame(function() {
      el.style.animation = 'btnsTopClick 1s';
    });
  }
});

numbers.addEventListener('click', (e) => {
  let el = e.target;
  // only highlight the numbers, not the board
  if (el.id != 'numbers') {
    el.style.animation = 'none';
    // get and play animation; works when spammed
    window.requestAnimationFrame(function() {
      el.style.animation = 'numbersClick 1s';
    });
  }
});

// highlight buttons when clicked
btnsR.addEventListener('click', (e) => {
  let el = e.target;
  // only highlight the operations, not the board
  if (el.id != 'btns-r') {
    // if equals button, quickly change color and fade back to initial color; treat like numbers/btns-top
    if (el.id == 'equals') {
      el.style.animation = 'none';
      window.requestAnimationFrame(function() {
        el.style.animation = 'btnsRClickOff 1s';
      });
    }
    // keep colors at end of animation
    else {
      // reset activeBtnR to the new active button
      if (activeBtnR && activeBtnR.classList.contains('active-btn-r')) {
        // animate old active button to revert back to initial colors
        window.requestAnimationFrame(function() {
          activeBtnR.style.animation = 'btnsRClickOff 1s forwards';
        });
        activeBtnR.classList.remove('active-btn-r');
        activeBtnR.style.animation = 'none';
      }
      // set new activeBtnR and change to active button colors
      window.requestAnimationFrame(function() {
        el.style.animation = 'btnsRClick 1s forwards';
        activeBtnR = el;
        activeBtnR.classList.add('active-btn-r');
      });
    }
  }
});

container.addEventListener('click', (e) => {
  let el = e.target;
  // DIGIT
  if (el.textContent >= 0 || el.textContent <= 9) {
    // if an equation has already been solved & user wants to start fresh => clear LHS
    if (end) {
      var2 = '';
      end = false;
    }
    // if LHS and operator have already been set, get RHS
    if (o != '' && var1 == '') {
      console.log(var1);
      var1 = var2;
      var2 = '';
    }
    // -0 => -LHS
    if (neg && var2 == 0) {
      var2 = el.textContent * -1;
      neg = false;
    }
    // normal
    else {
      var2 += el.textContent;
    }
    displayText.textContent = var2;
    console.log(var1 + o + var2);
  }

  // DECIMAL (if none included already)
  if (el.id == 'decimal') {
    // if an equation has already been solved & user wants to start fresh => clear LHS
    if (end) {
      var2 = '';
      end = false;
    }
    // if LHS and operator have already been set, get RHS
    if (o != '' && var1 == '') {
      console.log(var1);
      var1 = var2;
      var2 = '';
    }
    if (!var2.includes('.')) {
      var2 += '.';
      displayText.textContent = var2;
    }
  }

  // PERCENT || POS/NEG
  if (el.id == 'percent' || el.id == 'change-sign') {
    // if continuing from result of previous equation
    if (end) {
      var2 = var1;
      var1 = '';
      end = false;
    }
    // PERCENT
    if (el.id == 'percent') {
      var2 = var2 * 0.01
    }
    // POS/NEG
    else {
      // toggle negative
      neg = !neg;
      // LHS == 0, then display LHS -0
      if (neg && var2 == 0) {
        displayText.textContent = '-0';
        var2 = 0;
        console.log('--1');
      }
      // RHS == 0, then display RHS -0
      else if (neg && o != '' && var1 == 0) { 
        displayText.textContent = '-0';
        console.log('--2');
      }
      else if (var1 != '' && var2 == '') {
        console.log('--3');
      }
      // if LHS or RHS
      else if (var2 != '') {
        var2 *= -1;
        displayText.textContent = var2;
        console.log('--4');
      }
      
      console.log(var2);
      
    } 
    
  }

  // OPERATOR
  if (el.id == 'add' || el.id == 'sub' || el.id == 'mult' || el.id == 'div') {
    o = el.textContent;
    oId = el.id;
    neg = false;
  }

  // CLEAR
  if (el.id == 'clear') {
    var1 = var2 = o = temp = '';
    neg = false;
    displayText.textContent = '0';
    // clear active operator btn
    if (activeBtnR && activeBtnR.classList.contains('active-btn-r')) {
      window.requestAnimationFrame(function() {
        activeBtnR.style.animation = 'btnsRClickOff 1s forwards';
      });
      activeBtnR.classList.remove('active-btn-r');
      activeBtnR.style.animation = 'none';
    }
  }
  // EQUALS
  else if (el.id == 'equals') {
    // case 1: LHS only
    if ((var1 == '' ^ var2 == '') && o == '') {
      // if empty, prepare number for operations
      if (var1 == '') {
        var1 = var2;
        var2 = 0;
      }
      displayText.textContent = var1;
      console.log(var1);
      temp = '';
    }

    // case 2: LHS && OPERATOR && RHS
    else if (var1 != '' && var2 != '') {
      console.log(var1 + o + var2);
      var1 = operate(oId, var1, var2);
      console.log('var1 = ' + var1);
      displayText.textContent = var1;
      temp = var2;
      var2 = '';
    }

    // case 3: LHS && OPERATOR
    else if ((var1 == '' ^ var2 == '') && o != '') {
      if (isNaN(parseInt(var1))) {
        var1 = var2;
      }
      if (temp == '') {
        temp = var2;
      }
      console.log(var1 + o + temp);
      var1 = operate(oId, var1, temp);
      console.log(var1);
      displayText.textContent = var1;
    }
    end = true;
  }
});


function fixText(text) {
  console.log(text.length);
}

function add(a, b) {
  return a + b;
}

function sub(a, b) {
  return a - b;
}

function mult(a, b) {
  return a * b;
}

function div(a, b) {
 return a / b;
}

function operate(o, a, b) {
  // 
  if (a != Math.round(a) || b != Math.round(b)) {
    a = parseFloat(a);
    b = parseFloat(b);    
  }
  else {
    a = parseInt(a);
    b = parseInt(b);
  }
  if (o == 'add') {
    return add(a, b); 
  }
  else if (o == 'sub') {
    return sub(a, b);
  }
  else if (o == 'mult') {
    return mult(a, b);
  }
  else if (o == 'div') {
    return div(a, b);
  }

}