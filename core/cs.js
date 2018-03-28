
var s = document.createElement('script');
s.src = chrome.extension.getURL('core/vk.js');
s.charset = "utf-8";
s.onload = function() {
    this.remove();
};
(document.head || document.documentElement).appendChild(s);
