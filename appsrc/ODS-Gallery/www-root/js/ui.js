


//------------------------------------------------------------------------------
// Visualization
//------------------------------------------------------------------------------

var ui = new Object();

ui = function(){
  this.screens = new Object();
  this.screens.list = new Array();
  this.screens.active = '';
  this.forms = new Object();
  this.url_param = '';
  return;
}



//------------------------------------------------------------------------------
ui.prototype.addPanel = function (name){

  eval('this.'+name+ ' = new panel("'+name+'")');

}

//------------------------------------------------------------------------------
ui.prototype.addScreen = function (name){

  eval('this.screens.'+name+ ' = new panel("'+name+'")');
  this.screens.list[this.screens.list.length] = name;

}

//------------------------------------------------------------------------------
ui.prototype.addForm = function (name){

  eval('this.forms.'+name+ ' = new panel("form_'+name+'")');

}

//------------------------------------------------------------------------------
ui.prototype.setScreen = function(screen_name,id){

  for(var i=0;i<this.screens.list.length;i++){
    var tobj = eval('this.screens.'+this.screens.list[i]);
    this.screens.active = screen_name;
    if(this.screens.list[i] == screen_name){
      tobj.style.display = "";
    }else{
      tobj.style.display = "none";
    }
  };

  this.url_param = Array(screen_name,id);
  if(id){
    var params = '/' + id;
  }else{
    var params = '';
  }
  location.href = page_location + '#' + screen_name + params;
}

//------------------------------------------------------------------------------
ui.prototype.disable = function(){
  this.style.MozOpacity = ".2";
}

//------------------------------------------------------------------------------
ui.prototype.enable = function(){
  this.style.MozOpacity = "";
}

//------------------------------------------------------------------------------
function panel(name){
  if(document.getElementById(name)){
    var obj = document.getElementById(name);
  }else{
    alert('������: ������������� �����->'+name);
    return;
  }
    obj.show = function(){
      this.style.display="";
      this.visible = true;
    }

    obj.hide = function(){
      this.style.display="none";
      this.visible = false;
    }

    obj.clear = function(){
      this.innerHTML = '';
    }

    obj.move = function(x,y){
      this.style.top = x;
      this.style.left = y;
    }

    obj.dock = function(pos){
      this.style.top =  pos[0];
      this.style.left = pos[1];
    }

    obj.pos = function(){
      return Array(this.offsetTop,this.offsetLeft);
    }



    obj.tabs = function(on_id){
      var nodeId = returnIndexFirstChild(this.childNodes);
      var nodeList = returnListOfNodes(this.childNodes[nodeId].childNodes);
      for(var i=0;i<nodeList.length;i++){
        if(on_id == i){
          nodeList[i].className = "on";
        }else if(nodeList[i].className == "on"){
          nodeList[i].className = "";
        }
      };
    }

  return obj;
}


//------------------------------------------------------------------------------
function dispach(e){

  if (!e) var e = window.event
  var el = (e.target) ? e.target : e.srcElement

  var ok = 0;
  var id;
  var i=0;
  var res = true;
  var t_el = el;
  var dbg_list = '';
  var change_el = 1;
  var t_id = el.id;
  var t_at = el.attributes;

  while(i < 10){
    id = t_el.id;

    if(id != ''){
      var action = 'gallery.' + id + '_click'

      if(eval(action)){ //&& isEnabled(id)

        el.id = t_id;

        obj_type = el.getAttribute('type')

        if(obj_type == 'v:button'){
          setActive(el);
        }

        for(var i=0;i<t_at.length;i++){
          if(t_at[i].nodeName != 'class' && t_at[i].value != 'null' && t_at[i].value != '' && t_at[i].value != 'false'){
            el.setAttribute(t_at[i].nodeName,t_at[i].value);
          }
        }

        res = eval(action+'(el)')

        ok = 1;
        window.status = action;
        //document.getElementById("debug").innerHTML = 'action: ' + action;
        break;
      }else{
        if(change_el){
          t_id = t_el.id;
          t_at = t_el.attributes;

          change_el = 0;
        }
        dbg_list = ' -> ' + action + dbg_list;
      }

    }

    if(t_el.parentNode.nodeName != 'BODY'){
      t_el = t_el.parentNode;
    }else{
      break;
    }
    i++;
  }

  if(!ok){
    //window.status = 'nema action:'+dbg_list;
    //document.getElementById("debug").innerHTML = '<b>nema action:</b> ' + dbg_list + '<br>';
    //document.getElementById("debug").innerHTML += 'barsy.screens.active = '+ barsy.screens.active
  }
  //return false;

  return res;

}


//------------------------------------------------------------------------------
function disable(id){
  document.getElementById(id).style.MozOpacity = ".2";
  document.getElementById(id).barsy_enable = 0;
}

//------------------------------------------------------------------------------
function enable(id){
  document.getElementById(id).style.MozOpacity = "";
  document.getElementById(id).barsy_enable = 1;
}

//------------------------------------------------------------------------------
function isEnabled(id){
  if(typeof document.getElementById(id).barsy_enable == 'undefined' && document.getElementById(id).className.indexOf('disabled') == -1){
    return 1;
  }else if(document.getElementById(id).barsy_enable == 1){
    return 1;
  }
  return 0;
}



//------------------------------------------------------------------------------
function returnIndexFirstChild(nodeList){
  for(var i=0;i<nodeList.length;i++){
    if(nodeList[i].nodeType == 1){
      return i;
    }
  }
}

//------------------------------------------------------------------------------
function returnListOfNodes(nodeList){
  list = new Object();
  var x = 0;
  for(var i=0;i<nodeList.length;i++){
    if(nodeList[i].nodeType == 1){
      list[x++] = nodeList[i];
    }
  }
  list.length = x--;
  return list;
}

//------------------------------------------------------------------------------
function makeImg(src,width,height,cclass,alt){
  img = document.createElement('img')
  img.setAttribute('src',src)
  img.setAttribute('border',0)
  if(width && width != ''){
    img.setAttribute('width',width)
  }
  if(height && height != ''){
    img.setAttribute('height',height)
  }
  if(cclass && cclass != ''){
    img.setAttribute('id',cclass)
  }
  if(alt){
    img.setAttribute('title',alt)
  }
  return img;
}

//------------------------------------------------------------------------------
function makeCheckbox(name,value){
  ch = document.createElement('input');
  ch.setAttribute('type','checkbox');
  ch.setAttribute('name',name);
  ch.setAttribute('id',name);
  ch.setAttribute('value',value);

  return ch;
}

//------------------------------------------------------------------------------
function setLi(id,value){
  if(document.getElementById(id)){
    li = document.getElementById(id)
    li.className = value;
  }
}

//------------------------------------------------------------------------------
function makeUl(id){
  ul = document.createElement('ul')
  ul.setAttribute('id',id)
  return ul;
}

//------------------------------------------------------------------------------
function makeLi(title,id,url,cclass){
  li = document.createElement('li')
  li.setAttribute('id',id)

  if(cclass && cclass == 'on'){
    label = document.createElement('b');
    label.appendChild(document.createTextNode(title));
  }else if(typeof title == 'object'){
    label = title;
  }else{
    label = document.createTextNode(title);
  }
  if(url && url != ''){
    li.appendChild(makeHref(url,label));
  }else{
    li.appendChild(label)
  }

  return li;
}

//------------------------------------------------------------------------------
function makeHref(url,title){
  a = document.createElement('a')
  a.setAttribute('href',url)
  a.appendChild(title)
  return a;
}


//------------------------------------------------------------------------------
function sdate2obj(sdate){
  var gdate = new Object();

  if(!sdate || sdate == ''){
    sdate = '2000-01-01 00:00:00';
  }
  gdate.date = sdate.substring(0,sdate.indexOf('T'));
  gdate.time = sdate.substring(sdate.indexOf('T')+1,sdate.indexOf('T')+6);
  gdate.datetime =  gdate.date + ' ' + gdate.time;
  gdate.elements = gdate.date.split('-');
  gdate.day   = gdate.elements[2];
  gdate.month = gdate.elements[1];
  gdate.year  = gdate.elements[0];
  gdate.datetime =  gdate.day + '.' + gdate.month + '.' + gdate.year+ ' ' + gdate.time;


  return gdate;
}

//------------------------------------------------------------------------------
var timerID = null;
    var timerRunning = false;
    var id,pause=0,position=0;

//------------------------------------------------------------------------------
    function stopclock (){
      if(timerRunning)
        clearTimeout(timerID);
      timerRunning=false;
    }
//------------------------------------------------------------------------------
    function showtime(){
      var now=new Date();
      var hours=now.getHours();
      var minutes=now.getMinutes();
      var seconds=now.getSeconds()
      var timeValue=""+hours
      timeValue+=((minutes < 10) ? ":0" : ":") + minutes
      timeValue+=((seconds < 10) ? ":0" : ":") + seconds
      //timeValue+=(hours >= 12) ? " P.M." : " A.M."
      document.getElementById('clock').innerHTML = timeValue;
      timerID=setTimeout("showtime()",1000);
      timerRunning = true;
    }

    function startclock () {
      stopclock();
      showtime();
    }
//------------------------------------------------------------------------------