const categorySelect = document.getElementById("category");
const inputValue = document.getElementById("input-value");
const outputValue = document.getElementById("output-value");
const fromUnit = document.getElementById("from-unit");
const toUnit = document.getElementById("to-unit");
const convertBtn = document.getElementById("convert-btn");
const messageText = document.getElementById("message");
const summaryText = document.getElementById("summary");

const units = {
  length: {
    meter: 1,
    kilometer: 1000,
    centimeter: 0.01,
    millimeter: 0.001,
    mile: 1609.344,
    yard: 0.9144,
    foot: 0.3048,
    inch: 0.0254
  },
  weight: {
    kilogram: 1,
    gram: 0.001,
    milligram: 0.000001,
    pound: 0.45359237,
    ounce: 0.028349523125
  }
};

const temperatureUnits = ["celsius", "fahrenheit", "kelvin"];

const absoluteZero = {
  celsius: -273.15,
  fahrenheit: -459.67,
  kelvin: 0
};

function getUnitNames(category) {
  if (category === "temperature") {
    return temperatureUnits;
  }
  return Object.keys(units[category]);
}

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function loadUnits() {
  const names = getUnitNames(categorySelect.value);

  fromUnit.innerHTML = "";
  toUnit.innerHTML = "";

  names.forEach(function (name) {
    fromUnit.add(new Option(capitalize(name), name));
    toUnit.add(new Option(capitalize(name), name));
  });

  toUnit.selectedIndex = 1;
  clearResult();
}

function clearResult() {
  outputValue.value = "";
  summaryText.textContent = "";
  messageText.textContent = "";
}

function showError(text) {
  clearResult();
  messageText.textContent = text;
}

function convertTemperature(value, from, to) {
  let celsius;

  if (from === "celsius") {
    celsius = value;
  } else if (from === "fahrenheit") {
    celsius = (value - 32) * 5 / 9;
  } else {
    celsius = value - 273.15;
  }

  if (to === "celsius") {
    return celsius;
  } else if (to === "fahrenheit") {
    return celsius * 9 / 5 + 32;
  }
  return celsius + 273.15;
}

function convert(isButtonClick) {
  clearResult();

  if (inputValue.validity.badInput) {
    showError("Please enter a valid number.");
    return;
  }

  const text = inputValue.value.trim();

  if (text === "") {
    if (isButtonClick) showError("Please enter a value.");
    return;
  }

  const value = Number(text);

  if (!Number.isFinite(value)) {
    showError("Please enter a valid number.");
    return;
  }

  const category = categorySelect.value;
  const from = fromUnit.value;
  const to = toUnit.value;
  let result;

  if (category === "temperature") {
    if (value < absoluteZero[from]) {
      showError("Temperature cannot be below absolute zero.");
      return;
    }
    result = convertTemperature(value, from, to);
  } else {
    if (value < 0) {
      showError("Value cannot be negative for length or weight.");
      return;
    }
    result = value * units[category][from] / units[category][to];
  }

  const rounded = parseFloat(result.toPrecision(10));

  outputValue.value = rounded;
  summaryText.textContent = value + " " + from + " = " + rounded + " " + to;
}

categorySelect.addEventListener("change", function () {
  loadUnits();
  convert(false);
});

fromUnit.addEventListener("change", function () {
  convert(false);
});

toUnit.addEventListener("change", function () {
  convert(false);
});

inputValue.addEventListener("input", function () {
  convert(false);
});

inputValue.addEventListener("keydown", function (event) {
  if (event.key === "Enter") convert(true);
});

convertBtn.addEventListener("click", function () {
  convert(true);
});

loadUnits();