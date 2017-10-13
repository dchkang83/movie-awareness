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
  var questionSrl = jQuery("#fmQuestionTemplateForm #questionSrl").val();
  //alert(questionSrl);
  
  if(questionSrl != null && questionSrl != "") {
    var request = new PD_Request();
    request.methods('ajax', {
      url : '/admin/template/questions/'+questionSrl,
      method : 'GET',
      data : '',
      progress : false,
      success : function(jsonData, result) {
//        alert(JSON.stringify(jsonData));
        
        jQuery.each(jsonData, function(key, val) {
          var obj = jQuery("#fmQuestionTemplateForm #"+key);
          if(obj != null) {
  //          alert(key + " : " + val);
            obj.val(val);
          }
        });
      },
      error : function(request, status, error) {
      }
    });
  }
}

function fnAddDetail() {
//  var surveySrl = jQuery("#fmQuestionTemplateForm #surveySrl").val()
//  var params = {'surveySrl':surveySrl};
  var params = {};
//  fnTabClick_QuestionMang({type:'question-form1', params:params});
  fnTabClick_QuestionMang({topClass:'frame-right', params:params});
}

function getFormData($form) {
  var unindexed_array = $form.serializeArray();
  var indexed_array = {};
  
  $.map(unindexed_array, function(n, i) {
      indexed_array[n['name']] = n['value'];
  });
  
  return indexed_array;
}

function fnSaveDetail() {
  var questionSrl = jQuery("#fmQuestionTemplateForm #questionSrl").val();
  var url = "";
  var method = "";
  var args = null;
  
  if( questionSrl == null || questionSrl == '' ) {
    url = '/admin/template/questions/';
    method = "POST";
//    args = jQuery("#fmQuestionTemplateForm").serializeserializeArray();
    args = jQuery("#fmQuestionTemplateForm").serialize();
  }
  else {
    url = '/admin/template/questions/'+questionSrl;
    method = "PUT";
    args = getFormData(jQuery("#fmQuestionTemplateForm"));
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
  var questionSrl = jQuery("#fmQuestionTemplateForm #questionSrl").val();

  var request = new PD_Request();
  request.methods('ajax', {
    url : '/admin/template/questions/'+questionSrl,
    method : 'DELETE',
    data : '',
    success : function(jsonData, result) {
      alert(JSON.stringify(jsonData));
    },
    error : function(request, status, error) {
    }
  });
}

