let storage_counter = 0;
let modal_counter = 0;
let badge_counter = 0;
let viewport_capture_counter = 0;

let modalOptions = {
    header: {
        title: {
            text: 'Modal Title'
        }
    },
    content: {
        text: 'Modal content'
    },
    footer: {
        positiveBtn: {
            text: 'Yes'
        },
        negativeBtn: {
            text: 'No'
        },
        neutralBtn: null,
        dontShowAgain: null
    },
    iframe: {
        className: null
    },
    overlay: {
        hasCancelBtn: false
    }
};

function trimObj(obj) {
    if (!Array.isArray(obj) && typeof obj != 'object') return obj;
    return Object.keys(obj).reduce(function (acc, key) {
        acc[titleCase(key.trim())] = typeof obj[key] == 'string' ? obj[key].trim() : trimObj(obj[key]);
        return acc;
    }, Array.isArray(obj) ? [] : {});
}

function titleCase(str) {
    const splitStr = str.toLowerCase().split(' ');
    for (let i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(' ');
}

// Enable popup to show when click on it
function showPopupWithFileName(fileName) {
    document.dispatchEvent(new CustomEvent('show_popup_with_filename', {detail: {'fileName': fileName}}));
}

function setBadgeInfo(data) {
    document.dispatchEvent(new CustomEvent('setBadgeData', {detail: {'data': data}}));
}

function openLinkInNewTab(urlAddress) {
    document.dispatchEvent(new CustomEvent('_openLinkInNewTab', {detail: {'urlAddress': urlAddress}}));
}

function openImageInNewTab(urlAddress) {
    document.dispatchEvent(new CustomEvent('_openImageInNewTab', {detail: {'urlAddress': urlAddress}}));
}

function $getCurrentTab(callback) {
    document.addEventListener('_listener_getCurrentTabInfo', function (e) {
        const response = e.detail.response;
        callback(response);
    });

    document.dispatchEvent(new CustomEvent('_dispatch_getCurrentTabInfo'));
}

function getAssetImgPath(assetPath) {
    return browser.runtime.getURL(assetPath);
}

function $captureScreenshot(callbackViewportScreenshot, tabId) {
    document.addEventListener('_listener_captureScreenshot', function (e) {
        const response = e.detail.response;
        callbackViewportScreenshot(response);
    });

    document.dispatchEvent(new CustomEvent('_dispatch_captureScreenshot', {detail: {'tabId': tabId}}));
}

function $getImgFromInputFile(elemId, callback) {
    document.getElementById(elemId).addEventListener("change", e => {
        const file = document.getElementById(elemId).files;
        if (file.length > 0) {
            let fileReader = new FileReader();

            fileReader.addEventListener('load', event => {
                callback(event);
            });

            fileReader.readAsDataURL(file[0]);
        }
    });
}

function sendPopupMessageToBot(message, tabId) {

    // Check if tab id exists or not
    if (!tabId) {
        $getCurrentTab(tab => {
            preparePopupMessageToBot(tab.id);
        });
    } else {
        preparePopupMessageToBot(tabId);
    }

    function preparePopupMessageToBot(tabId) {
        browser.tabs.sendMessage(tabId, message);
    }
}

function $receivePopupMessageByBot(callback) {
    document.addEventListener('_listener_receivePopupMessageByBot', function (e) {
        const response = e.detail.response;
        callback(response);
    });

    document.dispatchEvent(new CustomEvent('_dispatch_receivePopupMessageByBot'));
}

function closePopup() {
    document.dispatchEvent(new CustomEvent('_dispatch_closePopup'));
}

function sendMessageToIframe(type, data) {
    document.dispatchEvent(new CustomEvent('sendMessageToIframe', {detail: {type: type, data: data}}));
}

function getBodyScrollHeight() {
    return jq(document.body).prop('scrollHeight');
}

function getBodyScrollWidth() {
    return jq(document.body).prop('scrollWidth');
}

function openModal(id, options, contentPath, setIframeSrc, callback,
                   onPositiveBtnClicked, onNegativeBtnClicked, onNeutralBtnClicked, onDontShowAgainClicked, onCloseIconClicked) {

    modal_counter += 1;

    document.addEventListener(modal_counter + '_responseModalOpened', function (e) {
        const response = e.detail.response;
        if (callback) callback(response);
    });

    document.addEventListener(modal_counter + '_onModalPosBtnClick', function (e) {
        const response = e.detail.response;
        if (onPositiveBtnClicked) onPositiveBtnClicked(response);
    });

    document.addEventListener(modal_counter + '_onModalNegBtnClick', function (e) {
        const response = e.detail.response;
        if (onNegativeBtnClicked) onNegativeBtnClicked(response);
    });

    document.addEventListener(modal_counter + '_onModalNeutralBtnClick', function (e) {
        const response = e.detail.response;
        if (onNeutralBtnClicked) onNeutralBtnClicked(response);
    });

    document.addEventListener(modal_counter + '_onModalDontShowAgainClick', function (e) {
        const ifChecked = e.detail.response.is_checked;
        if (onDontShowAgainClicked) onDontShowAgainClicked(ifChecked);
    });

    document.addEventListener(modal_counter + '_onModalCloseIconClick', function (e) {
        const response = e.detail.response;
        if (onCloseIconClicked) onCloseIconClicked(response);
        else closeModal(id);
    });

    document.dispatchEvent(new CustomEvent('openModal', {
        detail: {
            'id': id,
            'contentPath': contentPath,
            'setIframeSrc': setIframeSrc,
            'counter': modal_counter,
            'options': options ? options : modalOptions
        }
    }));
}

function closeModal(id, callback) {
    document.addEventListener(modal_counter + '_responseModalClosed', function (e) {
        const response = e.detail.response;
        if (callback) callback(response);
    });

    document.dispatchEvent(new CustomEvent('closeModal', {
        detail: {
            'id': id,
            'counter': modal_counter
        }
    }));
}

async function getHtmlContent(htmlFileUrl) {
    let fileUrl;

    // Check if html file url is decoded or not
    if (htmlFileUrl.includes('chrome-extension://')) {
        fileUrl = htmlFileUrl;
    } else {
        fileUrl = browser.runtime.getURL(htmlFileUrl);
    }

    return await (await fetch(fileUrl)).text();
}

/*function getWebsiteBaseUrl(callback) {
	document.addEventListener('_getWebsiteBaseUrl', function (e) {
		var response = e.detail.url;
		callback(response);
	});

	document.dispatchEvent(new CustomEvent('getWebsiteBaseUrl'));
}*/

function $captureScreenshot(callbackViewportScreenshot, tabId) {
    viewport_capture_counter += 1;

    document.addEventListener(viewport_capture_counter + '_listener_captureScreenshot', function (e) {
        const response = e.detail.response;
        callbackViewportScreenshot(response);
    });

    document.dispatchEvent(new CustomEvent('_dispatch_captureScreenshot', {
        detail: {
            'tabId': tabId,
            'counter': viewport_capture_counter
        }
    }));
}

function getFromStorage(key, callback) {
    storage_counter += 1;

    document.addEventListener(storage_counter + '_responseDataFromStorage', function (e) {
        const response = e.detail;
        callback(response);
    });

    document.dispatchEvent(new CustomEvent('getDataFromStorage', {detail: {'key': key, 'counter': storage_counter}}));
}

// expirePeriod: e.g. '1h' (one hour) || '3m' (three minutes) || ...
function saveInStorage(key, value, expirePeriod) {
    const data = {
        value: value,
        expire: expirePeriod ? getCurrentTimestamp() + convertPeriodToSec(expirePeriod) : undefined
    };

    document.dispatchEvent(new CustomEvent('saveDataInStorage', {detail: {'key': key, 'data': data}}));
}

// 1h => 3600sec , 1m => 60sec
function convertPeriodToSec(period) {
    const periodNumber = extractNumberFromStr(period);
    const periodSymbol = period.replace(periodNumber, '');

    let amount;
    switch (periodSymbol) {
        case 's':
            amount = 1;
            break;
        case 'm':
            amount = 60;
            break;
        case 'h':
            amount = 60 * 60;
            break;
        case 'd':
            amount = 24 * 60 * 60;
            break;
        case 'w':
            amount = 7 * 24 * 60 * 60;
            break;
        case 'mo':
            amount = 30 * 24 * 60 * 60;
            break;
        case 'y':
            amount = 12 * 30 * 24 * 60 * 60;
            break;
    }

    return amount * periodNumber;
}

function extractNumberFromStr(str) {
    return Number(str.replace(/[^0-9\.]+/g, ""));
}

function getCurrentTimestamp() {
    return Math.floor(Date.now() / 1000);
}

function triggerMouseEvent(node, eventType) {
    var clickEvent = document.createEvent('MouseEvents');
    clickEvent.initEvent(eventType, true, true);
    if (node) node.dispatchEvent(clickEvent);
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function ifTimestampExpired(timestamp, pivot) {

    // If pivot timestamp has not been existed
    if (!pivot) {
        pivot = Math.floor(Date.now() / 1000);
    }

    return timestamp < pivot;
}


function readTextFile(file, convertToArray) {
    let allText = [];
    let rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status === 0) {
                let result = rawFile.responseText.trim();
                if (convertToArray) {
                    allText = result.split('\n');
                } else allText = result;
            }
        }
    };

    rawFile.send(null);
    return allText;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/*function openNewTab(url) {
	browser.tabs.create({selected: false},function(tab){
		isTabOpen = true;
		openedTab = tab.id;
		browser.tabs.update(openedTab, { url: url.toString() });
		browser.tabs.update(openedTab, { selected:true });
	});

	const creating = browser.tabs.create({
		url: url.toString()
	});

	creating.then(function () {

	}, function () {

	});
}*/

function readBrowsedFileInputByIdLineByLineAndConvertToArray(browserFileInputId, callBack) {
    let keywordsList = [];
    $(browserFileInputId).change(function () {
        if (this.files && this.files[0]) {
            let myFile = this.files[0];
            let reader = new FileReader();
            // alert(this.files.item(0).name);

            reader.addEventListener('load', function (e) {
                keywordsList = e.target.result.split('\n');
                callBack(keywordsList);
            });

            reader.readAsBinaryString(myFile);
        }
    });
}

function isNumeric(num) {
    return !isNaN(num)
}

// example: const string = "XYZ 123 ABC 456 ABC 789 ABC";
// getPosition(string, 'ABC', 2) // --> 16
function getCharPositionInStr(string, subString, index) {
    return string.split(subString, index).join(subString).length;
}

// if array contains an item (needle)
function arrayContains(needle, array) {
    return (array.indexOf(needle) > -1);
}

function checkIfTextInURL(searchedText) {
    return decodeURI(window.location.pathname).toLowerCase().includes(searchedText);
}

function makeAllFirstCharsUpperCaseInString(str) {
    let splitStr = str.toLowerCase().split(' ');
    for (let i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }

    return splitStr.join(' ');
}

function commafy(num) {
    const str = num.toString().split('.');
    if (str[0].length >= 5) {
        str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }
    if (str[1] && str[1].length >= 5) {
        str[1] = str[1].replace(/(\d{3})/g, '$1 ');
    }
    return str.join('.');
}

function getTrimmedWebsiteURl(url, removePrefix = true) {
    let currentWebsiteUrl;

    if (url) {
        currentWebsiteUrl = url;
    } else {
        currentWebsiteUrl = window.location.href;
    }

    // check if website url contain 'www'
    if (removePrefix) {
        if (currentWebsiteUrl.includes('www')) {
            currentWebsiteUrl = currentWebsiteUrl.substring(currentWebsiteUrl.indexOf('.') + 1);
        } else {
            currentWebsiteUrl = currentWebsiteUrl.substring(currentWebsiteUrl.indexOf('//') + 2);
        }
    }

    // remove last "/" from url
    currentWebsiteUrl = currentWebsiteUrl.slice(0, -1);

    // check if we are in sub-pages
    if (currentWebsiteUrl.includes('/')) {
        if (removePrefix) {
            currentWebsiteUrl = currentWebsiteUrl.substring(0, currentWebsiteUrl.indexOf('/'));
        } else {
            currentWebsiteUrl = currentWebsiteUrl.substring(0);
        }
    }

    // return website url only in this format: example.com || example.net
    return currentWebsiteUrl;
}

function getBaseUrl() {
    const getUrl = window.location;
    return getUrl.protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[0];
}

function ifHttpsCurrentUrl() {
    return getBaseUrl().startsWith('https://');
}

function getAllInstalledExtensions(callback) {
    document.addEventListener('_getAllExtensionsName', function (e) {
        const response = e.detail.response;
        callback(response);
    });

    document.dispatchEvent(new CustomEvent('getAllExtensions'));
}

function onLinkClicked(callback) {
    jq(document).on("click", "a", function (event) {
        const href = jq(this).attr("href");
        callback(event, href);
    });
}

function onExternalLinkClicked(localUrl, callback) {

    // Check if url has value, otherwise, use base url
    const currentPageUrl = localUrl ? localUrl : getBaseUrl();

    onLinkClicked((event, link) => {
        const originalLink = link;

        // Check if the link includes 2 https (e.g. https://www.google.com/url?q=https://www.youtube.com/watch?v%3D1cYjH9u2hVs&source=gmail&ust=1654199222201000&usg=AOvVaw2topSxRd8mSQcE5XQbfVTO)
        if (getCountOccurrences(link, 'http') > 1) {
            const secondHttpIdx = getStrIndex(link, 'http', 2);
            link = link.substring(secondHttpIdx, link.length);
        }

        // Check if the link is external (does not include current website url)
        if (!link.includes(currentPageUrl)) {
            callback(event, originalLink);
        }
    });
}

function getCountOccurrences(str, match) {
    return (str.match(new RegExp(match, "g")) || []).length;
}

function getStrIndex(str, char, n) {
    return str.split(char).slice(0, n).join(char).length;
}

function ifStrArrayIncludesStrArray(target, pattern, matchLowercase = false) {

    // Check if one of inputs is null
    if (!target || !pattern) {
        return false;
    }

    // convert "target" to array if is not an array
    if (!Array.isArray(target)) {
        target = target.split(',');
    }

    // convert "pattern" to array if is not an array
    if (!Array.isArray(pattern)) {
        pattern = pattern.split(',');
    }

    let founded = false;
    pattern.some(patternItem => {
        target.some(targetItem => {
            if ((matchLowercase ? targetItem.toLowerCase() : targetItem)
                .includes((matchLowercase === true ? patternItem.toLowerCase() : patternItem))) {
                founded = true;
                return true;
            }
        });
    });

    return founded;
}

function ifStrArrayContainsStrArray(target, pattern, matchLowercase = false) {

    // Check if one of inputs is null
    if (!target || !pattern) {
        return false;
    }

    // convert "target" to array if is not an array
    if (!Array.isArray(target)) {
        target = target.split(',');
    }

    // convert "pattern" to array if is not an array
    if (!Array.isArray(pattern)) {
        pattern = pattern.split(',');
    }

    let founded = false;
    pattern.some(patternItem => {
        if ((matchLowercase ? target.map(item => item.toLowerCase()) : target)
            .indexOf((matchLowercase ? patternItem.toLowerCase() : patternItem)) > -1) {
            founded = true;
            return true;
        }
    });

    return founded;
}

function getChromeVersion() {
    let pieces = navigator.userAgent.match(/Chrom(?:e|ium)\/([0-9]+)\.([0-9]+)\.([0-9]+)\.([0-9]+)/);
    if (pieces == null || pieces.length !== 5) {
        return undefined;
    }

    pieces = pieces.map(piece => parseInt(piece, 10));

    return {
        major: pieces[1],
        minor: pieces[2],
        build: pieces[3],
        patch: pieces[4]
    };
}

function getAttributes($node) {
    const attrs = {};
    jq.each($node[0].attributes, function (index, attribute) {
        attrs[attribute.name] = attribute.value;
    });

    return attrs;
}

function ifWordInElemAttrKeyAndVal(element, word) {
    let ifHasWord = false;

    const attrsObj = getAttributes(element);
    Object.keys(attrsObj).forEach(key => {

        // Check word in key & Check word in value
        if (ifStrArrayIncludesStrArray(key, word) || ifStrArrayIncludesStrArray(attrsObj[key], word)) {
            ifHasWord = true;
            return false;
        }
    });

    return ifHasWord;
}

function ifCreditCardNumberValid(ccNum) {

    // Check if credit card number has the hyphen =. then remove hyphens from the number
    if (ccNum.includes('-')) {
        ccNum = ccNum.replaceAll('-', '');
    }

    const visaRegEx = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
    const mastercardRegEx = /^(?:5[1-5][0-9]{14})$/;
    const amexpRegEx = /^(?:3[47][0-9]{13})$/;
    const discovRegEx = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/;

    return visaRegEx.test(ccNum) || mastercardRegEx.test(ccNum) || amexpRegEx.test(ccNum) || discovRegEx.test(ccNum);
}


function getBoundingBoxInArbitrarySpace(element, mat) {
    let svgRoot = element.ownerSVGElement;
    let bbox = element.getBBox();

    let cPt1 = svgRoot.createSVGPoint();
    cPt1.x = bbox.x;
    cPt1.y = bbox.y;
    cPt1 = cPt1.matrixTransform(mat);

    // repeat for other corner points and the new bbox is
    // simply the minX/minY  to maxX/maxY of the four points.
    let cPt2 = svgRoot.createSVGPoint();
    cPt2.x = bbox.x + bbox.width;
    cPt2.y = bbox.y;
    cPt2 = cPt2.matrixTransform(mat);

    let cPt3 = svgRoot.createSVGPoint();
    cPt3.x = bbox.x;
    cPt3.y = bbox.y + bbox.height;
    cPt3 = cPt3.matrixTransform(mat);

    let cPt4 = svgRoot.createSVGPoint();
    cPt4.x = bbox.x + bbox.width;
    cPt4.y = bbox.y + bbox.height;
    cPt4 = cPt4.matrixTransform(mat);

    let points = [cPt1, cPt2, cPt3, cPt4]

    //find minX,minY,maxX,maxY
    let minX = Number.MAX_VALUE;
    let minY = Number.MAX_VALUE;
    let maxX = 0
    let maxY = 0
    for (let i = 0; i < points.length; i++) {
        if (points[i].x < minX) {
            minX = points[i].x
        }
        if (points[i].y < minY) {
            minY = points[i].y
        }
        if (points[i].x > maxX) {
            maxX = points[i].x
        }
        if (points[i].y > maxY) {
            maxY = points[i].y
        }
    }

    //instantiate new object that is like an SVGRect
    let newBBox = {"x": minX, "y": minY, "width": maxX - minX, "height": maxY - minY}
    return newBBox;
}

function getBBoxInScreenSpace(element) {
    return getBoundingBoxInArbitrarySpace(element, element.getScreenCTM());
}

function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        const successful = document.execCommand('copy');
        const msg = successful ? 'successful' : 'unsuccessful';
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
    }

    document.body.removeChild(textArea);
}

function copyTextToClipboard(text) {
    if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(text);
        return;
    }
    navigator.clipboard.writeText(text).then(function () {
        console.log('Async: Copying to clipboard was successful!');
    }, function (err) {
        console.error('Async: Could not copy text: ', err);
    });
}

function base64ToBlob(b64Data, contentType = '', sliceSize = 512) {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, {type: contentType});
}

function $copyImgToClipboardByBase64(base64Data, callback) {

    // Check if data exists
    if (!base64Data) {
        callback(null);
        return;
    }

    fetch(base64Data)
        .then(res => res.blob())
        .then(blob => {
            navigator.clipboard.write([
                new ClipboardItem({
                    [blob.type]: blob
                })
            ]).then(() => {
                if (callback) callback();
            })
        });
}

function showToastError(text, duration = 5000, destination = null, newWindow = true,
                        showCloseIcon = true, stopOnFocus = true, onDismissCallBack, onClick) {
    _showToast('error', text, duration, destination, newWindow, showCloseIcon, stopOnFocus, onDismissCallBack, onClick);
}

function showToastWarn(text, duration = 5000, destination, newWindow = true,
                       showCloseIcon = true, stopOnFocus = true, onDismissCallBack, onClick) {
    _showToast('warn', text, duration, destination, newWindow, showCloseIcon, stopOnFocus, onDismissCallBack, onClick);
}

function showToastInfo(text, duration = 5000, destination, newWindow = true,
                       showCloseIcon = true, stopOnFocus = true, onDismissCallBack, onClick) {
    _showToast('info', text, duration, destination, newWindow, showCloseIcon, stopOnFocus, onDismissCallBack, onClick);
}

function showToastSuccess(text, duration = 5000, destination, newWindow = true,
                          showCloseIcon = true, stopOnFocus = true, onDismissCallBack, onClick) {
    _showToast('success', text, duration, destination, newWindow, showCloseIcon, stopOnFocus, onDismissCallBack, onClick);
}

function _showToast(type, text, duration, destination, newWindow, showCloseIcon, stopOnFocus, onDismissCallBack, onClick) {
    let className;
    if (type === 'error') className = 'toast-error';
    else if (type === 'warn') className = 'toast-warn';
    else if (type === 'info') className = 'toast-info';
    else if (type === 'success') className = 'toast-success';

    Toastify({
        text: text,
        duration: duration,
        className: className,
        destination: destination,
        newWindow: newWindow,
        close: showCloseIcon,
        stopOnFocus: stopOnFocus, // Prevents dismissing of toast on hover
        callback: onDismissCallBack,
        onClick: onClick
    }).showToast();
}
