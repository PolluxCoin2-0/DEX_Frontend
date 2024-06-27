
let sendrsp = JSON.stringify({
  "type": "app", "action": "NOResponse", "data": {}, "message": "Message into the app"
});


chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  console.log(message.data);
  sendrsp = JSON.stringify({
    "type": "app", "action": "NOResponse", "data": {}, "message": "Message into the app"
  });
  
  if (message.data.toString() == "GetAccount Details") {
    window.postMessage(messagegetDetails);
  } else if (message.data['type'] == "Transition") {
    window.postMessage(messageSend(message.data['amout'], message.data['toAddress']))
  }else if(message.data['type'] == "Transition_TRC20"){
    window.postMessage(messageSend_TRC20(message.data['amout'], message.data['toAddress']))
  }else if(message.data['type'] == "Sign"){
    window.postMessage(message_sign("Sign", message.data['data']))
  }else if(message.data['type'] == "broadcast"){
    window.postMessage(message_sign("broadcast", message.data['data']))
  }else if(message.data['type'] == "checknetwork"){
    window.postMessage(messagegetchecknetwork)
  }else if(message.data['type'] == "freezeBalanace"){
    window.postMessage(freeze(message.data['amount'],message.data['resource'],"freezeBalanace"))
  }else if(message.data['type'] == "UnfreezeBalanace"){
    window.postMessage(freeze(message.data['amount'],message.data['resource'],"UnfreezeBalanace"))
  }
  else if(message.data['type'] == "CreateProposal"){
    window.postMessage(freeze(message.data['key'],message.data['value'],"CreateProposal"));
  }else if(message.data['type'] == "Vote"){
    window.postMessage(freeze2(message.data['value'],"no","Vote"));
  }else if(message.data['type'] == "VoteProposal"){
    window.postMessage(freeze(message.data['key'],message.data['value'],"VoteProposal"));
  }else if(message.data['type'] == "CreateContract"){
    window.postMessage(message_sign("CreateContract",message.data['data']));
  } else if(message.data['type'] == "triggersmartContact"){
    window.postMessage(message_sign("triggersmartContact",message.data['data']));
  }else if(message.data['type'] == "Sendtransaction"){
    window.postMessage(message_sign("Sendtransaction",message.data['data']));
  }else if(message.data['type'] == "Withdrawbalance"){
    window.postMessage(message_sign("Withdrawbalance",message.data['data']));
  }else if(message.data['type'] == "Withdrawexpireunfreeze"){
    window.postMessage(message_sign("Withdrawexpireunfreeze",message.data['data']));
  }else if(message.data['type'] == "triggerconstantcontract"){
    window.postMessage(message_sign("triggerconstantcontract",message.data['data']));
  }

  var timer = setInterval(() => {
    if(JSON.parse(sendrsp)["action"]!="NOResponse"){
      sendResponse({
        data: JSON.parse(sendrsp)
      });
      clearInterval(timer);
    }else{
      console.log('Nodata');
    }
  },2000);
  return true;
});




window.addEventListener('message', function (event) {
  console.log('Custom event received in POP UP', event.data);
  let data = JSON.parse(event.data);
  if (data['type'] == "App") {
    console.log("INWEB Massage");
    sendrsp = event.data;
  }
  if(data['type'] == "Network"){
    chrome.tabs.query({}, function (tabs) {
      console.log("In TABS",tabs);
      for (let i = 0; i < tabs.length; i++) {
        chrome.tabs.sendMessage(tabs[i].id, {"type":"Network change","data":event.data});
      }
      });
  } if(data['type'] == "Wallet Change"){
    console.log("Wallet_Change");
    
chrome.runtime.sendMessage({
        action: "Address",data:data['data']
      });
    chrome.tabs.query({}, function (tabs) {
      console.log("In TABS",tabs);
      for (let i = 0; i < tabs.length; i++) {
        chrome.tabs.sendMessage(tabs[i].id, {"type":"Wallet Change","data":event.data});
      }
      });
  }if(data['type'] == "Update"){
    chrome.runtime.sendMessage({
      data: "APPCLOSE",
    });
  }

});

function messageSend(amount, toAddress) {
  return {
    "type": "web", "action": "Transition", "data": { "token": "pox", "amount": amount.toString(), "toAddress": toAddress.toString()}, "message": "Message into the JavaScript"
  }
}
let messagegetDetails = {
  "type": "web", "action": "GetDeatils", "data": { "token": "pox" }, "message": "Message into the JavaScript"
}
let messagegetchecknetwork = {
  "type": "web", "action": "checknetwork", "data": { "token": "pox" }, "message": "Message into the JavaScript"
}
let messagegetappOpen = {
  "type": "web", "action": "AppOpen", "data": { "token": "pox" }, "message": "Message into the JavaScript"
}
function messageSend_TRC20(amount, toAddress) {
  return {
    "type": "web", "action": "Transition_TRC20", "data": { "token": "pox", "amount": amount.toString(), "toAddress": toAddress.toString()}, "message": "Message into the JavaScript"
  }
}
function message_sign(action, data) {
  return {
    "type": "web", "action":action, data, "message": "Message into the JavaScript"
  }
}
function freeze(amount, resource,name) {
  return {
    "type": "web", "action": name, "data": { "token": "pox", "amount": amount.toString(), "resource": resource.toString()}, "message": "Message into the JavaScript"
  }
}
function freeze2(amount, resource,name) {
  return {
    "type": "web", "action": name, "data": { "token": "pox", "amount": amount, "resource": resource}, "message": "Message into the JavaScript"
  }
}