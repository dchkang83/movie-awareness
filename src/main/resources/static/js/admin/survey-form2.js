/**
 * Global Variable Setting
 */

/**
 * onLoad Event
 */
jQuery(document).ready(function() {
  
  fnSearchTree();

  fnEventApply();
});

/**
 * Resize Event
 */
jQuery(window).resize(function() {

});

/**
 * Event Apply
 * @returns
 */
function fnEventApply() {
  // 펼치기
  jQuery("#btnExpandAll").on("click", function() {
    $('#tree').treeview('expandAll', { silent: true });
  });
  // 닫기
  jQuery("#btnCollapseAll").on("click", function() {
    $('#tree').treeview('collapseAll', { silent: true });
  });
}

/**
 * Search
 * @returns
 */
function fnSearchTree() {
  var surveySrl = jQuery("#fmSurveyForm2 #surveySrl").val();
  var request = new PD_Request();
  request.methods('ajax', {
    url : '/admin//questions/items/tree/'+surveySrl,
    method : 'GET',
    data : '',
    async: false,
    progress : false,
    success : function(jsonData, result) {
      $('#tree').treeview({data: jsonData});
      $('#tree').treeview('collapseAll', { silent: true });
      /*
      $('#tree').treeview({data: getTreeData()});
      $('#tree').treeview('collapseAll', { silent: true });
      */
    },
    error : function(request, status, error) {
    }
  });
}
