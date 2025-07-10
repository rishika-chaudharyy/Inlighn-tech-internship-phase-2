const display = document.getElementById('display');

function appendValue(val) {
  if (display.textContent === '0') {
    display.textContent = val;
  } else {
    display.textContent += val;
  }
}

function clearDisplay() {
  display.textContent = '0';
}

function calculate() {
  try {
    display.textContent = eval(display.textContent);
  } catch {
    display.textContent = 'Error';
  }
}

document.addEventListener('keydown', function (e) {
  if ((e.key >= '0' && e.key <= '9') || ['+', '-', '*', '/', '.', '(', ')'].includes(e.key)) {
    appendValue(e.key);
  } else if (e.key === 'Enter') {
    calculate();
  } else if (e.key === 'Backspace') {
    display.textContent = display.textContent.slice(0, -1) || '0';
  } else if (e.key.toLowerCase() === 'c') {
    clearDisplay();
  }
});
