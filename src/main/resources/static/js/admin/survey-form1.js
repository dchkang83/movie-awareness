/**
 * Global Variable Setting
 */

/**
 * onLoad Event
 */
jQuery(document).ready(function() {
  fnSearchDetail();
});

/**
 * Resize Event
 */
jQuery(window).resize(function() {

});

function fnSearchDetail() {
  var surveySrl = jQuery("#fmSurveyForm1 #surveySrl").val();
  
  var request = new PD_Request();
  request.methods('ajax', {
    url : '/admin/surveys/'+surveySrl,
    method : 'GET',
    data : '',
    progress : false,
    success : function(jsonData, result) {
//      alert(JSON.stringify(jsonData));
      jQuery.each(jsonData, function(key, val) {
        var obj = jQuery("#fmSurveyForm1 #"+key);
        if(obj != null) {
          obj.val(val);
        }
      });
    },
    error : function(request, status, error) {
    }
  });
}

function fnAddDetail() {
  //fnTabClick_SurveyMang(arrParams);
  var params = {};
//  fnTabClick_SurveyMang({type:'survey-form1', params:params});
  fnTabClick_SurveyMang({topClass:'frame-right', params:params});
}

function fnSaveDetail() {
  var surveySrl = jQuery("#fmSurveyForm1 #surveySrl").val();
  var url = "";
  var method = "";
  var args = null;
  
  if( surveySrl == null || surveySrl == '' ) {
    url = '/admin/surveys';
    method = "POST";
//    args = jQuery("#fmSurveyForm1").serializeserializeArray();
    args = jQuery("#fmSurveyForm1").serialize();
  }
  else {
    url = '/admin/surveys/'+surveySrl;
    method = "PUT";
//    args = getFormData(jQuery("#fmSurveyForm1"));
//    args = JSON.stringify(args);
    args = jQuery("#fmSurveyForm1").serializeFormJSON();
    args = JSON.stringify(args);
  }
  
  var request = new PD_Request();
  request.methods('ajax', {
    url : url,
    method : method,
    data : args,
    success : function(jsonData, result) {
      alert(JSON.stringify(jsonData));
    },
    error : function(request, status, error) {
//      PD_Utils.MsgBox(JSON.stringify(request), "E"); // (C:Confirm-확인/취소버튼, I:Information-확인, E:Error-확인버튼)
    }
  });
}

function fnDeleteDetail() {
  var surveySrl = jQuery("#fmSurveyForm1 #surveySrl").val();

  var request = new PD_Request();
  request.methods('ajax', {
    url : '/admin/surveys/'+surveySrl,
    method : 'DELETE',
    data : '',
    success : function(jsonData, result) {
      alert(JSON.stringify(jsonData));
    },
    error : function(request, status, error) {
    }
  });
}

function fnGetTarget() {
  var surveySrl = jQuery("#fmSurveyForm1 #surveySrl").val();
  
  var request = new PD_Request();
  request.methods('ajax', {
    url : '/admin/targets/get-mssql3-members/'+surveySrl,
    method : 'GET',
    data : '',
    success : function(jsonData, result) {
      alert(jsonData + "건을 가져왔습니다.");
    },
    error : function(request, status, error) {
    }
  });
}