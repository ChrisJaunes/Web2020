function getCookie(cookieName) {
    var strCookie = document.cookie;
    var arrCookie = strCookie.split("; ");
    for(var i = 0; i < arrCookie.length; i++){
        var arr = arrCookie[i].split("=");
        if(cookieName == arr[0]) {
            return unescape(arr[1]);
        }
    }
    return null;
}
function setCookie(cookieName, arr) {
    document.cookie = cookieName + "=" + escape(arr);
}
var msg_arr;
function msg_init(id) {
    drag_init(jQuery);
    msg_arr = getCookie("msg-cookie");
    if(msg_arr != "null" && msg_arr != null){
        msg_arr = JSON.parse(getCookie("msg-cookie")) 
        msg_arr.sort(function(x, y) {return x.time.localeCompare(y.time)});
    }else msg_arr = [];
    loadMsgStorage(id)
}
function addMsgStorage(yourname, id) {
    var name = document.getElementById(yourname).value
    var data = document.getElementById(id).value;
    var time = new Date();
    time.setTime(new Date().getTime());

    if(name == null || name == "") {alert("姓名不能为空"); return;}
    if(data == null || data == "") {alert("留言不能为空"); return;}

    msg_arr.push({'time': time.toGMTString(), "name": name, "data": data});
    loadMsgStorage('msg');
}
function loadMsgStorage(id) {
    if(msg_arr.lenth == 0) return;
    setCookie('msg-cookie', JSON.stringify(msg_arr));
    if(document.getElementById("message-board")) 
        document.getElementById("message-board").remove();
    var table=document.createElement("table");
    table.id="message-board";
    table.width="90%"
    table.style.textAlign="left"
    table.style.margin="0 auto"
    table.style.border = "1px ";
    for(var i = msg_arr.length -1; i >= 0; i--) {
        var tr = document.createElement('tr')
        var td = document.createElement('td')
        
        var color = "rgb(" + ~~(255 * Math.random()) + "," + ~~(255 * Math.random()) + "," + ~~(255 * Math.random()) + ")";
        var span1=document.createElement("span");
        span1.textContent=""+(i+1)+"楼: "+unescape(msg_arr[i].name);
        span1.style.color=color;
        span1.style.fontSize="1.25em";
        
        var bn=document.createElement("button");
        bn.innerHTML="&times;";
        bn.className="close";
        bn.data=msg_arr[i];
        bn.addEventListener("click", msg_removeClickHandler);

        var span2=document.createElement("span");
        span2.style.float="right"
        span2.textContent=msg_arr[i].time;
        var p=document.createElement("p");
        p.textContent=unescape(msg_arr[i].data);
        p.style.color=color;
        p.style.fontFamily="Microsoft YaHei, Arial, Helvetica, sans-serif"
        p.style.fontSize="1em"

        var hr=document.createElement("hr")
        td.appendChild(span1);
        td.appendChild(bn)
        td.appendChild(span2);
        td.appendChild(p);
        td.appendChild(hr);
        tr.appendChild(td);
        table.appendChild(tr);
    }
    var target = document.getElementById(id);
    target.appendChild(table);
}

function clearMsgStorage(id) {
    msg_arr = []
    loadMsgStorage(id); 
    console.log("清除完毕");
}
function msg_removeClickHandler(e){
    var index=msg_arr.indexOf(this.data);
    if(index>-1) msg_arr.splice(index,1);
    loadMsgStorage('msg');
}
function drag_init($) {
	var container;
	var colors = ['#96C2F1', '#BBE1F1', '#E3E197', '#F8B3D0', '#FFCC00'];
	var createItem = function(text){
		var color = colors[parseInt(Math.random() * 5, 10)]
		$('<div class="item"><p>'+ text +'</p><a href="#" class="item-close">关闭</a></div>').css({ 'background': color, "pointer-events": "auto" }).appendTo(container).drag();
	};
    $.fn.drag = function () {		
        var $this = $(this);
        var parent = $this.parent();
        var pw = parent.width();
        var ph = parent.height();
        var thisWidth = $this.width() + parseInt($this.css('padding-left'), 10) + parseInt($this.css('padding-right'), 10);
        var thisHeight = $this.height() + parseInt($this.css('padding-top'), 10) + parseInt($this.css('padding-bottom'), 10);


        var x, y, positionX, positionY;
        var isDown = false; 

        var randY = parseInt(Math.random() * (ph - thisHeight), 10);
        var randX = parseInt(Math.random() * (pw - thisWidth), 10);

        $this.css({
            "cursor": "move",
            "position": "absolute"
        }).css({
            top: randY,
            left: randX
        }).mousedown(function (e) {
            parent.children().css({
                "zIndex": "0"
            });
            $this.css({
                "zIndex": "1"
            });
            isDown = true;
            x = e.pageX;
            y = e.pageY;
            positionX = $this.position().left;
            positionY = $this.position().top;
            return false;
        });
		
		
        $(document).mouseup(function (e) {
            isDown = false;
        }).mousemove(function (e) {
            var xPage = e.pageX;
            var moveX = positionX + xPage - x;

            var yPage = e.pageY;
            var moveY = positionY + yPage - y;

            if (isDown == true) {
                $this.css({
                    "left": moveX,
                    "top": moveY
                });
            } else {
                return;
            }
            if (moveX < 0) {
                $this.css({
                    "left": "0"
                });
            }
            if (moveX > (pw - thisWidth)) {
                $this.css({
                    "left": pw - thisWidth
                });
            }
            if (moveY < 0) {
                $this.css({
                    "top": "0"
                });
            }
            if (moveY > (ph - thisHeight)) {
                $this.css({
                    "top": ph - thisHeight
                });
            }
        });
    };
	
	var init = function () {
        container = $('#container');
        container.on('click','a.item-close',function () {
			$(this).parent().remove();
		});

		var tests = ['欢迎来到论坛', '随便说点什么吧'];
		$.each(tests, function (i,v) {
			createItem(v);
		});
		
		$('#save_as_note').mousedown(function (e) {
            createItem($('#memo').val())
		});
		
	};
	$(function() {
		init();
	});	
    };