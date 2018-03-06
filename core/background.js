
/*
	Открываем информационную страницу
	с инструкцией как использовать расширение
*/
chrome.runtime.onInstalled.addListener(function(details){
    if(details.reason == "install"){
        //call a function to handle a first install
		chrome.tabs.create({'url' : 'https://goo.gl/7w7bMx'}, function (tab) { });
    }else if(details.reason == "update"){
        //call a function to handle an update
    }
});

/*
	Подключение скрипта стикеров для страницы,
	а также скрипта отслеживания статистики
*/
chrome.webNavigation.onCompleted.addListener(function(details) {
    if (details.frameId === 0) {
        var tabUrl = details.url;
        if (tabUrl && tabUrl.indexOf("vk.com")) {
            chrome.tabs.executeScript(details.tabId, {
                "file": "core/cs.js",
                allFrames: false
            });
        }
		chrome.tabs.executeScript(details.tabId, {
			"file": "core/counter.js",
			allFrames: false
		});
    }
});

chrome.tabs.onCreated.addListener(injectStickerCSS);

chrome.tabs.onUpdated.addListener(function(tabId, info, tab) {
    if (info.status == 'complete') do_something(tab);
});

/*
	Подключение стилей для корректной работы
	новых стикеров в личных сообщениях
*/
function injectStickerCSS(tab) {
    var tabUrl = tab.url;
    if (tabUrl && tabUrl.indexOf("vk.com") != -1) {
        chrome.tabs.insertCSS(tab.id, {
            file: "core/styles.css"
        });
    }
}
