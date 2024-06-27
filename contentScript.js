
let msg = { "Side": "Content", "type": "OpenApp" };
let isopen = false;
let localdone = false;


window.addEventListener("message", async function (event) {
  let element;
  try {
    element = JSON.parse(event.data)
  } catch (e) {
    element = event.data;
  }

  if (element['Side'] == "webpageMessage" && element["type"] == "OpenApp") {
    openApp();
  } else if (element['Side'] == "webpageMessage" && element["type"] == "checknetwork") {
    setTimeout(async () => {
      if (isopen.toString() == "true") {
        checknetwork();
        return;
      } else {
        openApp();
        setTimeout(() => {
          checknetwork();
          return;
        }, 4000);
      }
    }, 3000);
  } else if (element['Side'] == "webpageMessage" && element["type"] == "GetDetails") {
    openApp();
    setTimeout(() => {
      getDetails();
      return;
    }, 5000);
    // setTimeout(async () => {
    //   //console.log("in CALL Done", isopen);
    //   if (isopen.toString() == "true") {
    //     getDetails();
    //     return;
    //   } else {
    //     openApp();
    //     setTimeout(() => {
    //       getDetails();
    //       return;
    //     }, 4000);
    //   }
    // }, 3000);
  } else if (element['Side'] == "webpageMessage" && element["type"] == "Signdata") {
    openApp();
    setTimeout(async () => {
      await signdata(element['data']);
      return;
    }, 5000);
    // setTimeout(async () => {
    //   //console.log("in CALL Done", isopen);
    //   if (isopen.toString() == "true") {
    //     await signdata(element['data']);
    //     return;
    //   } else {
    //     openApp();
    //     setTimeout(async () => {
    //       await signdata(element['data']);
    //       return;
    //     }, 5000);
    //   }
    // }, 3000);

  } else if (element['Side'] == "webpageMessage" && element["type"] == "broadcastdata") {
    // setTimeout(async () => {
    //   //console.log("in CALL Done", isopen);
    //   if (isopen.toString() == "true") {
    //     await broadcast(element['data']);
    //     return;
    //   } else {
    //     openApp();
    //     setTimeout(async () => {
    //       await broadcast(element['data']);
    //       return;
    //     }, 5000);
    //   }
    // }, 3000);
    openApp();
    setTimeout(async () => {
      await broadcast(element['data']);
      return;
    }, 5000);

  } else if (element['Side'] == "webpageMessage" && element["type"] == "SendPOX") {
    setTimeout(async () => {
      //console.log("in CALL Done", isopen);
      if (isopen.toString() == "true") {
        await SendPOX(element['data']['amount'], element['data']['address']);
        return;
      } else {
        openApp();
        setTimeout(async () => {
          await SendPOX(element['data']['amount'], element['data']['address']);
          return;
        }, 5000);
      }
    }, 3000);

  } else if (element['Side'] == "webpageMessage" && element["type"] == "SendPOX20") {
    setTimeout(async () => {
      //console.log("in CALL Done", isopen);
      if (isopen.toString() == "true") {
        await
          (element['data']['amount'], element['data']['address']);
        return;
      } else {
        openApp();
        setTimeout(async () => {
          await SendTRC20(element['data']['amount'], element['data']['address']);
          return;
        }, 5000);
      }
    }, 3000);

  } else if (element['Side'] == "webpageMessage" && element["type"] == "freezeBalanace") {
    if (isopen.toString() == "true") {
      await freezeBalanace(element['data']['amount'], element['data']['resource']);
      return;
    } else {
      openApp();
      setTimeout(async () => {
        await freezeBalanace(element['data']['amount'], element['data']['resource']);
        return;
      }, 5000);
    }
  } else if (element['Side'] == "webpageMessage" && element["type"] == "UnfreezeBalanace") {
    openApp();
    setTimeout(async () => {
      await UnfreezeBalanace(element['data']['amount'], element['data']['resource']);
      return;
    }, 5000);
  } else if (element['Side'] == "webpageMessage" && element["type"] == "CreateProposal") {
    openApp();
    setTimeout(async () => {
      await CreateProposal(element['data']['key'], element['data']['value']);
      return;
    }, 5000);
  } else if (element['Side'] == "webpageMessage" && element["type"] == "VoteProposal") {
    openApp();
    setTimeout(async () => {
      await VoteProposal(element['data']['Propodalid'], element['data']['value']);
      return;
    }, 5000);
  } else if (element['Side'] == "webpageMessage" && element["type"] == "Vote") {
    openApp();
    setTimeout(async () => {
      await Vote(element['data']['voteslist']);
      return;
    }, 5000);
  } else if (element['Side'] == "webpageMessage" && element["type"] == "CreateContract") {
    openApp();
    setTimeout(async () => {
      await CreateContract(element['data']['payload']);
      return;
    }, 5000);
  } else if (element['Side'] == "webpageMessage" && element["type"] == "triggersmartContact") {
    openApp();
    setTimeout(async () => {
      await trigger_SmartContract(element['data']);
      return;
    }, 5000);
  } else if (element['Side'] == "webpageMessage" && element["type"] == "Sendtransaction") {
    openApp();
    setTimeout(async () => {
      await Sendtransaction(element['data']);
      return;
    }, 5000);
  } else if (element['Side'] == "webpageMessage" && element["type"] == "Withdrawbalance") {
    openApp();
    setTimeout(async () => {
      await Withdrawbalance(element['data']);
      return;
    }, 5000);
  } else if (element['Side'] == "webpageMessage" && element["type"] == "Withdrawexpireunfreeze") {
    openApp();
    setTimeout(async () => {
      await Withdrawexpireunfreeze(element['data']);
      return;
    }, 5000);
  } else if (element['Side'] == "webpageMessage" && element["type"] == "triggerconstantcontract") {
    openApp();
    setTimeout(async () => {
      await trigger_constantcontract(element['data']);
      return;
    }, 5000);
  } else if (element['Side'] == "webpageMessage" && element["type"] == "Getwallet") {
    getwalletadress();
  }
});


async function getlocal() {
  isopen = false;
  localdone = false;
  chrome.storage.local.get(['myData'], function (result) {
    const dataFromStorage = result.myData;
    isopen = dataFromStorage.Isopen;
    localdone = true;
    return dataFromStorage.Isopen;
  });
}
function getnetwork() {
  chrome.storage.local.get(['networkchnage'], function (result) {
    const dataFromStorage = result.networkchnage;
  });
}

function openApp() {
  if (isopen == true) {
    return;
  }
  var port = chrome.runtime.connect({ name: "knockknock" });
  port.postMessage({ joke: "Knock knock" });


  return "Done";
};
function getwalletadress() {
  chrome.storage.local.get(['address'], function (result) {
    //console.log("In get address",result);
    const dataFromStorage = result.address;
    msg = { "Side": "Content", "action": "getdata", "type": "OpenApp", "data": dataFromStorage };
    window.postMessage(JSON.stringify(msg), "*");
    return dataFromStorage;
  });
};

function getDetails() {
  return new Promise((res, rej) => {
    chrome.runtime.sendMessage({
      data: "GetAccount Details",
    }, async function (response) {
      var rep = await response;
      //console.dir(rep);
      if (rep) {
        msg = { "Side": "Content", "action": "getdata", "type": "OpenApp", "data": rep };
        window.postMessage(JSON.stringify(msg), "*");
        closeapp();
        return res([true, rep]);
      } else {
        msg = { "Side": "Content", "action": "getdata", "type": "OpenApp", "data": "No Data" };
        window.postMessage(JSON.stringify(msg), "*");
        closeapp();
        return rej([false, "No Data"]);
      }
    });
  });
};
function closeapp() {
  setTimeout(() => {
    chrome.runtime.sendMessage({
      data: "APPCLOSE",
    });
  }, 800);
}
function checknetwork() {
  return new Promise((res, rej) => {
    chrome.runtime.sendMessage({
      data: "checknetwork",
    }, async function (response) {
      var rep = await response;
      //console.dir(rep);
      if (rep) {
        msg = { "Side": "Content", "action": "getdata", "type": "OpenApp", "data": rep };
        window.postMessage(JSON.stringify(msg), "*");
        return res([true, rep]);
      } else {
        msg = { "Side": "Content", "action": "getdata", "type": "OpenApp", "data": "No Data" };
        window.postMessage(JSON.stringify(msg), "*");
        return rej([false, "No Data"]);
      }
    });
  });
};

function SendPOX(amount, address) {
  return new Promise(async (res, rej) => {
    let msg = { "type": "Transition", "amout": amount.toString(), "toAddress": address.toString() }

    chrome.runtime.sendMessage({
      data: msg,
    }, async function (response) {
      var rep = await response;
      if (rep) {
        msg = { "Side": "Content", "action": "getdata", "type": "OpenApp", "data": rep };
        window.postMessage(JSON.stringify(msg), "*");
        closeapp();
        return res([true, rep]);
      } else {
        msg = { "Side": "Content", "action": "getdata", "type": "OpenApp", "data": "ERROR" };
        window.postMessage(JSON.stringify(msg), "*");
        closeapp();
        rej([false, 'No Transtion'])
      }
    });
  });
};
function SendTRC20(amount, address) {
  return new Promise(async (res, rej) => {
    let msg = { "type": "Transition_TRC20", "amout": amount.toString(), "toAddress": address.toString() }

    chrome.runtime.sendMessage({
      data: msg,
    }, async function (response) {
      var rep = await response;
      if (rep) {
        msg = { "Side": "Content", "action": "getdata", "type": "OpenApp", "data": rep };
        window.postMessage(JSON.stringify(msg), "*");
        closeapp();
        return res([true, rep]);
      } else {
        msg = { "Side": "Content", "action": "getdata", "type": "OpenApp", "data": "ERROR" };
        window.postMessage(JSON.stringify(msg), "*");
        closeapp();
        rej([false, 'No Transtion'])
      }
    });
  });
}
function trigger_SmartContract(data) {
  return new Promise(async (res, rej) => {
    let msg = { "type": "triggersmartContact", "data": data }

    chrome.runtime.sendMessage({
      data: msg,
    }, async function (response) {
      var rep = await response;
      if (rep) {
        msg = { "Side": "Content", "action": "getdata", "type": "OpenApp", "data": rep };
        window.postMessage(JSON.stringify(msg), "*");
        closeapp();
        return res([true, rep]);
      } else {
        msg = { "Side": "Content", "action": "getdata", "type": "OpenApp", "data": "NO Trigger" };
        window.postMessage(JSON.stringify(msg), "*");
        closeapp();
        rej([false, 'No Trigger'])
      }
    });
  });
};
function signdata(rawdata) {
  return new Promise(async (res, rej) => {
    let msg2 = { "type": "Sign", "data": rawdata }

    chrome.runtime.sendMessage({
      data: msg2,
    }, async function (response) {
      var rep = await response;
      if (rep) {
        msg = { "Side": "Content", "action": "getdata", "type": "OpenApp", "data": rep };
        window.postMessage(msg, "*");
        closeapp();
        return res([true, rep]);
      } else {
        msg = { "Side": "Content", "action": "getdata", "type": "OpenApp", "data": "NO SIGN" };
        window.postMessage(msg, "*");
        closeapp();
        rej([false, 'No Sign'])
      }
    });
  });
}
function broadcast(signdata) {
  return new Promise(async (res, rej) => {
    let msg2 = { "type": "broadcast", "data": signdata }

    chrome.runtime.sendMessage({
      data: msg2,
    }, async function (response) {
      var rep = await response;
      if (rep) {
        msg = { "Side": "Content", "action": "getdata", "type": "OpenApp", "data": rep };
        window.postMessage(msg, "*");
        closeapp();
        return res([true, rep]);
      } else {
        msg = { "Side": "Content", "action": "getdata", "type": "OpenApp", "data": "NO BroadCast" };
        window.postMessage(msg, "*");
        closeapp();
        rej([false, 'NO BroadCast'])
      }
    });
  });
}
function freezeBalanace(amount, resource) {
  return new Promise(async (res, rej) => {
    let msg = { "type": "freezeBalanace", "amount": amount.toString(), "resource": resource.toString() }

    chrome.runtime.sendMessage({
      data: msg,
    }, async function (response) {
      var rep = await response;
      if (rep) {
        msg = { "Side": "Content", "action": "getdata", "type": "OpenApp", "data": rep };
        window.postMessage(JSON.stringify(msg), "*");
        closeapp();
        return res([true, rep]);
      } else {
        msg = { "Side": "Content", "action": "getdata", "type": "OpenApp", "data": "ERROR" };
        window.postMessage(JSON.stringify(msg), "*");
        closeapp();
        rej([false, 'No Transtion'])
      }
    });
  });
}
function UnfreezeBalanace(amount, resource) {
  return new Promise(async (res, rej) => {
    let msg = { "type": "UnfreezeBalanace", "amount": amount.toString(), "resource": resource.toString() }

    chrome.runtime.sendMessage({
      data: msg,
    }, async function (response) {
      var rep = await response;
      if (rep) {
        msg = { "Side": "Content", "action": "getdata", "type": "OpenApp", "data": rep };
        window.postMessage(JSON.stringify(msg), "*");
        closeapp();
        return res([true, rep]);
      } else {
        msg = { "Side": "Content", "action": "getdata", "type": "OpenApp", "data": "ERROR" };
        window.postMessage(JSON.stringify(msg), "*");
        closeapp();
        rej([false, 'No Transtion'])
      }
    });
  });
}
function CreateProposal(key, value) {
  return new Promise(async (res, rej) => {
    let msg = { "type": "CreateProposal", "key": key.toString(), "value": value.toString() }

    chrome.runtime.sendMessage({
      data: msg,
    }, async function (response) {
      var rep = await response;
      if (rep) {
        msg = { "Side": "Content", "action": "getdata", "type": "OpenApp", "data": rep };
        window.postMessage(JSON.stringify(msg), "*");
        closeapp();
        return res([true, rep]);
      } else {
        msg = { "Side": "Content", "action": "getdata", "type": "OpenApp", "data": "ERROR" };
        window.postMessage(JSON.stringify(msg), "*");
        closeapp();
        rej([false, 'No CreateProposal'])
      }
    });
  });
}
function VoteProposal(proposalID, value) {
  return new Promise(async (res, rej) => {
    let msg = { "type": "VoteProposal", "key": proposalID.toString(), "value": value }

    chrome.runtime.sendMessage({
      data: msg,
    }, async function (response) {
      var rep = await response;
      if (rep) {
        msg = { "Side": "Content", "action": "getdata", "type": "OpenApp", "data": rep };
        window.postMessage(JSON.stringify(msg), "*");
        closeapp();
        return res([true, rep]);
      } else {
        msg = { "Side": "Content", "action": "getdata", "type": "OpenApp", "data": "ERROR" };
        window.postMessage(JSON.stringify(msg), "*");
        closeapp();
        rej([false, 'No VoteProposal'])
      }
    });
  });
}
function Vote(value) {
  return new Promise(async (res, rej) => {
    let msg = { "type": "Vote", "value": value }

    chrome.runtime.sendMessage({
      data: msg,
    }, async function (response) {
      var rep = await response;
      if (rep) {
        msg = { "Side": "Content", "action": "getdata", "type": "OpenApp", "data": rep };
        window.postMessage(JSON.stringify(msg), "*");
        closeapp();
        return res([true, rep]);
      } else {
        msg = { "Side": "Content", "action": "getdata", "type": "OpenApp", "data": "ERROR" };
        window.postMessage(JSON.stringify(msg), "*");
        closeapp();
        rej([false, 'No Vote'])
      }
    });
  });
}
function CreateContract(rawdata) {
  return new Promise(async (res, rej) => {
    let msg2 = { "type": "CreateContract", "data": rawdata }

    chrome.runtime.sendMessage({
      data: msg2,
    }, async function (response) {
      var rep = await response;
      if (rep) {
        msg = { "Side": "Content", "action": "getdata", "type": "OpenApp", "data": rep };
        window.postMessage(msg, "*");
        closeapp();
        return res([true, rep]);
      } else {
        msg = { "Side": "Content", "action": "getdata", "type": "OpenApp", "data": "No CreateContract" };
        window.postMessage(msg, "*");
        closeapp();
        return res([false, 'No CreateContract'])
      }
    });
  });
}
function Sendtransaction(rawdata) {
  return new Promise(async (res, rej) => {
    let msg2 = { "type": "Sendtransaction", "data": rawdata }

    chrome.runtime.sendMessage({
      data: msg2,
    }, async function (response) {
      var rep = await response;
      if (rep) {
        msg = { "Side": "Content", "action": "getdata", "type": "OpenApp", "data": rep };
        window.postMessage(msg, "*");
        closeapp();
        return res([true, rep]);
      } else {
        msg = { "Side": "Content", "action": "getdata", "type": "OpenApp", "data": "No Sendtransaction" };
        window.postMessage(msg, "*");
        closeapp();
        return res([false, 'No Sendtransaction'])
      }
    });
  });
}
function Withdrawexpireunfreeze(rawdata) {
  return new Promise(async (res, rej) => {
    let msg2 = { "type": "Withdrawexpireunfreeze", "data": rawdata }

    chrome.runtime.sendMessage({
      data: msg2,
    }, async function (response) {
      var rep = await response;
      if (rep) {
        msg = { "Side": "Content", "action": "getdata", "type": "OpenApp", "data": rep };
        window.postMessage(msg, "*");
        closeapp();
        return res([true, rep]);
      } else {
        msg = { "Side": "Content", "action": "getdata", "type": "OpenApp", "data": "No Withdrawexpireunfreeze" };
        window.postMessage(msg, "*");
        closeapp();
        return res([false, 'No Withdrawexpireunfreeze'])
      }
    });
  });
}
function Withdrawbalance(rawdata) {
  return new Promise(async (res, rej) => {
    let msg2 = { "type": "Withdrawbalance", "data": rawdata }

    chrome.runtime.sendMessage({
      data: msg2,
    }, async function (response) {
      var rep = await response;
      if (rep) {
        msg = { "Side": "Content", "action": "getdata", "type": "OpenApp", "data": rep };
        window.postMessage(msg, "*");
        closeapp();
        return res([true, rep]);
      } else {
        msg = { "Side": "Content", "action": "getdata", "type": "OpenApp", "data": "No Withdrawbalance" };
        window.postMessage(msg, "*");
        closeapp();
        return res([false, 'No Withdrawbalance'])
      }
    });
  });
}
function trigger_constantcontract(data) {
  return new Promise(async (res, rej) => {
    let msg = { "type": "triggerconstantcontract", "data": data }

    chrome.runtime.sendMessage({
      data: msg,
    }, async function (response) {
      var rep = await response;
      if (rep) {
        msg = { "Side": "Content", "action": "getdata", "type": "OpenApp", "data": rep };
        window.postMessage(JSON.stringify(msg), "*");
        closeapp();
        return res([true, rep]);
      } else {
        msg = { "Side": "Content", "action": "getdata", "type": "OpenApp", "data": "NO Trigger" };
        window.postMessage(JSON.stringify(msg), "*");
        closeapp();
        rej([false, 'No Trigger'])
      }
    });
  });
};

chrome.runtime.onMessage.addListener(async request => {
  if (request['type'] == 'Network change') {
    let networkdaat = JSON.parse(request['data']).data;
    var customEvent = new CustomEvent('Change', { detail: networkdaat });
    document.dispatchEvent(customEvent);
  } if (request['type'] == 'Wallet Change') {
    let networkdaat = JSON.parse(request['data']).data;
    var customEvent = new CustomEvent('Wallet Change', { detail: networkdaat });
    document.dispatchEvent(customEvent);
  }
});