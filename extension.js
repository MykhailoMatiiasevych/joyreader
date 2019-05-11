const env = chrome || browser;
env.browserAction.onClicked.addListener(tab => env.tabs.sendMessage(tab.id, "revert"));