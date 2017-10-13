/**
 * Global Variable Setting
 */
var S_LIST_ID = "MEMBER_GRID";

/**
 * onLoad Event
 */
jQuery(document).ready(function() {
  // 여러 기능 설정
  // PD_Utils.fnEventApply();

  // 화면 컨텐츠 고정
  // PD_GridUtils.fnScreenTableResize(S_LIST_ID);
  
  // 틀고정 고정필드 가져오기
   var fixed = PD_GridUtils.fnGetTheadFixd(S_LIST_ID);
  fixed = fixed > -1 ? fixed : 2; // 틀고정
  
  PD_Grid.makeScreen("/js/admin/mssql3-member-list-layout.json", fixed);
  
  // 틀고정 콤보박스 선택
  // PD_GridUtils.fnSetComboTheadFixd(S_LIST_ID, fixed);
  
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
 * Search Button Click
 */
function fnSearch() {
  var args = jQuery("#fmSrch").serialize();
  var request = new PD_Request();
  request.methods('ajax', {
    url : '/admin/mssql3-members',
    method : 'GET',
    data : args,
//    progress : false,
    success : function(jsonData, result) {
//      alert(JSON.stringify(jsonData));
      PD_GridData.setListData(S_LIST_ID, jsonData, 'LIST');
      
      // 첫번째 ROW 선택
//      if(parseInt(jsonData["totalCount"], 10) > 0) {
//        //PD_Common.fnFirstTdClickEvent(S_LIST_ID, 1);
//        fnList_onClick(S_LIST_ID, "remark", 1, 2);
//      }
//      else {
//        var params = {};
//        //var mssql3MemberSrl = PD_GridUtils.getListCellValue(listId, rowIndex, 'mssql3MemberSrl');
//        fnTabClick_TargetMang({type:'target-form1', params:params});
//      }
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
    } else if (mode == 'CHECK_ALL') {
      // 체크박스 전체

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
    // alert('111111');
    // 체크박스 체크!
//    if (PD_GridUtils.fnIsTrActive(listId, rowIndex)) {
//      jQuery('#fmSrch #chk' + rowIndex).attr('checked', true);
//    } else {
//      jQuery('#fmSrch #chk' + rowIndex).attr('checked', false);
//    }

//    var product_cd = PD_GridUtils.getListCellValue(listId, rowIndex, 'product_cd');
//
//    if (colId == 'product_name') { // 수정
//      fnModify(product_cd);
//    }
      PD_GridUtils.fnTrActiveOne(listId, rowIndex);
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