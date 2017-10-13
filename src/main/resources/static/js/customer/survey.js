function Survey() {
	valid(surveyId, memberId)
	.then(function() {
		var _step = _step ? _step : 1;
		
		survey.get_question = function() {
			console.log(`current step : ${_step}`);
			
			$("#btn_next").prop("disabled", true);
			$("#btn_next").unbind("click");
			

			var request = new PD_Request();
			request.methods('ajax', {
			  url : `/api/customer/survey/${surveyId}/${_step}`,
			  method : 'GET',
			  success : function(jsonData, result, mimeType) {
				if (result==="success" && jsonData.length > 0) {
					//console.log(jsonData);
					
					draw_question(jsonData);	
					
					$("#choices input").on("change", function() {
						$("#btn_next").prop("disabled", false);
						$("#btn_next").on("click", function() {
							$("#btn_next").prop("disabled", true);
							survey.answer();
						});
					});	
				} else {
					alert("다음 설문 내용이 없습니다");
				}
			  },
			  error : function(request, status, error) {
			    //do something for Error
			  }
			});
		};
			
		survey.answer = function() {
			// TODO :
			// send choices
			var answers = {
				surveyId: surveyId,
				memberId: memberId,
				itemSrls: [],
				questionSrl: $("#choices input").first().attr("name"),
			};
			
			$("#choices input:checked").each(function() {
				answers.itemSrls.push( $(this).val() );
				console.log("answer: ", $(this).parent("label").text().trim());
			});
			answers.itemSrls = answers.itemSrls.join();
			
			console.log(answers);
			
			var request = new PD_Request();
			request.methods('ajax', {
			  url : `/api/customer/survey/answer/`,
			  method : 'POST',
			  data : answers,
			  success : function(jsonData, result, mimeType) {
				console.log(jsonData);  
				if (jsonData.isSuccess) {
					console.log(`답변 정상 반영`);
				} else {
					alert("답변이 반영되지 않았습니다");
				}
			  },
			  error : function(request, status, error) {
			    //do something for Error	
			  }
			});
			
			++_step;
			survey.get_question();
		};
	})
	.then(function() {
		survey.get_question();
	});
}

function draw_question(jsonData) {
	console.log("question Type: ", jsonData[0].questionType);
	
	$("#question").text(jsonData[0]["questionName"]);

	$("#choices").html(jsonData.reduce(function(carry, choice) {
		
		switch (choice.questionType) {
			case "2": //checkbox
				return carry + `
				<div class='checkbox'>
					<label>
						<input type='checkbox' name='${choice.questionSrl}' value='${choice.itemSrl}'>
						${choice.itemName}
					</label>
				</div>`;
				break;
				
			case "3": //주관식
				break;
				
			case "1": //radio
			default:
				return carry + `
					<div class='radio'>
						<label>
							<input type='radio' name='${choice.questionSrl}' value='${choice.itemSrl}'>
							${choice.itemName}
						</label>
					</div>`;
				break;
		}
	},""));
}
