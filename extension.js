const activeTabs = {};

const getTabId = async () => {
    return (await browser.tabs.query({
        active: true,
        currentWindow: true
    }))[0].id;
};

const updateLogo = tabId => {
    const path = activeTabs[tabId] ? 'activelogo64.png' : 'logo64.png';
    browser.browserAction.setIcon({ path, tabId });
};

const sendMessage = async (tabId, isReader) => {

    if (tabId) {
        const response = await browser.tabs.sendMessage(tabId, { isReader }).catch(() => null);
        if (response) {
            activeTabs[tabId] = response.isReader;
            updateLogo(tabId);
        } else {
            // Tab doesn't have content script
            delete activeTabs[tabId];
            updateLogo(tabId);
        }
    }
};

const onClicked = async () => {
    const tabId = await getTabId();
    await sendMessage(tabId, !activeTabs[tabId]);
};

const onUpdated = async (tabId, changeInfo) => {
    if (changeInfo.status === 'complete' && activeTabs[tabId]) {
        await sendMessage(tabId, activeTabs[tabId]);
    }
};

browser.browserAction.onClicked.addListener(onClicked);
browser.tabs.onUpdated.addListener(onUpdated);