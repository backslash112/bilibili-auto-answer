var map = {};
var result = {};
var times = 0;


function tryAnswer( answerId){
	var question_id = document.getElementById('question_id').value;

	var param = {'qid': question_id, answer: answerId};
	//
	$.post('http://www.bluefocusmix.com/parts.php', param, function(data) {
		times ++;
		data = $.parseJSON(data);
		success = data.status;
		if(!success){
			tryAnswer(times);
		} else {
			//answer();
			print("answer: " + answerId);
			times = 0;
		}
	});
}
tryAnswer(0);



