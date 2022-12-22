function getPoint(){
    let intervalID = setInterval(function(){
        fetch('https://www.dlsite.com/maniax/event/dlfarm/ajax?act=draw')
        .then((response) => {
            return response.json();
        })
        .then((result) => {
            console.log(result['class'][0]);
            if(result['class'][0] == "error"){
                lotteryStatus = 1;
                clearInterval(intervalID);
            }else if(result['class'][1] == "logout"){
                lotteryStatus = -1;
            }
        })
    }, 1000)
}
//not login = -1, init = 0, other = 1,10,100
let lotteryStatus = 0;
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.msg == "getStatus") {
        getPoint();
        sendResponse({lotteryStatus: lotteryStatus});
        return true;
    }
});

chrome.windows.onCreated.addListener(getPoint())

