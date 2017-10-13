/**
 * Global Variable Setting
 */
var S_LIST_ID = "SURVEY_LIST";

/**
 * onLoad Event
 */
jQuery(document).ready(function() {
  // 여러 기능 설정
  // PD_Utils.fnEventApply();
  
  PD_Grid.makeScreen("/js/admin/survey-list-layout.json", -1);
  
  fnEventApply();
  
  fnSearch();
});

/**
 * Resize Event
 */
jQuery(window).resize(function() {
  // 화면 컨텐츠 고정
   PD_GridUtils.fnFiexdGridResize(S_LIST_ID);
});

/**
 * Event Apply
 * @returns
 */
function fnEventApply() {
  // 조회 클릭
  jQuery("#fmSrch #btnSearch").on("click", function() {
    fnSearch();
  });
  
  // 엔터키 이벤트
  jQuery('#fmSrch #srchText').on('keypress', function(e) {
    if (e.which == 13) {
      fnSearch();
      return false;
    }
  });
}

/**
 * Search Button Click
 */
function fnSearch() {
  var args = jQuery("#fmSrch").serialize();
  var request = new PD_Request();
  request.methods('ajax', {
    url : '/admin/surveys',
    method : 'GET',
    data : args,
//    progress : false,
    success : function(jsonData, result) {
      PD_GridData.setListData(S_LIST_ID, jsonData, 'LIST');
      
      // 첫번째 ROW 선택
      if(parseInt(jsonData["totalCount"], 10) > 0) {
        //PD_Common.fnFirstTdClickEvent(S_LIST_ID, 1);
        PD_GridUtils.fnTrActiveOne(S_LIST_ID, 1);
//        fnList_onClick(S_LIST_ID, "remark", 1, 2);
        
        var surveySrl = PD_GridUtils.getListCellValue(S_LIST_ID, 1, 'surveySrl');
        var params = {surveySrl:surveySrl};
        fnTabClick_SurveyMang({topClass:'frame-right', params:params});
      }
      else {
        var params = {};
        //var surveySrl = PD_GridUtils.getListCellValue(listId, rowIndex, 'surveySrl');
        fnTabClick_SurveyMang({topClass:'frame-right', params:params});
      }
    },
    error : function(request, status, error) {
      // PD_Utils.MsgBox(JSON.stringify(request), "E"); // (C:Confirm-확인/취소버튼,
      // I:Information-확인, E:Error-확인버튼)
    }
  });
}

// ######################################################## LIST EVENT STARTE
/**
 * Event Controller Function
 */
function fnCtrlFunction(mode, listId, objVal) {
  var obj = eval(objVal)[0];

  switch (listId) {
    case S_LIST_ID:
      if (mode == 'PAGING') {
        // 페이징
        jQuery('#fmSrch #pageNumber').val(obj.pageNumber);
        fnSearch();
      } else if (mode == 'PAGING_LIMIT') {
        // 한페이지 레코드 수
        jQuery('#fmSrch #pageNumber').val('1');
        jQuery('#fmSrch #pageLimit').val(obj.pageLimit);
        fnSearch();
      } else if (mode == 'SORTING') {
        // 정렬
        jQuery('#fmSrch #orderBy').val(obj.colId + " " + obj.orderType);
        
        fnSearch();
      } else if (mode == 'LIST_CLICK') {
        // LIST 클릭
        fnList_onClick(obj.listId, obj.colId, obj.rowIndex, obj.colIndex);
      } else if (mode == 'LIST_DBCLICK') {
        // LIST 더블클릭
        fnList_onDbClick(obj.listId, obj.colId, obj.rowIndex, obj.colIndex);
      }
  
      break;
    default:
      break;
  }
}

/**
 * LIST Click Event
 */
function fnList_onClick(listId, colId, rowIndex, colIndex) {
  switch (listId) {
    case S_LIST_ID:
      var surveySrl = PD_GridUtils.getListCellValue(listId, rowIndex, 'surveySrl');
      var params = {surveySrl:surveySrl};
      fnTabClick_SurveyMang({topClass:'frame-right', params:params});
      break;
    default:
      break;
  }
}

/**
 * LIST Double Click Event
 */
function fnList_onDbClick(listId, colId, rowIndex, colIndex) {

  switch (listId) {
  case S_LIST_ID:

    break;
  default:
    break;
  }
}