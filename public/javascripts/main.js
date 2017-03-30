var MAP_NO = parseInt(10*Math.random());

$(function () {
  $("#rect").draggable({containment: 'parent'});
  var rightdiv = document.getElementById("right");
  var updiv = document.getElementById("up");
  var leftdiv = document.getElementById("left");
  var fotdiv = document.getElementById("fot");
  var upleftdiv = document.getElementById("up-left");
  var uprightdiv = document.getElementById("up-right");
  var fotleftdiv = document.getElementById("fot-left");
  var fotrightdiv = document.getElementById("fot-right");
  var maindiv = document.getElementById("rect");
  var okbtn = false;
  var conbtn = "";
  rightdiv.onmousedown = function (e) {
    e.stopPropagation();
    okbtn = true;
    conbtn = "right";
  };
  updiv.onmousedown = function (e) {
    e.stopPropagation();
    okbtn = true;
    conbtn = "top";
  };
  leftdiv.onmousedown = function (e) {
    e.stopPropagation();
    okbtn = true;
    conbtn = "left";
  };
  fotdiv.onmousedown = function (e) {
    e.stopPropagation();
    okbtn = true;
    conbtn = "fot";
  };
  upleftdiv.onmousedown = function (e) {
    e.stopPropagation();
    okbtn = true;
    conbtn = "up-left";
  };
  uprightdiv.onmousedown = function (e) {
    e.stopPropagation();
    okbtn = true;
    conbtn = "up-right";
  };
  fotleftdiv.onmousedown = function (e) {
    e.stopPropagation();
    okbtn = true;
    conbtn = "fot-left";
  };
  fotrightdiv.onmousedown = function (e) {
    e.stopPropagation();
    okbtn = true;
    conbtn = "fot-right";
  };
  window.onmouseup = function () {
    okbtn = false;
  };
  window.onmousemove = function (e) {
    if (okbtn == true) {
      switch (conbtn) {
        case "right":
          rightmove(e);
          break;
        case "up":
          upmove(e);
          break;
        case "left":
          leftmove(e);
          break;
        case "fot":
          fotmove(e);
          break;
        case "up-right":
          upmove(e);
          rightmove(e);
          break;
        case "up-left":
          upmove(e);
          leftmove(e);
          break;
        case "fot-left":
          fotmove(e);
          leftmove(e);
          break;
        case "fot-right":
          fotmove(e);
          rightmove(e);
          break;
      }
    }
    lightpicture();
  };
  function rightmove(e) {
    var x = e.clientX;
    var addwith = "";
    var widthbefor = maindiv.clientWidth - 2;
    addwith = x - getposition(maindiv).left - widthbefor;
    maindiv.style.width = addwith + widthbefor + "px";
  }

  function upmove(e) {
    var y = e.clientY;
    var addheight = "";
    var heightbefor = maindiv.offsetHeight - 2;
    addheight = getposition(maindiv).top - y;
    maindiv.style.height = addheight + heightbefor + "px";
    maindiv.style.top = maindiv.offsetTop - addheight + "px";
  }

  function leftmove(e) {
    var x = e.clientX;
    var addwidthl = "";
    var widthbeforl = maindiv.offsetWidth - 2;
    addwidthl = getposition(maindiv).left - x;
    maindiv.style.width = addwidthl + widthbeforl + "px";
    maindiv.style.left = maindiv.offsetLeft - addwidthl + "px";
  }

  function fotmove(e) {
    var y = e.clientY;
    var addheight = "";
    var heightbefor = maindiv.clientHeight - 2;
    addheight = y - getposition(maindiv).top - heightbefor;
    maindiv.style.height = addheight + heightbefor + "px";
  }

  function lightpicture() {
    var top = maindiv.offsetTop;
    var buttom = maindiv.offsetTop + maindiv.offsetHeight;
    var left = maindiv.offsetLeft;
    var right = maindiv.offsetWidth + maindiv.offsetLeft;
    $("#x1").val(left);
    $("#y1").val(top);
    $("#x2").val(right);
    $("#y2").val(buttom);
  }
});

function getposition(node) {
  var left = node.offsetLeft;
  var top = node.offsetTop;
  var parent = node.offsetParent;
  while (parent != null) {
    left += parent.offsetLeft;
    top += parent.offsetTop;
    parent = parent.offsetParent;
  }
  return {"left": left, "top": top};
}

function loadImg(img) {
  var isIE = (navigator.appName == "Microsoft Internet Explorer");
  var path = img.value;
  var ext = path.substring(path.lastIndexOf('.') + 1).toLowerCase();
  if (ext == "gif" || ext == "jpeg" || ext == "jpg" || ext == "png") {
    if (isIE) {
      $("#img").attr("src", path);
      $("#rect").removeClass("hidden");
    } else {
      if (img.files[0]) {
        var filename = img.files[0].name;
        var filesize = img.files[0].size;
        var reader = new FileReader();
        reader.onload = function(e) {
          $("#img").attr("src", e.target.result);
          $("#rect").removeClass("hidden");
        }
        reader.readAsDataURL(img.files[0]);
      }
    }
  }
}

function generate() {
  var imgsrc = $("#img").attr("src");
  var img = "<img src='" + imgsrc + "' border='0' usemap='#" + MAP_NO + "' alt='优惠券'/>";
  var map_ = "<map name='" + MAP_NO + "'>";
  var _map = "</map>";
  var inputs = $("#maps input");
  var arealist = "";
  for(i=0; i<inputs.length; i++) {
    arealist += inputs[i].value;
  }

  $("#code").val(img + map_ + arealist + _map);
  $("#preview").html(img + map_ + arealist + _map);
}

function addMapArea() {
  var link = $("#link").val();
  var x1 = $("#x1").val();
  var y1 = $("#y1").val();
  var x2 = $("#x2").val();
  var y2 = $("#y2").val();
  var area = "<area shape='rect' coords='" 
    + x1 + "," + y1 + "," + x2 + "," + y2 +"' target='_blank' alt='5' href='" + link + "' />";
  var btn = "<button onclick=\"$(this).parent('p').remove();\">删除</button>";

  $("#maps").append('<p><input type="text" value="' + area + '">' + btn +'</p>');
  $("#link").val("");
}

function changeSize(select) {
  var width = $(select).val();
  $("#img").css("width", width);
}

function loadImgUrl() {
  var url = $("#img-url").val();
  $("#img").attr("src", url);
  $("#rect").removeClass("hidden");
}
