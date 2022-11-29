/*var config = {
	scripts: [
		// add ".js" files to web_accessible_resources in manifest.json
	]
};*/

const modalPath = 'modal/modal/modal.html';
const preModalContainerId = '_container-';

// Show popup with file name
document.addEventListener('show_popup_with_filename', function (e) {
    const popupFileName = e.detail.fileName;
    const type = 'show_popup_with_filename';

    //code to send message to open notification. This will eventually move into my extension logic
    browser.runtime.sendMessage({
        type: type, options: {
            popupFileName: popupFileName
        }
    });
});

// Set badge data
document.addEventListener('setBadgeData', function (e) {
    const data = e.detail.data;
    const type = 'badge';

    //code to send message to open notification. This will eventually move into my extension logic
    browser.runtime.sendMessage({
        type: type, options: {
            text: data.text,
            bgColor: data.bgColor
        }
    });
});

// Open link in new tab
document.addEventListener('_openLinkInNewTab', function (e) {
    const urlAddress = e.detail.urlAddress;
    const type = 'open_link_in_new_tab';

    //code to send message to open notification. This will eventually move into my extension logic
    browser.runtime.sendMessage({
        type: type, options: {
            urlAddress: urlAddress
        }
    });
});

// Open image in new tab
document.addEventListener('_openImageInNewTab', function (e) {
    const urlAddress = e.detail.urlAddress;
    const type = 'open_image_in_new_tab';

    //code to send message to open notification. This will eventually move into my extension logic
    browser.runtime.sendMessage({
        type: type, options: {
            urlAddress: urlAddress
        }
    });
});

// Get the user all installed extensions
document.addEventListener('getAllExtensions', function (e) {
    const type = 'get_all_installed_extensions';

    //code to send message to open notification. This will eventually move into my extension logic
    browser.runtime.sendMessage({type: type}, response => {
        document.dispatchEvent(new CustomEvent('_getAllExtensionsName', {detail: {'response': response}}));
    });
});

// Get current tab info
document.addEventListener('_dispatch_getCurrentTabInfo', function (e) {
    const type = 'get_current_tab_info';

    //code to send message to open notification. This will eventually move into my extension logic
    browser.runtime.sendMessage({type: type}, response => {
        document.dispatchEvent(new CustomEvent('_listener_getCurrentTabInfo', {detail: {'response': response}}));
    });
});

// send message to iframe
document.addEventListener('sendMessageToIframe', function (e) {
    var type = e.detail.type;
    var data = e.detail.data;

    browser.runtime.sendMessage({type: type, data: data});
});

// Get received message from popup
document.addEventListener('_dispatch_receivePopupMessageByBot', function (e) {

    //code to send message to open notification. This will eventually move into my extension logic
    browser.runtime.onMessage.addListener((message, sender, response) => {
        document.dispatchEvent(new CustomEvent('_listener_receivePopupMessageByBot', {detail: {'response': message}}));
    });
});

// Close popup
document.addEventListener('_dispatch_closePopup', function (e) {
    const type = 'close_popup';

    //code to send message to open notification. This will eventually move into my extension logic
    browser.runtime.sendMessage({type: type});
});

// Open modal
document.addEventListener('openModal', async function (e) {
    const id = e.detail.id;
    const contentPath = e.detail.contentPath ? e.detail.contentPath : modalPath;
    const setIframeSrc = e.detail.setIframeSrc ? e.detail.setIframeSrc : false;
    const options = e.detail.options;
    const modal_counter = e.detail.counter;

    getHtmlContent(contentPath).then(modalHtmlContent => {

        // Create modal overlay (a black layer behind the modal body)
        const overlayElem = document.createElement("div");
        overlayElem.classList.add('myext-modal-overlay');
        overlayElem.setAttribute("id", id);

        // Create an iframe for showing modal body (in Chrome extension the modal should be used with iframe)
        const iframeElement = document.createElement("iframe");

        // if options has iframe class name for styling
        if (options?.iframe?.className) {
            iframeElement.classList.add(options.iframe.className);
        } else {
            iframeElement.setAttribute("style", "width: 100%; height: 100%;");
        }

        // Check if "setIframeSrc" is true then add src attribute to iframe (e.g. for Angular project)
        if (setIframeSrc) {
            iframeElement.src = browser.runtime.getURL(contentPath);
        }

        // If overlay has cancel button then prepare to clear iframe from screen by click on cancel icon
        if (options?.overlay?.hasCancelBtn) {
            const cancelButton = document.createElement("span");
            cancelButton.innerText = '+';
            cancelButton.classList.add('myext-modal-overlay-cancel-btn');
            overlayElem.appendChild(cancelButton);

            jq(cancelButton).click(() => {
                closeModal(id);
            });
        }

        // Set iframe as modal overlay child
        overlayElem.appendChild(iframeElement);

        // Modal body container
        const modalBodyContainerId = preModalContainerId + id;
        const modalBodyContainer = document.createElement("div");
        modalBodyContainer.classList.add('myext-modal-container');
        modalBodyContainer.setAttribute("id", modalBodyContainerId);

        // Add modal html file content to modal body container
        modalBodyContainer.innerHTML = modalHtmlContent;

        document.body.appendChild(overlayElem);
        document.body.appendChild(modalBodyContainer);

        // Check if options exist
        if (options && contentPath === modalPath) {
            const header = options.header;
            if (header && header.title && header.title.text) {
                jq('#' + modalBodyContainerId + ' #title').text(header.title.text);
            } else {
                jq('#' + modalBodyContainerId + ' #title').remove();
            }

            jq('#' + modalBodyContainerId + ' #close-icon').click(() => {
                document.dispatchEvent(new CustomEvent(modal_counter + '_onModalCloseIconClick', {detail: {'response': null}}));
            });

            const content = options.content;
            if (content && content.text) {
                jq('#' + modalBodyContainerId + ' #content').text(content.text);
            } else {
                jq('#' + modalBodyContainerId + ' #content').remove();
            }

            const footer = options.footer;
            if (footer) {

                const posBtn = footer.positiveBtn;
                if (posBtn && posBtn.text) {
                    jq('#' + modalBodyContainerId + ' #positive-btn').text(posBtn.text)
                        .click(() => {
                            document.dispatchEvent(new CustomEvent(modal_counter + '_onModalPosBtnClick', {detail: {'response': null}}));
                        });
                } else {
                    jq('#' + modalBodyContainerId + ' #positive-btn').remove();
                }

                const negBtn = footer.negativeBtn;
                if (negBtn && negBtn.text) {
                    jq('#' + modalBodyContainerId + ' #negative-btn').text(negBtn.text)
                        .click(() => {
                            document.dispatchEvent(new CustomEvent(modal_counter + '_onModalNegBtnClick', {detail: {'response': null}}));
                        });
                } else {
                    jq('#' + modalBodyContainerId + ' #negative-btn').remove();
                }

                const neutralBtn = footer.neutralBtn;
                if (neutralBtn && neutralBtn.text) {
                    jq('#' + modalBodyContainerId + ' #neutral-btn').text(neutralBtn.text)
                        .click(() => {
                            document.dispatchEvent(new CustomEvent(modal_counter + '_onModalNeutralBtnClick', {detail: {'response': null}}));
                        });
                } else {
                    jq('#' + modalBodyContainerId + ' #neutral-btn').remove();
                }

                const dontShowAgain = footer.dontShowAgain;
                const dontShowAgainId = '#dont-show-again';
                const dontShowAgainWrapperId = '#' + modalBodyContainerId + ' #dont-show-again-wrapper';
                if (dontShowAgain) {
                    jq(dontShowAgainWrapperId).children(dontShowAgainId)
                        .click(() => {
                            document.dispatchEvent(new CustomEvent(modal_counter + '_onModalDontShowAgainClick', {detail: {'response': {is_checked: jq(dontShowAgainId).is(':checked')}}}));
                        });
                } else {
                    jq(dontShowAgainWrapperId).remove();
                }
            }
        }

        document.dispatchEvent(new CustomEvent(modal_counter + '_responseModalOpened', {detail: {'response': null}}));
    });
});

// Close modal
document.addEventListener('closeModal', async function (e) {
    const id = e.detail.id;
    const modal_counter = e.detail.counter;

    const overlayElem = document.getElementById(id);
    const modalBodyContainerId = preModalContainerId + id;
    const modalBodyContainer = document.getElementById(modalBodyContainerId);

    if (overlayElem) overlayElem.remove();
    if (modalBodyContainer) modalBodyContainer.remove();

    document.dispatchEvent(new CustomEvent(modal_counter + '_responseModalClosed', {detail: {'response': null}}));
});

// Capture screenshot
document.addEventListener('_dispatch_captureScreenshot', function (e) {
    const tabId = e.detail.tabId;
    const viewport_capture_counter = e.detail.counter;
    const type = 'capture-screenshot';

    //code to send message to open notification. This will eventually move into my extension logic
    browser.runtime.sendMessage({
            type: type,
            options: { tabId: tabId }
        },
        response => {
            document.dispatchEvent(new CustomEvent(viewport_capture_counter + '_listener_captureScreenshot', {detail: {'response': response}}));
        });
});

// get data from storage
document.addEventListener('getDataFromStorage', function (e) {
    const key = e.detail.key;
    const storage_counter = e.detail.counter;

    browser.storage.local.get([key], function (items) {
        let value;

        // Check if value exists
        if (items[key]) {
            value = items[key].value;

            // Check expiration time (if value has expired)
            const expireTimestamp = items[key].expire;
            if (expireTimestamp && ifTimestampExpired(expireTimestamp, getCurrentTimestamp())) {
                value = undefined
            }
        }

        document.dispatchEvent(new CustomEvent(storage_counter + '_responseDataFromStorage', {detail: value}));
    });
});

// set data to storage
document.addEventListener('saveDataInStorage', function (e) {
    const key = e.detail.key;
    const data = e.detail.data;

    browser.storage.local.set({[key]: data});
});

/*// get website base url
document.addEventListener('getWebsiteBaseUrl', function (e) {
	const getUrl = window.location;
	const url = getUrl.protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[0];

	document.dispatchEvent(new CustomEvent('_getWebsiteBaseUrl', { detail: {'url': url}}));
});*/

// http request
document.addEventListener('requestHttp', function (e) {
    const url = e.detail.url;
    const init = JSON.parse(e.detail.init);
    const http_counter = e.detail.counter;

    fetchResource(url, init).then(r => r.text()).then(result => {
        document.dispatchEvent(new CustomEvent(http_counter + '_responseHttp', {detail: result}));
    }).catch(error => {
        document.dispatchEvent(new CustomEvent(http_counter + '_errorHttp', {detail: error}));
    });
});

function fetchResource(url, init) {
    return new Promise((resolve, reject) => {
        browser.runtime.sendMessage({url, init}, messageResponse => {
            const [response, error] = messageResponse;
            if (response === null) {
                reject(error);
            } else {

                // Use undefined on a 204 - No Content
                const body = response.body ? new Blob([response.body]) : undefined;
                resolve(new Response(body, {
                    status: response.status,
                    statusText: response.statusText,
                }));
            }
        });
    });
}

// prepare and add scripts
/*var scriptList = config['scripts'];

for (var i = 0; i < scriptList.length; i++) {
    var s = document.createElement('script');
    s.src = browser.runtime.getURL(scriptList[i]);
    s.onload = function () {
        this.remove();
    };
    (document.head || document.documentElement).appendChild(s);
}*/
