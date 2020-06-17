function load_header(div_header) {
  var html_header = "<nav class='navbar navbar-expand-md navbar-dark' style='background-color:black;'>\
    <a class='navbar-brand' href='index.html'>HOME</a> \
    <button class='navbar-toggler' type='button' data-toggle='collapse' data-target='#collapsibleNavbar'>\
    <span class='navbar-toggler-icon'></span>\
    </button>\
    <div class='collapse navbar-collapse hjj-navbar' id = 'collapsibleNavbar'>\
      <ul class='navbar-nav'> \
        <li class='nav-item' ><a href='customs.html'  title='风土人情'>风土人情</a></li>\
        <li><a href=' '  title='集训队队伍信息表 '>teamList </a></li>\
        <li><a href=' '  title='集训队训练信息表 '>trainList </a></li>\
        <li><a href='community.html'  title='社区'>社区 </a></li>\
      </ul>\
    </div>\
  </div>"

  document.getElementById(div_header).innerHTML = html_header
}