// Parse SetUp :
Parse.initialize("vOLivLKWZxqYoDcPo9KIDWiZ9j9mB88A9KVm3rcV", "2NfAYhZPGIvnM4dETZwCChDz0ukaZgkvk6wrI0nF");
      
      // var TestObject = Parse.Object.extend("TestObject");
      // var testObject = new TestObject();
      //   testObject.save({foo: "bar"}, {
      //   success: function(object) {
      //     $(".success").show();
      //   },
      //   error: function(model, error) {
      //     $(".error").show();
      //   }
      //   });


var questionsArr = [];
var reportArr=[];

var makeQuestion = function (question, answer, notes) {
	return {
		question: question,
		answer: answer,
		notes: notes,
	};
}

function onIndexLoad() {

	var Question = Parse.Object.extend("Question");      
	var question = new Question();
	var Question = Parse.Object.extend("Question");
	var query = new Parse.Query(question);
	query.ascending("createdAt ");
	query.exists("question");
	query.find({
	  success: function(results) {
	    //alert("Successfully retrieved " + results.length + " questions.");
	    // Do something with the returned Parse.Object values
	    for (var i = 0; i < results.length; i++) {
	      var object = results[i];

	      questionsArr.push(makeQuestion(object.get('question'),object.get('answer'),object.get('note')));

	      //alert(object.id + ' - ' + object.get('question'));
	    }
	    console.log(questionsArr);
	    for (var i = 0; i < questionsArr.length; i++) {
			$("#questions").append('<div class="jumbotron"><p>' + questionsArr[i].question + '</p><div class="row"><div class="col-lg-12"><div class="input-group"> <input type="text" style="text-align : right" class="form-control" placeholder=" ... ملاحظات " name="textNotes'+i+'"> <span class="input-group-btn"> <label class="btn btn-danger"><input type="radio" value= "false" name="options'+i+'" id="option_0'+i+'" >   &nbsp;  &nbsp;لا  &nbsp;  &nbsp;</label><label class="btn btn-success"><input type="radio" value= "true" name="options'+i+'" id="option_1'+i+'" autocomplete="off"> &nbsp;  &nbsp; نعم  &nbsp;  &nbsp</label></span></div><!-- /input-group --></div><!-- /.col-lg-12 --> </div>  <!--/row --> </div> <!--/jumbotron -->');
		}
		$("#questions").append('<div class="jumbotron" style="text-align:center;"><button type="button" class="btn btn-success  btn-lg " style="width:50%;" value="clickme" onclick="send();" data-toggle="modal" data-target="#myModal">ارسال</button></div>')


	  },
	  error: function(error) {
	    alert("Error: " + error.code + " " + error.message);
	  }
	});	
}

function onIndexLoad2() {

	var Question = Parse.Object.extend("QuestionDay");      
	var question = new Question();
	var query = new Parse.Query(question);
	query.ascending("createdAt ");
	query.exists("question");
	query.find({
	  success: function(results) {
	    //alert("Successfully retrieved " + results.length + " questions.");
	    // Do something with the returned Parse.Object values
	    for (var i = 0; i < results.length; i++) {
	      var object = results[i];

	      questionsArr.push(makeQuestion(object.get('question'),object.get('answer'),object.get('note')));

	      //alert(object.id + ' - ' + object.get('question'));
	    }
	    console.log(questionsArr);
	    for (var i = 0; i < questionsArr.length; i++) {
			$("#questions").append('<div class="jumbotron"><p>' + questionsArr[i].question + '</p><div class="row"><div class="col-lg-12"><div class="input-group"> <input type="text" style="text-align : right" class="form-control" placeholder=" ... ملاحظات " name="textNotes'+i+'"> <span class="input-group-btn"> <label class="btn btn-danger"><input type="radio" value= "false" name="options'+i+'" id="option_0'+i+'" >   &nbsp;  &nbsp;لا  &nbsp;  &nbsp;</label><label class="btn btn-success"><input type="radio" value= "true" name="options'+i+'" id="option_1'+i+'" autocomplete="off"> &nbsp;  &nbsp; نعم  &nbsp;  &nbsp</label></span></div><!-- /input-group --></div><!-- /.col-lg-12 --> </div>  <!--/row --> </div> <!--/jumbotron -->');
		}
		$("#questions").append('<div class="jumbotron" style="text-align:center;"><button type="button" class="btn btn-success  btn-lg " style="width:50%;" value="clickme" onclick="sendDay();" data-toggle="modal" data-target="#myModal">ارسال</button></div>')


	  },
	  error: function(error) {
	    alert("Error: " + error.code + " " + error.message);
	  }
	});	
}








function send() {

	trueNumbers = 0;
	falseNumbers = 0;
	for (var i = 0; i < questionsArr.length; i++) {
		if($("input[name=options" + i + "]:checked").val() === "true"){
			trueNumbers++;
			questionsArr[i].answer=true;
		}
		else{
			falseNumbers++;
			questionsArr[i].answer=false;
		}
		//questionsArr[i].notes=$("#id"+i+"").val();

	//	console.log($("#text"+i+"").val());
		//console.log($("input[name=options" + i + "]:checked").val());
		questionsArr[i].notes=$("input[name=textNotes"+i+"]").val();
	}
	console.log(questionsArr);
	// var branchName=$('#branchName').val();
	var branchName=$( "#branchSelect option:selected" ).val();
	var timeId=$('#timeId').val();
	var dayId=$('#daySelect').val();
	var dateId=$('#dateId').val();
	
	var arr=$('#dateId').val().split('/');
	var dateNumber=parseInt(arr[2]+arr[1]+arr[0]);
	//console.log(dateNumber)

	var brunchManger=$('#brunchManger').val();
	var brunchCare=$('#brunchCare').val();
	console.log(dateId);
	var Report = Parse.Object.extend("Report");
	var report = new Report();
	var percentage=trueNumbers*100/questionsArr.length;
	report.set("questions", questionsArr);
	report.set("branchName", branchName);
	report.set("trueNumbers",trueNumbers);
	report.set("falseNumbers",falseNumbers);
	report.set("percentage", percentage);
	report.set("time", timeId);
	report.set("day", dayId);
	report.set("date", dateId);
	report.set("dateNumber",dateNumber);
	report.set("brunchManger", brunchManger);
	report.set("brunchCare", brunchCare);
	report.save(null, {
	  success: function(report) {
	        //console.log(typeof(report.id));
	        //console.log(typeof(report.id[0]));
	        //report.set('objectId','a'+report.id);
	        console.log(report.id);
	        window.location.href="done.html";
	    
	    
	  },
	  error: function(report, error) {
	    // Execute any logic that should take place if the save fails.
	    // error is a Parse.Error with an error code and message.
	    alert('Failed to create new object, with error code: ' + error.message);
	  }
	});
}

function sendDay() {

	trueNumbers = 0;
	falseNumbers = 0;
	for (var i = 0; i < questionsArr.length; i++) {
		if($("input[name=options" + i + "]:checked").val() === "true"){
			trueNumbers++;
			questionsArr[i].answer=true;
		}
		else{
			falseNumbers++;
			questionsArr[i].answer=false;
		}
		//questionsArr[i].notes=$("#id"+i+"").val();

	//	console.log($("#text"+i+"").val());
		//console.log($("input[name=options" + i + "]:checked").val());
		questionsArr[i].notes=$("input[name=textNotes"+i+"]").val();
	}
	console.log(questionsArr);
	// var branchName=$('#branchName').val();
	var branchName=$( "#branchSelect option:selected" ).val();
	var timeId=$('#timeId').val();
	var dayId=$('#daySelect').val();
	var dateId=$('#dateId').val();
	
	var arr=$('#dateId').val().split('/');
	var dateNumber=parseInt(arr[2]+arr[1]+arr[0]);
	//console.log(dateNumber)

	var brunchManger=$('#brunchManger').val();
	var brunchCare=$('#brunchCare').val();
	console.log(dateId);
	var Report = Parse.Object.extend("ReportDay");
	var report = new Report();
	var percentage=trueNumbers*100/questionsArr.length;
	report.set("questions", questionsArr);
	report.set("branchName", branchName);
	report.set("trueNumbers",trueNumbers);
	report.set("falseNumbers",falseNumbers);
	report.set("percentage", percentage);
	report.set("time", timeId);
	report.set("day", dayId);
	report.set("date", dateId);
	report.set("dateNumber",dateNumber);
	report.set("brunchManger", brunchManger);
	report.set("brunchCare", brunchCare);
	report.save(null, {
	  success: function(report) {
	        //console.log(typeof(report.id));
	        //console.log(typeof(report.id[0]));
	        //report.set('objectId','a'+report.id);
	        console.log(report.id);
	        window.location.href="done.html";
	    
	    
	  },
	  error: function(report, error) {
	    // Execute any logic that should take place if the save fails.
	    // error is a Parse.Error with an error code and message.
	    alert('Failed to create new object, with error code: ' + error.message);
	  }
	});
}


function checkName() {
        var name=$('#userName').val();
        var password=$('#password').val();
        var flag=false;
        
        Parse.User.logIn(name, password, {
	      success: function(user) {
	      	var x="index.html?".concat("userName="+name)
	        //window.location.href(x);
	        console.log("asd");
	        window.location.href="enter.html";

	      },
	      error: function(user, error) {
	        $('#errorSpan').css("display","block")
	        // The login failed. Check error to see why.
	      }
	    });

}

function newQuestion() {
	window.location.href='index.html';
	
}

function newQuestion2() {
	window.location.href='indexDay.html';
	
}

function allReport() {
	window.location.href='reports.html';
	
}

function allReport2() {
	window.location.href='reportsDay.html';
	
}

function getReport() {
	var branchName=$('#branchSelectRe').val();
	var toDate=$('#datepicker').val();
	var fromDate=$('#datepicker2').val();
	var fromArr=fromDate.split('/');
	var toArr=toDate.split('/');
	var from=0;
	var to=0;

	from=parseInt( fromArr[2]+fromArr[0]+fromArr[1]);
	to=parseInt(toArr[2]+toArr[0]+toArr[1]);
	console.log(from);

	$('#reportTable').css('display','none');
	$('#detialsTable').css('display','none');

	var Report = Parse.Object.extend("Report");
	var query = new Parse.Query(Report);
	if(branchName){
		query.equalTo("branchName", branchName);
		console.log('esad')
		if(from){
			query.greaterThanOrEqualTo("dateNumber", from);
		}

		if(to){
			query.lessThanOrEqualTo("dateNumber", to);
		}
	}

	query.find({
	  success: function(results) {
  		var yesNo=[];
  		var allQuestion;
  		for (var i = 0; i < 25; i++) {
  			yesNo.push({yes : 0 , no : 0});
  		}
	  	$('#reportsList').empty();
	  	var max=0;
	  	var min=100;
	  	var counter=results.length;
	  	var sum=0;

	    for (var i = 0; i < results.length; i++) {
	      var object = results[i];
	      allQuestion=object.get('questions');

	      var questions=object.get('questions');
	      for (var j = 0; j < questions.length; j++) {
				//console.log(yesNo);
				if(!questions[j].answer){
					yesNo[j].no++;
				}
				else
					yesNo[j].yes++;
			}

	      sum+=object.get('percentage');
	      if(max<object.get('percentage'))
	      	max=object.get('percentage');
	      if(min>object.get('percentage'))
	      	min=object.get('percentage');

	    	$('#reportsList').append('<a href="#" id="'+object.id+'" onclick="showReport(event)" class="list-group-item">'+ object.get('date') +'</a>');
	    }

		for (var i = 0; i < 25; i++) {
			console.log(yesNo[i].yes , " Yes " , i);
			console.log(yesNo[i].no , " No " , i);
		}

	    $('#detialsTable').empty();
	    $('#detialsTable').append('<tr><td>لا</td><td>نعم</td><td style="text-align:center">نقاط التفتيش</td><td>التسلسل</td></tr>');
	    if(allQuestion){
		    for (var i = 0; i < allQuestion.length; i++) {
		    	$('#detialsTable').append('<tr><td>'+yesNo[i].no+'</td><td>'+yesNo[i].yes+'</td><td>'+allQuestion[i].question+'</td><td>'+(i+1)+'</td></tr>');
		    }
		    $('#detialsTable').append('<tr><td colspan="4" onclick="prints()">طباعة</td></tr>');
		    $('#detialsTable').css('display','');
		}

	    console.log("avg : "+ sum/counter);
	    console.log("max : "+ max)
	    console.log("min : "+ min)
	    $('#avg').empty();
	    $('#avg').append(Math.floor(sum/counter));
	    $('#best').empty();
	    $('#best').append(max);
	    $('#worst').empty();
	    $('#worst').append(min);
	    $('#monthAvg').empty();
	    $('#monthAvg').append(counter);

	  },
	  error: function(error) {
	    alert("Error: " + error.code + " " + error.message);
	  }
	});
}


function getReportDay() {
	var branchName=$('#branchSelectRe').val();
	var toDate=$('#datepicker').val();
	var fromDate=$('#datepicker2').val();
	var fromArr=fromDate.split('/');
	var toArr=toDate.split('/');
	var from=0;
	var to=0;

	from=parseInt( fromArr[2]+fromArr[0]+fromArr[1]);
	to=parseInt(toArr[2]+toArr[0]+toArr[1]);
	console.log(from);

	$('#reportTable').css('display','none');
	$('#detialsTable').css('display','none');

	var Report = Parse.Object.extend("ReportDay");
	var query = new Parse.Query(Report);
	if(branchName){
		query.equalTo("branchName", branchName);
		console.log('esad')
		if(from){
			query.greaterThanOrEqualTo("dateNumber", from);
		}

		if(to){
			query.lessThanOrEqualTo("dateNumber", to);
		}
	}

	query.find({
	  success: function(results) {
  		var yesNo=[];
  		var allQuestion;
  		for (var i = 0; i < 25; i++) {
  			yesNo.push({yes : 0 , no : 0});
  		}
	  	$('#reportsList').empty();
	  	var max=0;
	  	var min=100;
	  	var counter=results.length;
	  	var sum=0;

	    for (var i = 0; i < results.length; i++) {
	      var object = results[i];
	      allQuestion=object.get('questions');

	      var questions=object.get('questions');
	      for (var j = 0; j < questions.length; j++) {
				//console.log(yesNo);
				if(!questions[j].answer){
					yesNo[j].no++;
				}
				else
					yesNo[j].yes++;
			}

	      sum+=object.get('percentage');
	      if(max<object.get('percentage'))
	      	max=object.get('percentage');
	      if(min>object.get('percentage'))
	      	min=object.get('percentage');

	    	$('#reportsList').append('<a href="#" id="'+object.id+'" onclick="showReportDay(event)" class="list-group-item">'+ object.get('date') +'</a>');
	    }


	    $('#detialsTable').empty();
	    $('#detialsTable').append('<tr><td>لا</td><td>نعم</td><td style="text-align:center">نقاط التفتيش</td><td>التسلسل</td></tr>');
	    if(allQuestion){
		    for (var i = 0; i < allQuestion.length; i++) {
		    	$('#detialsTable').append('<tr><td>'+yesNo[i].no+'</td><td>'+yesNo[i].yes+'</td><td>'+allQuestion[i].question+'</td><td>'+(i+1)+'</td></tr>');
		    }
		    $('#detialsTable').append('<tr><td colspan="4" onclick="prints()">طباعة</td></tr>');
		    $('#detialsTable').css('display','');
		}

	    console.log("avg : "+ sum/counter);
	    console.log("max : "+ max)
	    console.log("min : "+ min)
	    $('#avg').empty();
	    $('#avg').append(Math.floor(sum/counter));
	    $('#best').empty();
	    $('#best').append(max);
	    $('#worst').empty();
	    $('#worst').append(min);
	    $('#monthAvg').empty();
	    $('#monthAvg').append(counter);

	  },
	  error: function(error) {
	    alert("Error: " + error.code + " " + error.message);
	  }
	});
}

function showReport(event) {
	console.log(event.path[0].id);
	$('#reportTable').css('display','none');
	$('#detialsTable').css('display','none');

	console.log(event.path[0].id);
	var Report = Parse.Object.extend("Report");
	var query = new Parse.Query(Report);
	query.get(event.path[0].id, {
	  success: function(report) {
	    var branchName=report.get('branchName');
	    var trueNumbers=report.get('trueNumbers');
	    var falseNumbers=report.get('falseNumbers');
	    var percentage=report.get('percentage');
	    var date=report.get('date');
	    var time=report.get('time');
	    var day=report.get('day');
	    var brunchManger=report.get('brunchManger');
	    var brunchCare=report.get('brunchCare');

	    $('#branchNameTable').empty();
	    $('#branchNameTable').append(branchName);
	    $('#yesTable').empty();
	    $('#yesTable').append(trueNumbers);
	    $('#noTable').empty();
	    $('#noTable').append(falseNumbers);
	    $('#percentageTable').empty();
	    $('#percentageTable').append(percentage);
	    $('#dataTable').empty();
	    $('#dataTable').append(date);
	    $('#timeTable').empty();
	    $('#timeTable').append(time);
	    $('#dayTable').empty();
	    $('#dayTable').append(day);

	    $('#brunchMangerTable').empty();
	    $('#brunchMangerTable').append(brunchManger);
	    $('#brunchCareTable').empty();
	    $('#brunchCareTable').append(brunchCare);

	    $('#detiles').empty();
	    $('#detiles').append('<td class="tdTable" id="'+event.path[0].id+'"  onclick="showDetials(event)" colspan="4" style="background-color:#337AB5 ; color:white; "  >التفاصيل</td>');
	$('#reportTable').css('display','');
	  },
	  error: function(object, error) {
	    // The object was not retrieved successfully.
	    // error is a Parse.Error with an error code and message.
	  }
	});
}

function showReportDay(event) {
	console.log(event.path[0].id);
	$('#reportTable').css('display','none');
	$('#detialsTable').css('display','none');

	console.log(event.path[0].id);
	var Report = Parse.Object.extend("ReportDay");
	var query = new Parse.Query(Report);
	query.get(event.path[0].id, {
	  success: function(report) {
	    var branchName=report.get('branchName');
	    var trueNumbers=report.get('trueNumbers');
	    var falseNumbers=report.get('falseNumbers');
	    var percentage=report.get('percentage');
	    var date=report.get('date');
	    var time=report.get('time');
	    var day=report.get('day');
	    var brunchManger=report.get('brunchManger');
	    var brunchCare=report.get('brunchCare');

	    $('#branchNameTable').empty();
	    $('#branchNameTable').append(branchName);
	    $('#yesTable').empty();
	    $('#yesTable').append(trueNumbers);
	    $('#noTable').empty();
	    $('#noTable').append(falseNumbers);
	    $('#percentageTable').empty();
	    $('#percentageTable').append(percentage);
	    $('#dataTable').empty();
	    $('#dataTable').append(date);
	    $('#timeTable').empty();
	    $('#timeTable').append(time);
	    $('#dayTable').empty();
	    $('#dayTable').append(day);

	    $('#brunchMangerTable').empty();
	    $('#brunchMangerTable').append(brunchManger);
	    $('#brunchCareTable').empty();
	    $('#brunchCareTable').append(brunchCare);

	    $('#detiles').empty();
	    $('#detiles').append('<td class="tdTable" id="'+event.path[0].id+'"  onclick="showDetialsDay(event)" colspan="4" style="background-color:#337AB5 ; color:white; "  >التفاصيل</td>');
	$('#reportTable').css('display','');
	  },
	  error: function(object, error) {
	    // The object was not retrieved successfully.
	    // error is a Parse.Error with an error code and message.
	  }
	});
}

function showDetials(event) {
	var Report = Parse.Object.extend("Report");
	var query = new Parse.Query(Report);
	console.log(event.path[0].id)
	query.get(event.path[0].id, {
	  success: function(report) {
	    var questions=report.get('questions');
	    $('#detialsTable').empty();
	    $('#detialsTable').append('<tr><td>لا</td><td>نعم</td><td style="text-align:center">نقاط التفتيش</td><td>التسلسل</td></tr>');

	    for (var i = 0; i < questions.length; i++) {
	    	console.log(questions[i].answer);
	    	if(questions[i].answer){
	    		answerYes='<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>';
	    		answerNo="";
	    	}
	    	else{
	    		answerNo='<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>';;
	    		answerYes="";
	    	}
	    	$('#detialsTable').append('<tr><td>'+answerNo+'</td><td>'+answerYes+'</td><td>'+questions[i].question+'</td><td>'+(i+1)+'</td></tr>');
	    }
	    $('#detialsTable').append('<tr><td colspan="4" onclick="prints()">طباعة</td></tr>');
	    $('#detialsTable').css('display','');
	  },
	  error: function(object, error) {
	    // The object was not retrieved successfully.
	    // error is a Parse.Error with an error code and message.
	  }
	});
	
}



function showDetialsDay(event) {
	console.log(event.path[0].id);
	var Report = Parse.Object.extend("ReportDay");
	var query = new Parse.Query(Report);
	query.get(event.path[0].id, {
	  success: function(report) {
	    var questions=report.get('questions');
	    $('#detialsTable').empty();
	    $('#detialsTable').append('<tr><td>لا</td><td>نعم</td><td style="text-align:center">نقاط التفتيش</td><td>التسلسل</td></tr>');

	    for (var i = 0; i < questions.length; i++) {
	    	console.log(questions[i].answer);
	    	if(questions[i].answer){
	    		answerYes='<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>';
	    		answerNo="";
	    	}
	    	else{
	    		answerNo='<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>';;
	    		answerYes="";
	    	}
	    	$('#detialsTable').append('<tr><td>'+answerNo+'</td><td>'+answerYes+'</td><td>'+questions[i].question+'</td><td>'+(i+1)+'</td></tr>');
	    }
	    $('#detialsTable').append('<tr><td colspan="4" onclick="prints()">طباعة</td></tr>');
	    $('#detialsTable').css('display','');
	  },
	  error: function(object, error) {
	    // The object was not retrieved successfully.
	    // error is a Parse.Error with an error code and message.
	  }
	});
	
}
function prints() {
	$("#reportsList").css('display','none');
	$("#monthlyTable").css('display','none');
	window.print()
	$("#reportsList").css('display','');
	$("#monthlyTable").css('display','');


}


function test(){
	console.log(typeof($('#datepicker').val()));
}