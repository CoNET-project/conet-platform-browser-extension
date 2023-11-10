var config = {
    mode: "fixed_servers",
    rules: {
        singleProxy: {
            scheme: "socks5",
            host: "127.0.0.1",
            port: '3003'
        },
        bypassList: []
    }
}

const actionProcess = async () => {
    const actionEnabled = await chrome.action.isEnabled()
    if (actionEnabled) {
        return chrome.action.disable()
    }
    chrome.action.enable()
}

chrome.action.onClicked.addListener(actionProcess)