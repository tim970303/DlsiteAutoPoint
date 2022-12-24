//not login = -1, init = 0, drawed = 1
let lotteryStatus = 0;
let point = -1;

function getPoint(){
    let intervalID = setInterval(function(){
        fetch('https://www.dlsite.com/maniax/event/dlfarm/ajax?act=draw')
        .then((response) => {
            return response.json();
        })
        .then((result) => {
            console.log(result['class'][0]);
            if((result['class'].length == 1 && result['class'][0] == "error") || (result['class'].length == 2 && result['class'][0].split('_')[0] == "type")){
                lotteryStatus = 1;
                caculatePoint();
                clearInterval(intervalID);
            }else if(result['class'].length == 2 && result['class'][1] == "logout"){
                lotteryStatus = -1;
            }
        })
    }, 1000)
}

function caculatePoint(){
    fetch('https://www.dlsite.com/maniax/event/dlfarm/ajax?act=show')
    .then((response) => {
        return response.json();
    })
    .then((result) => {
        let temp = 0;
        if(result['class'].length > 2){
            temp = result['class'][2];
            temp = temp.split("_")[1];
            temp = parseInt(temp);
        }
        if(temp == 1 || result['class'].length == 2){
            point = 0;
        }else{
            temp = (temp - 2) % 3;
            point = 1;
            for(let i = 0;i < temp;i++){
                point = point * 10;
            }
        }
    })
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.msg == "getStatus") {
        getPoint();
        sendResponse({lotteryStatus: [lotteryStatus,point]});
        return true;
    }
});

chrome.windows.onCreated.addListener(function() {
    getPoint();
})

