/**
 * Global Variable Setting
 */
var glb_list_id   = "";
var glb_xml_path  = "";
var glb_pop_layer_id= "";


/**
 * onLoad Event
 */
jQuery(document).ready(function() {
  glb_list_id   = jQuery("#listId").val();
  glb_xml_path  = jQuery("#xmlPath").val();
  glb_pop_layer_id = jQuery("#pop_layer_id").val();
  
//  alert(glb_list_id + "\r\n" + glb_xml_path + "\r\n" + glb_pop_layer_id);
  
  // 필드항목 불러오기
  fnConfigFieldLoad();
  
  // Event 설정
  fnLayerEvent();
});

/**
 * 필드항목 불러오기
 */
function fnConfigFieldLoad() {
  
  var hd_fields     = PD_Storage.get(glb_list_id, 'list-fields');
  
  if(hd_fields) {
    // 셋팅된 값 있을때
    PD_Grid.fnGetXMLDocFields(glb_xml_path, "/page/area[@type='LIST']/list[@id='"+glb_list_id+"']/field", "fnConfigFieldLoad_CallBack");
  }
  else {
    // 셋팅된 값 없을때
    PD_Grid.fnGetXMLDocFields(glb_xml_path, "/page/area[@type='LIST']/list[@id='"+glb_list_id+"']/field", "fnConfigFieldReset_CallBack");
  }
}

/**
 * Event 설정
 * @returns
 */
function fnLayerEvent() {
  
  /**
   * 추가
   */
  jQuery("#btnConfigSettingAdd").on("click", function() {
    fnConfigFieldAdd();
  });
  
  /**
   * 삭제
   */
  jQuery("#btnConfigSettingDelt").on("click", function() {
    fnConfigFieldDelt();
  });
  
  
  /**
   * 초기화
   */
  jQuery("#btnConfigSettingReset").on("click", function() {
    fnConfigFieldReset();
  });
  
  /**
   * 위
   */
  jQuery("#btnConfigSettingUp").on("click", function() {
    fnConfigFieldUp();
  });
  
  /**
   * 아래
   */
  jQuery("#btnConfigSettingDown").on("click", function() {
    fnConfigFieldDown();
  });
  
  /**
   * 맨위
   */
  jQuery("#btnConfigSettingTop").on("click", function() {
    fnConfigFieldTop();
  });
  
  /**
   * 맨아래
   */
  jQuery("#btnConfigSettingBottom").on("click", function() {
    fnConfigFieldBottom();
  });
  
  /**
   * 적용
   */
  jQuery("#btnLayerPopApply").on("click", function() {
    fnConfigFieldApply();
  });
  
  /**
   * 취소
   */
  jQuery("#btnLayerPopCancel").on("click", function() {
    PD_Common.fnRemoveLayer(glb_pop_layer_id, true);
  });
}

/**
 *  필드항목 불러오기 - CALLBACK
 **/
function fnConfigFieldLoad_CallBack(jsonFields) {
  
  // 틀고정 고정필드 가져오기
  var fixed = PD_Mask.fnNVL2(PD_GridUtils.fnGetTheadFixd(glb_list_id), -1);
  
  // SELECT BOX 초기화
  PD_Select.removeAll('idGridFieldsLeft');
  PD_Select.removeAll('idGridFieldsRight');
  
  try {
    var hd_fields = PD_Storage.get(glb_list_id, 'list-fields');
    var arr_fields  = hd_fields.split(',');
    var arr_cnt   = arr_fields.length;
    
    if(arr_fields.length > jsonFields.length) {
      arr_cnt   = jsonFields.length;
    }
    
    // 사용항목
    for(var dis_idx=0; dis_idx<arr_cnt; dis_idx++) {
      var th_name   = jsonFields[arr_fields[dis_idx]].name;
      
      if(fixed == -1 && dis_idx == 0 ) {
        PD_Select.add('idGridFieldsRight', -1, '------------------ 틀고정 ------------------');
      }
      
      PD_Select.add('idGridFieldsRight',  arr_fields[dis_idx], th_name);  // 사용항목
      
      if(fixed == dis_idx) {
        PD_Select.add('idGridFieldsRight', -1, '------------------ 틀고정 ------------------');
      }
      
      //jsonFields[arr_fields[dis_idx]].setAttribute('use_field', 'Y');
      jsonFields[arr_fields[dis_idx]].use_field = 'Y';
    }
    
//    if(jQuery("#idGridFieldsRight > option[value=-1]").index() < 0) {
//      PD_Select.add('idGridFieldsRight', -1, '------------------ 틀고정 ------------------');
//    }
    
    // 전체항목
    for(var i=0; i<jsonFields.length; i++) {
      var th_width  = jsonFields[i].width;
      var th_name   = jsonFields[i].name;
      var use_field = PD_Mask.fnNVL2(jsonFields[i].use_field, 'N');
      
      if(use_field != 'Y') {
        if(th_width > 0) {
          PD_Select.add('idGridFieldsLeft', i, th_name);  // 전체항목
        }
      }
    }
  }
  catch(e) {
    PD_Common.MsgBox("[PD_Common.fnListView] errMessage: " + e.message, 'E');
  }
}

/**
 * 항목 초기화
 */
function fnConfigFieldReset() {
  
  // 필드값 가져와서 처리
  PD_Grid.fnGetXMLDocFields(glb_xml_path, "/page/area[@type='LIST']/list[@id='"+glb_list_id+"']/field", "fnConfigFieldReset_CallBack");
}

/**
 *  항목 초기화 -CALLBACK
 **/
function fnConfigFieldReset_CallBack(jsonFields) {
  
  // SELECT BOX 초기화
  PD_Select.removeAll('idGridFieldsLeft');
  PD_Select.removeAll('idGridFieldsRight');
  
  try {
    var arrSizeZeroFields = new Array();
    var arrSizeZeroIdx    = 0;
    
    for(var i=0; i<jsonFields.length; i++) {
//      alert(jsonFields[i].width);

      var th_width  = jsonFields[i].width;
      var th_name   = jsonFields[i].name;
      
      if(i == 4 ) {
        PD_Select.add('idGridFieldsRight', -1, '------------------ 틀고정 ------------------');
      }
      
      if(th_width > 0) {
//        PD_Select.add('idGridFieldsLeft', i, th_name);  // 전체항목
        PD_Select.add('idGridFieldsRight', i, th_name); // 사용항목
      }
      else {
        arrSizeZeroFields[arrSizeZeroIdx++] = {key:i, value:th_name};
      }
    }
    
    
//    if(jQuery("#idGridFieldsRight > option[value=-1]").index() < 0) {
//      PD_Select.add('idGridFieldsRight', -1, '------------------ 틀고정 ------------------');
//    }
    
    // FIELD 0인값 가져와서 셋팅
    /*
    jQuery.each(arrSizeZeroFields, function(key, data) {
      //console.log('key : ' + key + ' // data.key :' + data.key + ' // data.value :' + data.value);
      PD_Select.add('idGridFieldsLeft', data.key, data.value + ' (SIZE : 0)');
      PD_Select.add('idGridFieldsRight', data.key, data.value + ' (SIZE : 0)');
    });
    */
  }
  catch(e) {
    PD_Common.MsgBox("[PD_Common.fnListView] errMessage: " + e.message, 'E');
  }
}

/**
 * 필드항목 추가
 */
function fnConfigFieldAdd() {
  
  jQuery('#idGridFieldsLeft option:selected').remove().appendTo('#idGridFieldsRight');
  jQuery('#idGridFieldsLeft').scrollTop(0);
}

/**
 * 필드항목 제거
 */
function fnConfigFieldDelt() {
  var selectedRows  = jQuery('#idGridFieldsRight').val();
  if(!selectedRows ) {
    alert('삭제할 항목을 선택해 주세요.');
    return;
  }
  else {
    //PD_Select.removeUnit('idGridFieldsRight');
    /*
    var targetTo  = jQuery('#idGridFieldsLeft option:first');
    jQuery('#idGridFieldsRight option:selected').insertAfter(targetTo);
    */
    jQuery("#idGridFieldsRight > option[value=-1]").attr("selected", false);
    
    jQuery('#idGridFieldsRight option:selected').remove().appendTo('#idGridFieldsLeft');
    var top   = jQuery('#idGridFieldsLeft').position().top+jQuery('#idGridFieldsLeft').outerHeight(true);
    jQuery('#idGridFieldsLeft').scrollTop(top);
  }
}

/**
 * 필드항목 이동 - 위로
 */
function fnConfigFieldUp() {
  var arr_selected  = jQuery("#idGridFieldsRight").val();
  var lastPos     = -1;
  
  var continueBubble  = true;
  
  jQuery('#idGridFieldsRight option:selected').each( function() {
        var targetPos = jQuery('#idGridFieldsRight option').index(this) - 1;
        if(targetPos > -1 && continueBubble) {
          jQuery('#idGridFieldsRight option').eq(targetPos).before("<option value='"+jQuery(this).val()+"' selected='selected'>"+jQuery(this).text()+"</option>");
          jQuery(this).remove();
          
            //jQuery('#idGridFieldsRight').get(0).selectedIndex = targetPos;
        }
        else {
          continueBubble  = false;
        }
    });
  
  //jQuery("#idGridFieldsRight").val(arr_selected);
  PD_Common.fnMultiSelectBoxMoveScrollFocus({id:'idGridFieldsRight', moveType:'UP', optionHeight:16, optionScale:9});
}

/**
 * 필드항목 이동 - 아래로
 */
function fnConfigFieldDown() {
  var arr_selected  = jQuery("#idGridFieldsRight").val();
  var lastPos     = -1;
  
  var continueBubble  = true;
  
  var arr_obj = new Array();
  var arr_idx = 0;
  
  //alert(jQuery('#idGridFieldsRight option').options.length);
//  var countOptions = jQuery('#idGridFieldsRight option').size();
  var countOptions = document.getElementById("idGridFieldsRight").options.length;
  
  jQuery('#idGridFieldsRight option:selected').each( function() {
    arr_obj[arr_idx++]  = this;
    });
  
  for(var i=arr_obj.length-1; i>=0; i--) {
    var _this   = arr_obj[i];
    var targetPos = jQuery('#idGridFieldsRight option').index(_this) + 1;
        if(targetPos < countOptions && continueBubble) {
          jQuery('#idGridFieldsRight option').eq(targetPos).after("<option value='"+jQuery(_this).val()+"' selected='selected'>"+jQuery(_this).text()+"</option>");
          jQuery(_this).remove();
        
          //jQuery('#idGridFieldsRight').get(0).selectedIndex = targetPos;
        }
        else {
          continueBubble  = false;
        }
        
      if(lastPos == -1) {
        lastPos = targetPos;
      }
  }
  
  //jQuery("#idGridFieldsRight").val(arr_selected);
  PD_Common.fnMultiSelectBoxMoveScrollFocus({id:'idGridFieldsRight', moveType:'DOWN', optionHeight:16, optionScale:9});
}

/**
 * 필드항목 이동 - 맨위
 */
function fnConfigFieldTop() {
  var arr_selected  = jQuery("#idGridFieldsRight").val();
    var continueBubble  = true;
    
  jQuery('#idGridFieldsRight option:selected').each( function() {
    var chkPos    = jQuery('#idGridFieldsRight option').index(this) - 1;
    var targetPos = jQuery('#idGridFieldsRight option:first').index();
        if(chkPos > -1 && continueBubble) {
          jQuery('#idGridFieldsRight option').eq(targetPos).before("<option value='"+jQuery(this).val()+"' selected='selected'>"+jQuery(this).text()+"</option>");
          jQuery(this).remove();
        
          //jQuery('#idGridFieldsRight').get(0).selectedIndex = targetPos;
        }
        else {
          continueBubble  = false;
        }
    });
  
  /*
  jQuery('#idGridFieldsRight').scrollTop(0);
  */
  //jQuery("#idGridFieldsRight").val(arr_selected);
  PD_Common.fnMultiSelectBoxMoveScrollFocus({id:'idGridFieldsRight', moveType:'UP', optionHeight:16, optionScale:9});
}

/**
 * 필드항목 이동 - 맨아래
 */
function fnConfigFieldBottom() {
  var arr_selected  = jQuery("#idGridFieldsRight").val();
  var continueBubble  = true;
  
  var arr_obj = new Array();
  var arr_idx = 0;
  
//  var countOptions = jQuery('#idGridFieldsRight option').size();
  var countOptions = document.getElementById("idGridFieldsRight").options.length;
  
  jQuery('#idGridFieldsRight option:selected').each( function() {
    arr_obj[arr_idx++]  = this;
    });
  
  for(var i=arr_obj.length-1; i>=0; i--) {
    var _this   = arr_obj[i];
    var chkPos    = jQuery('#idGridFieldsRight option').index(_this) + 1;
    var targetPos = jQuery('#idGridFieldsRight option:last').index();
    
        if(chkPos < countOptions && continueBubble) {
          jQuery('#idGridFieldsRight option').eq(targetPos).after("<option value='"+jQuery(_this).val()+"' selected='selected'>"+jQuery(_this).text()+"</option>");
          jQuery(_this).remove();
        
          //jQuery('#idGridFieldsRight').get(0).selectedIndex = targetPos;
        }
        else {
          continueBubble  = false;
        }
  }
  
  /*
  var top   = jQuery('#idGridFieldsRight').position().top+jQuery('#idGridFieldsRight').outerHeight(true);
  jQuery('#idGridFieldsRight').scrollTop(top);
  */
  //jQuery("#idGridFieldsRight").val(arr_selected);
  PD_Common.fnMultiSelectBoxMoveScrollFocus({id:'idGridFieldsRight', moveType:'DOWN', optionHeight:16, optionScale:9});
}

/**
 * 그리드 환경설정 적용
 */
function fnConfigFieldApply() {
  
  if(PD_Select.length('idGridFieldsRight') > 0) {
    
    if(!PD_Common.MsgBox("[알 림]\r\n환경설정 반영 후 새로고침을 하셔야합니다.\n그리드 환경설정을 적용하시겠습니까?", "C")) {
      return;
    }
    
    var fixed = jQuery("#idGridFieldsRight > option[value=-1]").index();
    fixed = fixed-1;
    
    // 스토리지 저장 - 틀고정 값
    PD_Storage.set(glb_list_id, fixed, 'list-fixed');
    
    var fields_sb   = new StringBuilder();
    jQuery('#idGridFieldsRight').find('option').each(function(idx) {
      if(jQuery(this).val() != -1) {
        if(fields_sb.length() > 1) {
          fields_sb.append(',');
        }
        
        fields_sb.append(jQuery(this).val());
      }
    });
    
    // 스토리지 저장 - 필드 값
    PD_Storage.set(glb_list_id, fields_sb.toString(), 'list-fields');
    
    // 설정된 페이징 스케일 임시저장
    var pageLimit = jQuery('#'+glb_list_id+'_pageLimit').val();
    
    // 화면 다시 그리기
    //var fixed = PD_Mask.fnNVL2(PD_GridUtils.fnGetTheadFixd(glb_list_id), -1);
    
    fixed = PD_Mask.fnNVL2(fixed, -1);
    
    PD_Grid.makeScreen(glb_xml_path, fixed);
    PD_GridUtils.fnListView('LIST', glb_list_id, true);
    
    // 설정된 페이징 스케일 임시저장
    jQuery('#'+glb_list_id+'_pageLimit').val(pageLimit);
    
    if(typeof reloadSelf != "undefined") {
      //reloadSelf();
    }
    
    PD_Common.fnRemoveLayer(glb_pop_layer_id, true);
  }
  /*
  if(PD_Select.length('idGridFieldsRight') > 0) {
    
    PD_Common.MsgBox("[알 림]\r\n<p>환경설정 반영 후 새로고침을 하셔야합니다.</p><p>그리드 환경설정을 적용하시겠습니까?</p>", "C", {
      callback  : function(_result) {
        if(_result == 'OK') {
          var fixed = jQuery("#idGridFieldsRight > option[value=-1]").index();
          fixed = fixed-1;
          
          // 스토리지 저장 - 틀고정 값
          PD_Storage.set(glb_list_id, fixed, 'list-fixed');
          
          var fields_sb   = new StringBuilder();
          jQuery('#idGridFieldsRight').find('option').each(function(idx) {
            if(jQuery(this).val() != -1) {
              if(fields_sb.length() > 1) {
                fields_sb.append(',');
              }
              
              fields_sb.append(jQuery(this).val());
            }
          });
          
          // 스토리지 저장 - 필드 값
          PD_Storage.set(glb_list_id, fields_sb.toString(), 'list-fields');
          
          // 설정된 페이징 스케일 임시저장
          var pageLimit = jQuery('#'+glb_list_id+'_pageLimit').val();
          
          // 화면 다시 그리기
          //var fixed = PD_Mask.fnNVL2(PD_GridUtils.fnGetTheadFixd(glb_list_id), -1);
          
          fixed = PD_Mask.fnNVL2(fixed, -1);
          
          PD_Grid.makeScreen(glb_xml_path, fixed);
          PD_GridUtils.fnListView('LIST', glb_list_id, true);
          
          // 설정된 페이징 스케일 임시저장
          jQuery('#'+glb_list_id+'_pageLimit').val(pageLimit);
          
          if(typeof reloadSelf != "undefined") {
            //reloadSelf();
          }
          
          PD_Common.fnRemoveLayer(glb_pop_layer_id, true);
        }
        else if(_result == 'CANCEL') {
//          alert("CANCEL");
        }
      }
    });
  }
  */
}