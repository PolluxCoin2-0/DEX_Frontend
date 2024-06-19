let msg = { "Side": "webpageMessage", "type": "OpenApp" };
let sendrsp = {
  "type": "app", "action": "NOResponse", "data": {}, "message": "Message into the app"
}

  async function getwalletadress() {
    msg = { "Side": "webpageMessage", "type": "Getwallet" };
    window.postMessage(JSON.stringify(msg), "*");

    sendrsp = JSON.stringify({
      "type": "app", "action": "NOResponse", "data": {}, "message": "Message into the app"
    });
    // console.log("sendrsp", sendrsp);
    return new Promise((res, rej) => {
      var timer = setInterval(() => {
        if (JSON.parse(sendrsp)["action"] != "NOResponse") {
          let data = JSON.parse(sendrsp)["data"];
          clearInterval(timer);
          let message = { "data": data["Address"].wallet_address, "message": "Sucess" };
          res([true, message]);
        } else {
        }
      }, 300);
    });
  }
  
//   async function getDetails() {
//     msg = { "Side": "webpageMessage", "type": "GetDetails" };
//     window.postMessage(JSON.stringify(msg), "*");

//     sendrsp = JSON.stringify({
//       "type": "app", "action": "NOResponse", "data": {}, "message": "Message into the app"
//     });
//     return new Promise((res, rej) => {
//       var timer = setInterval(() => {
//         if (JSON.parse(sendrsp)["data"] == "No Data") {
//           clearInterval(timer);
//           res([false, "Error in data"]);
//           return;
//         }
//         if (JSON.parse(sendrsp)["action"] != "NOResponse") {
//           //console.log("In Callind data calling Promise",sendrsp);
//           let data = JSON.parse(sendrsp)["data"];
//           // //console.log("In Callind data calling Promise",data["data"]);
//           clearInterval(timer);
//           if (data["data"].action.toString() == "Error") {
//             res([false, data["data"].data]);
//           } else {
//             res([true, data["data"].data]);
//           }
//         } else {
//           // //console.log('Nodata');
//         }
//       }, 2000);
//     });
//   }

//   SendPOX(amount, address) {
//     let para = { "amount": amount, "address": address.toString() }
//     msg = { "Side": "webpageMessage", "type": "SendPOX", "data": para };
//     window.postMessage(JSON.stringify(msg), "*");

//     sendrsp = JSON.stringify({
//       "type": "app", "action": "NOResponse", "data": {}, "message": "Message into the app"
//     });
//     return new Promise((res, rej) => {
//       var timer = setInterval(() => {
//         if (JSON.parse(sendrsp)["data"] == "No Transtion") {
//           clearInterval(timer);
//           res([false, "Error in Transtion"]);
//           return;
//         }
//         if (JSON.parse(sendrsp)["action"] != "NOResponse") {
//           let data = JSON.parse(sendrsp)["data"];
//           // //console.log("In Callind data calling Promise",data["data"].data);
//           clearInterval(timer);
//           if (data["data"].action.toString() == "Error") {
//             res([false, data["data"].data]);
//           } else {
//             res([true, data["data"].data]);
//           }

//         } else {
//           // //console.log('Nodata');
//         }
//       }, 2000);
//     });
//   }

//   SendPOX20(amount, address) {
//     let para = { "amount": amount, "address": address.toString() }
//     msg = { "Side": "webpageMessage", "type": "SendPOX20", "data": para };
//     window.postMessage(JSON.stringify(msg), "*");

//     sendrsp = JSON.stringify({
//       "type": "app", "action": "NOResponse", "data": {}, "message": "Message into the app"
//     });
//     return new Promise((res, rej) => {
//       var timer = setInterval(() => {
//         if (JSON.parse(sendrsp)["data"] == "No Transtion") {
//           clearInterval(timer);
//           res([false, "Error in Transtion"]);
//           return;
//         }
//         if (JSON.parse(sendrsp)["action"] != "NOResponse") {
//           let data = JSON.parse(sendrsp)["data"];
//           // //console.log("In Callind data calling Promise",data["data"].data);
//           clearInterval(timer);
//           if (data["data"].action.toString() == "Error") {
//             res([false, data["data"].data]);
//           } else {
//             res([true, data["data"].data]);
//           }

//         } else {
//           // //console.log('Nodata');
//         }
//       }, 2000);
//     });

//   }

//   async function signdata(rawdata) {

//     msg = { "Side": "webpageMessage", "type": "Signdata", "data": rawdata };
//     window.postMessage(JSON.stringify(msg), "*");

//     sendrsp = JSON.stringify({
//       "type": "app", "action": "NOResponse", "data": {}, "message": "Message into the app"
//     });
//     return new Promise((res, rej) => {
//       var timer = setInterval(() => {
//         if (JSON.parse(sendrsp)["data"] == "NO SIGN") {
//           clearInterval(timer);
//           res([false, "Error in Sign"]);
//           return;
//         }
//         if (JSON.parse(sendrsp)["action"] != "NOResponse") {
//           let data = JSON.parse(sendrsp)["data"];
//           // //console.log("In Callind data calling Promise",data["data"].data);
//           clearInterval(timer);
//           if (data["data"].action.toString() == "Error") {
//             res([false, data["data"].data, "Error in Sign data"]);
//           } else {
//             res([true, data["data"].data, "Sign data Successfully"]);
//           }
//         } else {
//         }
//       }, 2000);
//     });
//   }
//   async function broadcast(signdata) {
//     msg = { "Side": "webpageMessage", "type": "broadcastdata", "data": signdata };
//     window.postMessage(JSON.stringify(msg), "*");

//     sendrsp = JSON.stringify({
//       "type": "app", "action": "NOResponse", "data": {}, "message": "Message into the app"
//     });
//     return new Promise((res, rej) => {
//       var timer = setInterval(() => {
//         if (JSON.parse(sendrsp)["data"] == "NO BroadCast") {
//           clearInterval(timer);
//           res([false, "Error in BroadCast"]);
//           return;
//         }
//         if (JSON.parse(sendrsp)["action"] != "NOResponse") {
//           let data = JSON.parse(sendrsp)["data"];

//           clearInterval(timer);
//           if (data["data"].action.toString() == "Error") {
//             res([false, data["data"].data, "Error in Broadcast"]);
//           } else {
//             res([true, data["data"].data, "Broadcast Successfully Done"]);
//           }
//         } else {
//         }
//       }, 2000);
//     });
//   }
//   async function Sendtransaction(rawdata) {
//     msg = { "Side": "webpageMessage", "type": "Sendtransaction", "data": rawdata };
//     window.postMessage(JSON.stringify(msg), "*");

//     sendrsp = JSON.stringify({
//       "type": "app", "action": "NOResponse", "data": {}, "message": "Message into the app"
//     });
//     return new Promise((res, rej) => {
//       var timer = setInterval(() => {
//         let message = { "data": "Rejected", "message": "Reject by user" };
//         if (JSON.parse(sendrsp)["data"] == "NO Sendtransaction") {
//           clearInterval(timer);
//           res([false, message]);
//           return;
//         }
//         if (JSON.parse(sendrsp)["action"] != "NOResponse") {
//           let data = JSON.parse(sendrsp)["data"];
//           clearInterval(timer);
//           if (data["data"].action.toString() == "Error") {
//             message = { "data": data["data"].data, "message": "Error in Transaction" };
//             res([false, message]);
//           } else {
//             message = { "data": data["data"].data, "message": "Transaction Successfully Done" };;
//             res([true, message]);
//           }
//         } else {
//         }
//       }, 2000);
//     });
//   }

//   async freezeBalanace(amount, resource) {
//     let para = { "amount": amount, "resource": resource.toString() }
//     msg = { "Side": "webpageMessage", "type": "freezeBalanace", "data": para };
//     window.postMessage(JSON.stringify(msg), "*");
//     sendrsp = JSON.stringify({
//       "type": "app", "action": "NOResponse", "data": {}, "message": "Message into the app"
//     });
//     return new Promise((res, rej) => {
//       var timer = setInterval(() => {
//         if (JSON.parse(sendrsp)["data"] == "No Transtion") {
//           clearInterval(timer);
//           res([false, "Error in Transtion"]);
//           return;
//         }
//         if (JSON.parse(sendrsp)["action"] != "NOResponse") {
//           let data = JSON.parse(sendrsp)["data"];
//           clearInterval(timer);
//           if (data["data"].action.toString() == "Error") {
//             res([false, data["data"].data]);
//           } else {
//             res([true, data["data"].data]);
//           }

//         } else {
//           // //console.log('Nodata');
//         }
//       }, 2000);
//     });
//   }
//   async UnfreezeBalanace(amount, resource) {
//     let para = { "amount": amount, "resource": resource.toString() }
//     msg = { "Side": "webpageMessage", "type": "UnfreezeBalanace", "data": para };
//     window.postMessage(JSON.stringify(msg), "*");
//     sendrsp = JSON.stringify({
//       "type": "app", "action": "NOResponse", "data": {}, "message": "Message into the app"
//     });
//     return new Promise((res, rej) => {
//       var timer = setInterval(() => {
//         if (JSON.parse(sendrsp)["data"] == "No Transtion") {
//           clearInterval(timer);
//           res([false, "Error in Transtion"]);
//           return;
//         }
//         if (JSON.parse(sendrsp)["action"] != "NOResponse") {
//           let data = JSON.parse(sendrsp)["data"];
//           clearInterval(timer);
//           if (data["data"].action.toString() == "Error") {
//             res([false, data["data"].data]);
//           } else {
//             res([true, data["data"].data]);
//           }

//         } else {
//           // //console.log('Nodata');
//         }
//       }, 2000);
//     });
//   }
//   async CreateProposal(key, value) {
//     let para = { "key": key, "value": value.toString() }
//     msg = { "Side": "webpageMessage", "type": "CreateProposal", "data": para };
//     window.postMessage(JSON.stringify(msg), "*");
//     sendrsp = JSON.stringify({
//       "type": "app", "action": "NOResponse", "data": {}, "message": "Message into the app"
//     });
//     return new Promise((res, rej) => {
//       var timer = setInterval(() => {
//         if (JSON.parse(sendrsp)["data"] == "CreateProposal") {
//           clearInterval(timer);
//           res([false, "Error in CreateProposal"]);
//           return;
//         }
//         if (JSON.parse(sendrsp)["action"] != "NOResponse") {
//           let data = JSON.parse(sendrsp)["data"];
//           // //console.log("In Callind data calling Promise",data["data"].data);
//           clearInterval(timer);
//           if (data["data"].action.toString() == "Error") {
//             res([false, data["data"].data]);
//           } else {
//             res([true, data["data"].data]);
//           }

//         } else {
//           // //console.log('Nodata');
//         }
//       }, 2000);
//     });
//   }
//   async VoteProposal(proposalID, isApproval) {
//     let para = { "Propodalid": proposalID, "value": isApproval.toString() }
//     msg = { "Side": "webpageMessage", "type": "VoteProposal", "data": para };
//     window.postMessage(JSON.stringify(msg), "*");
//     sendrsp = JSON.stringify({
//       "type": "app", "action": "NOResponse", "data": {}, "message": "Message into the app"
//     });
//     return new Promise((res, rej) => {
//       var timer = setInterval(() => {
//         if (JSON.parse(sendrsp)["data"] == "No VoteProposal") {
//           clearInterval(timer);
//           res([false, "Error in VoteProposal"]);
//           return;
//         }
//         if (JSON.parse(sendrsp)["action"] != "NOResponse") {
//           let data = JSON.parse(sendrsp)["data"];
//           //console.log("In Callind data calling Promise",data["data"].data);
//           clearInterval(timer);
//           if (data["data"].action.toString() == "Error") {
//             res([false, data["data"].data]);
//           } else {
//             res([true, data["data"].data]);
//           }

//         } else {
//           // //console.log('Nodata');
//         }
//       }, 2000);
//     });
//   }
//   async Vote(voteslist) {
//     if (Array.isArray(voteslist) == false || voteslist.length <= 0) {
//       let message = { "data": "Parameter is not a list", "message": "Incorrect input fileds" };
//       return [false, message];
//     }
//     let para = { "voteslist": voteslist }
//     msg = { "Side": "webpageMessage", "type": "Vote", "data": para };
//     window.postMessage(JSON.stringify(msg), "*");
//     sendrsp = JSON.stringify({
//       "type": "app", "action": "NOResponse", "data": {}, "message": "Message into the app"
//     });
//     return new Promise((res, rej) => {
//       var timer = setInterval(() => {
//         if (JSON.parse(sendrsp)["data"] == "No Vote") {
//           clearInterval(timer);
//           res([false, "Error in Vote"]);
//           return;
//         }
//         if (JSON.parse(sendrsp)["action"] != "NOResponse") {
//           let data = JSON.parse(sendrsp)["data"];
//           //console.log("In Callind data calling Promise",data["data"].data);
//           clearInterval(timer);
//           if (data["data"].action.toString() == "Error") {
//             res([false, data["data"].data]);
//           } else {
//             res([true, data["data"].data]);
//           }

//         } else {
//           // //console.log('Nodata');
//         }
//       }, 2000);
//     });
//   }
//   async CreateSmartContract(payload) {

//     if (payload.toString() == "") {
//       let message = { "data": "Parameter is Empty", "message": "Incorrect input fileds" };
//       return [false, message];
//     }
//     let para = { "payload": payload }
//     msg = { "Side": "webpageMessage", "type": "CreateContract", "data": para };

//     window.postMessage(JSON.stringify(msg), "*");
//     sendrsp = JSON.stringify({
//       "type": "app", "action": "NOResponse", "data": {}, "message": "Message into the app"
//     });
//     return new Promise((res, rej) => {
//       var timer = setInterval(() => {
//         let message = { "data": "Rejected", "message": "Reject by user" };
//         if (JSON.parse(sendrsp)["data"] == "No CreateContract") {
//           clearInterval(timer);
//           res([false, message]);
//           return;
//         }
//         if (JSON.parse(sendrsp)["action"] != "NOResponse") {
//           let data = JSON.parse(sendrsp)["data"];
//           //console.log("In Callind data calling Promise",data["data"].data);
//           clearInterval(timer);
//           if (data["data"].action.toString() == "Error") {
//             message = { "data": data["data"].data, "message": "Error in CreateContract" };
//             res([false, message]);
//           } else {
//             message = { "data": data["data"].data, "message": "CreateContract Successfully Done" };
//             res([true, message]);
//           }
//         } else {
//           // //console.log('Nodata');
//         }
//       }, 2000);
//     });
//   }
//   async triggersmartContact(contract_AddresHex, parameter, functionname) {
//     if (Array.isArray(parameter) == false) {
//       let message = { "data": "Parameter is not a list", "message": "Incorrect input fileds" };
//       return [false, message];
//     }
//     if (contract_AddresHex.toString()[0] != "3") {
//       let message = { "data": "contract Hex is not a hex/incorrect format", "message": "Incorrect input fileds" };
//       return [false, message];
//     }
//     let para = { "contractAddres": contract_AddresHex, "parameter": parameter, "funcation": functionname.toString() }
//     msg = { "Side": "webpageMessage", "type": "triggersmartContact", "data": para };

//     window.postMessage(JSON.stringify(msg), "*");
//     sendrsp = JSON.stringify({
//       "type": "app", "action": "NOResponse", "data": {}, "message": "Message into the app"
//     });
//     return new Promise((res, rej) => {
//       var timer = setInterval(() => {
//         let message = { "data": "Rejected", "message": "Reject by user" };
//         if (JSON.parse(sendrsp)["data"] == "NO Trigger") {
//           clearInterval(timer);
//           res([false, message]);
//           return;
//         }
//         if (JSON.parse(sendrsp)["action"] != "NOResponse") {
//           let data = JSON.parse(sendrsp)["data"];
//           clearInterval(timer);
//           if (data["data"].action.toString() == "Error") {
//             message = { "data": data["data"].data, "message": "Error in Trigger Contact" };
//             res([false, message]);
//           } else {
//             message = { "data": data["data"].data, "message": "Trigger Contact Successfully Done" };
//             res([true, message]);
//           }
//         } else {
//           // //console.log('Nodata');
//         }
//       }, 2000);
//     });
//   }
//   async triggerconstantcontract(contract_AddresHex, parameter, functionname) {
//     if (contract_AddresHex.toString()[0] != "3") {
//       let message = { "data": "contract Hex is not a hex/incorrect format", "message": "Incorrect input fileds" };
//       return [false, message];
//     }
//     if (functionname.toString() == "") {
//       let message = { "data": "functionname is Empty", "message": "Incorrect input fileds" };
//       return [false, message];
//     }
//     if (Array.isArray(parameter) == false || parameter.toString() == "") {
//       parameter = [];
//     }
//     let para = { "contractAddres": contract_AddresHex, "parameter": parameter, "funcation": functionname.toString() }
//     msg = { "Side": "webpageMessage", "type": "triggerconstantcontract", "data": para };

//     window.postMessage(JSON.stringify(msg), "*");
//     sendrsp = JSON.stringify({
//       "type": "app", "action": "NOResponse", "data": {}, "message": "Message into the app"
//     });
//     return new Promise((res, rej) => {
//       var timer = setInterval(() => {
//         let message = { "data": "Rejected", "message": "Reject by user" };
//         if (JSON.parse(sendrsp)["data"] == "NO Trigger") {
//           clearInterval(timer);
//           res([false, message]);
//           return;
//         }
//         if (JSON.parse(sendrsp)["action"] != "NOResponse") {
//           let data = JSON.parse(sendrsp)["data"];
//           //console.log("In Callind data calling Promise",data["data"].data);
//           clearInterval(timer);
//           if (data["data"].action.toString() == "Error") {
//             message = { "data": data["data"].data, "message": "Error in Trigger Contact" };
//             res([false, message]);
//           } else {
//             message = { "data": data["data"].data, "message": "Trigger Contact Successfully Done" };
//             res([true, message]);
//           }
//         } else {
//           // //console.log('Nodata');
//         }
//       }, 2000);
//     });
//   }
//   async Sendtransaction(rawdata) {
//     if (typeof rawdata == "string") {
//       let message = { "data": "Raw data is not a object type", "message": "Incorrect input fileds" };
//       return [false, message];
//     }
//     msg = { "Side": "webpageMessage", "type": "Sendtransaction", "data": rawdata };
//     window.postMessage(JSON.stringify(msg), "*");

//     sendrsp = JSON.stringify({
//       "type": "app", "action": "NOResponse", "data": {}, "message": "Message into the app"
//     });
//     return new Promise((res, rej) => {
//       var timer = setInterval(() => {
//         let message = { "data": "Rejected", "message": "Reject by user" };
//         if (JSON.parse(sendrsp)["data"] == "No Sendtransaction") {
//           clearInterval(timer);
//           res([false, message]);
//           return;
//         }
//         if (JSON.parse(sendrsp)["action"] != "NOResponse") {
//           let data = JSON.parse(sendrsp)["data"];
//           clearInterval(timer);
//           if (data["data"].action.toString() == "Error") {
//             message = { "data": data["data"].data, "message": "Error in Sendtransaction" };
//             res([false, message]);
//           } else {
//             message = { "data": data["data"].data, "message": "Sendtransaction Successfully Done" };
//             res([true, message]);
//           }
//         } else {
//         }
//       }, 2000);
//     });
//   }
//   async Withdrawexpireunfreeze() {


//     let para = { "address": "454" }
//     msg = { "Side": "webpageMessage", "type": "Withdrawexpireunfreeze", "data": para };

//     window.postMessage(JSON.stringify(msg), "*");
//     sendrsp = JSON.stringify({
//       "type": "app", "action": "NOResponse", "data": {}, "message": "Message into the app"
//     });
//     return new Promise((res, rej) => {
//       var timer = setInterval(() => {
//         let message = { "data": "Rejected", "message": "Reject by user" };
//         if (JSON.parse(sendrsp)["data"] == "No Withdrawexpireunfreeze") {
//           clearInterval(timer);
//           res([false, message]);
//           return;
//         }
//         if (JSON.parse(sendrsp)["action"] != "NOResponse") {
//           let data = JSON.parse(sendrsp)["data"];
//           clearInterval(timer);
//           if (data["data"].action.toString() == "Error") {
//             message = { "data": data["data"].data, "message": "Error in Withdrawexpireunfreeze" };
//             res([false, message]);
//           } else {
//             message = { "data": data["data"].data, "message": "Withdrawexpireunfreeze Successfully Done" };
//             res([true, message]);
//           }
//         } else {
//         }
//       }, 2000);
//     });
//   }
//   async ClaimReward() {
//     let para = { "address": "45" }
//     msg = { "Side": "webpageMessage", "type": "Withdrawbalance", "data": para };

//     window.postMessage(JSON.stringify(msg), "*");
//     sendrsp = JSON.stringify({
//       "type": "app", "action": "NOResponse", "data": {}, "message": "Message into the app"
//     });
//     return new Promise((res, rej) => {
//       var timer = setInterval(() => {
//         let message = { "data": "Rejected", "message": "Reject by user" };
//         if (JSON.parse(sendrsp)["data"] == "No Withdrawbalance") {
//           clearInterval(timer);
//           res([false, message]);
//           return;
//         }
//         if (JSON.parse(sendrsp)["action"] != "NOResponse") {
//           let data = JSON.parse(sendrsp)["data"];
//           clearInterval(timer);
//           if (data["data"].action.toString() == "Error") {
//             message = { "data": data["data"].data, "message": "Error in ClaimReward" };
//             res([false, message]);
//           } else {
//             message = { "data": data["data"].data, "message": "ClaimReward Successfully Done" };
//             res([true, message]);
//           }
//         } else {
//           // //console.log('Nodata');
//         }
//       }, 2000);
//     });


try {
  let obj = new CallFuncation();
  window.pox = obj;
}
catch (e) {
  console.log("in obj", e);
}


window.addEventListener("message", function (event) {


  let element;
  try {
    element = JSON.parse(event.data)
  } catch (e) {
    element = event.data;
  }
  if (element['Side'] == "Content") {
    try {
      sendrsp = JSON.stringify(element);
    } catch (e) {
      sendrsp = element;
    }

  }
});


export {
    getwalletadress,
}
