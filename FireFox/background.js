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
// browser.browserAction.onClicked.addListener();

browser.browserAction.onClicked.addListener(function (activeTab) {
    // browser.tabs.create({'url': browser.runtime.getURL('app/index.html')});

    getCurrentTabInfo(tab => {
        browser.tabs.create({
            url: 'app/index.html',
            windowId: tab.windowId
        });
    });
});

// Get messages from content_extension.js file (We call "onMessage" method by calling "sendMessage" method in content_extension)
browser.runtime.onMessage.addListener(function (request, sender, sendResponse) {

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
        browser.action.setBadgeText({tabId: tabInfo.id, text: data.text}); // Set Badge text
        browser.action.setBadgeBackgroundColor({tabId: tabInfo.id, color: data.bgColor}); // Set badge background color
    });
}

function showExtensionPopupWithFileName(data, sender) {

    // Get current tab info (here we only want tab id)
    getCurrentTabInfo(tab => {
        tabInfo = tab;
        browser.action.setPopup({tabId: tabInfo.id, popup: data.popupFileName});
    });
}

function openUrlInNewTab(data, sender) {

    /*browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var tab = tabs[0];
        browser.tabs.update(tab.id, {url: data.urlAddress});
    });*/

    browser.tabs.create({selected: false}, function (tab) {
        isTabOpen = true;
        openedTab = tab.id;
        browser.tabs.update(openedTab, {url: data.urlAddress});
        browser.tabs.update(openedTab, {selected: true});
    });
}

function openImageInNewTab(data) {
    getCurrentTabInfo(tab => {
        browser.tabs.create({
            url: data.urlAddress,
            windowId: tab.windowId
        });
    });
}

// Add "management" as permissions to manifest.json
function getAllInstalledExt(callback) {
    const gettingAll = browser.management.getAll();
    gettingAll.then(infoArray => {
        callback(infoArray.filter(item => item.type === "extension").map(item => item.name));
    });
}

// Add "management" as permissions to manifest.json
function getCurrentTabInfo(callback) {
    browser.tabs.query({
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
        browser.tabs.get(tabId, function(tab) {
            browser.tabs.captureVisibleTab(tab.windowId, { format: "png" }, function(dataUrl) {
                callback(dataUrl);
            });
        });
    }
}
