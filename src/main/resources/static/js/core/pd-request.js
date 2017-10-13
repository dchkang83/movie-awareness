/**
 * NAME : PD_Request.js
 * DESC : Request 함수 모음
 * VER  : 1.0
 * Copyright 2015 덕준님 Group All rights reserved
 * ============================================================================================
 *                변   경   사   항
 * ============================================================================================
 * VERSION    DATE    AUTHOR    DESCRIPTION
 * ============================================================================================
 * 1.0    2015.03.16    kang d.j  최초작성
 */

var PD_Request = function() {
  this.copyright = '여신님~ 포동아~~ 사랑해~!!!';
  this.domain = 'http://127.0.0.1/';
//  this.actionURL = '';
  this.options = null;
  this.success = null;
  this.error = null;
  this.method = 'POST';
  this.formId = '';
  this.progress = true;
  this.progressArea = ''; // MAIN_CONTENTS
  this.progressText = '로딩중입니다...';
  this.async = true; // sync:false, async:true
  
  
  
  
  this.charset = "UTF-8";
//  this.contentType = "application/x-www-form-urlencoded; charset=" + this.charset;
  
  this.MEDIA_TYPES = {
    'DEFAULT' : 'application/x-www-form-urlencoded; charset=' + this.charset,
    'JSON' : 'application/json; charset=' + this.charset,
  };
};

/**
 * HttpRequest Object Return
 */
PD_Request.getHttpRequest = function() {
  // if(window.ActiveXObject) {
  if (window.ActiveXObject || "ActiveXObject" in window) {
    try {
      httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e1) {
      try {
        httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
      } catch (e2) {
      }
    }
  } else {
    httpRequest = new XMLHttpRequest();
  }
  
  return httpRequest;
}

/**
 * 화면컨트롤 그리기
 */
PD_Request.prototype.methods = function() {
  if (typeof arguments[0] === 'string') {
    return eval("this." + arguments[0] + ".apply(this, [arguments[1]])");
  } else {
    // return this.fnProcessCall.apply(this, arguments);
  }
};

/**
 * form data submit
 */
PD_Request.prototype.ajax = function(_options) {
  this.options = _options;
  this.options.callBackSessionOut = function() {

  };

  this.options.callError = function(jsonData, result) {
    // PD_Common.MsgBox(JSON.stringify(jsonData), "E"); // (C:Confirm-확인/취소버튼,
    // I:Information-확인, E:Error-확인버튼)
//    alert(jsonData['message']);
//    PD_Common.closeProgress(progressArea);
    
    PD_Common.MsgBox(jsonData['message'], 'E', {
      title : jsonData['title'],
      callback : function(_result) {
        PD_Common.closeProgress(progressArea);
      }
    });
  };
  
  /*
  var method        = typeof this.options.method != "undefined" ? this.options.method : this.method;
  var formId        = typeof this.options.formId != "undefined" ? this.options.formId : this.formId;
  var progress      = typeof this.options.progress != "undefined" ? this.options.progress : this.progress;
  var progressArea  = typeof this.options.progressArea != "undefined" ? this.options.progressArea : this.progressArea;
  var progressText  = typeof this.options.progressText != "undefined" ? this.options.progressText : this.progressText;
  var async         = typeof this.options.async != "undefined" ? this.options.async : this.async;
  var url           = this.options.url;
  var contentType   = typeof this.options.contentType != "undefined" ? this.options.contentType : this.MEDIA_TYPES.DEFAULT;
  */

  var method        = this.options.method || this.method;
  var formId        = this.options.formId || this.formId;
  var progress      = this.options.progress || this.progress;
  var progressArea  = this.options.progressArea || this.progressArea;
  var progressText  = this.options.progressText || this.progressText;
  var async         = this.options.async || this.async;
  var url           = this.options.url;
  var contentType   = this.options.contentType || this.MEDIA_TYPES.DEFAULT;
  
  
//  alert("contentType : " + contentType);
  
  // jQuery형식 파라메터로 변환
  if (this.options.data && typeof this.options.data !== "string") {
    this.options.data = jQuery.param(this.options.data);
  }
  
  switch (method) {
    case "GET" :
      if(this.options.data) {
        url = url + "?" + this.options.data;
        this.options.data = "";
      }
      break;
    case "POST" :
      
      break;
    case "PUT" :
//      this.options.data = JSON.stringify(this.options.data);
      contentType = this.MEDIA_TYPES.JSON;
      break;
    default:
      
      break;
  }
  
  // Progress Bar Show
  if (progress) {
    PD_Common.openProgress(progressArea, progressText);
  }
  
  var httpRequest = PD_Request.getHttpRequest();
  httpRequest.open(method, url, async);
  httpRequest.setRequestHeader('AJAX', true);
  httpRequest.setRequestHeader('Content-type', contentType);
  
  
//  alert("contentType : " + contentType);
  
  // 상태가 변할 시 걸리게 된다!
  httpRequest.onreadystatechange = function() {
    if (httpRequest.readyState == 4) {
      // console.log(httpRequest.status);
//      console.log(httpRequest.status);
//      alert("httpRequest.responseType : " + httpRequest.responseType + "\r\nhttpRequest.contentType : " + httpRequest.getResponseHeader("content-type"));
      var resultContentType = httpRequest.getResponseHeader("content-type");
//      alert("resultContentType : " + resultContentType);
      
      var rtnData = null;
      if (resultContentType.indexOf('text/xml') != -1) {
        rtnData = httpRequest.responseXML;
      }
      else if (resultContentType.indexOf('text/html') != -1) {
        rtnData = httpRequest.responseText;
      }
      else if (resultContentType.indexOf('application/json') != -1) {
        rtnData = jQuery.parseJSON(httpRequest.responseText);
      }
      else {
        rtnData = httpRequest.responseText;
      }
      
      switch (httpRequest.status) {
        case 400:
          rtnData['title'] = rtnData.error;
          rtnData['message'] = rtnData.errors[0].defaultMessage;
          _options.callError.apply(null, [ rtnData, 'fail' ]);
          
          break;
        case 401:
        case 403:
          PD_Common.fnLoginPage();
          _options.callBackSessionOut.apply(null, [ '', 'fail' ]);
          break;
        case 404:
          rtnData['title'] = "Not found, 문서를 찾을 수 없음";
          _options.callError.apply(null, [ rtnData, 'fail' ]);
          break;
        case 406:
          rtnData['title'] = "불가"; // 사용자 정의함수로 사용 - 원래 : Not acceptable, 허용할 수 없음
          _options.callError.apply(null, [ rtnData, 'fail' ]);
          break;
        case 500:
          rtnData['title'] = "Internal server error, 내부서버 오류";
          _options.callError.apply(null, [ rtnData, 'fail' ]);
          break;
        case 200: // 성공
          if (!PD_Common.fnSessionCheck(rtnData)) {
            _options.callBackSessionOut.apply(null, [ '', 'fail' ]);
          } else {
            _options.success.apply(null, [ rtnData, 'success' ]);
          }
          
          
          
          if (progress) {
            // Progress Bar Hide
            PD_Common.closeProgress(progressArea);
          }
  
          break;
        default:
          break;
      }
    }
  };

  // 실질적으로 요청을 서버로 보낸다
  // content 에 값을 넘기려면 open() 메소드는 반드시 POST 로 설정해야 하며, GET 방식으로 요청하려면 null 을
  // 설정하면 된다
  httpRequest.send(this.options.data);
};

