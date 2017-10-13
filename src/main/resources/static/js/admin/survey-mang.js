/**
 * Global Variable Setting
 */
var glbTabActiveMap = new Map();

/**
 * onLoad Event
 */
jQuery(document).ready(function() {
  fnEventSetting();
  fnLoadListPage();
});

function fnEventSetting() {
  jQuery('#two_division_bar').fnDragBarMoveEvent( {type : 'frame_horizontal_two_division_bar'} );
  jQuery('.frame-left > .tab_wrap > .tab > li').click(function() {
    PD_Common.fnTabActive(this);
//    alert( jQuery(this).parents("div").eq(1).attr('class') );
    fnTabClick_SurveyMang({topClass:'frame-left'});
  });
  jQuery('.frame-right > .tab_wrap > .tab > li').click(function() {
    PD_Common.fnTabActive(this);
    fnTabClick_SurveyMang({topClass:'frame-right'});
  });
}

function fnLoadListPage() {
  jQuery(".frame-left > .tab_wrap > .tab > li").eq(0).trigger("click");
}

/**
 * Resize Event
 */
jQuery(window).resize(function() {
  PD_GridJson.fnFrameResize({ type : 'frame_horizontal_two_division' });
});

/**
 * TAB Click Event
 * 
 * @param arrParams
 */
function fnTabClick_SurveyMang(arrParams) {
  var topClass = arrParams['topClass'];
  var type = jQuery("."+topClass+" > .tab_wrap > .tab > li[class='on']").attr("tab-edge");
  var params = arrParams['params'];
  
  switch (type) {
    case "list":
      PD_Common.fnOpenContent("/admin/survey/survey-list", "tab_contents_edge_left", params);
      break;
    case "form1":
    case "form2":
      if(params) {
        glbTabActiveMap.put('formParams', params);
      }
      params = glbTabActiveMap.get('formParams');
//      alert("params.stringify : " + JSON.stringify(params));
      
      PD_Common.fnOpenContent("/admin/survey/survey-" + type, "tab_contents_edge_right", params);
      break;
    default:
      break;
  }
}