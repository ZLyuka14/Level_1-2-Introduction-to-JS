"use strict";

//Removing black squares using css property "display: none" if they are present and adding them back if not.
let css_button = document.querySelector('#css');
css_button.addEventListener("click", function () {
	let blackSquares = document.querySelectorAll('.black-square');
	blackSquares.forEach(function (item) {
		if (item.style.display == "none") {
			item.style.display = "inline-block"
		} else {
			item.style.display = "none";
		}
	})
});

//Removing black squares by direct removing from the HTML tree. Or adding back if they already been removed.
let jsBtn = document.querySelector('#js');
let blackSquaresContainer = document.querySelector('.black-squares');
let blackSquaresCount = document.querySelectorAll('.black-square').length;

jsBtn.addEventListener("click", function () {
	let blackSquares = document.querySelectorAll('.black-square');
	if (blackSquares.length > 0) {
		blackSquares.forEach((item) => {
			item.remove();
		});
	} else {
		for (let i = 0; i < blackSquaresCount; i++) {
			let newSquare = document.createElement("div");
			let textNode = document.createTextNode("\n");;
			newSquare.classList.add("black-square");
			newSquare.setAttribute("id", "div");
			blackSquaresContainer.prepend(newSquare);
			blackSquaresContainer.prepend(textNode)
		}
	}
});

//Removing black squares by adding class "hidden" which uses CSS property "display: none". Or removing it if present.
let jsCss_button = document.querySelector('#jsCss');
jsCss_button.addEventListener("click", function () {
	let blackSquares = document.querySelectorAll('.black-square');
	blackSquares.forEach(function (item) {
		if (item.classList.contains("hidden")) {
			item.classList.remove("hidden");
		} else {
			item.classList.add("hidden");
		}
	});
});


/**
 * Adding class "hidden" to elements using selector entered in input.
 */
let selectorInput = document.querySelector('#selector');
let selectorBtn = document.querySelector('#selector-btn');

selectorBtn.addEventListener("click", function () {
	let selector = selectorInput.value;
	let selectedItems = document.querySelectorAll(selector);
	selectedItems.forEach(function (item) {
		if (item.classList.contains("hidden")) {
			item.classList.remove("hidden");
		} else {
			item.classList.add("hidden");
		}
	});
});


/**
 * Display alert message at first click on yellow square and removing it on second one.
 */
let yellowSquare = document.querySelector('.yellow-square');
yellowSquare.addEventListener("click", function () {
	functions.shift()();
});

let functions = [alertClick, removeYellowSquare];

function alertClick() {
	alert("Привет!");
}

function removeYellowSquare() {
	yellowSquare.remove();
}


/**
 * Display red square if user hovers cursor over button.
 */
let redSquare = document.querySelector('.red-square');
let hoverButton = document.querySelector('#hover01');

hoverButton.addEventListener("mouseenter", function () {
	redSquare.classList.remove("hidden");
});

hoverButton.addEventListener("mouseleave", function () {
	redSquare.classList.add("hidden");
});


/**
 * Display green square if input is in focus. Hiding if not.
 */
let greenInput = document.querySelector('#greenInput');
let greenSquare = document.querySelector('.green-square');

greenInput.addEventListener("focus", function () {
	greenSquare.classList.remove("hidden");
});

greenInput.addEventListener("blur", function () {
	greenSquare.classList.add("hidden");
});


/**
 * Adding images on the page using links entered in textarea.
 */
let imgLinks = document.querySelector('#imgInput');
let imgAdd = document.querySelector('#addImgBtn');
let imageBox = document.querySelector('.image-box');

imgAdd.addEventListener('click', function () {
	let links = imgLinks.value.split("\n");

	for (let link of links) {
		let imgItem = document.createElement("img");
		imageBox.appendChild(imgItem);
		imgItem.setAttribute("src", link);
	}
});


/**
 * Getting coordinates of the cursor on the page.
 */
let coordX = document.querySelector(".horizontal");
let coordY = document.querySelector('.vertical');

document.addEventListener("mousemove", function (event) {
	let x = event.clientX;
	let y = event.clientY;
	coordX.innerHTML = "X : " + x;
	coordY.innerHTML = "Y : " + y;
});


/**
 * Getting browser's preferred language.
 */
let language = document.querySelector('.language');
language.innerHTML = "Browser language: " + navigator.language;


/**	
 * Getting geolocation of the device.
 */
let earthCoordinates = document.querySelector(".earth-coords");
navigator.geolocation.getCurrentPosition(displayCoords);

function displayCoords(position) {
	let x = position.coords.latitude;
	let y = position.coords.longitude;
	earthCoordinates.innerHTML = "Ш : " + x + "<br>" + "Д : " + y;
}


/**
 * Saving text in localStorage, sessionStorage and cookies.
 */
let localStorageInput = document.querySelector('#localStorage');
let cookiesInput = document.querySelector('#cookies');
let sessionStorageInput = document.querySelector('#sessionStorage');

localStorageInput.contentEditable = true;
cookiesInput.contentEditable = true;
sessionStorageInput.contentEditable = true;

localStorageInput.addEventListener("DOMSubtreeModified", function () {
	localStorage.setItem('textLocal', localStorageInput.innerHTML);
});

cookiesInput.addEventListener("DOMSubtreeModified", function () {
	document.cookie = "textCookie=" + cookiesInput.innerHTML;
});

sessionStorageInput.addEventListener("DOMSubtreeModified", function () {
	sessionStorage.setItem('textSession', sessionStorageInput.innerHTML);
});

window.addEventListener("load", function () {
	localStorageInput.innerHTML = localStorage.getItem('textLocal');
	sessionStorageInput.innerHTML = sessionStorage.getItem('textSession');
	cookiesInput.innerHTML = document.cookie.replace("textCookie=", "");
});


/**
 * Adding "up" button after scrolling down over 50px.
 * Button smoothly scrolls page to top.
 */
let upBtn = document.querySelector('#upBtn');

window.addEventListener("scroll", function () {
	if (this.pageYOffset > 50) {
		upBtn.classList.remove("hidden");
	} else {
		upBtn.classList.add("hidden");
	}
});

upBtn.addEventListener("click", function () {
	window.scrollTo({
		top: 0,
		behavior: "smooth"
	});
});


/**
 * Stopping child event to propagate.
 */
let parent = document.querySelector('.parent');
let child = document.querySelector('.child');

child.addEventListener("click", function (event) {
	event.stopPropagation();
	alert('child alert!');
});

parent.addEventListener("click", function () {
	alert('parent alert!');
});


/**
 * Popup that blocks scroll.
 */
let popupContent = document.querySelector('.popup');
let popupBtn = document.querySelector(".popup__btn");

popupBtn.addEventListener("click", function () {
	document.body.style.overflow = "hidden";
	popupContent.classList.remove('hidden');
});

popupContent.addEventListener('click', function () {
	popupContent.classList.add('hidden');
	document.body.style.overflow = "visible";
});


/**
 * Submit button that does not reload page on use.
 */
let formGo = document.querySelector('.go');
formGo.addEventListener("submit", function (event) {
	event.preventDefault();
});

/**
 * File selector that can aquaire files through drag and drop.
 * Also i adde tip on what files are selected.
 */

let drag = document.querySelector('.drag__label');
let fileNames = document.querySelector('.filenames');
let filesTitle = document.querySelector('.filenames__title');
let selected = document.querySelector('#file01');

document.documentElement.addEventListener("dragover", function (event) {
	event.preventDefault();
});

document.documentElement.addEventListener("drop", function (event) {
	event.preventDefault();
});

drag.addEventListener("dragenter", function () {
	drag.classList.add("draggable");
});

drag.addEventListener("dragleave", function () {
	drag.classList.remove("draggable");
});

drag.addEventListener("drop", function (event) {
	for (let item of event.dataTransfer.items) {
		let textItem = document.createElement("p");
		textItem.innerText = item.getAsFile().name;
		fileNames.appendChild(textItem);
	}
	filesTitle.classList.remove('hidden');
	drag.classList.add("draggable");
});

selected.addEventListener("change", function (event) {
	console.log(selected.files.length);
	for (let file of selected.files) {
		let textItem = document.createElement("p");
		textItem.innerText = file.name;
		fileNames.appendChild(textItem);
	}
	filesTitle.classList.remove('hidden');
	drag.classList.add("draggable");
});

/**
 * CSV parsing
 */
let csvText = document.querySelector('#csv01');
let modText = document.querySelector('#mod01');
let parseBtn = document.querySelector('#parse');
let modifyBtn = document.querySelector('#modifyBtn');

//This object will held parsed CSV text and a function to modify text so program doesnt need to parse it every time user clicks "Modify Text".
let parsedText;
parseBtn.addEventListener("click", function () {
	parsedText = parseCSV(csvText.value, modText);
	alert('Text has been parsed! Now you can modify text with CSV data.');
});

/**
 * This function parses CSV text. Saves parsed data and function to modify any text on the run.
 * Doesn`t need to reload page to use different CSV text or text that need to be modified.
 * 
 * @param {String} string in CSV format
 * @param {String} modText any text
 * @returns function that modifies text
 */
function parseCSV(string, modText) {
	let strArray = string.split("\n").map((currentValue) => {
		let sharpIndex = currentValue.indexOf("#");
		if (sharpIndex > 0) {
			currentValue = currentValue.slice(0, sharpIndex);
		}
		return currentValue;
	});

	strArray = strArray.filter(isCity).map(buildMapArray);

	strArray = strArray.filter((elem) => {
		return !Object.values(elem).includes("" || undefined);
	});

	strArray = strArray.sort(sortByPopulation).slice(0, 10);
	let topCities = strArray.reduce(rateCities, {});

	let enrichText = () => {
		Object.keys(topCities).map((currentValue) => {
			modText.value = modText.value.replace(currentValue,
				currentValue +
				`(${topCities[currentValue]["rating"]} місце у ТОП-10 найбільших міст України, населення - ${topCities[currentValue]["population"]})`);
		});
	}

	return enrichText;
}


//After parsing CSV text we can modify text. Change to other and modify using same parsed data without parsing again.
modifyBtn.addEventListener("click", function () {
	parsedText();
});

/**
 * This little function helps to identify if string element has data or it`s a comment or empty element.
 * 
 * @param {string} arrElem - string element
 * @returns {boolean} true if string element is not a comment or empty, false otherwise
 */
function isCity(arrElem) {
	return !arrElem.startsWith("#") && arrElem;
}

/**
 * This function turns simple string element to an object.
 * 
 * @param {string} arrElem - string element that contains coordinates, name of the city and it`s population
 * @returns {Object} - with coordinates of the city and it`s population
 */
function buildMapArray(arrElem) {
	let mappedArr = arrElem.split(",");
	let map = {
		x: mappedArr[0],
		y: mappedArr[1],
		name: mappedArr[2],
		population: mappedArr[3]
	}
	return map;
}

/**
 * Function that sorts objects by field "population".
 * 
 * @param {Object} a with field "population"
 * @param {Object} b with field "population"
 * @returns {Number} that helps sort objects by descending
 */
function sortByPopulation(a, b) {
	return b.population - a.population;
}

/**
 * Reducer function that collects all cities and rates them using index from cities array.
 * 
 * @param {Object} accumulator that helds other objects like fields
 * @param {Object} currentValue that holds city coordinates, name and population
 * @param {Number} index of the current object. Used to get actual city rating by population.
 * @returns 
 */
function rateCities(accumulator, currentValue, index) {
	accumulator[currentValue.name] = {
		population: currentValue.population,
		rating: index + 1
	}
	return accumulator;
}