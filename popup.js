let intervalID = setInterval(function(){
    chrome.runtime.sendMessage({msg: "getStatus"}, function(response) {
        console.log(response.lotteryStatus);
        if (response.lotteryStatus[0] == -1){
            document.getElementById("title").innerHTML = "未登入。";
            var login = document.getElementById('login');
            login.style.display = 'inline-block';
            clearInterval(intervalID);
        }else if(response.lotteryStatus[0] == 1){
            document.getElementById("title").innerHTML = "今天已經抽過了。";
            document.getElementById("result").innerHTML = ''.concat("今天拿到 ",response.lotteryStatus[1].toString()," 點。");
            clearInterval(intervalID);
        }
    });
},1000)
let button = document.getElementById("loginBtn");
button.addEventListener("click", function(){
    chrome.tabs.create({url:"https://www.dlsite.com/maniax/login/=/_query/https%3A%2F%2Fwww.dlsite.com%2Fmaniax%2F"});
});