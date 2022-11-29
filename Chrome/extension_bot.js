let jq;

(function () {

    // run init after jquery loaded
    let nTimer = setInterval(function () {
        if (window.jQuery) {

            // run init
            jq = jQuery.noConflict(true);
            (function ($) {
                $(function () {
                    botInit();
                });
            })(jq);

            // clear interval of checking
            clearInterval(nTimer);
        }
    }, 100);

})();

const thanxIframeAppId = 'thanx-iframe-angular-app-id';

let currentDomain;

function botInit() {

    // Prepare current website domain
    prepareCurrentDomain();

    // Identifying current page product
    identifying(false);

    // Prepare all init listeners
    prepareListeners();
}

function prepareCurrentDomain() {
    const trimmedBaseUrl = getTrimmedWebsiteURl(getBaseUrl(), true);
    const dotCountInDomain = getCountOccurrences(trimmedBaseUrl, '.');

    if (dotCountInDomain > 1) {
        currentDomain = trimmedBaseUrl.replace(/^[^.]+\./g, "");
    } else {
        currentDomain = trimmedBaseUrl;
    }
}

function identifying(fromIcon) {

    // Send request to API for identifying current page product
    httpGet('/stores?domain=' + currentDomain, null, false, function (responseStore) {

        // Check if response has at least one item and inside the item the slug exists
        if (responseStore.result?.items[0] && responseStore.result?.items[0]['slug']) {

            // Open Angular app in iframe
            // Send response product "slug" to open corresponding product page in Angular app
            openModal(thanxIframeAppId,
                {
                    iframe: {
                        className: 'myext-iframe'
                    },
                    overlay: {
                        hasCancelBtn: true,
                        cancelBtnClassName: 'myext-modal-overlay-custom-cancel-btn'
                    }
                },
                'app/index.html#/stores/' + responseStore.result.items[0]['slug'],
                true,
                () => {

                    // Send message to iframe
                    setTimeout(() => {
                        sendMessageToIframe('open-product-page', {slug: responseStore.result.items[0]['slug']});
                    }, 1000);
                });
        } else {

            if (fromIcon) {
                // Open Angular app in iframe
                // Send response product "slug" to open corresponding product page in Angular app
                openModal(thanxIframeAppId,
                    {
                        iframe: {
                            className: 'myext-iframe'
                        },
                        overlay: {
                            hasCancelBtn: true,
                            cancelBtnClassName: 'myext-modal-overlay-custom-cancel-btn'
                        }
                    },
                    'app/index.html#/stores',
                    true,
                    () => {

                        // Send message to iframe
                        /*setTimeout(() => {
                            sendMessageToIframe('open-product-page', {slug: responseStore.result.items[0]['slug']});
                        }, 1000);*/
                    });
            }


        }
    });
}

function prepareListeners() {
    onExtensionIconClick(() => identifying(true));
}
