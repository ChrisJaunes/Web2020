var todo_arr;
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
function todo_init() {
    todo_arr = getCookie("todo-cookie") ? JSON.parse(getCookie("todo-cookie")) : [];
    todoDataSave();
    document.getElementById("addTodoInfo").addEventListener("keyup", todo_keyHandler); 
}
function todo_keyHandler(e) {
    if(e.keyCode!==13) return;
    if(addTodoInfo.value.trim().length===0) return;
    todo_arr.push({finish:false, info:addTodoInfo.value});
    addTodoInfo.value="";
    todoDataSave();
}
function todoDataSave() {
    setCookie("todo-cookie", JSON.stringify(todo_arr));
    var undoList=todo_arr.filter(item=>{
        return !item.finish;
    });
    var doneList=todo_arr.filter(item=>{
        return item.finish;
    })
    document.querySelector(".todo-undo span").textContent=undoList.length;
    document.querySelector(".todo-done span").textContent=doneList.length;
    
    var undo_ul = document.querySelector(".todo-undo ul");
    if(undo_ul) undo_ul.remove();
    var done_ul = document.querySelector(".todo-done ul");
    if(done_ul) done_ul.remove();

    todo_createUl(undoList,document.querySelector(".todo-undo"));
    todo_createUl(doneList,document.querySelector(".todo-done"));
}
function todo_createUl(list, parent){
    var ul=document.createElement("ul");
    for(var i=0;i<list.length;i++){
        var li=document.createElement("li");
        if(list[i].finish) li.className="doneLi";
        var ck=document.createElement("input");
        ck.type="checkbox";
        ck.data=list[i];
        ck.checked=list[i].finish;
        ck.addEventListener("click", todo_clickHandler);
        li.appendChild(ck);

        var span=document.createElement("span");
        span.textContent=list[i].info;
        span.style.userSelect="none";
        span.data=list[i];
        li.appendChild(span);

        var bn=document.createElement("button");
        bn.innerHTML="&times;";
        bn.className="close";
        bn.data=list[i];
        bn.addEventListener("click", todo_removeClickHandler);
        li.appendChild(bn);

        ul.appendChild(li);
    }
    parent.appendChild(ul);
    return ul;
}

function todo_clickHandler(e){
    this.data.finish=this.checked;
    todoDataSave();
}
function todo_removeClickHandler(e){
    var index=todo_arr.indexOf(this.data);
    if(index>-1) todo_arr.splice(index,1);
    todoDataSave();
}