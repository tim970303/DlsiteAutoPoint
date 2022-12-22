chrome.runtime.sendMessage({msg: "getStatus"}, function(response) {
    console.log(response.lotteryStatus);
    if (response.lotteryStatus == -1){
        document.getElementById("title").innerHTML = "未登入。";
        var login = document.getElementById('login');
        login.style.display = 'inline-block';
    }else if(response.lotteryStatus == 1){
        document.getElementById("title").innerHTML = "今天已經領過了。";
    }else{
        document.getElementById("title").innerHTML = "確認中...";
    }
 });

var button = document.getElementById("loginBtn");
button.addEventListener("click", function(){
    chrome.tabs.create({url:"https://login.dlsite.com/login?user=self"});
});