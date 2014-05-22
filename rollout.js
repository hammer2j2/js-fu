window.onload = initAll;

var keyClass = "rollout";
var keyClassNext = "rollin";
var rolloutText = "-Show-Text-";

function initAll() {
  var allDivs =     document.getElementsByTagName("div");
  for ( var i=0;i<allDivs.length;i++) {
    if (allDivs[i].classList.contains(keyClass) ) {
        console.log(keyClass + ' class found ');
      
        allDivs[i].onclick = 
        showdata;
    }
  }
}

 
function showdata() {
  console.log('in showdata');
  if( this.classList.toggle(keyClassNext)) {
    var url = document.location.href;
    console.log('url = ' + url);
    newurl = url.replace(/\/([^\/]+)$/,this.id);
    console.log('newurl = ' + newurl);

    loadHTTPData(this, newurl);
    return(false);
  }
  else {
    this.innerHTML='<A href="">'+rolloutText+'</A>';
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
      };
    }

    xmlhttp.open( "GET",myLink, true );
     xmlhttp.send();
    //return false;
}

