// Buttons
let btnSelectedArea;
let btnLoadLocalImg;
let btnWholePage;

// Inputs
let inputLocalImg;

let jq;

(function () {

	// run init after jquery loaded
	let nTimer = setInterval(function () {
		if (window.jQuery) {

			// run init
			jq = jQuery.noConflict(true);
			(function ($) {
				$(function () {
					initExtension();
				});
			})(jq);

			// clear interval of checking
			clearInterval(nTimer);
		}
	}, 100);

})();

function initExtension() {

	// Initialize variables
	initializeVariables();

	// Prepare selected area screenshots
	prepareSelectedAreaScreenshot();

	// Prepare selected area screenshots
	prepareWholePageScreenshot();

	// Prepare load local image file from user pc
	prepareLoadLocalImg();
}

function initializeVariables() {

	// Buttons
	btnSelectedArea = jq('#btnSelectedArea');
	btnLoadLocalImg = jq('#btnLoadLocalImg');
	btnWholePage = jq('#btnWholePage');

	// Inputs
	inputLocalImg = jq('#inputLocalImg');
}

function prepareSelectedAreaScreenshot() {

	// On selected area buttons clicked
	btnSelectedArea.click(function () {
		sendPopupMessageToBot('initialize-to-take-screenshot');

		// Close popup
		setTimeout(() => { window.close() }, 100);
	});
}

function prepareWholePageScreenshot() {

	// On whole page screenshot buttons clicked
	btnWholePage.click(function () {
		sendPopupMessageToBot('initialize-to-take-whole-page-screenshot');

		// Close popup
		setTimeout(() => { window.close() }, 100);
	});
}

function prepareLoadLocalImg() {

	// On local image file loader button click
	document.getElementById('btnLoadLocalImg').addEventListener('click', function () {
		// inputLocalImg.click();

		chrome.identity.getAuthToken({interactive: true}, function(token) {
			console.log(token);
		});
	});

	// Observe to get image file data
	/*$getImgFromInputFile('inputLocalImg', event => {

		// Save screenshot base64 data url to local storage
		saveInStorage('screenshot-base64', event.target.result);

		sendPopupMessageToBot('open-selected-local-image-in-new-tab');

		// Open screenshot editor page
		// openLinkInNewTab('editor/index.html');

		// Close popup
		setTimeout(() => { window.close() }, 100);
	});*/
}


