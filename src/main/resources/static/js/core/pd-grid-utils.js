/**
 * NAME : PD_GridUtils.js
 * DESC : 공통함수 모음
 * VER  : 1.0
 * Copyright 2015 덕준님 Group All rights reserved
 * ============================================================================================
 *                변   경   사   항
 * ============================================================================================
 * VERSION    DATE    AUTHOR    DESCRIPTION
 * ============================================================================================
 * 1.0    2015.03.16    kang d.j  최초작성
 */

PD_GridUtils = function() {
};

/**
 * 리스트 TR Hover Event
 */
PD_GridUtils.fnTrHover = function(listId) {

};

/**
 * 리스트 TR Click Event
 */
PD_GridUtils.fnTrClick = function(listId) {

  var objTblBox = PD_GridUtils.getObject(listId + "_TBL_LIST_BOX");
  var activeBgType = null;

  try {
    // 호출중에 창 닫으면 에러발생 대응
    activeBgType = objTblBox.getAttribute("activeBgType");
  } catch (e) {
//    console.log("PD_GridUtils.fnTrClick Exception[message] : " + e);
    return;
  }

  jQuery('#' + listId + '_TBODY_FIXED > tr > td, #' + listId + '_TBODY_LIST > tr > td').click(function() {
    var idx = jQuery(this).closest('tr').index() + 1;
    
    if (activeBgType && activeBgType == 'NONE') {
      
    }
    else if (activeBgType && activeBgType == 'MULTI') {
      PD_GridUtils.fnTrActive(listId, idx);
    }
    else {
      PD_GridUtils.fnTrActiveOne(listId, idx);
    }
  });
};

/**
 *  리스트 TR click bgcolor change - only one active
 **/
PD_GridUtils.fnTrActiveOne = function(listId, rowIndex) {

  jQuery("#"+listId+"_TBODY_LIST > tr").each(function(i){
    var idx     = i+1;

    if(idx == rowIndex) {
      PD_GridUtils.fnTrActive(listId, idx, '#ebf6f8');
    }
    else {
      PD_GridUtils.fnTrActive(listId, idx, '');
    }
  });
};

/**
 * 리스트 TR click bgcolor change
 */
PD_GridUtils.fnTrActive = function(listId, rowIndex, bgColor) {

  var fixed_obj = PD_GridUtils.getObject(listId + "_TBL_TBODY_FIXED");
  var list_obj = PD_GridUtils.getObject(listId + "_TBL_TBODY_LIST");
  var activeColor = '#ebf6f8';
  var color = '';

  if (typeof bgColor != "undefined") {
    color = bgColor;
  } else {
    if (list_obj.rows[rowIndex].bgColor.toLowerCase() == activeColor)
      color = '';
    else
      color = activeColor;
  }
  
  if (fixed_obj) {
    fixed_obj.rows[rowIndex].bgColor = color;
  }
  
//  console.log('color : ' , color);
  list_obj.rows[rowIndex].bgColor = color;
//  console.log('list_obj.rows[rowIndex].bgColor : ' , color);
};

/**
 * 리스트 TR Click Event
 */
PD_GridUtils.fnIsTrActive = function(listId, rowIndex) {
  var list_obj = PD_GridUtils.getObject(listId + "_TBL_TBODY_LIST");
  var activeColor = '#ebf6f8';

  if (list_obj.rows[rowIndex].bgColor != activeColor) {
    return true;
  } else {
    return false;
  }
};

/**
 * 객체ID를 받아서 object로 넘긴다.
 */
PD_GridUtils.getObject = function(objID) {
  if (objID == "undefined")
    return;

  if (document.all && document.all(objID)) {
    // alert(1);
    return document.all(objID);
  } else if (document.getElementById && document.getElementById(objID)) {
    // alert(2);
    return document.getElementById(objID);
  }
  /*
   * else if(document.layers && document.layers[objID]) { //alert(3); return
   * document.layers[objID]; }
   */
  else {
    return false;
  }
}

/**
 * header class change
 */
PD_GridUtils.fnHeaderOver = function(obj, listId) {
  // obj.className = "ctrl_resizes ui-resizable tbl_header";
  obj.className = "ctrl_resizes ui-resizable";
  PD_GridUtils.fnInitTableResize(listId);
}

/**
 * header class clean
 */
PD_GridUtils.fnHeaderOut = function(obj, listId) {
  obj.className = "";
  PD_GridUtils.fnInitTableResize(listId);
}

/**
 * ID에 꽂아 넣기
 */
PD_GridUtils.fnSetInnerHTML = function(id, html) {
  jQuery("#" + id).html(html).trigger("create"); // css 적용

  $("#wrap").css("overflow", "auto");
};

/**
 * ID에 꽂아 넣기
 */
PD_GridUtils.fnAddInnerHTML = function(id, html) {
  /*
   * jQuery("#"+id).html(html).trigger("create"); // css 적용
   * $("#wrap").css("overflow","auto");
   */
  jQuery("#" + id).append(html);
};

/**
 * 리스트 헤더 정렬
 */
PD_GridUtils.fnHeaderSort = function(hdId) {
  var obj = jQuery("#" + hdId);

  // alert("sort : " + sort + "\r\norderType : " + orderType + "\r\ncolId : " +
  // colId);
  if (obj.hasClass('fa-sort')) {
    obj.removeClass('fa-sort').addClass('fa-sort-asc');
    return "ASC";
  } else if (obj.hasClass('fa-sort-desc')) {
    obj.removeClass('fa-sort-desc').addClass('fa-sort-asc');
    return "ASC";
  } else {
    obj.removeClass('fa-sort-asc').addClass('fa-sort-desc');
    return "DESC";
  }
};

/**
 * init table header resize
 */
PD_GridUtils.fnInitTableResize = function(listId) {

  // 박스 안 요소중 테이블 리사이징
  // jQuery('.table-resizes > thead > tr > th').addClass('resizes');
  // jQuery('.table-resizes > thead > tr > th').addClass('ctrl_resizes');
  // 요소 리사이징

  // jQuery('#ctrl_'+listId+' .ctrl_resizes').resizable("destroy");

  jQuery('#ctrl_' + listId + ' .ctrl_resizes').resizable({
    maxWidth : 700,
    minWidth : 50,
    maxHeight : 250,
    minHeight : 50,
    animate : false,
    start : function(event, ui) {
      var clon_id = jQuery(this).attr('clon');
      var ui_width = parseFloat(ui.size.width);
      var clon_width = parseFloat(jQuery('[clon=header_' + clon_id + ']').width());

      /*
       * console.log('start ==> this.dividingRate : ' + this.dividingRate);
       * console.log('start ==> ui_width : ' + ui_width); console.log('start ==>
       * clon_width : ' + clon_width);
       */

      if (ui_width > clon_width + 50) {
        this.dividingRate = ui_width / clon_width;
      } else {
        this.dividingRate = 1;
      }
    },
    stop : function(event, ui) {
    },
    resize : function(event, ui) {
      var clon_id = jQuery(this).attr('clon'); // cu1, cu2
      var ui_width = parseFloat(ui.size.width);

      if (clon_id) {
        var fixed_flag = false;
        jQuery('#' + listId + '_TBL_FIXED > thead > tr > th').each(function() {
          if (jQuery(this).attr('clon') == clon_id) {
            fixed_flag = true;
          }
        });

        if (fixed_flag) {
          var before_width = parseFloat(jQuery('[clon=data_header_' + clon_id + ']').width());
          var list_width = parseFloat(jQuery('#' + listId + '_FIXED_COL').width());
          var plus_width = ui_width - before_width;
          list_width = list_width + plus_width;
          list_width = list_width + PD_Grid.fiexd_padding_width;

          // console.log('list_width : ' + list_width);
          jQuery('#' + listId + '_FIXED_COL').width(list_width);

          PD_GridUtils.fnFiexdGridResize(listId);
        }

        /*
         * console.log("this.dividingRate : " + this.dividingRate);
         */
        ui_width = Math.round(ui_width / this.dividingRate);

        jQuery('[clon=header_' + clon_id + ']').width(ui_width);
        jQuery('[clon=data_header_' + clon_id + ']').width(ui_width);
      }

      // PD_GridUtils.fnScreenTableResize(listId);
    }
  });
  jQuery('.ui-resizable-se').hide();
  jQuery('.ui-resizable-s').hide();
};

/**
 * Fiexd Grid resize
 */
PD_GridUtils.fnFiexdGridResize = function(listId, listMargin) {
  var listMargin    = (listMargin == null || listMargin == 'null' || typeof listMargin == "undefined" || listMargin == '') ? 0 : listMargin;
  var screen_width  = jQuery('#ctrl_'+listId).width();
//  var fixed_width   = parseInt(jQuery('#'+listId+'_FIXED_COL').attr('width'), 10);
  var fixed_width   = parseFloat(PD_Mask.fnReplaceStr(jQuery('#'+listId+'_FIXED_COL').css('width'), 'px', ''));
//  alert(fixed_width);
  // 일단!!!!!!
  fixed_width += PD_Grid.fiexd_padding_width;
//  fixed_width -= PD_Grid.fiexd_padding_width;
  
//  alert(fixed_width);
  
  if(screen_width == 0 || !screen_width) {
    screen_width  = jQuery(window).width()-PD_Grid.quick_menu_width;
  }
  else {
    screen_width  = screen_width; // 여백
  }
  
//  console.log('####### screen_width : ' + screen_width);
  
  var minus_width   = fixed_width == 0 ? PD_Grid.fiexd_padding_width : 4;
  var scroll_width  = screen_width-fixed_width-minus_width-listMargin;
  scroll_width    = scroll_width + 2;
  
  jQuery('#FIEXD_GRID_TBL_LIST_HEADER_SCROLL').css('width', scroll_width+'px');
  jQuery('#FIEXD_GRID_TBL_LIST_SCROLL').css('width', scroll_width+'px');
};

/**
 * Screen Table resize
 */
PD_GridUtils.fnScreenTableResize = function(id) {
  var clientWidth = jQuery(window).width();

  var width = clientWidth;
  // Help에 사용되는 그리드에서 사용됨
  // 크기가 1300 이하 일경우 그리드가 축소가 아닌 가려지게 만듬
  if (width < 1270) {
    width = 1270;
  }

  var fixed_div = jQuery("#" + id + "_TBL_FIXED");
  // var table_div_width = parseInt(jQuery("#ctrl_"+id).width(), 10);
  var fixed_div_width = typeof fixed_div != "undefined" ? fixed_div.width() : 0;
  var minus_width = fixed_div_width == null || fixed_div_width == 0 || typeof fixed_div_width != "undefined" ? 37 : 35;
  var quick_width = 80;

  var width = width - fixed_div_width - minus_width - quick_width;
  var width = width + 2;

  jQuery("#ctrl_" + id).find('#' + id + '_TBL_LIST_HEADER_SCROLL').css('width', width + "px");
  jQuery("#ctrl_" + id).find('#' + id + '_TBL_LIST_SCROLL').css('width', width + "px");
};

/**
 * Screen Table Resizable Event
 */
PD_GridUtils.fnSetResizableEvent = function(listId) {

  jQuery('#' + listId + '_LIST_RESIZABLE_BAR').fnDragBarMoveEvent({
    type : 'grid_bottom_bar',
    id : listId
  });
  return;

  // jQuery( "#idResizable" ).resizable();
  jQuery("#" + listId + "_LIST_RESIZABLE").draggable({
    // jQuery( "#"+listId+"_LIST_RESIZABLE_BAR" ).draggable({
    cursor : "ns-resize", // move
    axis : "y",
    // zIndex : "10000",
    scroll : true,
    start : function(event, ui) {
      var offset = jQuery(this).offset();

      this.beforePosY = parseFloat(offset.top);
      // this.beforeGridHeight =
      // parseFloat(PD_Mask.fnReplaceStr(jQuery("#"+listId+"_TBL_LIST_SCROLL").css('height'),
      // 'px', ''));
      this.beforeGridHeight = parseFloat(jQuery("#" + listId + "_TBL_LIST_SCROLL").height(), 10);

      $(this).data("startingScrollTop", $(this).parent().scrollTop());
    },
    drag : function(event, ui) {
      // var st = parseInt($(this).data("startingScrollTop"));
      // ui.position.top -= $(this).parent().scrollTop() - st;

      var gridTop = parseFloat(jQuery("#ctrl_" + listId).offset().top);
      var offset = jQuery(this).offset();
      var afterPosY = parseFloat(offset.top);
      var changePos = afterPosY - this.beforePosY;
      var changeHeight = this.beforeGridHeight + changePos;

      // console.log("gridTop >> " + jQuery( "#"+listId+"_LIST_RESIZABLE_BAR"
      // ).css('top'));
      // console.log("css('top') >> " + jQuery( "#"+listId+"_LIST_RESIZABLE_BAR"
      // ).css('top'));

      console.log("gridTop >> " + gridTop);
      console.log("afterPosY >> " + afterPosY);
      console.log("this.beforePosY >> " + this.beforePosY);
      // console.log("offset().top >> " + jQuery("#ctrl_"+listId).offset().top);
      console.log("offset().top >> " + jQuery("#" + listId + "_LIST_RESIZABLE_BAR").offset().top);
      console.log("=====================================================================");

      // 그리드 TOP 보다 높아지면 return;
      if (afterPosY < (gridTop + 200)) {

        // jQuery( "#"+listId+"_LIST_RESIZABLE" ).css('top',
        // this.beforePosY+'px');
        // return false;

        console.log("============================= IN STARTED ========================================");
        console.log("this.beforePosY >> " + this.beforePosY);
        console.log("============================= IN ENDED ========================================");

        jQuery("#" + listId + "_LIST_RESIZABLE").attr('style', 'top:' + this.beforePosY + 'px;');
        jQuery("#" + listId + "_LIST_RESIZABLE").css('top', this.beforePosY + 'px;');

        jQuery("#" + listId + "_TBL_FIXED_SCROLL").height(this.beforeGridHeight);
        jQuery("#" + listId + "_TBL_LIST_SCROLL").height(this.beforeGridHeight);
      } else {
        // var changePos =
        // afterPosY-this.beforePosY-jQuery(document).scrollTop();

        jQuery("#" + listId + "_TBL_FIXED_SCROLL").height(changeHeight);
        jQuery("#" + listId + "_TBL_LIST_SCROLL").height(changeHeight);

        // console.log('@@@@@@@@@@@@@@@@@@@@@@@@@ changeGridHeight : ' +
        // changeHeight);
        // console.log('>>>>>>>>>>>>>>>>>>>>>> this.scrollTop : ' +
        // jQuery("#"+listId+"_TBL_LIST_SCROLL").scrollTop());
        // console.log('>>>>>>>>>>>>>>>>>>>>>> document.scrollTop : ' +
        // jQuery(document).scrollTop());

        // jQuery("#"+listId+"_TBL_FIXED_SCROLL").css('height',
        // changeHeight+'px');
        // jQuery("#"+listId+"_TBL_LIST_SCROLL").css('height',
        // changeHeight+'px');

        // console.log('>>>>>>>>>>>>>> gridTop : ' + gridTop);
        // console.log('>>>>>>>>>>>>>> offset.top : ' + offset.top);

        // //var gridHeight = parseFloat((offset.top-gridTop), 10)+'px';
        // //var gridHeight = Math.ceil(offset.top-gridTop)+'px';
        // var gridHeight = (offset.top-gridTop)+'px';
        // console.log('>>>>>>>>>>>>>>>>>>>>>>>> gridHeight : ' + gridHeight);

        // // jQuery("#"+listId+"_TBL_FIXED_SCROLL").css('height', gridHeight);
        // jQuery("#"+listId+"_TBL_LIST_SCROLL").css('height', gridHeight);

      }
    },
    stop : function(event, ui) {
      // var st = parseInt($(this).data("startingScrollTop"));
      // ui.position.top -= $(this).parent().scrollTop() - st;

      var gridTop = parseFloat(jQuery("#ctrl_" + listId).offset().top);
      var offset = jQuery(this).offset();
      var afterPosY = parseFloat(offset.top);
      // var changePos = afterPosY-this.beforePosY-jQuery(document).scrollTop();
      var changePos = afterPosY - this.beforePosY;
      var changeHeight = this.beforeGridHeight + changePos;

      if (afterPosY < (gridTop + 200)) {

        console.log("============================= IN STARTED ========================================");
        console.log("this.beforePosY >> " + this.beforePosY);
        console.log("============================= IN ENDED ========================================");

        jQuery("#" + listId + "_LIST_RESIZABLE").attr('style', 'top:' + this.beforePosY + 'px;');
        jQuery("#" + listId + "_LIST_RESIZABLE").css('top', this.beforePosY + 'px;');

        jQuery("#" + listId + "_TBL_FIXED_SCROLL").height(this.beforeGridHeight);
        jQuery("#" + listId + "_TBL_LIST_SCROLL").height(this.beforeGridHeight);
      } else {
        jQuery("#" + listId + "_TBL_FIXED_SCROLL").height(changeHeight);
        jQuery("#" + listId + "_TBL_LIST_SCROLL").height(changeHeight);
      }

      /*
       * console.log('@@@@@@@@@@@@@@@@@@@@@@@@@ BEFOR OLIGIN () beforeGridHeight : ' +
       * jQuery("#"+listId+"_TBL_LIST_SCROLL").height());
       * console.log('@@@@@@@@@@@@@@@@@@@@@@@@@ BEFOR OLIGIN css
       * beforeGridHeight : ' +
       * jQuery("#"+listId+"_TBL_LIST_SCROLL").css('height')); //
       * console.log('@@@@@@@@@@@@@@@@@@@@@@@@@ OLIGIN css _TBL_BOX : ' +
       * jQuery("#"+listId+"_TBL_BOX").css('height'));
       * 
       * //var objectTop = jQuery("#"+listId+"_TBL_LIST_SCROLL").offset().top;
       * 
       * var offset = jQuery(this).offset(); var afterPosY =
       * parseFloat(offset.top);
       * 
       * this.beforeGridHeight = jQuery("#"+listId+"_TBL_BOX").height();
       * 
       * var changePos = afterPosY-this.beforePosY; var changeHeight=
       * this.beforeGridHeight+changePos;
       * 
       *  // console.log('@@@@@@@@@@@@@@@@@@@@@@@@@ objectTop : ' + objectTop);
       * console.log('@@@@@@@@@@@@@@@@@@@@@@@@@ beforeGridHeight : ' +
       * this.beforeGridHeight); console.log('@@@@@@@@@@@@@@@@@@@@@@@@@
       * changeGridHeight : ' + changeHeight);
       * console.log('@@@@@@@@@@@@@@@@@@@@@@@@@ changePos : ' + changePos);
       *  // jQuery("#"+listId+"_TBL_BOX").height( changeHeight); //
       * jQuery("#"+listId+"_TBL_FIXED_SCROLL").height( changeHeight); //
       * jQuery("#"+listId+"_TBL_LIST_SCROLL").height( changeHeight);
       *  // jQuery("#"+listId+"_TBL_BOX").css( 'height', changeHeight+'px');
       * jQuery("#"+listId+"_TBL_FIXED_SCROLL").css( 'height',
       * changeHeight+'px'); jQuery("#"+listId+"_TBL_LIST_SCROLL").css(
       * 'height', changeHeight+'px');
       * 
       * console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
       * 
       * console.log('@@@@@@@@@@@@@@@@@@@@@@@@@ AFTER OLIGIN () beforeGridHeight : ' +
       * jQuery("#"+listId+"_TBL_LIST_SCROLL").height());
       * console.log('@@@@@@@@@@@@@@@@@@@@@@@@@ AFTER OLIGIN css
       * beforeGridHeight : ' +
       * jQuery("#"+listId+"_TBL_LIST_SCROLL").css('height'));
       */

    },
    revert : function(event, ui) {
      /*
       * var offset = jQuery(this).offset(); var gridTop =
       * parseFloat(jQuery("#ctrl_"+listId).offset().top); var afterPosY =
       * parseFloat(offset.top);
       *  // 그리드 TOP 보다 높아지면 return; if( afterPosY < (gridTop+100) ) { return
       * false; }
       */
    }
  // revert: 'invalid'
  });

  /*
   * jQuery("#"+listId+"_LIST_RESIZABLE").droppable({ drop: function(event, ui) {
   * $(this).addClass("ui-state-highlight").find("p").html("Dropped!"); } });
   */
};

/**
 * Screen Table Resizable Event
 */
PD_GridUtils.fnSetScrollEvent = function(listId) {

  jQuery(function() {
    // Keep track of last scroll
    jQuery("#" + listId + "_TBL_LIST_SCROLL").scroll(function(event) {
      jQuery("#" + listId + "_TBL_FIXED_SCROLL").scrollTop(jQuery(this).scrollTop());
      jQuery("#" + listId + "_TBL_LIST_HEADER_SCROLL").scrollLeft(jQuery(this).scrollLeft());
    });
  });
};

/**
 * List Check All
 */
PD_GridUtils.fnListCheckAll = function(listId, bodyId, colId, ctrlFn, activeBgType) {
  var bCheck = jQuery("#" + colId + "0").is(':checked');
  var color = bCheck ? '#ebf6f8' : '';

  jQuery("#" + bodyId).find("input:checkbox[name=" + colId + "]").each(function(i) {
    jQuery(this).attr("checked", bCheck);
    var idx = i + 1;

    if (activeBgType && activeBgType == 'NONE') {
      
    }
    else if (activeBgType && activeBgType == 'MULTI') {
      PD_GridUtils.fnTrActive(listId, idx);
    }
    else {
      PD_GridUtils.fnTrActiveOne(listId, idx);
    }
  });

  var rtnVal = "new Array()";
  eval(ctrlFn + "('CHECK_ALL', '" + listId + "', '" + rtnVal + "');");
};

/**
 * 리스트 틀고정 키값 설정
 */
PD_GridUtils.fnSetTheadFixd = function(xmlPath, listId) {

  if (!PD_Utils.MsgBox("틀고정을 진행하시겠습니까?", "C")) {
    return;
  }

  var fixed = jQuery('#' + listId + '_ComboFixed').val();
  PD_Storage.set(listId, fixed, 'list-fixed');

  var fixed = PD_GridUtils.fnGetTheadFixd(listId); // 틀고정 고정필드 가져오기
  PD_Grid.makeScreen(xmlPath, fixed); // 화면 다시 그리기
  PD_GridUtils.fnSetComboTheadFixd(listId, fixed); // 틀고정 콤보박스 선택

  PD_GridUtils.fnListView('LIST', listId, true);

  if (typeof reloadSelf != "undefined") {
    reloadSelf();
  }
};

/**
 * 리스트 틀고정 키값 가져오기
 */
PD_GridUtils.fnGetTheadFixd = function(listId) {
  var fixed = PD_Storage.get(listId, 'list-fixed');
  // fixed = (fixed != null && fixed != "" && typeof fixed != "undefined") ?
  // fixed : -1;
  fixed = PD_Mask.fnNVL2(fixed, -1);

  return fixed;
};

/**
 * 리스트 틀고정 콤보박스 설정
 */
PD_GridUtils.fnSetComboTheadFixd = function(listId, fixed) {

  jQuery('#' + listId + '_ComboFixed').val(fixed);
};

/**
 * 갤러리 & 리스트 컨트롤
 */
PD_GridUtils.fnListView = function(viewType, listId, init) {

  // jQuery("#btnLIST").trigger('click');
  try {
    if (viewType == 'LIST') {
      jQuery("#" + listId + "_TBL_LIST_BOX").show();
      jQuery("#" + listId + "_TBL_GALLERY_BOX").hide();
      jQuery("#" + listId + "_Fixed").show();
      jQuery("#" + listId + "_LIST_RESIZABLE_BAR").show();
      jQuery("#btnGALLERY").removeClass('active');
      jQuery("#btnLIST").addClass('active');
    } else if (viewType == 'GALLERY') {
      jQuery("#" + listId + "_TBL_LIST_BOX").hide();
      jQuery("#" + listId + "_TBL_GALLERY_BOX").show();
      jQuery("#" + listId + "_Fixed").hide();
      jQuery("#" + listId + "_LIST_RESIZABLE_BAR").hide();
      jQuery("#btnGALLERY").addClass('active');
      jQuery("#btnLIST").removeClass('active');
    }

    if (init) {
      // jQuery("#btn"+viewType).dropdown("toggle");
    }
  } catch (e) {
    PD_Utils.MsgBox("[PD_GridUtils.fnListView] errMessage: " + e.message, 'E');
  }
};

/**
 * Screen List data scroll catch
 */
PD_GridUtils.fnSetListDataScrollCatch = function(listId) {

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

    //alert(jQuery("#" + listId + "_TBL_LIST_SCROLL").hasScrollBar().load);
    if (jQuery("#" + listId + "_TBL_LIST_SCROLL").hasScrollBar().load) {
      //alert('IN');
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
 * list 에 모든 row를 delete
 */
PD_GridUtils.removeListAllRow = function(id, type) {

  try {
    var tObjTable = PD_GridUtils.getObject(id + "_TBL");

    if (!tObjTable)
      return;

    /*
     * var hdCnt = tObjTable.getAttribute("hdcnt"); var cnt =
     * tObjTable.rows.length;
     * 
     * for(var i=(cnt-1); i>=hdCnt; i--) { tObjTable.deleteRow(i); }
     * 
     * var spanPage = PD_GridUtils.getObject(id+"_PAGING"); var oPage =
     * PD_GridUtils.getObject(id+"_QRY_CNT"); var pagecnt =
     * HSession.getPageCnt(); if(oPage) pagecnt = oPage.value;
     * 
     */

    tObjTable = null;
    spanPage = null;
    oPage = null;
  } catch (e) {
    // PD_Utils.MsgBox("PD_GridUtils.removeListAllRow=>" + id + " errMessage: " +
    // e.message, "E", "N");
  }
}

/**
 * 리스트 그리드에서 특정 row의 cell값을 추출하여 리턴.
 */
PD_GridUtils.getListCellValue = function(listId, rowIndex, colId, type) {
  if (!type)
    type = "view";
  // colId = listId+"_"+colId+"_H";

  var sRet = "";
  var obj = PD_GridUtils.getObject(listId + "_TBL_FIXED");
  var objList = PD_GridUtils.getObject(listId + "_TBL_TBODY_FIXED");
  for (var cellIndex = 0; obj && cellIndex < obj.rows[0].cells.length; cellIndex++) {
    if (obj.rows[0].cells[cellIndex].getAttribute("th_id") == colId) {
      if (type == "view") {
        sRet = objList.rows[rowIndex].cells[cellIndex].innerText;
      } else if (type == "text") {
        // 속에꺼 가져오기.
      } else {
        sRet = objList.rows[rowIndex].cells[cellIndex].innerHTML;
      }

      break;
    }
  }

  var obj = PD_GridUtils.getObject(listId + "_TBL_LIST");
  var objList = PD_GridUtils.getObject(listId + "_TBL_TBODY_LIST");
  if (sRet == "") {
    for (var cellIndex = 0; obj && cellIndex < obj.rows[0].cells.length; cellIndex++) {
      if (obj.rows[0].cells[cellIndex].getAttribute("th_id") == colId) {
        if (type == "view") {
          sRet = objList.rows[rowIndex].cells[cellIndex].innerText;
        } else if (type == "text") {
          // sRet = $("#"+input_id+rowIndex).val();
        } else {
          sRet = objList.rows[rowIndex].cells[cellIndex].innerHTML;
        }

        break;
      }
    }
  }

  obj = null;

  return PD_Mask.fnNVL(sRet).trim();
}

/**
 * 리스트 그리드에서 특정 row의 cell에 값 넣기.
 */
PD_GridUtils.setListCellValue = function(listId, rowIndex, colId, value, type) {
  // colId = listId+"_"+colId+"_H";

  var isSet = false;
  var obj = PD_GridUtils.getObject(listId + "_TBL_FIXED");
  var objList = PD_GridUtils.getObject(listId + "_TBL_TBODY_FIXED");
  for (var cellIndex = 0; obj && cellIndex < obj.rows[0].cells.length; cellIndex++) {
    if (obj.rows[0].cells[cellIndex].getAttribute("th_id") == colId) {
      if (type == 'html') {
        objList.rows[rowIndex].cells[cellIndex].innerHTML = value;
      } else {
        var ele = objList.rows[rowIndex].cells[cellIndex].firstElementChild;
        if(ele && ele.tagName.toLowerCase() == 'input') {
          objList.rows[rowIndex].cells[cellIndex].firstElementChild.value = value;
          ele.nextElementSibling.innerText = value;
        }
        else {
          objList.rows[rowIndex].cells[cellIndex].innerText = value;
        }
      }
      isSet = true;
    }
  }

  var obj = PD_GridUtils.getObject(listId + "_TBL_LIST");
  var objList = PD_GridUtils.getObject(listId + "_TBL_TBODY_LIST");
  if (!isSet) {
    for (var cellIndex = 0; obj && cellIndex < obj.rows[0].cells.length; cellIndex++) {
      if (obj.rows[0].cells[cellIndex].getAttribute("th_id") == colId) {
        if (type == 'html') {
          objList.rows[rowIndex].cells[cellIndex].innerHTML = value;
        } else {
          var ele = objList.rows[rowIndex].cells[cellIndex].firstElementChild;
          if(ele && ele.tagName.toLowerCase() == 'input') {
            objList.rows[rowIndex].cells[cellIndex].firstElementChild.value = value;
            ele.nextElementSibling.innerText = value;
          }
          else {
            objList.rows[rowIndex].cells[cellIndex].innerText = value;
          }
        }
        isSet = true;
      }
    }
  }
}

/**
 * List - column display change
 */
PD_GridUtils.setListColumnDisplay = function(listId, colId, display) {
  // colId = listId+"_"+colId+"_H";

  var isSet = false;
  var obj = PD_GridUtils.getObject(listId + "_TBL_FIXED");
  var objList = PD_GridUtils.getObject(listId + "_TBL_TBODY_FIXED");

  for (var cellIndex = 0; obj && cellIndex < obj.rows[0].cells.length; cellIndex++) {
    if (obj.rows[0].cells[cellIndex].getAttribute("th_id") == colId) {

      var clon_id = jQuery(obj.rows[0].cells[cellIndex]).attr('clon'); // cu1,
                                                                        // cu2

      jQuery('[clon=group_' + clon_id + ']').css('display', 'none');
      jQuery('[clon=data_col_' + clon_id + ']').css('display', 'none');
      jQuery('[clon=group_' + clon_id + ']').width(0);
      jQuery('[clon=data_col_' + clon_id + ']').width(0);

    }
  }

  var obj = PD_GridUtils.getObject(listId + "_TBL_LIST");
  var objList = PD_GridUtils.getObject(listId + "_TBL_TBODY_LIST");
  if (!isSet) {
    for (var cellIndex = 0; obj && cellIndex < obj.rows[0].cells.length; cellIndex++) {
      if (obj.rows[0].cells[cellIndex].getAttribute("th_id") == colId) {

        obj.rows[0].cells[cellIndex].style.display = 'none';
        objList.rows[0].cells[cellIndex].style.display = 'none';
      }
    }
  }
}

/**
 * Paging Function
 */
PD_GridUtils.fnPaginate = function(listId, pageNumber, ctrlFn) {

  if (typeof (pageNumber) == "undefined")
    pageNumber = 1;

  var rtnVal = "new Array({pageNumber: " + pageNumber + "})";

  eval(ctrlFn + "('PAGING', '" + listId + "', '" + rtnVal + "');");
}

/**
 * Paging Scale Function
 */
PD_GridUtils.fnPaginateLimit = function(listId, pageLimit, ctrlFn) {

//  alert("요거 확인 show_loading 처리");
  // show_loading('','로딩중입니다...');

  if (typeof (pageLimit) == "undefined")
    pageLimit = 10;

  var rtnVal = "new Array({pageLimit: " + pageLimit + "})";

  eval(ctrlFn + "('PAGING_LIMIT', '" + listId + "', '" + rtnVal + "');");
}

/**
 * List Event Function
 */
PD_GridUtils.fnListEventCtrl = function(mode, ctrlFn, listId, colId, rowIndex, colIndex) {

  var rtnVal = "new Array({  listId: \"" + listId + "\", colId: \"" + colId + "\", rowIndex: \"" + rowIndex + "\", colIndex: \"" + colIndex + "\"  })";

  eval(ctrlFn + "('" + mode + "', '" + listId + "', '" + rtnVal + "');");
}

/**
 * Sorting Function
 */
PD_GridUtils.fnSorting = function(listId, sort, ctrlFn, colId, colIndex, colMask) {
  var orderType = PD_GridUtils.fnHeaderSort(colId + "_H_SORT");
  // alert("sort : " + sort + "\r\norderType : " + orderType + "\r\ncolId : " +
  // colId + '\r\ncolIndex : ' + colIndex);
  var rtnVal = "new Array({  colId: \"" + colId + "\", orderType: \"" + orderType + "\"  })";
  if (sort == 'Client') {
    // alert( jQuery("#"+colId+"_H_SORT").attr("class") );
    // jQuery("#"+listId+"_TBODY_FIXED").sortable().disableSelection();
    PD_GridUtils.fnSortTable(listId, colId, colIndex, colMask, orderType)
  } else if (sort == 'DB') {
    eval(ctrlFn + "('SORTING', '" + listId + "', '" + rtnVal + "');");
  }
}

// PD_GridUtils.fnSortTable=function(listId, thObj, data_type) {
PD_GridUtils.fnSortTable = function(listId, colId, colIndex, colMask, orderType) {

  var listArr = new Array();
  var obj = PD_GridUtils.getObject(listId + "_TBL_LIST");
  var hdcnt = 0;

  for (var i = 1; i < obj.rows.length; i++) {
    var arrTmp = new Array();
    for (var j = 0; j < obj.rows[i].cells.length; j++) {
      arrTmp[j] = obj.rows[i].cells[j].innerHTML;
    }

    listArr[i - 1] = arrTmp;
  }

  /*
   * var col_nm = thObj.id; var sort_index = PD_GridUtils.getListColIndex(listId,
   * col_nm.substring(3)); var sort_data_type =
   * PD_GridUtils.getListCellMask(listId, 0, col_nm.substring(3));
   * if(sort_data_type == "M") data_type = "N"; var order_type = "asc";
   * 
   * var thVal = thObj.innerHTML;
   * 
   * if(HBiz.isSvcID(thVal, "▼")) { thObj.innerHTML = PD_Mask.fnReplaceStr(thVal, "
   * ▼", " ▲"); order_type = "asc"; } else if(HBiz.isSvcID(thVal, "▲")) {
   * thObj.innerHTML = PD_Mask.fnReplaceStr(thVal, " ▲", " ▼"); order_type =
   * "desc"; } else if( HBiz.isSvcID(thVal, "▼") == false && HBiz.isSvcID(thVal,
   * "▲") == false ) { thObj.innerHTML = thVal + " ▲"; order_type = "asc"; }
   */

  var re_Arr = listArr.sort(function(a1, a2) {
    var idx = colIndex;
    var value1 = a1[idx];
    var value2 = a2[idx];

    switch (colMask) {
    case "N": // 숫자형
      value1 = Number(PD_Mask.fnGetNumFloatMask(value1));
      value2 = Number(PD_Mask.fnGetNumFloatMask(value2));
      break;
    case "M": // 숫자형
      value1 = parseInt(PD_Mask.fnReplaceStr(value1, ',', ''), 10);
      value2 = parseInt(PD_Mask.fnReplaceStr(value2, ',', ''), 10);

      break;
    default:
      break;
    }

    if (orderType == "DESC")
      return (value1 > value2) ? -1 : ((value1 < value2) ? 1 : 0);
    else
      return (value1 < value2) ? -1 : ((value1 > value2) ? 1 : 0);
  });

  for (var i = 1; i < obj.rows.length; i++) {
    for (var j = 0; j < obj.rows[i].cells.length; j++) {
      if (j == colIndex && colMask == "N") {
        // obj.rows[i].cells[j].innerHTML =
        // PD_Mask.fnGetMaskValue(re_Arr[i-hdcnt][j], "M");
        obj.rows[i].cells[j].innerHTML = PD_Mask.fnGetMaskValue({
          val : re_Arr[i - hdcnt][j],
          dataMask : 'M'
        });
      } else {
        obj.rows[i].cells[j].innerHTML = re_Arr[i - 1][j];
      }
    }
  }
}
