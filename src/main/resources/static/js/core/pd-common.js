/**
 * NAME : PD_Common.js
 * DESC : JQuery 함수 모음
 * VER  : 1.2
 * Copyright 2017 app Group All rights reserved
 * ============================================================================================
 *                변   경   사   항
 * ============================================================================================
 * VERSION    DATE    AUTHOR    DESCRIPTION
 * ============================================================================================
 * 1.0    2017.07.06    kang d.j  최초작성
 */

PD_Common = function() {
};

/**
 * Menu On
 */
PD_Common.fnMenuOn = function(parentObj, target, className) {
  this.fnRemoveClass(parentObj, className);
  target.addClass(className);
};

/**
 * Menu Out
 */
PD_Common.fnMenuOut = function(parentObj, targetClassName, className) {
  this.fnRemoveClass(parentObj, className);
  this.fnSetDefaultAction(parentObj, targetClassName, className);
};

/**
 * Menu Active
 */
PD_Common.fnMenuActive = function(activeId) {

  var a_obj = jQuery('#' + activeId);
  var li_obj = a_obj.parent().parent();

  a_obj.trigger('click');
  PD_Common.fnMenuOn(jQuery('div.navi_edge ul li'), li_obj, 'action');
};

/**
 * Remove Class
 */
PD_Common.fnRemoveClass = function(eachObject, className) {
  jQuery.each(eachObject, function(i) {
    jQuery(this).removeClass(className);
  });
};

/**
 * Default Menu Class
 */
PD_Common.fnSetDefaultAction = function(eachObject, targetClassName, className) {
  jQuery.each(eachObject, function() {
    if (jQuery(this).hasClass(targetClassName)) {
      jQuery(this).addClass(className);
      return false;
    }
  });
};

/**
 * ProgressBar OPEN
 */
PD_Common.openProgress = function(progressArea, progressText) {
  var progressArea = typeof progressArea != "undefined" ? progressArea : 'MAIN_CONTENTS';
  var progressText = typeof progressText != "undefined" ? progressText : '처리중입니다.';

//  show_loading(progressArea, progressText);
};

/**
 * ProgressBar CLOSE
 */
PD_Common.closeProgress = function(progressArea) {
  var progressArea = typeof progressArea != "undefined" ? progressArea : 'MAIN_CONTENTS';

//  hide_loading(progressArea);
};

/**
 * Browser Text Return
 */
PD_Common.getUserAgent = function() {

  if (navigator.userAgent.indexOf("MSIE") != -1)
    return "MSIE";
  else if (navigator.userAgent.indexOf("Trident") != -1)
    return "MSIE_11";
  else if (navigator.userAgent.indexOf("Firefox") != -1)
    return "Firefox";
  else if (navigator.userAgent.indexOf("Mozilla") != -1)
    return "Mozilla";
  else if (navigator.userAgent.indexOf("Opera") != -1)
    return "Opera";
  else if (navigator.userAgent.indexOf("Safari") != -1)
    return "Safari";
  else if (navigator.userAgent.indexOf("Mac") != -1)
    return "Mac";
  else
    return "undefine Browser";
}

/**
 * form data session check
 */
PD_Common.fnSessionCheck = function(_data) {

  return true;

  if (_data == 'NO_SESSION' || _data == '{"SESSION":"NO_SESSION"}') {
    alert("세션이 종료되었습니다.");
    PD_Common.fnOpenLayer({
      p_modal_id : 'POP_LOGIN',
      url : '/pt/ctl_pt_user/loginPage',
      width : 500,
      height : 250,
      title : '로그인',
      closeIcon : false,
      modal : true
    });
    return false;
  } else if (_data != null && _data['SESSION'] == 'NO_SESSION') {
    alert("세션이 종료되었습니다.");
    PD_Common.fnOpenLayer({
      p_modal_id : 'POP_LOGIN',
      url : '/pt/ctl_pt_user/loginPage',
      width : 500,
      height : 250,
      title : '로그인',
      closeIcon : false,
      modal : true
    });
    return false;
  } else if (_data == 'NO_AUTH_CONTRACT' || _data == '{"AUTH_CONTRACT":"NO_AUTH_CONTRACT"}') {
    alert("계약정보가 없습니다.\r\n\r\n관리자에게 문의하십시오.");
    return false;
  } else if (_data != null && _data['AUTH_CONTRACT'] == 'NO_AUTH_CONTRACT') {
    alert("계약정보가 없습니다.\r\n\r\n관리자에게 문의하십시오.");
    return false;
  } else if (_data == 'NO_AUTH_MENU' || _data == '{"AUTH_MENU":"NO_AUTH_MENU"}') {
    alert("메뉴에 대한 권한이 없습니다.\r\n\r\n관리자에게 문의하십시오.");
    return false;
  } else if (_data != null && _data['AUTH_MENU'] == 'NO_AUTH_MENU') {
    alert("메뉴에 대한 권한이 없습니다.\r\n\r\n관리자에게 문의하십시오.");
    return false;
  } else if (_data == 'CSRF' || _data == '{"CSRF":"CSRF_OCCURR"}') {
    alert("잘못된 접근입니다[CSRF or Session Hijacking].\r\n관리자에게 문의하십시오.");
    return false;
  } else if (_data != null && _data['CSRF'] == 'CSRF_OCCURR') {
    alert("잘못된 접근입니다[CSRF or Session Hijacking].\r\n관리자에게 문의하십시오.");
    return false;
  } else if (_data == 'SQL_INJECTION' || _data == '{"SQL_INJECTION":"SQL_INJECTION_OCCURR"}') {
    alert("전송할 수 없는 문자열이 포함되어있습니다.\r\n#';/*--\r\n\r\n관리자에게 문의하십시오.");
    return false;
  } else if (_data != null && _data['SQL_INJECTION'] == 'SQL_INJECTION_OCCURR') {
    alert("전송할 수 없는 문자열이 포함되어있습니다.\r\n#';/*--\r\n\r\n관리자에게 문의하십시오.");
    return false;
  } else {
    return true;
  }
};

/**
 * Screen List data scroll catch
 */
PD_Common.fnSetListDataScrollCatch = function(listId) {

  // chrome - css 적용 안되서 다시 박아줌
  var first_header = jQuery('#' + listId + '_TBL_LIST thead tr th').eq(0);
  first_header.attr('class', 'ctrl_resizes ui-resizable tbl_header');

  /*
   * if(jQuery("#"+listId+"_TBL_LIST_SCROLL").hasScrollBar().vertical) {
   * jQuery("#"+listId+"_TBL_LIST_HEADER_SCROLL").css('overflow-y', 'scroll'); }
   * else { jQuery("#"+listId+"_TBL_LIST_HEADER_SCROLL").css('overflow-y',
   * 'hidden'); }
   */
  // jQuery("#"+listId+"_TBL_LIST_HEADER_SCROLL").css('overflow-y', 'scroll');
  var interval_idx = 0;
  var b_load_ok = false;
  // 0.01초마다 반복 실행 (1000 : 1초)
  var interval_ScrollCatch = setInterval(function() {
    // console.log('interval_idx : ' + interval_idx);

    if (interval_idx++ > 5) {
      clearInterval(interval_ScrollCatch); // interval 함수 타이머 종료
    }

    if (jQuery("#" + listId + "_TBL_LIST_SCROLL").hasScrollBar().load) {
      if (!b_load_ok) {
        if (jQuery("#" + listId + "_TBL_LIST_SCROLL").hasScrollBar().vertical) {
          jQuery("#" + listId + "_TBL_LIST_HEADER_SCROLL").css('overflow-y', 'scroll');
          // document.getElementById(listId+"_TBL_LIST_HEADER_SCROLL").style.overflowY
          // = "scroll";
        } else {
          jQuery("#" + listId + "_TBL_LIST_HEADER_SCROLL").css('overflow-y', 'hidden');
        }

        // chrome - css 적용 안되서 다시 박아줌
        // jQuery("#"+listId+"_TBL_LIST_HEADER_SCROLL").html(jQuery("#"+listId+"_TBL_LIST_HEADER_SCROLL").html());
        // var first_header = jQuery('#'+listId+'_TBL_LIST thead tr th').eq(0);
        // first_header.attr('class', 'ctrl_resizes ui-resizable tbl_header');
        // first_header.attr('class', '');

        // chrome - css 적용 안되서 다시 박아줌
        first_header.attr('class', '');
      }

      b_load_ok = true;
      clearInterval(interval_ScrollCatch); // interval 함수 타이머 종료
    }
  }, 10);
};

/**
 * 탭 전환 공통
 */
PD_Common.fnTabActive = function( _this ) {

//  var _parent_tab_id = jQuery('#'+_tab_id).parent().parent().attr('id');
  var _parent_tab_id = jQuery(_this).parent().parent().attr('id');
  
//  jQuery('#'+_parent_tab_id+' > ul > li').removeClass('on');
//  jQuery('#'+_parent_tab_id+' > ul > li').removeClass('on');
  
  jQuery(_this).parent().find("li").each(function() {
    jQuery(this).removeClass('on');
  });
  
  
  jQuery(_this).addClass('on');
};

/**
 *  리스트 TR click bgcolor change - only one active
 **/
PD_Common.fnFirstTdClickEvent = function(listId, rowIndex) {
  
  jQuery("#"+listId+"_TBODY_LIST > tr").eq(rowIndex-1).find('td').eq(0).trigger('click');
};

/**
 * 그리드 환경설정 - 팝업
 **/
PD_Common.fnPopGridConfigSetting      = function(listId, xmlPath) {
  
  try {
    var url   = '/common/grid/pop-grid-config-setting';
    var args  = 'listId='+listId+'&xmlPath='+xmlPath;
    
    PD_Common.fnOpenLayer({url:url, data:args, method:'POST', width:600, height:480, title:'그리드 환경설정', id_return:true, modal:true, resizeX:false});
    //PD_Common.fnOpenLayer({url:url, data:args, method:'POST', width:600, height:480, title:'그리드 환경설정', id_return:true, modal:true, resizeX:false});
  }
  catch(e) {
    PD_Common.MsgBox("[PD_Common.fnListView] errMessage: " + e.message, 'E');
  }
};



/**
 * Layer Open
 */
PD_Common.fnOpenContent = function(url, id, param) {
  var layerId = (id != null && id != "" && typeof id != "undefined") ? id : 'ADMIN_CONTENTS';
  jQuery('#wrap').css('background', ''); // 임시

  var request = new PD_Request(); // new Object();
  request.methods('ajax', {
    url : url,
    data : param,
    method : 'GET',
    progress : false,
    async : true,
    mimeType : 'text/html', // text/json, text/xml, text/html
    success : function(_html, _result, _mimeType) {
      if (_result == 'success') {
        /*
         * var myDiv = document.createElement( 'div' ); myDiv.innerHTML = _html;
         */
        // jQuery('#MAIN_FRAME').html(_html).fadeIn(1000);
        jQuery('#' + layerId).html(_html);
        jQuery(window).scrollTop(0);
      }
    },
    error : function(request, status, error) {
      alert('ERROR');
      // PD_Utils.MsgBox(JSON.stringify(request), 'E');
    }
  });
};


/**
 * 메세지를 읽어서 리턴한다.  예)MsgBox("저장하시겠습니까?", "C", "N");
 */
PD_Common.MsgBox = function (msg, type, _options) {
  
  if(!type) type = "I";
  
  try {
  }
  catch(e){}

  var id  = PD_Utils.fnGetStringToUnicode(type+'_MSG_FRAME');

  switch(type) {
  case "C":
    var title     = "확인해주세요.";
    var dialog_style  = "";
    
    if(_options) {
      if(_options.title)
        title     = _options.title;
      
      if(_options.dialog_style)
        dialog_style  = _options.dialog_style;
      
      var div_sb  = new StringBuilder();
      div_sb.append(" <div class='modal_none_scroll fade' id='"+id+"' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true' style='margin-top:13%; z-index: 10001; -ms-overflow-y: hidden;'>  ");
      div_sb.append("     <div class='modal-dialog' style='"+dialog_style+"'> ");
      div_sb.append("         <div class='modal-content'> ");
      div_sb.append("             <div class='modal-header' id='"+id+"_MSG_HEADER'> ");
      div_sb.append("                 <button type='button' class='close' data-dismiss='modal' aria-hidden='true'>×</button>  ");
      div_sb.append("                 <h4 class='modal-title text-primary h4'><strong><i class='fa fa-exclamation-triangle'></i> <span id='"+id+"-header-title'>"+title+"</span></strong></h4>  ");
      div_sb.append("             </div>  ");
      div_sb.append("             <div class='modal-body confirm' id='"+id+"_body'> ");
      div_sb.append("                 <div id='sel_mall_send_main' class='doc-buttons' style='position: absolute; z-index: 1; left: 80; overflow: auto; height: 264px;'>  ");
      div_sb.append("                 </div>  ");
      div_sb.append("             </div>  ");
      div_sb.append("             <div class='modal-footer' style='margin-top:0px;padding:13px;'> ");
      div_sb.append("                 <button type='button' class='btn btn-primary btn-sm' id='"+id+"-ok-btn'>진행하기</button> ");
      div_sb.append("                 <button type='button' class='btn btn-default btn-sm' id='"+id+"-close-btn'>취소</button>  ");
      div_sb.append("             </div>  ");
      div_sb.append("         </div>  ");
      div_sb.append("     </div>  ");
      div_sb.append(" </div>  ");
      
      this.fnRemoveLayer(id);
      
      jQuery(div_sb.toString()).appendTo("body");
      
      jQuery('#'+id+'_body').html(msg);
      
      jQuery('#'+id+'-close-btn').unbind();
      jQuery('#'+id+'-ok-btn').unbind();

      jQuery('#'+id+'-close-btn').click(function() {
        jQuery('#'+id).modal('hide');
        jQuery('#'+id).remove();
        _options.callback.apply(null,  ['CANCEL']);
      });
      jQuery('#'+id+'-ok-btn').click(function() {
        jQuery('#'+id).modal('hide');
        jQuery('#'+id).remove();
        _options.callback.apply(null,  ['OK']);
      });
    }
    else {
      return confirm(msg);
    }

    break;
  case "I":
    var title     = "Information.";
    var dialog_style  = "";
    
    if(_options.title)
      title     = _options.title;
    
    if(_options.dialog_style)
      dialog_style  = _options.dialog_style;
    
    var div_sb  = new StringBuilder();
    div_sb.append(" <div class='modal_none_scroll fade' id='"+id+"' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true' style='margin-top:13%; z-index: 10001; -ms-overflow-y: hidden;'>  ");
    div_sb.append("     <div class='modal-dialog' style='"+dialog_style+"'> ");
    div_sb.append("         <div class='modal-content'> ");
    div_sb.append("             <div class='modal-header' id='"+id+"_MSG_HEADER'> ");
    div_sb.append("                 <button type='button' class='close' data-dismiss='modal' aria-hidden='true'>×</button>  ");
    div_sb.append("                 <h4 class='modal-title text-primary h4'><strong><i class='fa fa-exclamation-triangle'></i> <span id='"+id+"-header-title'>"+title+"</span></strong></h4>  ");
    div_sb.append("             </div>  ");
    div_sb.append("             <div class='modal-body confirm' id='"+id+"_body'> ");
    div_sb.append("                 <div id='sel_mall_send_main' class='doc-buttons' style='position: absolute; z-index: 1; left: 80; overflow: auto; height: 264px;'>  ");
    div_sb.append("                 </div>  ");
    div_sb.append("             </div>  ");
    div_sb.append("             <div class='modal-footer' style='margin-top:0px;padding:13px;'> ");
    div_sb.append("                 <button type='button' class='btn btn-default btn-sm' id='"+id+"-close-btn'>확인</button>  ");
    div_sb.append("             </div>  ");
    div_sb.append("         </div>  ");
    div_sb.append("     </div>  ");
    div_sb.append(" </div>  ");

    this.fnRemoveLayer(id);
    jQuery(div_sb.toString()).appendTo("body");

    jQuery('#'+id+'_body').html(msg);
    jQuery('#'+id+'-close-btn').unbind();
    jQuery('#'+id+'-close-btn').click(function() {
      if(_options) {
        jQuery('#'+id).modal('hide');
        _options.callback.apply(null,  ['OK']);
        jQuery('#'+id).remove();
      }
      else {
        jQuery('#'+id).modal('hide');
        jQuery('#'+id).remove();
      }
    });

    break;
  case "E":
    var title     = "ERROR.";
    var dialog_style  = "";
    
    if(_options.title)
      title     = _options.title;
    
    if(_options.dialog_style)
      dialog_style  = _options.dialog_style;
    
    var div_sb  = new StringBuilder();
    div_sb.append(" <div class='modal_none_scroll fade' id='"+id+"' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true' style='margin-top:13%; z-index: 10001; -ms-overflow-y: hidden;'>  ");
    div_sb.append("     <div class='modal-dialog' style='"+dialog_style+"'> ");
    div_sb.append("         <div class='modal-content'> ");
    div_sb.append("             <div class='modal-header' id='"+id+"_MSG_HEADER'> ");
    div_sb.append("                 <button type='button' class='close' data-dismiss='modal' aria-hidden='true'>×</button>  ");
    div_sb.append("                 <h4 class='modal-title text-primary h4'><strong><i class='fa fa-exclamation-triangle'></i> <span id='"+id+"-header-title' style='color:red;'>"+title+"</span></strong></h4> ");
    div_sb.append("             </div>  ");
    div_sb.append("             <div class='modal-body confirm' id='"+id+"_body'> ");
    div_sb.append("                 <div id='sel_mall_send_main' class='doc-buttons' style='position: absolute; z-index: 1; left: 80; overflow: auto; height: 264px;'>  ");
    div_sb.append("                 </div>  ");
    div_sb.append("             </div>  ");
    div_sb.append("             <div class='modal-footer' style='margin-top:0px;padding:13px;'> ");
    div_sb.append("                 <button type='button' class='btn btn-default btn-sm' id='"+id+"-close-btn'>확인</button>  ");
    div_sb.append("             </div>  ");
    div_sb.append("         </div>  ");
    div_sb.append("     </div>  ");
    div_sb.append(" </div>  ");

    this.fnRemoveLayer(id);
    jQuery(div_sb.toString()).appendTo("body");

    jQuery('#'+id+'_body').html(msg);

    jQuery('#'+id+'-close-btn').unbind();
    jQuery('#'+id+'-close-btn').click(function() {
      if(_options) {
        jQuery('#'+id).modal('hide');
        _options.callback.apply(null,  ['OK']);
        jQuery('#'+id).remove();
      }
      else {
        jQuery('#'+id).modal('hide');
        jQuery('#'+id).remove();
      }
    });

    break;
  }
  
  jQuery('#'+id).draggable({ cursor: "move", handle: '#'+id+'_MSG_HEADER' });
  jQuery('#'+id).modal({
    keyboard : false,
    backdrop : true
  });
};

/**
 *  Layer Open
 **/
PD_Common.fnOpenLayer = function(arrParams) {
  var p_modal_id  = arrParams['p_modal_id'];
  var title   = arrParams['title'];
  var header_title= arrParams['header_title'];
  var minus_top = arrParams['header_title'];
  var url     = arrParams['url'];
  var method   = arrParams['method'];
  var contents  = arrParams['contents'];
  var width   = parseInt(arrParams['width'], 10);
  var height    = parseInt(arrParams['height'], 10)+13;
  var padding   = arrParams['padding'];
  var id_return = arrParams['id_return'];
  var modal   = arrParams['modal'];
  var resize    = arrParams['resize'];
  var resizeX   = arrParams['resizeX'];
  var resizeY   = arrParams['resizeY'];
  var closeIcon = arrParams['closeIcon'];
  var closeRemove = arrParams['closeRemove'];
  var closeButton = arrParams['closeButton'];
  var appendDiv = 'body';
  var data    = arrParams['data'];
  // jQuery형식 파라메터로 변환
  if( data && typeof data !== "string" ) {
    data  = jQuery.param(data);
  }
  
  closeRemove = typeof closeRemove != "undefined" && (closeRemove==false || closeRemove=='false') ? false : true;
  minus_top = typeof minus_top == "undefined" || minus_top == '' ? 0 : minus_top;
  method = typeof method == "undefined" || method == '' ? 'POST' : method;
  
  
  var backdrop_z_index  = 1040;
  var frame_z_index   = 1041;
  
  if(typeof p_modal_id != "undefined" || p_modal_id == false) {
    var z_index = 0;
    
    if(p_modal_id == 'POP_LOGIN')
      z_index = 9999;
    else
      z_index = parseInt(jQuery('#'+p_modal_id+'_FRAME').css('z-index'), 10);
    
    backdrop_z_index  = z_index+1;
    frame_z_index   = z_index+2;
  }
  else {
    backdrop_z_index  = 1040;
    frame_z_index   = 1041;
  }
  
  var scrollHeight  = jQuery('body').prop("scrollHeight");
  
  var contentsClass = "width:"+(width-2)+"px; height:"+height+"px;";
  if(typeof padding != "undefined" || padding == false) {
    contentsClass += "padding:0;";
  }
  if(typeof resize != "undefined" || resize == false) {
    contentsClass += "overflow:hidden;";
  }
  else {
    contentsClass += "overflow:auto;";
  }
  
  if(typeof resizeX != "undefined" && resizeX == false) {
    contentsClass += "overflow-x:hidden;";
  }
  if(typeof resizeY != "undefined" && resizeY == false) {
    contentsClass += "overflow-y:hidden;";
  }
  
  var clientWidth = jQuery(window).width();
  var clientHeight= jQuery(window).height();
  var scrollTop = jQuery(this).scrollTop();   
  //var top     = (height - clientHeight > 0) ? 50 : (clientHeight-height)/2-15 + scrollTop;    
  var top     = (clientHeight-height-minus_top)/2-15 + scrollTop;
  var marginLeft  = -((parseInt(width, 10)/2)-15);
  
  var regExp    = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
  var layerKey  = title.replace(regExp, "");
  layerKey    = layerKey.substring(0, 25);
  var id      = PD_Utils.fnGetStringToUnicode(layerKey);
  var div_sb    = new StringBuilder();
  
  if(typeof header_title != "undefined" && header_title != "") {
    title   = header_title;
  }
  else {
    title   = "<font style='color:#3a3f51; font-weight: bold; font-size: 15px;'>"+title+"</font>";
  }
  
  /*
  console.log('height : ' + height + '     clientHeight : ' + clientHeight + '     scrollTop : ' + scrollTop);
  console.log('top : ' + top);
  */
  
  if(!closeRemove && jQuery('#'+id+'_FRAME').length > 0) {
    PD_Common.fnShowLayer(id);
  }
  else {
    if(modal) {
      div_sb.append(" <div class='modal-backdrop-mask in' id='"+id+"_FRAME_BACKDROP' style='z-index:"+backdrop_z_index+";'></div> ");
    }
    
    div_sb.append(" <div id='"+id+"_FRAME' class='modal_edge ' uid='"+id+"' style='z-index:"+frame_z_index+";'> ");
    div_sb.append("     <section class='panel panel-default as-r'>  ");
    
    if(typeof closeIcon != "undefined" && closeIcon == false) {
    }
    else {
      div_sb.append("     <a  id='search_close_layer'                     ");
      div_sb.append("       href='javascript:PD_Common.fnRemoveLayer(\""+id+"\", \""+closeRemove+"\");'     ");
      div_sb.append("       class='close_layer' >                     ");
      div_sb.append("       <img src='/image/common/btn_close_layer.png' alt='닫기'>    ");
      div_sb.append("     </a>                                ");   
    }
    
    div_sb.append("     <header class='panel-heading font-bold h5 h5 ne_drag' id='"+id+"_HEADER'>"+title+"</header> ");
    div_sb.append("     <div class='panel-body' style='"+contentsClass+"'>  ");
    div_sb.append("     <div id='"+id+"_CONTENTS'></div>        ");
    div_sb.append("     </div>                        ");
    
    if(typeof closeButton != "undefined" && closeButton) {
      div_sb.append("   <div class='modal-footer' id='pg-modal-footer' style='margin-top:0px;padding:12px;'>  ");
      div_sb.append("     <button type='button' class='btn btn-default btn-sm' id='pg-modal-close-btn'    ");
      div_sb.append("         onclick='javascript:PD_Common.fnRemoveLayer(\""+id+"\", \""+closeRemove+"\");'  ");
      div_sb.append("     >닫기</button>  ");
      div_sb.append("   </div>        ");
    }
    
    div_sb.append("     </section>                      ");
    div_sb.append(" </div>                          ");
    
    this.fnRemoveLayer(id, closeRemove);
    
    jQuery(div_sb.toString()).appendTo(appendDiv);
    
    jQuery('#'+id+'_FRAME').css('width',    width+'px');
    jQuery('#'+id+'_FRAME').css('height',   height+'px');
    jQuery('#'+id+'_FRAME').css('top',      top+'px');
    jQuery('#'+id+'_FRAME').css('margin-left',  marginLeft+'px');
    jQuery('#'+id+'_FRAME').css('display',    'inline');
    
    //드래그 시작 지점이 스크롤 이후 시점일 경우 버그 수정
    jQuery('#'+id+'_FRAME').draggable({ 
      cursor  : "move", 
      handle  : '#'+id+'_HEADER', 
      start : function (event, ui) {
        jQuery(this).data("startingScrollTop", jQuery('body').scrollTop());
      },
      drag  : function(event,ui) {
        var st = parseInt(jQuery(this).data("startingScrollTop"));       
        ui.position.top -= st;
      }
    });
    /*
    jQuery('#'+id+'_FRAME').resizable({
      maxWidth  : 1280,
      minWidth  : 50,
      maxHeight : 1280,
      minHeight : 50,
      animate   : false,
      start   : function(event, ui) {
      },
      stop: function(event,ui) {
      },
      resize  : function(event, ui) {
      }
    });
    */
    
    // contents가 있을 경우 contents로 내용을 채운다
    if (contents != undefined && contents != '') {
      jQuery('#'+id+'_CONTENTS').html(contents);
      jQuery('#'+id+'_FRAME').show();     
    }
    else {
      var args  = "";
      if(data == null) {
        alert("ININ");
        args  = 'pop_layer_id='+id;
      }
      else {
        args  = data + '&pop_layer_id='+id;
      }
      
//      alert("url : " + url + "\r\nargs : " + args);
      
      var request = new PD_Request(); // new Object();
      request.methods('ajax', {
        url     : url,
        method  : method,
        data    : args,
        progress  : false,
        mimeType  : 'text/html',  // text/json, text/xml, text/html
        success   : function(_html, _result, _mimeType) {
          if(_result == 'success') {
            
            jQuery('#'+id+'_CONTENTS').html(_html);
            jQuery('#'+id+'_FRAME').show();
            
            /*
            if(modal) {
              jQuery('#'+id+'_FRAME').modal({
                keyboard : false,
                backdrop : true
              });
            }
            */
    
            //jQuery('#'+id+'_FRAME').modal('hide');
          }
        },
        error   : function(request, status, error) {
          PD_Common.MsgBox(JSON.stringify(request), 'E');
        }
      });
    }
  }
  
  if(id_return && (id_return == "true" || id_return == true)) {
    return id;
  }
};

/**
 * 레이어팝업 닫기
 */
PD_Common.fnRemoveLayer = function(id, closeRemove) {
  
  closeRemove = typeof closeRemove != "undefined" && (closeRemove==false || closeRemove=='false') ? false : true;
  
  if(closeRemove) {
    jQuery('#'+id+'_FRAME').remove();
    jQuery('#'+id+'_FRAME_BACKDROP').remove();
  }
  else {
    jQuery('#'+id+'_FRAME').hide();
    jQuery('#'+id+'_FRAME_BACKDROP').hide();
  }
};

/**
 *  레이어팝업 보이기
 **/
PD_Common.fnShowLayer = function(id) {
  jQuery('#'+id+'_FRAME').show();
  jQuery('#'+id+'_FRAME').show();
  jQuery('#'+id+'_FRAME_BACKDROP').show();
};


/**
 * fnOpenLayer 기존 function 모달팝업으로 커스터마이징
 */
PD_Common.fnOpenLayerModal = function(url, id, modalId) {
  var targetId  = (id != null && id != "" && typeof id != "undefined") ? id : 'MAIN_CONTENTS';
  var request = new PD_Request(); // new Object();

  request.methods('ajax', {
    url     : url,
    data    : '',
    async   : false,
    mimeType  : 'text/html',  // text/json, text/xml, text/html
    success   : function(_html, _result, _mimeType) {
      if(_result == 'success') {        
        $('#'+targetId).html(_html);
        $('#'+modalId).show();
      }
    },    
    error   : function(request, status, error) {
      PD_Common.MsgBox(JSON.stringify(request), 'E');
    }
  });

  return id;
};


/**
 * SCROLL 포커스 이동
 * 
 * DESCRIPTION : multi select box에서 option move시 스크롤 포커스 이동
 */
PD_Common.fnMultiSelectBoxMoveScrollFocus = function(arrParams) {

  var optionHeight  = PD_Mask.fnNVL2(arrParams['optionHeight'], 10);
  var optionScale   = PD_Mask.fnNVL2(arrParams['optionScale'], 10);

  var focusIdx  = 0;
  if(arrParams['moveType'] == 'UP') {
    //focusIdx  = jQuery('#'+arrParams['id']+' option:selected').last().index();
    focusIdx  = jQuery('#'+arrParams['id']+' option:selected').first().index();
  }
  else if (arrParams['moveType'] == 'DOWN') {
    focusIdx  = jQuery('#'+arrParams['id']+' option:selected').first().index();
  }

  var scrollPos = optionHeight*(focusIdx-optionScale);
  jQuery('#'+arrParams['id']+'').scrollTop(scrollPos);
};












/*******************************************************************************
 * loading bar open, close
 */
function show_loading(_id, _msg) {

  if (typeof $("#ne_common_mask").css("display") == "undefined") {

    // 전체마스크
    if (_id == "") {
      $.isLoading({
            // text: "<br>"+_msg+" ",
            // tpl: '<span class="isloading-wrapper %wrapper%"><img
            // src="/trunk/img/load_b01_01.gif" width="150" height="13"
            // alt="로딩중">%text%</span>', // modify by psy. oader base Tag
            text : _msg + " ",
            tpl : '<span id="ne_common_mask" class="isloading-wrapper %wrapper%" style="border: 2px solid #000; padding:10px; color:#000; font-family: \'돋움\',dotum"><img src="/static/apps/img/comm/loading.gif" width="15px" height="15px" border="0"> %text%</span>',
            position : "overlay"
          });

      // 해당요소만
    } else {
      // 해당요소(Dom)만
      if (_id.indexOf("_DOM") > -1) {
        arry_new_id = _id.split("_DOM");
        _id = arry_new_id[0];
        $("#" + _id).isLoading({
          text : "<br>" + _msg + "<i class='%class% icon-spin'></i>",
          position : "inside",
          disableOthers : [ $("#" + _id) ]
        });

        // 해당요소만
      } else {
        $("#" + _id)
            .isLoading(
                {
                  text : _msg + " ",
                  tpl : '<span id="ne_common_mask"  class="isloading-wrapper %wrapper%" style="border: 2px solid #000; padding:10px; color:#000; font-family: \'돋움\',dotum"><img src="/static/apps/img/comm/loading.gif" width="15px" height="15px" border="0"> %text%</span>',
                  position : "overlay"
                });
      }
    }
  }
}

function hide_loading(_id) {
  // 전체마스크
  if (_id == "") {
    setTimeout(function() {
      $.isLoading("hide");
    }, 500);// 1000초 1초
  } else {
    // 해당요소(Dom)만
    if (_id.indexOf("_DOM") > -1) {
      arry_new_id = _id.split("_DOM");
      _id = arry_new_id[0];
      setTimeout(function() {
        $("#" + _id).isLoading("hide");
      }, 500);

    } else {
      setTimeout(function() {
        $("#" + _id).isLoading("hide");
      }, 500);
    }
  }
}



