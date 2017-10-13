/**
 * Global Variable Setting
 */
var S_QUESTION_ITEM_LIST_ID = "QUESTION_ITEM_LIST";

/**
 * onLoad Event
 */
jQuery(document).ready(function() {
  // 여러 기능 설정
  // PD_Utils.fnEventApply();
  PD_Grid.makeScreen("/js/admin/question-form2-layout.json", -1);
  fnSearch_QuestionItem();
});

/**
 * Resize Event
 */
jQuery(window).resize(function() {
  // 화면 컨텐츠 고정
   PD_GridUtils.fnFiexdGridResize(S_QUESTION_ITEM_LIST_ID);
});

/**
 * Search Button Click
 */
function fnSearch_QuestionItem() {
  var args = jQuery("#fmItemSearch").serialize();
  
  var request = new PD_Request();
  request.methods('ajax', {
    url : '/admin/items',
    method : 'GET',
    data : args,
//    progress : false,
    success : function(jsonData, result) {
      PD_GridData.setListData(S_QUESTION_ITEM_LIST_ID, jsonData, 'LIST');
      
      // 리스트 - Input 이벤트 설정
      fnInputEventSetting_QuestionItem();
    },
    error : function(request, status, error) {}
  });
}




/**
 * 목록에 ROW 추가
 * @returns
 */
function fnAddListRow_QuestionItem() {
  var listCnt = jQuery("#"+S_QUESTION_ITEM_LIST_ID+"_TBODY_LIST").find('tr').length;
  if(listCnt >= 30) {
    alert("등록가능한 수량을 초과 하였습니다.");
    return;
  }
  
  var jsonData  = new Array();
  var listRows  = new Array();
  var listData  = new Object();
  
  var rowIndex  = listCnt+1;
//  alert("rowIndex : " + rowIndex.toString());
  
  listData.rowNum       = rowIndex.toString();
  listData.sortNumber   = rowIndex.toString();
  listData.dbType       = "I";
  listRows.push(listData);
  
  jsonData['items']  = listRows;
  
  PD_GridData.addDataListJSON_HTML(S_QUESTION_ITEM_LIST_ID, jsonData);
  
  PD_GridUtils.setListCellValue(S_QUESTION_ITEM_LIST_ID, rowIndex, 'rowNum', listData.rowNum);
  
  // 리스트 - Input 이벤트 설정
  fnInputEventSetting_QuestionItem();
}

/**
 * 목록에 ROW 저장
 * @returns
 */
function fnSaveListRow_QuestionItem() {
  
  var jsonItemList = jQuery("#fmItemList").serializeFormJSONList();
  
  var args = {
      "questionSrl" : jQuery("#fmItemSearch #questionSrl").val(),
      "itemList" : jsonItemList
  };
  args = JSON.stringify(args);
  
  var request = new PD_Request();
  request.methods('ajax', {
    url : '/admin/items',
    method : 'POST',
    data : args,
    contentType : 'application/json',
//    progress : false,
    success : function(jsonData, result) {
      alert(JSON.stringify(jsonData));
      fnSearch_QuestionItem();
    },
    error : function(request, status, error) {}
  });
}

/**
 * 필드별 값 랜더링 - 수정 Input
 * @param arrParam
 * @returns {String}
 */
/*
function fnRender_input_QuestionItem(arrParam) {
  var id      = arrParam['id'].trim();
  var val     = arrParam['val'].trim();
  var rowIndex  = arrParam['rowIndex'];
  var rtnSb    = new StringBuilder();
  
  rtnSb.append(" <span style='white-space:normal;'>  ");
  rtnSb.append("   <input  type='text' name='"+id+"' id='"+id+rowIndex+"' value='"+val+"' title='수량' ");
  rtnSb.append("       data-maxSize='14' data-mask='num_int_abs' style='width:100%; height:18px; padding-right: 5px;'  ");
  rtnSb.append(" </span> ");
  
  return rtnSb.toString();
}
*/

/**
 * 필드별 값 랜더링 - 삭제버튼
 * @param arrParam
 * @returns {String}
 */
function fnRender_btnDelt_QuestionItem(arrParam) {
  var val     = arrParam['val'].trim();
  var rowIndex  = arrParam['rowIndex'];
  var rtnSb    = new StringBuilder();
  var id      = PD_Utils.fnGetUnique();
  
  rtnSb.append("<a class='btn_strpm' id='"+id+"' href='javascript:fnRowDelt_btnDelt_QuestionItem(\""+id+"\");'><span><i class='fa fa-minus-square'></i> 삭제</span></a> ");
  
  return rtnSb.toString();
}

/**
 * 필드별 값 랜더링 - 삭제버튼 클릭 - 삭제
 * @param arrParam
 * @returns {String}
 */
function fnRowDelt_btnDelt_QuestionItem(id) {
  var rowIndex  = jQuery('#'+id).closest('tr').index()+1;
  var dbType   = PD_GridUtils.getListCellValue(S_QUESTION_ITEM_LIST_ID, rowIndex, 'dbType').trim();
  
  if(dbType == 'I') {
    // ROW 삭제
    jQuery('#'+id).closest('tr').remove();
  }
  else {
    PD_GridUtils.setListCellValue(S_QUESTION_ITEM_LIST_ID, rowIndex, 'dbType', 'D');
    jQuery('#'+id).closest('tr').css("background-color", "#FFA0A0");
    //jQuery('#'+id).closest('tr').css("display", "none");
//    jQuery('#'+id).closest('tr').prop("disabled", true);
    jQuery('#'+id).closest('tr').find("input,button,textarea,select").prop('readonly', true);
    jQuery('#'+id).closest('tr').find("input,button,textarea,select").addClass('input_readonly');
  }
}

/**
 * 리스트 - Input 이벤트 설정
 * @returns {Boolean}
 */
function fnInputEventSetting_QuestionItem() {
  var listObj   = jQuery("#"+S_QUESTION_ITEM_LIST_ID+"_TBODY_LIST");
  var listCnt   = listObj.find('tr').length;
  if(listCnt > 0) {
    jQuery.each(listObj.find('tr'), function(keyIndex) {
      var _tr_this  = this;
      // 변경 이벤트 설정
      jQuery(_tr_this).find("td input[name='itemName'], td input[name='itemDescription'], td input[name='sortNumber']").unbind('keyup').keyup(function() {
        var rowIndex  = keyIndex+1;
        var dbType   = PD_GridUtils.getListCellValue(S_QUESTION_ITEM_LIST_ID, rowIndex, 'dbType').trim();
        
        // DB에서 불러온 값이 수정되었을시에 변경처리 해준다. V -> U
        if(dbType == 'V') {
          PD_GridUtils.setListCellValue(S_QUESTION_ITEM_LIST_ID, rowIndex, 'dbType', 'U');
        }
      });
    });
  }
}

/**
* Event Controller Function
*/
function fnCtrlFunction_QuestionItem(mode, listId, objVal) {
  var obj = eval(objVal)[0];
  
  switch (listId) {
   case S_QUESTION_ITEM_LIST_ID:
     if (mode == 'SORTING') {
       // 정렬
       jQuery('#fmItemSearch #orderBy').val(obj.colId + " " + obj.orderType);
       fnSearch_QuestionItem();
     }
     break;
   default:
     break;
  }
}