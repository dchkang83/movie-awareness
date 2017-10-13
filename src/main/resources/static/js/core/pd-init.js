/**
 * NAME : PD_Init.js DESC : 페이지로딩 후 설정 VER : 1.0
 * Group All rights reserved
 * ============================================================================================
 * 변 경 사 항
 * ============================================================================================
 * VERSION DATE AUTHOR DESCRIPTION
 * ============================================================================================
 * 1.0 2015.03.16 kang d.j 최초작성
 */


PD_Init = function() {
};
PD_Select = function() {
};

/**
 * page에 모든 style 및 이벤트 설정
 */
PD_Init.init = function() {

  PD_Init.initScrollBar(); // 스크롤바 생성체크
  PD_Init.initJQuerySerialize(); // mask 제거 serialize
  PD_Init.initSelect(); // Select Box

  PD_Init.initJQueryFunction(); // jQuery Function 추가

};

/**
 * 스크롤바 생기는지 확인
 */
PD_Init.initScrollBar = function() {

  /*
  (function(jQuery) {
    jQuery.fn.hasScrollBar = function() {
      var hasScrollBar = {}, e = this.get(0);
      console.log("CHECK e.scrollHeight : " + e.scrollHeight + "\te.scrollWidth : " + e.scrollWidth);
      if(!e && e != null && !e.scrollHeight && !e.scrollWidth) {
        
        if (e.scrollHeight == 0 || e.scrollWidth == 0) {
          hasScrollBar.load = false;
        } else {
          hasScrollBar.load = true;
        }
        
        hasScrollBar.vertical = (e.scrollHeight > e.clientHeight) ? true : false;
        hasScrollBar.horizontal = (e.scrollWidth > e.clientWidth) ? true : false;
      }
      else {
        hasScrollBar.load = false;
        hasScrollBar.vertical = false;
        hasScrollBar.horizontal = false;
      }
      
      return hasScrollBar;
    };
  })(jQuery);
  */

  (function(jQuery) {
    jQuery.fn.hasScrollBar = function() {
      var hasScrollBar = {}, e = this.get(0);

      /*
       * console.log("e.scrollHeight : " + e.scrollHeight);
       * console.log("e.clientHeight : " + e.clientHeight);
       */

      if (!e.scrollHeight || !e.scrollHeight || e.scrollHeight == 0 || e.scrollHeight == 0 || !e.scrollWidth || !e.scrollWidth || e.scrollWidth == 0 || e.scrollWidth == 0) {
        hasScrollBar.load = false;
      } else {
        hasScrollBar.load = true;
      }

      hasScrollBar.vertical = (e.scrollHeight > e.clientHeight) ? true : false;
      hasScrollBar.horizontal = (e.scrollWidth > e.clientWidth) ? true : false;
      return hasScrollBar;
    };
  })(jQuery);
};

/**
 * mask 제거 serialize
 */
PD_Init.initJQuerySerialize = function() {

  /**
   * 특수문자 제거 jQuery serialize
   */
  var r20 = /%20/g, rbracket = /\[\]$/, rCRLF = /\r?\n/g, rinput = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i, rselectTextarea = /^(?:select|textarea)/i;
  jQuery.fn.extend({
    serialize : function(mode) {
      if (mode && mode == 'mask_clear')
        return jQuery.param(this.pd_serializeArray());
      else
        return jQuery.param(this.serializeArray());
    },
    pd_serializeArray : function() {
      return this.map(function() {
        return this.elements ? jQuery.makeArray(this.elements) : this;
      }).filter(function() {
        return this.name && !this.disabled && (this.checked || rselectTextarea.test(this.nodeName) || rinput.test(this.type));
      }).map(function(i, elem) {
        var val = jQuery(this).val();
        val = jQuery.fn.pd_replaceMask(elem, val);

        return val == null ? null : jQuery.isArray(val) ? jQuery.map(val, function(val, i) {
          return {
            name : elem.name,
            value : val.replace(rCRLF, "\r\n")
          };
        }) : {
          name : elem.name,
          value : val.replace(rCRLF, "\r\n")
        };
      }).get();
    },
    pd_replaceMask : function(elem, val) {
      var mask = elem.getAttribute('data-mask');

      if (mask) {
        val = PD_Mask.fnRemoveMaskValue({
          val : val,
          dataMask : mask
        });
      }

      return val;
    }
  });
};

/**
 * Select Box
 */
PD_Init.initSelect = function() {
  /** ------------------------------------------------------------------- Started * */
  /**
   * Dynamic SelectBox Controll Library
   * 
   */
  var selWidth = 0;
  PD_Select = {
    add : function(selId, keyValue, textValue) {
      var addOpt = document.createElement('option');
      var attWidth = (keyValue == "") ? 50 : 30;
      var tmpWidth = (textValue.length * 11) + attWidth;

      if (selWidth < tmpWidth)
        selWidth = tmpWidth;

      addOpt.value = keyValue;
      addOpt.appendChild(document.createTextNode(textValue));

      jQuery("#" + selId).append(addOpt);
    },
    addCheckbox : function(selId, keyValue, textValue) {
      var selHtml = jQuery("#div_" + selId).html();
      selHtml = selHtml + "<input type=\"checkbox\" id=\"checkbox_" + selId + "\"" + " onclick=\"javascript:fnCheckboxClick('checkbox_" + selId + "', '" + selId + "');\" value=\"" + keyValue + "\">" + textValue
          + "<br/>";

      jQuery("#div_" + selId).html(selHtml);
    },
    removeAll : function(selId) {
      jQuery("#" + selId).find('option').each(function() {
        jQuery(this).remove();
      });
    },
    removeUnit : function(selId) {
      jQuery("#" + selId + " option:selected").remove();
    },
    length : function(selId) {
      var i = 0;
      jQuery("#" + selId).find('option').each(function() {
        ++i;
      });
      return i;
    }
  };
  /** ------------------------------------------------------------------- Ended * */
};

/**
 * jQuery Function 추가
 */
PD_Init.initJQueryFunction = function() {

  // GRID RESIZE 기능 추가.
  jQuery.fn.fnDragBarMoveEvent = function(arrParams) {
    
    switch (arrParams['type']) {
      case 'grid_bottom_bar':
  
        var listId = arrParams['id'];
  
        this.bind('mousedown', function(e) {
          e.preventDefault();
          if (e.which != 1) {
            // e.which - 1:LEFT(MOUSE CLICK), 2:CENTER(MOUSE CENTER),
            // 3:RIGHT(MOUSE RIGHT)
            return;
          }
          
          var beforePosY = parseFloat(e.pageY);
          var beforeGridHeight = parseFloat(jQuery("#" + listId + "_TBL_LIST_SCROLL").height(), 10);
  
          jQuery(document).bind('mousemove', function(e) {
            var afterPosY = parseFloat(e.pageY);
            var changePos = afterPosY - beforePosY;
            var changeHeight = beforeGridHeight + changePos;
  
            jQuery("#" + listId + "_TBL_FIXED_SCROLL").height(changeHeight);
            jQuery("#" + listId + "_TBL_LIST_SCROLL").height(changeHeight);
  
            // ScrollBar catch 후 헤더쪽에도 적용
            PD_Common.fnSetListDataScrollCatch(listId);
          });
        });
  
        break;
      case 'frame_horizontal_two_division_bar':
        var leftClass = 'frame-left';
        var rightClass = 'frame-right';
        var wrapperWidth = parseFloat(jQuery(".frame-wrapper").width(), 10) - 30;
        var wrapperHalfWidth = parseFloat(wrapperWidth/2, 10);
        
        jQuery("." + leftClass).width(wrapperHalfWidth);
        jQuery("." + rightClass).width(wrapperHalfWidth);
        
        this.bind('mousedown', function(e) {
          e.preventDefault();
          
          if (e.which != 1) {
            // e.which - 1:LEFT(MOUSE CLICK), 2:CENTER(MOUSE CENTER),
            // 3:RIGHT(MOUSE RIGHT)
            return;
          }
          
          var beforePosX = parseFloat(e.pageX);
          var beforeLeftWidth = parseFloat(jQuery("." + leftClass).width(), 10);
          var beforeRightWidth = parseFloat(jQuery("." + rightClass).width(), 10);
          
          jQuery(document).bind('mousemove', function(e) {
            var afterPosX = parseFloat(e.pageX);
            var changePos = afterPosX - beforePosX;
            var changeLeftWidth = beforeLeftWidth + changePos;
            var changeRightWidth = beforeRightWidth - changePos;
            
// console.log("###### beforeLeftWidth : " + beforeLeftWidth + "
// beforeRightWidth : " + beforeRightWidth + " changeLeftWidth : " +
// changeLeftWidth + " changeRightWidth : " + changeRightWidth);
            
            jQuery("." + leftClass).width(changeLeftWidth);
            jQuery("." + rightClass).width(changeRightWidth);
  
            // ScrollBar catch 후 헤더쪽에도 적용
            // PD_Common.fnSetListDataScrollCatch(listId);
          });
        });
  
        break;
      default:
        break;
    }

    jQuery(window).bind('mouseup', function(e) {
      jQuery(document).unbind('mousemove');
    });

    return this;
  };

  // GRID RESIZE 기능 추가.
  jQuery.fn.fnGridResize = function(arrParams) {
    var el = jQuery('#' + arrParams['id'] + '_LIST_RESIZABLE_BAR');
    var listId = arrParams['id'];

    this.bind('mousedown', function(e) {
      /*
       * var relX = e.pageX - jQuery(el).offset().left; var relY = e.pageY -
       * jQuery(el).offset().top; var maxX = jQuery('body').width() -
       * jQuery(el).width() - 10; var maxY = jQuery('body').height() -
       * jQuery(el).height() - 10;
       */
      e.preventDefault();
      if (e.which != 1) {
        // e.which - 1:LEFT, 2:CENTER, 3:RIGHT
        return;
      }

      var beforePosY = parseFloat(e.pageY);
      var beforeGridHeight = parseFloat(jQuery("#" + listId + "_TBL_LIST_SCROLL").height(), 10);

      jQuery(document).bind('mousemove', function(e) {
        /*
         * var diffX = Math.min(maxX, Math.max(0, e.pageX - relX)); var diffY =
         * Math.min(maxY, Math.max(0, e.pageY - relY)); jQuery(el).css('left',
         * diffX + 'px').css('top', diffY + 'px');
         */
        var afterPosY = parseFloat(e.pageY);

        var gridTop = parseFloat(jQuery("#ctrl_" + listId).offset().top);
        var changePos = afterPosY - beforePosY;
        var changeHeight = beforeGridHeight + changePos;

        jQuery("#" + listId + "_TBL_FIXED_SCROLL").height(changeHeight);
        jQuery("#" + listId + "_TBL_LIST_SCROLL").height(changeHeight);
        /*
         * if( afterPosY > (gridTop+200) ) {
         * jQuery("#"+listId+"_TBL_FIXED_SCROLL").height(changeHeight);
         * jQuery("#"+listId+"_TBL_LIST_SCROLL").height(changeHeight); } else {
         * jQuery(document).unbind('mousemove'); }
         */

        // ScrollBar catch 후 헤더쪽에도 적용
        PD_Common.fnSetListDataScrollCatch(listId);
      });
    });

    jQuery(window).bind('mouseup', function(e) {
      jQuery(document).unbind('mousemove');
    });

    return this;
  };

  // Datatables 전용 리사이즈
  jQuery.fn.fnDatatablesResize = function(arrParams) {
    var el = jQuery('#' + arrParams['id'] + '_resizable_bar');
    var listId = arrParams['id'];
    var dtId = jQuery(this).attr("gloabal_id");

    this.bind('mousedown', function(e) {

      e.preventDefault();

      if (e.which != 1) {
        return;
      }

      var beforePosY = parseFloat(e.pageY);
      var beforeGridHeight = parseFloat(jQuery("#" + listId + "_wrapper .dataTables_scrollBody").height(), 10);

      jQuery(document).bind('mousemove', function(e) {

        var afterPosY = parseFloat(e.pageY);
        var gridTop = parseFloat(jQuery("#" + listId + "_wrapper").offset().top);
        var changePos = afterPosY - beforePosY;
        var changeHeight = beforeGridHeight + changePos;

        jQuery("#" + listId + "_wrapper .DTFC_LeftBodyLiner").height(changeHeight);
        jQuery("#" + listId + "_wrapper .DTFC_LeftBodyWrapper").height(changeHeight);
        jQuery("#" + listId + "_wrapper .dataTables_scrollBody").height(changeHeight);

        // jQuery("#" + listId + "_wrapper
        // .dataTables_scrollBody").css("z-index","2");
        jQuery(".DTFC_ScrollWrapper").height(changeHeight + 40);

        // ScrollBar catch 후 헤더쪽에도 적용
        // PD_Common.fnSetListDataScrollCatch(listId);
        var scrollCanvas = jQuery("#" + listId + "_wrapper .dataTables_scrollBody").length == 0 ? false : true;

        if (jQuery("#" + listId + "_wrapper .dataTables_scrollBody").hasScrollBar().load) {
          jQuery('#' + listId).dataTable().fnAdjustColumnSizing(false);
        }

        // 가로 스크롤 한번더 처리
        // var vScroll = jQuery("#" + listId + "_wrapper
        // .dataTables_scrollBody").hasScrollBar().vertical;
        var hScroll = jQuery("#" + listId + "_wrapper .dataTables_scrollBody").hasScrollBar().horizontal;
        if (hScroll) {
          jQuery('#' + listId).dataTable().fnAdjustColumnSizing(false);
        }
      });
    });

    jQuery(window).bind('mouseup', function(e) {
      jQuery(document).unbind('mousemove');
    });

    return this;
  };
  
  jQuery.fn.serializeFormJSON = function () {
  
    var o = {};
    var a = this.serializeArray();
    jQuery.each(a, function () {
      if (o[this.name]) {
        if (!o[this.name].push) {
          o[this.name] = [o[this.name]];
        }
        o[this.name].push(this.value || '');
      }
      else {
        o[this.name] = this.value || '';
      }
    });
    
    return o;
  };
  
  jQuery.fn.serializeFormJSONList = function () {
    var jsonList = [];
    var o = {};
    var a = this.serializeArray();
    jQuery.each(a, function () {
      if (o[this.name]) {
        jsonList.push(o);
        o = {};
      }
      
      o[this.name] = this.value || '';
    });
    
    jsonList.push(o);
    
    return jsonList;
  };
};

PD_Init.init();
