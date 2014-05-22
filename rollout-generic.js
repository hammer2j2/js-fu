//
// Author: Clayton Han-Mitchell
// License: The MIT License
// 2014-05-21
//
// Javascript to expand included content in external files
// Two types of expand currently supported are
//
// 1.Test answers can be configured in the setKey object below. The quizes 
//   are placed in external json files.  See the sample json in the 
//   setquiz() function.  Test is just an example test name.  You can add
//   any name and any number of tests. Each test contains a set of questions and
//   answers.
//   Stritcly speaking, no modification in this file is needed to start using
//   Test.  Everything is configured in the html, and the json file. 
//
// 2.Rollout text sections which expand on clicking the prompting text.
//   You may have as many include files in a page as desired as long as the included
//   files are unique urls ( since it uses the id attribute to hold the url ).
//   No modification to this code is required for this function.
//
//  You will surely want to style the classes used.

window.onload = initAll;


var key; // make this a global variable
var quiz; // quiz global json

function setKey(){
return(
  { 
    "Test": 
        {
            "classname":"Question",
            "toggle": "Answer",
            "fn": showanswer,
            "text": "Show Answer",
            "datafile":"/quiz.json"
        },
    "Rollout": 
        {
            "classname":"Rollout",
            "toggle": "Rollin",
            "fn": fetchrollout,
            "text": "Show Text"
        }
  });
}

function initAll() {
  console.log('initializing');
  key = setKey();

  var allDivs =  document.getElementsByTagName("div");

  for ( var prop in key ) {
    console.log('found key property = '+prop);
    for ( var i=0;i<allDivs.length;i++) {
    
      if (allDivs[i].classList.contains(key[prop].classname) ) {
        console.log(key[prop].classname + ' class found');
        
        allDivs[i].onclick = key[prop].fn;
      }
    }
  }
}

function makeurl(obj) {
    var url = document.location.href;
    return(url.replace(/\/([^\/]+)$/,obj.id));
}

function makequizurl(url) {
    var newurl = document.location.href;
    return(newurl.replace(/\/([^\/]+)$/,url));
}

function getprop(keyclass) {
  for ( var prop in key ) {
    if(keyclass == key[prop].classname) {
      return(prop);
    }
  }
}

function fetchrollout() {
  var prop = getprop(this.classList[0]);
  console.log('in fetchdata, className = '+this.className+' prop = '+prop);
  if( this.classList.toggle(key[prop].toggle)) {
    var newurl = makeurl(this);

    loadHTTPData(this, newurl);
    return(false);
  }
  else {
    this.innerHTML='<A name="#">'+key[prop].text+'</A>';
  }
}

// this is just an example quiz for troubleshooting
// you could play with replacing setupquiz with this to test things


function showanswer() {
  var prop = getprop(this.classList[0]);
  console.log('in showanswer, className = '+this.className+' prop = '+prop);
  if( this.classList.toggle(key[prop].toggle)) {
    setupquiz(this, this.classList[1], key[prop].datafile); 
  }
  else {
    this.innerHTML='<A name="#">'+key[prop].text+'</A>';
  }
}

var AJAX_req;

function setupquiz(obj, index, url) {
  // return(setquiz());
  var newurl = makequizurl(url);
  console.log('in setupquiz, url = '+url+' newurl = '+newurl); 
  AJAX_JSON_Req(obj, index, newurl);
}

function AJAX_JSON_Req(obj, index, url )
{
    AJAX_req = new XMLHttpRequest();
    AJAX_req = new XMLHttpRequest();
    AJAX_req.open( "GET", url, true );
    AJAX_req.setRequestHeader("Content-type", "application/json");

    AJAX_req.onreadystatechange = function()
    {
        if( AJAX_req.readyState == 4 && AJAX_req.status == 200 )
        {
            console.log('got quiz data');
            quiz = AJAX_req.responseText;
            obj.innerHTML = JSON.parse(quiz)[index].a;
        }
    }
    AJAX_req.send();
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
      console.log('your not on Windows');
      xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange=function()
      {
        console.log('in onreadystatechange()');
        if (xmlhttp.readyState==4 && xmlhttp.status==200 )
        {        console.log('in onreadystatechange HTTP 200');
    
          obj.innerHTML=xmlhttp.responseText;
        }   
      };
    }

    xmlhttp.open( "GET",myLink, true );
    xmlhttp.send();
}

// sample quiz only. Make a file that looks like this datastructure and save it as quiz.json

function setquiz(){
  return({
    "01": {
        "q": "What does EC2 stand for?",
        "a": "Elastic Cloud Compute"
    },
    "02": {
        "q": "What does S3 stand for?",
        "a": "Simple Storage Service"
    }
  });
}
