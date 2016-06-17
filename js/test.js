var questionsArr = [];



var makeQuestion = function (question, answer, notes) {
	return {
		question: question,
		answer: answer,
		notes: notes,
	};
}

questionsArr.push(makeQuestion("لالتزام بإدخال المبيعات على جهاز الكاشير فور إستلام النقود وتسليم الزبون الفاتورة مع باقي المبلغ, و الالتزام بإسم المستخدم الخاص به فقط على جهاز الكاشير, و وجود مفتاح الكاش بشكل دائم مع مدير الفرع ونائبه فقط, وأن تتم طريقة البيع بحسب النظام المعمول به في الشركة و عدم التجاوز.", undefined, undefined));
questionsArr.push(makeQuestion("عدم وجود اي مبلغ نقدي خارج الصندوق أو جنب الصندوق أو تحت الصندوق أو بالادراج أو على ارضية مكتب الكاش, أو بأي مكان مخفي و عدم تعليق مبالغ نقدية بما فيها باقي الزبون.", undefined, undefined));
questionsArr.push(makeQuestion("عدم وجود سند احضار صرافه موقع من الكاشير و المدير و الموظف الموكل باحضار الصرافه في حال اخراج مبلغ من الكاش لغايات احضار الصرف", undefined, undefined));
questionsArr.push(makeQuestion("وجود نقص او زيادة في الكاش او الصرافه في الخزنة او الفواتير الشرائية", undefined, undefined));
questionsArr.push(makeQuestion("تسجيل الضيافات أو المرتجع بشكل يومي أولاً بأول على النماذج الخاصة بذلك", undefined, undefined));
questionsArr.push(makeQuestion("عدم تجاوز نسبة الخصم المحددة للموظفين و هي كالتالي ( 5% الكنافه, 10% باقي الأصناف)", undefined, undefined));
questionsArr.push(makeQuestion("عدم صرف اي سلف أو مبالغ نقدية من الكاش أو من العهده أو من الصرافه وأن يتم الصرف فقط عن طريق الإدارة المالية فقط و حسب النظام", undefined, undefined));
questionsArr.push(makeQuestion("تجاوز الحد المسموح به لسحوبات الموظفين حسب الآلية المتبعة بما يتناسب مع راتب الموظف و عدد أيام الدوام", undefined, undefined));
questionsArr.push(makeQuestion("الالتزام بأسعار البيع و طريقة البيع المحددة من قبل الشركة و عدم تجاوزها بأي شكل من الأشكال", undefined, undefined));
questionsArr.push(makeQuestion("اعتماد ختم و توقيع المدير أو نائبه على أي كشط أو تعديل أو الغاء لفاتورة زبون أو ارجاع نقدي حسب النظام المتبع, أو سندات المرتجعات و فواتير الضيافات", undefined, undefined));
questionsArr.push(makeQuestion("الالتزام بالتشييك على فاتورة أو سند البضاعة المرسلة من المشغل و مطابقتها مع البضاعة المستلمة فعلياً أو وجود نقص في الطلبية أو مشكلة في البضاعة المستلمة فعند ذلك يجب الاخطار فورا بالمشكلة من خلال ارسال ايميل للسادة المعنييين و حسب النظام المتبع", undefined, undefined));
questionsArr.push(makeQuestion("عدم احتساب سعر الصواني أو العلب أو الكرتون المعبأة من ضمن سعر المنتج, مع ضرورة وجود السعر على جميع البضاعة المعروضة في الفرع", undefined, undefined))
questionsArr.push(makeQuestion("الالتزام بطريقة البيع للموظفين حسب النظام المعمول به في الشركة أو حسب الخصم المسموح به", undefined, undefined));
questionsArr.push(makeQuestion("سلامة الأوزان والأسعار في الصواني و الصحون المعبأة و عدم وجود زيادة أو نقص", undefined, undefined));
questionsArr.push(makeQuestion("الالتزام بعدم عمل خصومات للموظفين الذين تركوا العمل", undefined, undefined));
questionsArr.push(makeQuestion("الالتزام بالنسب المعتمدة في التشكيلة من جميع الأصناف عند تعبئة الصواني أو العلب أو الصحون المعبأة و عدم زيادة صنف على حساب الاخر", undefined, undefined));
questionsArr.push(makeQuestion("ارسال دفاتر الفواتير المنفذة بالكامل وأي أوراق أو مستندات ادارية مطلوب ارجاعها", undefined, undefined));


for (var i = 0; i < questionsArr.length; i++) {
	$("#questions").append('<div class="jumbotron" id="jumb'+i+'"><p>' + questionsArr[i].question + '</p><div class="row"><div class="col-lg-12"><div class="input-group"> <input type="text" class="form-control" placeholder=" ... ملاحظات "> <span class="input-group-btn"> <label class="btn btn-danger"><input type="radio" value= "false" name="options'+i+'" id="option_0'+i+'" >   &nbsp;  &nbsp;لا  &nbsp;  &nbsp;</label><label class="btn btn-success"><input type="radio" value= "true" name="options'+i+'" id="option_1'+i+'" autocomplete="off"> &nbsp;  &nbsp; نعم  &nbsp;  &nbsp</label></span></div><!-- /input-group --></div><!-- /.col-lg-12 --> </div>  <!--/row --> </div> <!--/jumbotron -->');
}
$("#questions").append('<div class="jumbotron"><button type="button" class="btn btn-success  btn-lg btn-block" value="clickme" onclick="send();" data-toggle="modal" data-target="#myModal">ارسال</button></div>')


function send() {
	var flag=true;
	var str="";
	

		trueNumbers = 0;
		falseNumbers = 0;
		for (var i = 0; i < questionsArr.length; i++) {
			if($("input[name=options" + i + "]:checked").val() === "true"){
				trueNumbers++;
				questionsArr[i].answer=true;
			}
			else if($("input[name=options" + i + "]:checked").val() === "false"){
				falseNumbers++;
				questionsArr[i].answer=false;
			}
		}
		


		for (var i = 0; i < questionsArr.length; i++) {
			if(questionsArr[i].answer ===undefined){
				flag=false;
				str=str+i+" , ";
			}
		}

		var x=trueNumbers*100/questionsArr.length;

	if(flag)
	{
		$("#sameraso3ad").empty();
		$("#sameraso3ad").append(x);
		$("#sameryes").empty();
		$("#sameryes").append(trueNumbers);
		$("#samerno").empty();
		$("#samerno").append(falseNumbers);
		$("#branchNameRe").empty();
		$("#branchNameRe").append($("#branchName"));
		$("#dataRe").empty();
		$("#dataRe").append($("#date"));
	}
	else
	{
		$("#tableMo").hide();
		console.log(str);
	}

}
	
function saveRe() {
		
	}	