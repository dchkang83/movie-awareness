function Agree() {	
	valid(surveyId, memberId)
	.then(function() {
		$("#btn_agreement_confirm").on("click", function() {
			var target_url = "/customer/survey/?surveyId=" + surveyId + "&memberId=" + memberId;
			window.location = target_url;
		});
	});
}