var map = {};
var result = {};
var times = 0;


function tryAnswer( answerId){
	var question_id = document.getElementById('question_id').value;

	var param = {'qid': question_id, answer: answerId};

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
					initQuestion(response.question_demo,init_data.category_time_limit);
				}else if(response.msg=='last_question'){
					var error_state = 1;
					if( response.category_id == 4){
						error_state = 0;
					}
					showAwardDialog(response.message,response.category_id,error_state);
				}else if(response.msg=='answer_false'){
					showAwardDialog('啊哦，挑战失败了',-1,0);
				}else{
					showAwardDialog('好像出了一点问题，请稍后再试。',-1,0);
				}
			}else{
				showAwardDialog('好像出了一点问题，请稍后再试。',-1,0);
			}
			jQuery('#submit_tip').hide();
		},
		error:function(){
			alert('网络请求超时，请刷新重试');
			answer_end_sign = true;
			jQuery('#submit_tip').hide();
		}
	});	

}

tryAnswer(0);



