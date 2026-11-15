const categorySelect = document.getElementById("category");
const inputValue = document.getElementById("input-value");
const outputValue = document.getElementById("output-value");
const fromUnit = document.getElementById("from-unit");
const toUnit = document.getElementById("to-unit");
const convertBtn = document.getElementById("convert-btn");

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
  outputValue.value = "";
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

function convert() {
  const value = parseFloat(inputValue.value);

  if (isNaN(value)) {
    outputValue.value = "";
    return;
  }

  const category = categorySelect.value;
  const from = fromUnit.value;
  const to = toUnit.value;
  let result;

  if (category === "temperature") {
    result = convertTemperature(value, from, to);
  } else {
    result = value * units[category][from] / units[category][to];
  }

  outputValue.value = parseFloat(result.toPrecision(10));
}

categorySelect.addEventListener("change", loadUnits);
convertBtn.addEventListener("click", convert);

inputValue.addEventListener("keydown", function (event) {
  if (event.key === "Enter") convert();
});

loadUnits();