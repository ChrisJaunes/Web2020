function saveMsgStorage(id) {
    var data = document.getElementById(id).value;
    var time = new Date().getTime();
    localStorage.setItem(time,data);
    console.log("数据已保存");
    loadMsgStorage('msg');
}
function loadMsgStorage(id) {
    var result = '<table border="1">';
    for(var i = 0; i < localStorage.length; i++) {
        var kes = localStorage.key(i);
        var value = localStorage.getItem(kes);
        var date = new Date();
        date.setTime(kes);
        var datestr = date.toGMTString();
        result += '<tr><td>' + value + '</td><td>' + datestr + '</td></tr>'
    }
    result += '</table>';
    var target = document.getElementById(id);
    target.innerHTML = result;
}

function clearMsgStorage() {
    localStorage.clear();  
    console.log("清除完毕");
}