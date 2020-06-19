function load_header(div_header) {
  var html_header = "<nav class='navbar navbar-expand-md bg-dark navbar-dark' style='background-color:black!important;'>\
    <a class='navbar-brand' href='index.html'>HOME</a> \
    <button class='navbar-toggler' type='button' data-toggle='collapse' data-target='#collapsibleNavbar'>\
    <span class='navbar-toggler-icon'></span>\
    </button>\
    <div class='collapse navbar-collapse hjj-navbar' id = 'collapsibleNavbar'>\
      <ul class='navbar-nav'> \
        <li class='nav-item' ><a href='customs.html'  title='风俗'>风俗</a></li>\
        <li class='nav-item' ><a href='photo.html'  title='照片'>照片</a></li>\
        <li class='nav-item' ><a href='map.html'  title='位置'>位置</a></li>\
        <li class='nav-item' ><a href='community.html'  title='社区'>社区 </a></li>\
        <li class='nav-item' ><a href='contact_us.html'  title='联系我们'>联系我们</a></li>\
      </ul>\
    </div>\
  </div>"

  document.getElementById(div_header).innerHTML = html_header
}