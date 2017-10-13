var surveyId;
var memberId;

(function get_ids() {
	var url = new URL(window.location.href );
	surveyId = url.searchParams.get("surveyId");
	memberId = url.searchParams.get("memberId");	
})();



function init_introduce() {
	$.get('/introduce.txt', function(data) {
	  $("#introduce_box").val(data);
	  
	  var target_url = "/customer/agreement/?surveyId=" + surveyId + "&memberId=" + memberId;
	  $("#btn_introduce_confirm").on("click", function() {
		  window.location = target_url;
	  });
	});
}


function valid(surveyId, memberId) {
	return new Promise(function(resolve, reject) {		
		var request = new PD_Request();
		request.methods('ajax', {
		  url : `/api/customer/valid/${surveyId}/${memberId}`,
		  method : 'GET',
		  success : function(jsonData, result, mimeType) {
			if (result==="success") {
				console.log(jsonData);
				
				if (jsonData.isValid) {
					console.log("Valid result: 유효한 설문, 유효한 회원 확인");
					resolve();
				} else {
					window.alert("Valid result: 유효하지 않은 설문 혹은 사용자입니다");
					//window.location = "/";
					reject();
				}
				
			} else {
				alert("Valid result: API 리턴 오류");
				reject();
			}
		  },
		  error : function(request, status, error) {
			  alert("Valid result: API 호출 오류");
			  reject();
		  }
		});
	});
}