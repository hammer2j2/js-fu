window.onload = initAll;

var key = 
{
    "classes": [
        {
            "class": "Question",
            "toggle": "Answer",
            "text": "-Show-Answer"
        },
        {
            "class": "Rollout",
            "toggle": "Rollin",
            "text": "-Show-Text"
        }
    ]
}


function initAll() {
  rollout_fn;
}

function rollout_fn() {
  var keyClass ="";
  var keyControl ="";
  var keyMsg = "";
  console.log('In rollout_fn');
  for(var j=0;j<keyArr.length;j++) { 
    keyClass=key.classes[j].class;
    keyControl=key.classes[j].toggle;
    keyMsg=key.classes[j].text;
    
    var allDivs =     document.getElementsByTagName("div");
    for ( var i=0;i<allDivs.length;i++) {
      if (allDivs[i].classList.contains(keyClass) ) {
        console.log(keyClass + ' class found ');
        allDivs[i].onclick = 
        showdata(this,keyControl,keyMsg);
      }
    }
  }
}

function showdata(obj, keyControl,keyMsg) {
  console.log('in showdata');
  if( obj.classList.toggle(keyControl)) {
    var url = document.location.href;
    console.log('url = ' + url);
    newurl = url.replace(/\/([^\/]+)$/,obj.id);
    console.log('newurl = ' + newurl);

    loadHTTPData(obj, newurl);
    return(false);
  }
  else {
    obj.innerHTML='<A href="">'+keyMsg+'</A>';
  }
}
 



var xmlhttp = null;

function loadHTTPData(obj, myLink) {
    if (typeof window.ActiveXObject != 'undefined' ) 
    {
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
         xmlhttp.onreadystatechange = process;
    }
    else 
    {
      console.log('your not on Windoze');
      xmlhttp = new XMLHttpRequest();
         //xmlhttp.onload = process;
      xmlhttp.onreadystatechange=function()
      {
        console.log('in onreadystatechange()');
        if (xmlhttp.readyState==4 && xmlhttp.status==200 )
        {        console.log('in onreadystatechange HTTP 200'); //document.getElementById("output").innerHTML=xmlhttp.responseText;
          obj.innerHTML=xmlhttp.responseText;
        }   
      }
    }

    xmlhttp.open( "GET",myLink, true );
     xmlhttp.send();
    //return false;
}

