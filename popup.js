chrome.runtime.sendMessage({msg: "getStatus"}, function(response) {
    console.log(response.lotteryStatus);
    if (response.lotteryStatus != -1){
        var login = document.getElementById('login');
        login.style.display = "none";
    }
 });

var button = document.getElementById("loginBtn");
button.addEventListener("click", function(){
    chrome.tabs.create({url:"https://login.dlsite.com/login?user=self"});
});