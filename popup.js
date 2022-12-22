let intervalID = setInterval(function(){
    chrome.runtime.sendMessage({msg: "getStatus"}, function(response) {
        console.log(response.lotteryStatus);
        if (response.lotteryStatus == -1){
            document.getElementById("title").innerHTML = "未登入。";
            var login = document.getElementById('login');
            login.style.display = 'inline-block';
            clearInterval(intervalID);
        }else if(response.lotteryStatus == 1){
            document.getElementById("title").innerHTML = "今天已經領過了。";
            clearInterval(intervalID);
        }
    });
},1000)
let button = document.getElementById("loginBtn");
button.addEventListener("click", function(){
    chrome.tabs.create({url:"https://login.dlsite.com/login?user=self"});
});