var map = {};
var result = {};
var times = 0;

start();

function writeToFile(d1, d2){
	// only works in IE.
	//var fso = new ActiveXObject("Scripting.FileSystemObject");
	//var fh = fso.OpenTextFile("data.txt", 8, false, 0);
	//fh.WriteLine(d1 + ',' + d2);
	//fh.Close();
}

function readFile(){
	// only works in IE.
	var fso = new ActiveXObject("Scripting.FileSystemObject");
	var fh = fso.OpenTextFile("data.txt", 1, false, 0);
	var lines = "";
	while (!fh.AtEndOfStream) {
		lines += fh.ReadLine() + "\r";
	}
	fh.Close();
	return lines;
}

function getAnswerFromDataByQuestionId(question_id) {
	var text = readFile();
	var lines = text.split("\r");
	lines.pop();
	var result;
	for (var i = 0; i < lines.length; i++) {
		if (lines[i].match(new RegExp(input))) {
			result = lines[i].split(",")[1];
		}
	}
	if (result) { 
		return result
	} else {
		return 99
	}
}

function tryAnswer(question_id, answerId){
	console.log('current answer: '+answerId);

	var param = {'qid': question_id, answer: answerId};
	var user_answer = times;
	jQuery.ajax({		
		url: 'parts.php?mod=fight5&v=getNextQuestion',
		async:true,
		type: 'POST',
		dataType:'json',
		data: {
			qid:question_id,
			answer:user_answer		
		},
		success: function(response) {
			clearTimeout(timeEvent);
			answer_end_sign = true;
			if(response.error=='1'){
				if(response.msg=='next_question'){
					console.log(question_id + 'right answer: ' + user_answer);
					map[question_id] = user_answer;
					//writeToFile(question_id, user_answer);
					times = 0;
					// new question
					initQuestion(response.question_demo,init_data.category_time_limit);
					setTimeout(start, 3000);

				}else if(response.msg=='last_question'){
					console.log('right answer: ' + user_answer);
					//writeToFile(question_id, user_answer);
					times = 0;
					var error_state = 1;
					if( response.category_id == 4){
						error_state = 0;
					}
					alert(response.message,response.category_id,error_state);
				}else if(response.msg=='answer_false'){
					//alert('啊哦，挑战失败了',-1,0);
					console.log('wrong answer: '+answerId);
					console.log(map);
					times ++;
					if (times < 2) {
						tryAnswer(question_id, times);
					}
				}else{
					alert('好像出了一点问题，请稍后再试。',-1,0);
				}
			}else{
				alert('好像出了一点问题，请稍后再试。',-1,0);
			}
			//jQuery('#submit_tip').hide();
		},
		error:function(){
			alert('网络请求超时，请刷新重试');
			answer_end_sign = true;
		}
	});	
}

function start() {
	var question_id = document.getElementById('question_id').value; 
	// var savedAnswer = getAnswerFromDataByQuestionId(question_id);
	tryAnswer(question_id, times);
	return
	if (savedAnswer > 99) {
		alert('saved answer: ' + savedAnswer);
	} else {
		tryAnswer(question_id, 0);
	}
}



