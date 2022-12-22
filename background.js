chrome.windows.onCreated.addListener(function() {
    console.log('started');
    var intervalID = setInterval(function(){
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
            }
        })
    }, 10000)
})

