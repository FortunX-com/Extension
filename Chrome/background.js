let tabInfo = {
    active: undefined,
    audible: undefined,
    autoDiscardable: undefined,
    discarded: undefined,
    favIconUrl: undefined,
    height: undefined,
    highlighted: undefined,
    id: undefined,
    incognito: undefined,
    index: undefined,
    mutedInfo: {
        muted: undefined,
    },
    pinned: undefined,
    selected: undefined,
    status: undefined,
    title: undefined,
    url: undefined,
    width: undefined,
    windowId: undefined,
};

// Send messages to content_extension.js file
// chrome.browserAction.onClicked.addListener();

chrome.action.onClicked.addListener(function (activeTab) {
    getCurrentTabInfo(tab => {
        ensureSendMessage(tab.id, { type: 'on_extension_icon_clicked' });
    });
});

// Background
function ensureSendMessage(tabId, message, callback) {

    chrome.tabs.sendMessage(tabId, message, function (response) {

        // Content script ready
        if (response && response.message) {
            chrome.tabs.sendMessage(tabId, message, callback);

            // No listener on the other end
        } else {

            // Check if "content_script" ready
            chrome.tabs.executeScript(tabId, {file: "content_script.js"}, function () {

                if (chrome.runtime.lastError) {
                    console.error(chrome.runtime.lastError);
                    throw Error("Unable to inject script into tab " + tabId);
                }

                // OK, now it's injected and ready
                chrome.tabs.sendMessage(tabId, message, callback);
            });
        }
    });
}

// Get messages from content_extension.js file (We call "onMessage" method by calling "sendMessage" method in content_extension)
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

    // If request related to fetch data from API
    if (request.url && request.url !== '') {

        // Fetch http request and send back the response
        fetch(request.url, request.init).then(function (response) {

            return response.text().then(function (text) {
                sendResponse([{
                    body: text,
                    status: response.status,
                    statusText: response.statusText,
                }, null]);
            });
        }, function (error) {
            sendResponse([null, error]);
        });

        // If request do not related to fetch data from API
    } else {
        detectMessageType(request, sender, sendResponse);
    }

    return true;
});

function detectMessageType(request, sender, sendResponse) {

    // Check background request type
    if (request && request.type) {

        switch (request.type) {

            case 'badge': {
                setBadgeData(request.options, sender);
                break;
            }

            case 'show_popup_with_filename': {
                showExtensionPopupWithFileName(request.options, sender);
                break;
            }

            case 'open_link_in_new_tab': {
                openUrlInNewTab(request.options, sender);
                break;
            }

            case 'open_image_in_new_tab': {
                openImageInNewTab(request.options, sender);
                break;
            }

            case 'get_all_installed_extensions': {
                getAllInstalledExt(extensionsArray => {

                    // Send extensions array to content_extension
                    sendResponse(extensionsArray);
                });
                break;
            }

            case 'get_current_tab_info': {
                getCurrentTabInfo(tab => {

                    // Send current tab info to content_extension
                    sendResponse(tab);
                });
                break;
            }

            case 'close_popup': {
                doClosePopup();
                break;
            }

            case 'capture-screenshot': {
                capture(request.options, data => {

                    // Send captured image data to content_extension
                    sendResponse(data);
                });
                break;
            }
        }
    }
}

function setBadgeData(data, sender) {

    // Get current tab info (here we only want tab id)
    getCurrentTabInfo(tab => {
        tabInfo = tab;
        chrome.action.setBadgeText({tabId: tabInfo.id, text: data.text}); // Set Badge text
        chrome.action.setBadgeBackgroundColor({tabId: tabInfo.id, color: data.bgColor}); // Set badge background color
    });
}

function showExtensionPopupWithFileName(data, sender) {

    // Get current tab info (here we only want tab id)
    getCurrentTabInfo(tab => {
        tabInfo = tab;
        chrome.action.setPopup({tabId: tabInfo.id, popup: data.popupFileName});
    });
}

function openUrlInNewTab(data, sender) {

    /*chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var tab = tabs[0];
        chrome.tabs.update(tab.id, {url: data.urlAddress});
    });*/

    chrome.tabs.create({selected: false}, function (tab) {
        isTabOpen = true;
        openedTab = tab.id;
        chrome.tabs.update(openedTab, {url: data.urlAddress});
        chrome.tabs.update(openedTab, {selected: true});
    });
}

function openImageInNewTab(data) {
    getCurrentTabInfo(tab => {
        chrome.tabs.create({
            url: data.urlAddress,
            windowId: tab.windowId
        });
    });
}

// Add "management" as permissions to manifest.json
function getAllInstalledExt(callback) {
    const gettingAll = chrome.management.getAll();
    gettingAll.then(infoArray => {
        callback(infoArray.filter(item => item.type === "extension").map(item => item.name));
    });
}

// Add "management" as permissions to manifest.json
function getCurrentTabInfo(callback) {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function (tab) {
        callback(tab[0]);
    });
}

// Close popup
function doClosePopup() {
    // ...
}

function capture(options, callback) {
    let tabId = options.tabId;

    // Check if tabId does not exist then consider current tab id as tabId
    if (!tabId) {
        getCurrentTabInfo(tab => {
            tabId = tab.id;
            doCapture(tabId)
        });
    }

    function doCapture(tabId) {
        chrome.tabs.get(tabId, function (tab) {
            chrome.tabs.captureVisibleTab(tab.windowId, {format: "png"}, function (dataUrl) {
                callback(dataUrl);
            });
        });
    }
}
