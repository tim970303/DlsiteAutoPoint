//not login = -1, init = 0, other = 1,10,100
let lotteryStatus = 0;
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.msg == "getStatus") {
        sendResponse({lotteryStatus: lotteryStatus});
        return true;
    }
});

chrome.windows.onCreated.addListener(function() {
    let intervalID = setInterval(function(){
        fetch('https://www.dlsite.com/maniax/event/dlfarm/ajax?act=draw')
        .then((response) => {
            return response.json();
        })
        .then((result) => {
            console.log(result['class'][0]);
            if(result['class'][0] == "error"){
                console.log("今天已經領過了。");
                clearInterval(intervalID);
            }else if(result['class'][1] == "logout"){
                console.log("未登入。");
                lotteryStatus = -1;
            }
        })
    }, 3000)
})

