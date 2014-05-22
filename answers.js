window.onload = initAll;


function initAll() {
  var allAnswers =     document.getElementsByTagName("div");
  for ( var i=0;i<allAnswers.length;i++) {
    var classes = allAnswers[i].className.split(/\s/g);
    if ( classes.length > 1 ){
      if( classes[0] == "answer" ) {
        console.log('answer class found = ' + classes[1]);
      
        allAnswers[i].onclick = 
        showdata;
      }
    }
  }
}
 
  function showdata() {
    var classes = this.className.split(/\s/g);
    console.log('looking for answer: ' + classes[1]);
    if( this.innerHTML != "ANSWER") { 
      this.innerHTML = "ANSWER";
    }
    else {
      this.innerHTML = search(classes[1]);
    }
}

function search(index) {

for (var i=0 ; i < answers.list.length ; i++)
  {
    console.log("debug index i:" +i+"index:"+ answers.list[i].ndx+ "with answer: "+ answers.list[i].a);
    if (answers.list[i].ndx == index) {
      console.log("found index:" + answers.list[i].ndx+ "with answer: "+ answers.list[i].a);
      return(answers.list[i].a);
    }
  }
}
    
var answers = 
{
    "01": {
        "q": "What does EC2 stand for?",
        "a": "Elastic Cloud Compute"
    },
    "02": {
        "q": "What does S3 stand for?",
        "a": "Simple Storage Service"
    },
    "03": {
        "q": "What does AMI stand for?",
        "a": "Amazon Machine Image"
    },
    "04": {
        "q": "Where does the AMI get stored?",
        "a": "S3"
    },
    "05": {
        "q": "What does EBS stand for?",
        "a": "Elastic Block Store"
    },
    "06": {        
        "q": "What two in-memory cache systems does AWS provide?",
        "a": "Memcached and Redis"
    },
    "07": {
        "q": "What does IAM stand for?",
        "a": "Identity and Access Management"
    },
    "08": {
        "q": "How many subnets come by default in the VPC?",
        "a": "3"
    }
}
  // todo:add the question section into the json
