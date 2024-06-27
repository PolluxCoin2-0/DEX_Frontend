
const ent = new Event('Change');

function injectedFunction() {
  const scriptUrl = chrome.runtime.getURL('CallingFuncation.js');
  const scriptElement = document.createElement('script');
  scriptElement.src = scriptUrl;
  document.body.appendChild(scriptElement);
}




chrome.webNavigation.onCommitted.addListener(function (details) {
  chrome.scripting.executeScript({
    target: { tabId: details.tabId },
    function: injectedFunction
  });
});


let vid;
chrome.runtime.onConnect.addListener(function (port) {
  port.onMessage.addListener(function (msg) {
    if (msg.joke === "Knock knock") {
      chrome.windows.create({
        url: "index.html",
        type: 'popup',
        height: 700,
        width: 400,
      },
        function (chromeWindow) {
          vid = chromeWindow.id;
          const myData = { "Isopen": 'true' };
          chrome.storage.local.set({ myData }, function () {
          });
        }
      )
    } else {
    }
  });
  port.onDisconnect.addListener(function () {
  });
});

chrome.runtime.onMessageExternal.addListener(
  function (request, sender, sendResponse) {
    //console.log("Web massge");
  });

chrome.runtime.onMessage.addListener(request => {

  if (request.data == "APPCLOSE") {
    chrome.windows.remove(vid, function () {

    });
    return;
  }
  if (request.action == "Network change") {

    return;
  }
  if (request.action == "Address") {
    console.log("In Address", request.data);
    const address = { "Address": request.data };
    chrome.storage.local.set({ address }, function () {
      console.log('Data saved to local storage');
    });
    return;
  }

  chrome.windows.get(vid, function (chromeWindow) {
    if (!chrome.runtime.lastError && chromeWindow) {
      chrome.windows.update(vid, { focused: true });
      return;
    }
  });
});
chrome.windows.onRemoved.addListener(function (windowId) {
  const myData = { "Isopen": 'false' };
  chrome.storage.local.set({ myData }, function () {
  });

});

