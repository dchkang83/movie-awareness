/**
 * NAME : PD_Grid.js
 * DESC : 화면컨트롤함수 모음
 * VER  : 1.0
 * Copyright 2015 덕준님 Group All rights reserved
 * ============================================================================================
 *                변   경   사   항
 * ============================================================================================
 * VERSION    DATE    AUTHOR    DESCRIPTION
 * ============================================================================================
 * 1.0    2015.03.16    kang d.j  최초작성
 */

PD_Grid = function() {
};
PD_Grid = {
  //quick_menu_width  : 80,
  quick_menu_width : 0,
  fiexd_padding_width : 2
};

/**
 * 화면컨트롤 그리기
 */
PD_Grid.makeScreen = function(layoutPath, fixed) {
  PD_Grid.getScreenFile(layoutPath, fixed);
};

/**
 * xml파일을 Load한다.
 */
PD_Grid.getScreenFile = function(layoutPath, fixed) {
  var xmlHttpRequest = PD_Request.getHttpRequest();

  var layoutDoc = null;
  var contentType = null;

  xmlHttpRequest.open("GET", layoutPath, false);
  xmlHttpRequest.onreadystatechange = function() {
    if (xmlHttpRequest.readyState == 4) {
      switch (xmlHttpRequest.status) {
      case 401:
        alert('오류: 권한없음');
        break;
      case 403:
        alert('오류: 접근거부');
        break;
      case 404:
        alert('오류: ' + layoutPath + ' 이 존재하지 않음');
        break;
      case 500:
        alert('오류: 내부서버오류 500' + xmlHttpRequest.responseText);
        break;
      case 200:
        contentType = xmlHttpRequest.getResponseHeader('Content-Type');

        try {
          PD_Grid.rs_getScreenFile(layoutPath, xmlHttpRequest.responseText, fixed, contentType);
        } catch (e) {
          PD_Utils.MsgBox(layoutPath + " 로드중 에러 발생.\r\n" + e.message, "E", "N");
        }

        break;
      default:
        break;
      }
    }
  };

  xmlHttpRequest.send("");
};

/**
 * 호출 result함수, 읽어온 xml파일을 가지고 화면 컨트롤을 만든다.
 */
PD_Grid.rs_getScreenFile = function(layoutPath, responseText, fixed, contentType) {

  if (contentType == 'application/xml') {
    PD_GridXml.getScrnList(layoutPath, PD_Grid.convertXmlStringToDomObject(responseText), fixed);
  } else {
    //    alert('111');
    PD_GridJson.getScrnList(layoutPath, JSON.parse(responseText), fixed);
  }
};

/**
 * Converts an XML string into a DOM object.
 */
PD_Grid.convertXmlStringToDomObject = function(xmlData) {

  var xmlDoc = null;
  if (window.ActiveXObject || "ActiveXObject" in window) { // code for IE
    xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
    //xmlDoc = new ActiveXObject("Msxml2.DOMDocument.3.0");
    //xmlDoc = createDocument();
    xmlDoc.async = false;
    //xmlDoc.setProperty("ProhibitDTD", false);

    //xmlDoc.resolveExternals = false;
    //xmlDoc.loadXML(xml);

    //xmlDoc.loadXML(xmlData);

    //alert(xmlData.xml);
    //xmlDoc.loadXML((new XMLSerializer()).serializeToString(xmlData));
    //xmlDoc.loadXML(xmlData.xml);

    //xmlData = "<Person><Name>ArunB</Name><Age>22</Age></Person>";

    xmlDoc.loadXML(xmlData);
  } else {
    var parser = new DOMParser();
    xmlDoc = parser.parseFromString(xmlData, "text/xml");
    //xmlDoc  = xmlData;
  }

  return xmlDoc;
}

/**
 * xml파일을 Load한다.
 */
PD_Grid.fnGetXMLDocFields = function(layoutPath, xPath, rsltFunc) {
  var xmlHttpRequest  = PD_Request.getHttpRequest('text/xml');
  //xmlHttpRequest.responseType =  'msxml-document';
  
  xmlHttpRequest.open("GET", layoutPath, false);
  xmlHttpRequest.onreadystatechange = function() {
    if(xmlHttpRequest.readyState == 4) {
      switch (xmlHttpRequest.status) {
        case 401: alert('오류: 권한없음');                      break;
        case 403: alert('오류: 접근거부');                      break;
        case 404: alert('오류: ' + layoutPath + ' 이 존재하지 않음');         break;
        case 500: alert('오류: 내부서버오류 500' + xmlHttpRequest.responseText);    break;
        case 200:
          //var layoutDoc  = PD_Grid.convertXmlStringToDomObject(xmlHttpRequest.responseText);
          
          var jsonData = JSON.parse(xmlHttpRequest.responseText);
          
          try {
//            eval(rsltFunc + '( DJ_Xml.getNode(layoutDoc, xPath) );');
            
//            PD_Grid.rs_getScreenFile(layoutPath, xmlHttpRequest.responseText, fixed, contentType);
            
            
            eval(rsltFunc + '( jsonData.fields );');
          }
          catch(e) {
            PD_Utils.MsgBox(layoutPath +" 로드중 에러 발생.\r\n" + e.message, "E", "N");
          }
          
          
          break;
        default:
          break;
      }
    }
  };
  
  xmlHttpRequest.send("");
};
