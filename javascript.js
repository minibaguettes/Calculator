



const numbers = document.getElementById('numbers');

for (var i = 9; i >= 0; i--) {
  let digit = document.createElement('button');
  digit.textContent = i;
  digit.setAttribute('id', 'btn' + i);
  numbers.appendChild(digit);
}

const decimal = document.getElementById('decimal');

const display = document.getElementById('display');
const displayText = display.querySelector('p');

const container = document.getElementById('container');


let l = '';
let r = '';
let o = '';
let oId = '';
let end = false;
let temp = '';


container.addEventListener('click', (e) => {
  let el = e.target;
  // DIGIT
  if (el.textContent >= 0 || el.textContent <= 9) {
    // if an equation has already been solved & user wants to start fresh => clear LHS
    if (end) {
      l = '';
      end = false;
    }
    // if LHS and operator have already been set, get RHS
    if (o != '' && temp == '') {
      console.log(temp);
      temp = l;
      l = '';
    }
    l += el.textContent;
    displayText.textContent = l;
    console.log(temp + o + l);
  }

  // DECIMAL (if none included already)
  if (el.id == 'decimal') {
      // if an equation has already been solved & user wants to start fresh => clear LHS
      if (end) {
        l = '';
        end = false;
      }
      // if LHS and operator have already been set, get RHS
      if (o != '' && temp == '') {
        console.log(temp);
        temp = l;
        l = '';
      }
      if (!l.includes('.')) {
        l += '.';
        displayText.textContent = l;
      }
    }

  // OPERATOR
  if (el.id == 'add' || el.id == 'sub' || el.id == 'mult' || el.id == 'div') {
    o = el.textContent;
    oId = el.id;
  }

  // CLEAR
  if (el.id == 'clear') {
    temp = l = o = '';
    displayText.textContent = '';
  }
  // EQUALS
  else if (el.id == 'equals') {
    // if complete equation => LHS and RHS exist
    if (temp != '' && l != '') {
      console.log(temp + o + l);
      end = true;
    }
    // n/0 => invalid calculation
    if (oId == 'div' && l == 0) {
      displayText.textContent = 'stop.';
    }
    // OK => proceed calculation
    else {
      temp = operate(oId, temp, l);
      console.log(temp);
      displayText.textContent = temp;
      o = l = '';
    }
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
  else {
    return 'error';
  }
}