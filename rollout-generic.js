// Javascript to expand included content in external files residing on the same site.
// Two types of expand currently supported are
//
// 1.Tests ( quizes ) can be configured in the setKey object below. The quiz 
//   questions are in external json files of your making.  See example json 
//   structure in the setquiz() function.  Add a "Test2" section to make a second 
//   test and so on.  Stritcly speaking, no modification in setKey structure below is 
//   required to start a single quiz, but you may want to modify the external quiz location. 
//
// 2. Included files which expand (rollout) on clicking the prompting text.
//    You may have as many included files in a page as desired as long as the included
//    files are unique urls ( since it uses the id attribute to hold the url ).
//    No modification of the below setKey structure is required for this function.

window.onload = initAll;


var key; // make this a global variable
var quiz; // quiz global json

function setKey(){
return(
  { 
    "Test1": 
        {
            "fn": showanswer,
            "toggle": "Answer",
            "text": "Show Answer",
            "datafile":"/quiz.json"
        },
    "Rollout": 
        {
            "fn": fetchrollout,
            "toggle": "Rollin",
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
    
      if (allDivs[i].classList.contains(prop) ) {
        console.log(prop + ' class found');
        
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

function fetchrollout() {

  console.log('in fetchdata, className = '+this.className);
  key = setKey();
  if( this.classList.toggle(key[this.classList[0]].toggle)) {
    var newurl = makeurl(this);

    loadHTTPData(this, newurl);
    return(false);
  }
  else {
    this.innerHTML='<A name="#">'+key[this.classList[0]].text+'</A>';
  }
}

// this is just an example quiz for troubleshooting
// you could play with replacing setupquiz with this to test things

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


function showanswer() {
  console.log('in showanswer, className = '+this.className);
  if( this.classList.toggle(key[this.classList[0]].toggle)) {
    setupquiz(this, this.classList[1], key.Question.datafile); 
  }
  else {
    this.innerHTML='<A name="#">'+key[this.classList[0]].text+'</A>';
  }
}

function fetchanswer(index) {
    console.log('in fetchanswer, index = '+index);

      return(quiz[index].a);
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

