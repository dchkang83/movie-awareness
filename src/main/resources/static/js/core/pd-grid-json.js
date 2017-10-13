/**
 * NAME : PD_GridJson.js
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

PD_GridJson = function() {
};

/**
 * 리스트 xml추출
 */
PD_GridJson.getScrnList = function(layoutPath, layoutDoc, fixed) {

  // var xmlList = DJ_Xml.getNode(layoutDoc, "/page/area[@type='LIST']/list");
  // if(xmlList.length == 0) return;
  // var xmlList = layoutDoc;
  // alert(layoutDoc['information']['id']);
  // return;
  // alert(xmlList);

  var gridInfo = layoutDoc['information'];
  var gridFields = layoutDoc['fields'];

  var listId = gridInfo["id"];
  var galleryYn = gridInfo["galleryYn"];

  // var gridFields = DJ_Xml.getNode(layoutDoc,
  // "/page/area[@type='LIST']/list[@id='"+listId+"']/field");

  // 그리드 환경설정 (헤더부분)
  var display_fields_idx = 0;
  var arr_display_fields = new Array();

  var hd_fields = PD_Storage.get(listId, 'list-fields');
  if (hd_fields) {
    var arr_fields = hd_fields.split(',');

    var arr_cnt = arr_fields.length;
    if (arr_fields.length > gridFields.length) {
      arr_cnt = gridFields.length;
    }

    for (var dis_idx = 0; dis_idx < arr_cnt; dis_idx++) {
      arr_display_fields[display_fields_idx++] = gridFields[arr_fields[dis_idx]];
      gridFields[arr_fields[dis_idx]]['use_field'] = 'Y';
    }

    for (var i = 0; i < gridFields.length; i++) {
      var use_field = PD_Mask.fnNVL2(gridFields[i]['use_field'], 'N');
      if (use_field != 'Y') {
        gridFields[i]["width"] = '0';
        arr_display_fields[display_fields_idx++] = gridFields[i];
      }
    }
  } else {
    arr_display_fields = gridFields;
  }

  var xmlGalleryField = null;
  var xmlGalleryInfo = null;
  if (galleryYn && galleryYn == 'Y') {
    // xmlGalleryInfo = DJ_Xml.getNode(layoutDoc,
    // "/page/area[@type='LIST']/list[@id='"+listId+"']/gallery")[0];
    // xmlGalleryField = DJ_Xml.getNode(layoutDoc,
    // "/page/area[@type='LIST']/list[@id='"+listId+"']/gallery/field");
  }

  if (arr_display_fields.length > 0) {
    this.makeScreenList(layoutPath, gridInfo, arr_display_fields, xmlGalleryInfo, xmlGalleryField, listId, fixed);
  }

  arr_display_fields = null;

  layoutDoc = null;
};

/**
 * 리스트화면 그리기
 */
PD_GridJson.makeScreenList = function(layoutPath, gridInfo, gridFields, xmlGalleryInfo, xmlGalleryField, listId, fixed) {

  var caption = PD_Mask.fnNVL(gridInfo["caption"]);
  var wFixYn = gridInfo["wFixYn"];
  var hResizeBar = gridInfo["hResizeBar"];
  var width = gridInfo["width"];
  var height = gridInfo["height"];
  var listMargin = gridInfo["listMargin"];
  var galleryYn = gridInfo["galleryYn"];
  var configYn = gridInfo["configYn"];
  var countInfoYn = gridInfo["countInfoYn"];
  var pageYn = gridInfo["pageYn"];
  var pageLimit = gridInfo["pageLimit"];
  var pageDisplay = gridInfo["pageDisplay"];
  var ctrlFn = gridInfo["ctrlFn"];
  var sort = PD_Mask.fnNVL(gridInfo["sort"]); // DB, Client
  var cls = PD_Mask.fnNVL(gridInfo["cls"]);
  var listType = gridInfo["type"];
  var event = gridInfo["event"];
  var activeBgType = gridInfo["activeBgType"];

  listMargin = (listMargin != null && listMargin != "" && typeof listMargin != "undefined") ? parseInt(listMargin, 10) : 0;

  var appendHTML = "";

  var html_sb = new StringBuilder();

  // 1. 틀고정등 HTML
  appendHTML = this.makeScreenListTop_HTML(layoutPath, gridFields, listId, listType, ctrlFn, galleryYn, configYn, countInfoYn);

  try {
    PD_GridUtils.fnSetInnerHTML("ctrl_" + listId + "_TITLE", appendHTML);
  } catch (e) {
    PD_Utils.MsgBox(listId + "에 해당되는 화면 ctrl이 없습니다." + e.message, "E", "N");
    gridFields = null;
    return;
  }

  // 2. 리스트 및 갤러리
  // 2.1 리스트
  appendHTML = this.makeScreenList_HTML(gridFields, listId, caption, fixed, wFixYn, width, height, listMargin, Number(pageLimit), cls, event, sort, ctrlFn, activeBgType);
  html_sb.append(appendHTML);

  // 2.2 갤러리
  if (galleryYn && galleryYn == 'Y') {
    if (xmlGalleryField.length > 0) {
      appendHTML = this.makeScreenGallery_HTML(xmlGalleryInfo, xmlGalleryField, listId, caption, width, height, event, ctrlFn);
    }

    html_sb.append(appendHTML);
  }

  // 3. 그리드 리사이징
  if (!hResizeBar || hResizeBar != 'N') {
    appendHTML = this.makeGridResizable_HTML(listId);
    html_sb.append(appendHTML);
  }

  // 4. 페이징관련 HTML
  if (pageYn == 'Y') {
    // 페이징
    appendHTML = this.makeScreenListPaging_HTML(listId, listType, pageYn, pageLimit, pageDisplay, ctrlFn);

    html_sb.append(appendHTML);
  }

  try {
    PD_GridUtils.fnSetInnerHTML("ctrl_" + listId, html_sb.toString());

    // Resizable Event
    PD_GridUtils.fnSetResizableEvent(listId);

    // Scroll Event
    PD_GridUtils.fnSetScrollEvent(listId);
  } catch (e) {
    PD_Utils.MsgBox(listId + "에 해당되는 화면 ctrl이 없습니다." + e.message, "E", "N");
    gridFields = null;
    return;
  }
};

/**
 * 리스트화면 HTML
 */
PD_GridJson.makeScreenList_HTML = function(gridFields, listId, caption, fixed, wFixYn, width, height, listMargin, pageLimit, cls, event, sort, ctrlFn, activeBgType) {

  var height = parseInt(height, 10);
  var obj = PD_GridUtils.getObject("ctrl_" + listId);

  var fixed_width = 0;
  var div_sb = new StringBuilder(); // total table buffer
  var fixed_table = new StringBuilder(); // fixed - TABLE
  var fixed_thead = new StringBuilder(); // fixed - HEADER
  var fixed_thead_sub = new StringBuilder(); // fixed - SUB HEADER
  var list_table = new StringBuilder(); // list - TABLE
  var list_thead = new StringBuilder(); // list - HEADER
  var list_thead_sub = new StringBuilder(); // list - SUB HEADER
  var fixed_tbody_table = new StringBuilder(); // fixed - TBODY TABLE
  var fixed_tbody_thead = new StringBuilder(); // fixed - TBODY HEADER
  var list_tbody_table = new StringBuilder(); // list - TBODY TABLE
  var list_tbody_thead = new StringBuilder(); // list - TBODY HEADER

  if (!cls || cls == "")
    cls = "ne_table table-hover";

  if (pageLimit == 0)
    pageLimit = 10;

  var colCnt = gridFields.length;

  // if(fixed > -1) {
  // fixed = parseInt(fixed, 10) + 1;
  // }
  fixed = parseInt(fixed, 10) + 1;

  var clon_index = 0;
  var fixed_yn = fixed > 0 ? 'Y' : 'N';

  // ================= Fixed Started
  if (fixed_yn == 'Y') {
    fixed_table.append("  <table width='100%' border='0' cellspacing='0' cellpadding='0' id='" + listId + "_TBL_FIXED' class='" + cls + "'>\r\n");
    fixed_table.append("  <caption>" + caption + "_HEADER</caption>\r\n");
    fixed_table.append("  <colgroup>\r\n");
    fixed_thead.append("  <thead>\r\n");
    fixed_thead.append("  <tr>\r\n");

    fixed_tbody_table.append("  <table width='100%' border='0' cellspacing='0' cellpadding='0' id='" + listId + "_TBL_TBODY_FIXED' class='" + cls + "' style='border-top-width:0px;'>\r\n");
    fixed_tbody_table.append("  <caption>" + caption + "_DATA</caption>\r\n");
    fixed_tbody_table.append("  <colgroup>\r\n");
    fixed_tbody_thead.append("  <thead style='display:none;'>\r\n");
    fixed_tbody_thead.append("  <tr>\r\n");

    for (var i = 0; i < fixed; i++) {
      var th_id = gridFields[i]["id"];
      var th_width = gridFields[i]["width"];
      var th_height = gridFields[i]["height"];
      var th_name = gridFields[i]["name"];
      var th_tit = gridFields[i]["tit"];
      var th_cls = gridFields[i]["cls"];
      var th_style = PD_Mask.fnNVL(gridFields[i]["style"]);
      var th_sort = gridFields[i]["sort"];
      var th_type = gridFields[i]["type"];
      var th_req = gridFields[i]["req"];
      var th_align = gridFields[i]["align"];
      var th_mask = gridFields[i]["mask"];
      var th_len = gridFields[i]["len"];
      var th_edit = gridFields[i]["edit"];
      var th_resize = gridFields[i]["resize"];
      var th_render = PD_Mask.fnNVL(gridFields[i]["render"]);

      var h_style = PD_Mask.fnNVL(gridFields[i]["h_style"]);

      var th_rowspan = PD_Mask.fnNVL(gridFields[i]["rowspan"], 1);
      var th_colspan = PD_Mask.fnNVL(gridFields[i]["colspan"], 1);

      if (th_width == 0) {
        th_name = "";
        h_style += "display: none;";
        th_style += "display: none;";
      }

      var sortScript = '';
      if (th_width > 0 && th_sort == 'Y') {
        h_style += " cursor:pointer!important;";
        sortScript = "javascript:PD_GridUtils.fnSorting('" + listId + "', '" + sort + "', '" + ctrlFn + "', '" + th_id + "', '" + i + "', '" + th_mask + "');";
      }

      var clon_id = listId + clon_index;

      // 일단 변경.
      // fixed_thead.append(" <th width='"+th_width+"' clon='cu"+clon_id+"'
      // style='"+h_style+"' id='"+listId+"_"+th_id+"_H' \r\n");
      fixed_thead.append("    <th clon='cu" + clon_id + "' style='" + h_style + "' id='" + listId + "_" + th_id + "_H'            \r\n");
      fixed_thead.append("      th_id='" + th_id + "' th_tit='" + th_tit + "' th_cls='" + th_cls + "' th_style='" + th_style + "' th_req='" + th_req + "'       \r\n");
      fixed_thead.append("      th_type='" + th_type + "' th_align='" + th_align + "' th_mask='" + th_mask + "' th_len='" + th_len + "' th_edit='" + th_edit + "' \r\n");
      fixed_thead.append("      th_width='" + th_width + "' th_height='" + th_height + "' th_render='" + th_render + "' \r\n");

      // ########################## 틀고정 병합 추가중
      if (th_rowspan > 1) {
        fixed_thead.append("    rowspan='" + th_rowspan + "'  \r\n");
      }
      if (th_colspan > 1) {
        fixed_thead.append("    colspan='" + th_colspan + "'  \r\n");
      }

      if (th_resize != 'N') {
        // 마지막 제외
        // if(i != fixed-1) {
        fixed_thead.append("    onmouseover=\"javascript:PD_GridUtils.fnHeaderOver(this, '" + listId + "');\" onmouseout=\"javascript:PD_GridUtils.fnHeaderOut(this, '" + listId + "');\" \r\n");
        // }
      }

      if (sortScript != '') {
        fixed_thead.append("    onclick=\"" + sortScript + "\" \r\n");
      }

      fixed_thead.append("    >\r\n");

      if (th_type == 'checkbox') {
        fixed_thead.append("<input type='checkbox' name='" + th_id + "' id='" + (th_id + 0) + "' value='' onclick='PD_GridUtils.fnListCheckAll(\"" + listId + "\", \"" + listId + "_TBODY_FIXED\", \"" + th_id + "\", \""
            + ctrlFn + "\", \"" + activeBgType + "\")' />");
      } else {
        fixed_thead.append(th_name);
      }

      if (th_width > 0 && th_sort == 'Y') {
        fixed_thead.append("&nbsp;<i class='fa fa-sort hand orderby' id='" + th_id + "_H_SORT' sidx='" + th_id + "'></i>");
      }

      fixed_thead.append("    </th>\r\n");

      // fixed_width += parseInt(th_width, 10);

      // @@@@@@@@@ 틀고정 병합
      if (th_colspan > 1) {
//        alert('makeScreenList CELL MERGE');
        // GROUP HEADER
        // var subFieldList = DJ_Xml.getNode(gridFields[i],
        // "/field[@id='"+th_id+"']/field");
        // alert(th_id);

        var subFieldList = DJ_Xml.getNode(gridFields[i], "/field[@id='" + th_id + "']/field");

        for (var sub_i = 0; sub_i < subFieldList.length; sub_i++) {
          var subFieldListData = subFieldList[sub_i];
          var th_id = subFieldListData.getAttribute("id");
          var th_width = subFieldListData.getAttribute("width");
          var th_height = subFieldListData.getAttribute("height");
          var th_name = subFieldListData.getAttribute("name");
          var th_tit = subFieldListData.getAttribute("tit");
          var th_cls = subFieldListData.getAttribute("cls");
          var th_style = PD_Mask.fnNVL(subFieldListData.getAttribute("style"));
          var th_sort = subFieldListData.getAttribute("sort");
          var th_type = subFieldListData.getAttribute("type");
          var th_req = subFieldListData.getAttribute("req");
          var th_align = subFieldListData.getAttribute("align");
          var th_mask = subFieldListData.getAttribute("mask");
          var th_len = subFieldListData.getAttribute("len");
          var th_edit = subFieldListData.getAttribute("edit");
          var th_resize = subFieldListData.getAttribute("resize");
          var th_render = PD_Mask.fnNVL(subFieldListData.getAttribute("render"));
          var h_style = PD_Mask.fnNVL(subFieldListData.getAttribute("h_style"));

          if (th_width == 0) {
            th_name = "";
            h_style += "display: none;";
            th_style += "display: none;";
          }

          fixed_table.append("    <col id='" + listId + "_COL" + i + "' width='" + th_width + "' style='" + h_style + "' clon='header_cu" + clon_id + "' />       \r\n");

          fixed_thead_sub.append("  <th width='" + th_width + "' clon='cu" + clon_id + "' style='" + h_style + "' id='" + listId + "_" + th_id + "_H'           \r\n");
          fixed_thead_sub.append("    th_id='" + th_id + "' th_tit='" + th_tit + "' th_cls='header " + th_cls + "' th_style='" + th_style + "' th_req='" + th_req + "'  \r\n");
          fixed_thead_sub.append("    th_type='" + th_type + "' th_align='" + th_align + "' th_mask='" + th_mask + "' th_len='" + th_len + "' th_edit='" + th_edit + "' \r\n");
          fixed_thead_sub.append("    th_width='" + th_width + "' th_height='" + th_height + "' th_render='" + th_render + "' \r\n");
          fixed_thead_sub.append("  >\r\n");
          fixed_thead_sub.append(th_name);
          fixed_thead_sub.append("  </th>");

          fixed_tbody_table.append("  <col id='" + listId + "_BODY_COL" + i + "' width='" + th_width + "' style='" + h_style + "' clon='data_header_cu" + clon_id + "' />\r\n");
          fixed_tbody_thead.append("  <th width='" + th_width + "' clon='data_th_cu" + clon_id + "' style='" + h_style + "' id='" + listId + "_" + th_id + "_TBODY_H'   \r\n");
          fixed_tbody_thead.append("  >\r\n");
          fixed_tbody_thead.append("    </th>\r\n");

          clon_index++;
          fixed_width += parseInt(th_width, 10);
        }
      } else {
        // SINGLE HEADER
        fixed_table.append("    <col id='" + listId + "_COL" + i + "' width='" + th_width + "' style='" + h_style + "' clon='header_cu" + clon_id + "' />       \r\n");

        fixed_tbody_table.append("  <col id='" + listId + "_BODY_COL" + i + "' width='" + th_width + "' style='" + h_style + "' clon='data_header_cu" + clon_id + "' />\r\n");
        fixed_tbody_thead.append("  <th width='" + th_width + "' clon='data_th_cu" + clon_id + "' style='" + h_style + "' id='" + listId + "_" + th_id + "_TBODY_H'   \r\n");
        fixed_tbody_thead.append("  >\r\n");
        fixed_tbody_thead.append("  </th>\r\n");

        clon_index++;
        fixed_width += parseInt(th_width, 10);
      }
    }

    fixed_table.append("  </colgroup>\r\n");
    fixed_thead.append("  </tr>\r\n");

    // ########################## 틀고정 병합 추가중
    if (fixed_thead_sub.toString().length > 0) {
      fixed_thead.append("  <tr>\r\n");
      fixed_thead.append(fixed_thead_sub.toString());
      fixed_thead.append("  </tr>\r\n");
    }

    fixed_thead.append("  </thead>\r\n");
    fixed_table.append(fixed_thead.toString());
    fixed_table.append("  </table>\r\n");

    fixed_tbody_thead.append("  </tr>\r\n");
    fixed_tbody_thead.append("  </thead>\r\n");

    fixed_tbody_table.append("  </colgroup>\r\n");
    fixed_tbody_table.append(fixed_tbody_thead.toString());
    fixed_tbody_table.append("  <tbody id='" + listId + "_TBODY_FIXED'></tbody>\r\n");
    fixed_tbody_table.append("  </table>\r\n");
  }
  // ================= Fixed Ended

  // ================= List Started
  list_table.append(" <table width='100%' border='0' cellspacing='0' cellpadding='0' id='" + listId + "_TBL_LIST' class='" + cls + "'>\r\n");
  list_table.append(" <caption>" + caption + "</caption>\r\n");
  list_table.append(" <colgroup>\r\n");
  list_thead.append(" <thead>\r\n");
  list_thead.append(" <tr>\r\n");

  list_tbody_table.append(" <table width='100%' border='0' cellspacing='0' cellpadding='0' id='" + listId + "_TBL_TBODY_LIST' class='" + cls + "' style='border-top-width:0px;'>\r\n");
  list_tbody_table.append(" <caption>" + caption + "</caption>\r\n");
  list_tbody_table.append(" <colgroup>\r\n");
  list_tbody_thead.append(" <thead style='display: none;'>\r\n");
  list_tbody_thead.append(" <tr style='display:none;'>\r\n");

  for (var i = fixed; i < colCnt; i++) {
    var th_id = gridFields[i]["id"];
    var th_width = gridFields[i]["width"];
    var th_height = gridFields[i]["height"];
    var th_name = gridFields[i]["name"];
    var th_tit = gridFields[i]["tit"];
    var th_cls = gridFields[i]["cls"];
    var th_style = PD_Mask.fnNVL(gridFields[i]["style"]);
    var th_sort = gridFields[i]["sort"];
    var th_type = gridFields[i]["type"];
    var th_req = gridFields[i]["req"];
    var th_align = gridFields[i]["align"];
    var th_mask = gridFields[i]["mask"];
    var th_len = gridFields[i]["len"];
    var th_edit = gridFields[i]["edit"];
    var th_resize = gridFields[i]["resize"];
    var th_render = PD_Mask.fnNVL(gridFields[i]["render"]);

    var h_style = PD_Mask.fnNVL(gridFields[i]["h_style"]);

    var th_rowspan = PD_Mask.fnNVL(gridFields[i]["rowspan"], 1);
    var th_colspan = PD_Mask.fnNVL(gridFields[i]["colspan"], 1);

    th_sort = typeof th_sort != "undefined" ? th_sort : 'N';

    if (th_width == 0) {
      th_name = "";
      h_style += "display: none;";
      th_style += "display: none;";
    }

//    alert("th_width : " + th_width + "\r\nth_sort : " + th_sort);
    var sortScript = '';
//    if (th_width > 0 && th_sort == 'Y') {
    if(th_sort == 'Y') {
      h_style += " cursor:pointer!important;";
      sortScript = "javascript:PD_GridUtils.fnSorting('" + listId + "', '" + sort + "', '" + ctrlFn + "', '" + th_id + "', '" + i + "', '" + th_mask + "');";
    }

    var clon_id = listId + clon_index;

    list_thead.append("     <th width='" + th_width + "' clon='cu" + clon_id + "' style='" + h_style + "' id='" + listId + "_" + th_id + "_H'           \r\n");
    list_thead.append("       th_id='" + th_id + "' th_tit='" + th_tit + "' th_cls='header " + th_cls + "' th_style='" + th_style + "' th_req='" + th_req + "'  \r\n");
    list_thead.append("       th_type='" + th_type + "' th_align='" + th_align + "' th_mask='" + th_mask + "' th_len='" + th_len + "' th_edit='" + th_edit + "' \r\n");
    list_thead.append("       th_width='" + th_width + "' th_height='" + th_height + "' th_render='" + th_render + "' \r\n");

    // ########################## 일반 병합 추가중
    if (th_rowspan > 1) {
      list_thead.append("     rowspan='" + th_rowspan + "'  \r\n");
    }
    if (th_colspan > 1) {
      list_thead.append("     colspan='" + th_colspan + "'  \r\n");
    }

    if (th_resize != 'N') {
      list_thead.append("   onmouseover=\"javascript:PD_GridUtils.fnHeaderOver(this, '" + listId + "');\" onmouseout=\"javascript:PD_GridUtils.fnHeaderOut(this, '" + listId + "');\" \r\n");
    }
    if (sortScript != '') {
      list_thead.append("   onclick=\"" + sortScript + "\" \r\n");
    }
    list_thead.append("     >\r\n");

    if (th_type == 'checkbox') {
      list_thead.append("<input type='checkbox' name='" + th_id + "' id='" + (th_id + 0) + "' value='' onclick='PD_GridUtils.fnListCheckAll(\"" + listId + "\", \"" + listId + "_TBODY_LIST\", \"" + th_id + "\", \""
          + ctrlFn + "\", \"" + activeBgType + "\")' />");
    } else {
      list_thead.append(th_name);
    }

    //if (th_width > 0 && th_sort == 'Y') {
    if(th_sort == 'Y') {
      list_thead.append("&nbsp;<i class='fa fa-sort hand orderby' id='" + th_id + "_H_SORT' sidx='" + th_id + "'></i>");
    }

    list_thead.append("   </th>\r\n");

    // @@@@@@@@@ 일반 병합 먼저 진행
    if (th_colspan > 1) {
      // GROUP HEADER
      var subFieldList = DJ_Xml.getNode(gridFields[i], "/field[@id='" + th_id + "']/field");
      for (var sub_i = 0; sub_i < subFieldList.length; sub_i++) {
        var subFieldListData = subFieldList[sub_i];
        var th_id = subFieldListData.getAttribute("id");
        var th_width = subFieldListData.getAttribute("width");
        var th_height = subFieldListData.getAttribute("height");
        var th_name = subFieldListData.getAttribute("name");
        var th_tit = subFieldListData.getAttribute("tit");
        var th_cls = subFieldListData.getAttribute("cls");
        var th_style = PD_Mask.fnNVL(subFieldListData.getAttribute("style"));
        var th_sort = subFieldListData.getAttribute("sort");
        var th_type = subFieldListData.getAttribute("type");
        var th_req = subFieldListData.getAttribute("req");
        var th_align = subFieldListData.getAttribute("align");
        var th_mask = subFieldListData.getAttribute("mask");
        var th_len = subFieldListData.getAttribute("len");
        var th_edit = subFieldListData.getAttribute("edit");
        var th_resize = subFieldListData.getAttribute("resize");
        var th_render = PD_Mask.fnNVL(subFieldListData.getAttribute("render"));

        var h_style = PD_Mask.fnNVL(subFieldListData.getAttribute("h_style"));

        if (th_width == 0) {
          th_name = "";
          h_style += "display: none;";
          th_style += "display: none;";
        }

        list_table.append("   <col id='" + listId + "_COL" + i + "' width='" + th_width + "' style='" + h_style + "' clon='header_cu" + clon_id + "' />       \r\n");

        list_thead_sub.append(" <th width='" + th_width + "' clon='cu" + clon_id + "' style='" + h_style + "' id='" + listId + "_" + th_id + "_H'           \r\n");
        list_thead_sub.append("   th_id='" + th_id + "' th_tit='" + th_tit + "' th_cls='header " + th_cls + "' th_style='" + th_style + "' th_req='" + th_req + "'  \r\n");
        list_thead_sub.append("   th_type='" + th_type + "' th_align='" + th_align + "' th_mask='" + th_mask + "' th_len='" + th_len + "' th_edit='" + th_edit + "' \r\n");
        list_thead_sub.append("   th_width='" + th_width + "' th_height='" + th_height + "' th_render='" + th_render + "' \r\n");
        list_thead_sub.append(" >\r\n");
        list_thead_sub.append(th_name);
        list_thead_sub.append(" </th>");

        list_tbody_table.append(" <col id='" + listId + "_BODY_COL" + i + "' width='" + th_width + "' style='" + h_style + "' clon='data_header_cu" + clon_id + "' />\r\n");
        list_tbody_thead.append(" <th width='" + th_width + "' clon='data_th_cu" + clon_id + "' style='" + h_style + "' id='" + listId + "_" + th_id + "_TBODY_H'   \r\n");
        list_tbody_thead.append(" >\r\n");
        list_tbody_thead.append(" </th>\r\n");

        clon_index++;
      }
    } else {
      // SINGLE HEADER
      list_table.append("     <col id='" + listId + "_COL" + i + "' width='" + th_width + "' style='" + h_style + "' clon='header_cu" + clon_id + "' />       \r\n");

      list_tbody_table.append(" <col id='" + listId + "_BODY_COL" + i + "' width='" + th_width + "' style='" + h_style + "' clon='data_header_cu" + clon_id + "' />\r\n");
      list_tbody_thead.append(" <th width='" + th_width + "' clon='data_th_cu" + clon_id + "' style='" + h_style + "' id='" + listId + "_" + th_id + "_TBODY_H'   \r\n");
      list_tbody_thead.append(" >\r\n");
      list_tbody_thead.append(" </th>\r\n");

      clon_index++;
    }

    // clon_index++;

  }

  list_table.append(" </colgroup>\r\n");
  list_thead.append(" </tr>\r\n");

  // ########################## 일반 병합 추가중
  // alert(list_thead_sub.toString().length);
  if (list_thead_sub.toString().length > 0) {
    list_thead.append(" <tr>\r\n");
    list_thead.append(list_thead_sub.toString());
    list_thead.append(" </tr>\r\n");
  }

  list_thead.append(" </thead>\r\n");
  list_table.append(list_thead.toString());
  list_table.append(" </table>\r\n");

  list_tbody_thead.append(" </tr>\r\n");
  list_tbody_thead.append(" </thead>\r\n");

  list_tbody_table.append(" </colgroup>\r\n");
  list_tbody_table.append(list_tbody_thead.toString());
  list_tbody_table.append(" <tbody id='" + listId + "_TBODY_LIST'></tbody>\r\n");
  list_tbody_table.append(" </table>\r\n");
  // ================= List Ended

  var screen_width = wFixYn == 'Y' ? parseInt(width, 10) : jQuery('#ctrl_' + listId).width();
  if (screen_width == 0) {
    screen_width = jQuery(window).width() - PD_Grid.quick_menu_width;
  } else {
    screen_width = screen_width; // 여백
  }

  // 일단!!!!!!
  fixed_width += fixed_width == 0 ? 0 : PD_Grid.fiexd_padding_width;

  var minus_width = fixed_width == 0 ? PD_Grid.fiexd_padding_width : 4;
  var fixed_style = fixed_width == 0 ? "display: none;" : "";

  // alert("fixed_width : " + fixed_width + "\r\nfixed_style : " + fixed_style);

  var scroll_width = screen_width - fixed_width - minus_width - listMargin;
  scroll_width = scroll_width + 2;

  // alert("screen_width : " + screen_width + "\r\nfixed_width : " + fixed_width
  // + "\r\nscroll_width : " + scroll_width);

  var list_width = scroll_width;
  var list_width_px = list_width + 'px';

  // 최종 일단 변경.
  var box_width_px = "100%";
  var box_width = "100%";
  if (fixed_yn == 'Y') {
    // var list_width_px = scroll_width+'px';
  } else {
    list_width_px = "100%";
  }
  
  
//  alert(listId + "_TBL_LIST_BOX");
  
  // #################### FIXED & LIST 합치기
  div_sb.append("<div id='" + listId + "_TBL_LIST_BOX' event='" + event + "' ctrlFn='" + ctrlFn + "' sort='" + sort + "' activeBgType='" + activeBgType + "' style='width:" + box_width_px + "; '>  \r\n");
  div_sb.append(" <table width='" + box_width + "' height='100%' border='0' cellspacing='0' cellpadding='0' id='" + listId + "_TBL_BOX' class='ne_fixed_box'> \r\n");
  div_sb.append(" <colgroup>                          \r\n");
  // div_sb.append(" <col id='"+listId+"_FIXED_COL' width='"+fixed_width+"'
  // style='"+fixed_style+"' /> \r\n");
  
  div_sb.append("   <col id='" + listId + "_FIXED_COL' style='width:" + fixed_width + "px; " + fixed_style + "' />  \r\n");
  div_sb.append("   <col width='" + PD_Grid.fiexd_padding_width + "' style='" + fixed_style + "' />       \r\n");
  // 일단 변경
  // div_sb.append(" <col style='"+box_width+"' /> \r\n");
  div_sb.append("   <col />             \r\n");
  div_sb.append(" </colgroup>                         \r\n");

  // HEADER EDGE
  div_sb.append(" <tr>                      \r\n");
  div_sb.append("   <td valign='top' style='" + fixed_style + "'> \r\n");
  div_sb.append(fixed_table.toString() + "        \r\n");
  div_sb.append("   </td>                   \r\n");
  div_sb.append("   <td style='" + fixed_style + "'></td>     \r\n");
  div_sb.append("   <td valign='top'>             \r\n");
  // div_sb.append(" <div id='"+listId+"_TBL_LIST_HEADER_SCROLL'
  // class='scroll_white' style=' width:"+list_width_px+"; overflow:hidden;
  // '>\r\n");
  div_sb.append("     <div id='" + listId + "_TBL_LIST_HEADER_SCROLL' class='scroll_white' style='width:" + list_width_px + "; overflow-y:hidden; overflow-x:hidden;'>\r\n");
  div_sb.append(list_table.toString());
  div_sb.append("     </div>                  \r\n");
  div_sb.append("   </td>                   \r\n");
  div_sb.append(" </tr>                     \r\n");

  // TBODY EDGE
  div_sb.append(" <tr>                      \r\n");
  div_sb.append("   <td valign='top' style='" + fixed_style + "'> \r\n");
  // div_sb.append(" <div id='"+listId+"_TBL_FIXED_EDGE'> \r\n");

  if (fixed_yn == 'Y') {
    div_sb.append("   <div id='" + listId + "_TBL_FIXED_SCROLL' class='scroll_white' style='height:" + (height + 10) + "px; overflow-x:scroll; overflow-y:hidden;'>\r\n");
    div_sb.append(fixed_tbody_table.toString());
    div_sb.append("   </div>                  \r\n");
  } else {
    div_sb.append(fixed_tbody_table.toString());
  }
  // div_sb.append(" </div> \r\n");
  div_sb.append("   </td>                   \r\n");
  div_sb.append("   <td style='" + fixed_style + "'></td>     \r\n");
  div_sb.append("   <td valign='top'>             \r\n");
  div_sb.append("     <div id='" + listId + "_TBL_LIST_SCROLL' style='width:" + list_width_px + "; height:" + (height + 10) + "px; overflow:auto; '>\r\n");
  div_sb.append(list_tbody_table.toString());
  div_sb.append("     </div>                  \r\n");
  div_sb.append("   </td>                   \r\n");
  div_sb.append(" </tr>                     \r\n");
  div_sb.append(" </table>                    \r\n");
  div_sb.append("</div>                     \r\n");

  return div_sb.toString();
};

/**
 * 갤러리화면 HTML
 */
PD_GridJson.makeScreenGallery_HTML = function(xmlGalleryInfo, xmlGalleryField, listId, caption, width, height, event, ctrlFn) {

  var cls = xmlGalleryInfo.getAttribute("cls");

  var g_field_sb = new StringBuilder();

  g_field_sb.append("[");
  for (var i = 0; i < xmlGalleryField.length; i++) {
    if (i > 0)
      g_field_sb.append(",");

    g_field_sb.append("{");
    g_field_sb.append(" id    : '" + xmlGalleryField[i].getAttribute('id') + "',");
    g_field_sb.append(" alt_id  : '" + xmlGalleryField[i].getAttribute('alt_id') + "',");
    g_field_sb.append(" name    : '" + xmlGalleryField[i].getAttribute("name") + "',");
    g_field_sb.append(" align : '" + xmlGalleryField[i].getAttribute('align') + "',");
    g_field_sb.append(" width   : '" + xmlGalleryField[i].getAttribute("width") + "',");
    g_field_sb.append(" height   : '" + xmlGalleryField[i].getAttribute("height") + "',");
    g_field_sb.append(" tit   : '" + xmlGalleryField[i].getAttribute('tit') + "',");
    g_field_sb.append(" mask  : '" + xmlGalleryField[i].getAttribute('mask') + "',");
    g_field_sb.append(" type  : '" + xmlGalleryField[i].getAttribute('type') + "',");
    g_field_sb.append(" cls   : '" + xmlGalleryField[i].getAttribute('cls') + "',");
    g_field_sb.append(" style : '" + xmlGalleryField[i].getAttribute('style') + "'");
    g_field_sb.append("}");
  }
  g_field_sb.append("];");

  var div_sb = new StringBuilder();
  div_sb.append(" <div id='" + listId + "_TBL_GALLERY_HEADER' g_width='" + width + "' g_height='" + height + "' g_cls='" + cls + "' g_event='" + event + "' g_ctrlFn='" + ctrlFn + "' style='display:none;'>  \r\n");
  div_sb.append(g_field_sb.toString());
  div_sb.append(" </div>  \r\n");

  div_sb.append(" <div id='" + listId + "_TBL_GALLERY_BOX'>   \r\n");

  div_sb.append("   <div class='sami_autoheight_350 b scroll_tops m pos_r'> \r\n");
  div_sb.append("     <div class='d_wrap'>                \r\n");
  div_sb.append("       <div class='d_wrap hide' id='gallery'>      \r\n");
  div_sb.append("         <div class='' id=''>검색을 하십시오.</div> \r\n");
  div_sb.append("       </div>                      \r\n");
  div_sb.append("     </div>                        \r\n");
  div_sb.append("   </div>                          \r\n");

  div_sb.append(" </div>                            \r\n");

  return div_sb.toString();
};

/**
 * 그리드 리사이징 HTML
 */
PD_GridJson.makeGridResizable_HTML = function(listId) {
  var div_sb = new StringBuilder();

  div_sb.append(" <div class='grid_drag_y_bar' id='" + listId + "_LIST_RESIZABLE_BAR'>  \r\n");
  // div_sb.append(" <div id='"+listId+"_LIST_RESIZABLE' class='_drag_button
  // _dragable bar_y_gride'> \r\n");
  div_sb.append("   <div id='" + listId + "_LIST_RESIZABLE' class='bar_y_gride'>  \r\n");
  div_sb.append("     <a href='javascript:;' style='cursor:ns-resize;'>&nbsp;&nbsp;</a> \r\n");
  div_sb.append("   </div> \r\n");
  div_sb.append(" </div> \r\n");

  return div_sb.toString();
};

/**
 * 갤러리 & 리스트 & 틀고정 HTML
 */
PD_GridJson.makeScreenListTop_HTML = function(layoutPath, gridFields, listId, listType, ctrlFn, galleryYn, configYn, countInfoYn) {

  var div_sb = new StringBuilder();

  if (listType == 'LIST') {
    // #################### 갤러리 & 리스트 & 틀고정 등
    if (!countInfoYn && countInfoYn != 'N') {
      div_sb.append(" <span class='line_nowrap'>  ");
      div_sb.append("   <span class='line_nowrap'>      ");
      div_sb.append("     <span style='margin-top:14px'>조회된 자료수 <span id='" + listId + "_TOT_CNT'>0</span>건</span>  ");
      div_sb.append("     <span>  ");
      div_sb.append("       <select name='" + listId + "_pageLimit' id='" + listId + "_pageLimit' style='width:100px;'  ");
      div_sb.append("           onchange=\"javascript:PD_GridUtils.fnPaginateLimit('" + listId + "', this.value, '" + ctrlFn + "');\"> ");
      div_sb.append("         <option value='10'>10개씩보기</option>  ");
      div_sb.append("         <option value='50'>50개씩보기</option>  ");
      div_sb.append("         <option value='100'>100개씩보기</option>  ");
      div_sb.append("         <option value='300'>300개씩보기</option>  ");
      div_sb.append("         <option value='500'>500개씩보기</option>  ");
      div_sb.append("       </select> ");
      div_sb.append("     </span> ");
    }

    /*
     * div_sb.append(" <span class='line_nowrap' id='"+listId+"_Fixed'> ");
     * div_sb.append(" <select id='"+listId+"_ComboFixed' style='width:180px' >
     * "); div_sb.append(" <option value=''>없음</option> "); var colCnt =
     * gridFields.length; for(var i=0; i<colCnt; i++) { var th_width =
     * gridFields[i].getAttribute("width"); var th_name =
     * gridFields[i].getAttribute("name"); if(th_width > 0) { div_sb.append("
     * <option value='"+i+"'>"+th_name+"</option> "); } } div_sb.append("
     * </select> "); div_sb.append(" <span> "); div_sb.append(" <button
     * type='button' class='btn btn-xs btn-default'
     * onclick='PD_GridUtils.fnSetTheadFixd(\""+layoutPath+"\", \""+listId+"\");'
     * >틀고정</button> "); div_sb.append(" </span> "); div_sb.append(" </span>
     * ");
     */

    if (galleryYn && galleryYn == 'Y') {
      div_sb.append("   <span>&nbsp; | &nbsp;</span>  ");
      div_sb.append("   <span>  ");
      // div_sb.append(" <button type='button' class='btn btn-xs btn-default'
      // id='btnLIST' onclick=\"PD_GridUtils.fnListView('LIST', '"+listId+"');\"
      // > ");
      div_sb.append("     <button type='button' class='btn btn-xs btn-default-gray' id='btnLIST'  onclick=\"PD_GridUtils.fnListView('LIST', '" + listId + "');\" >   ");
      div_sb.append("       <i class='fa fa-list' style='font-size:13px'></i> ");
      div_sb.append("       리스트 ");
      div_sb.append("     </button> ");
      // div_sb.append(" <button type='button' class='btn btn-xs btn-default'
      // id='btnGALLERY' onclick=\"PD_GridUtils.fnListView('GALLERY',
      // '"+listId+"');\" > ");
      div_sb.append("     <button type='button' class='btn btn-xs btn-default-gray' id='btnGALLERY' onclick=\"PD_GridUtils.fnListView('GALLERY', '" + listId + "');\" >  ");
      div_sb.append("       <i class='fa fa-picture-o' style='font-size:13px'></i>  ");
      div_sb.append("       갤러리 ");
      div_sb.append("     </button> ");
      div_sb.append("   </span>     ");
    }

    if (!configYn && configYn != 'N') {
      div_sb.append("   <span>&nbsp; | &nbsp;</span>  ");
      div_sb.append("   <span>  ");
      // div_sb.append(" <button type='button' class='btn btn-xs btn-default'
      // id='btnGridConfigSetting'
      // onclick=\"PD_Common.fnPopGridConfigSetting('"+listId+"',
      // '"+layoutPath+"');\"> ");
      div_sb.append("     <button type='button' class='btn btn-xs btn-default-gray' id='btnGridConfigSetting' onclick=\"PD_Common.fnPopGridConfigSetting('" + listId + "', '" + layoutPath + "');\"> ");
      div_sb.append("       <i class='fa fa-cog'></i> ");
      div_sb.append("       환경설정  ");
      div_sb.append("     </button> ");
      div_sb.append("   </span> ");
    }

    div_sb.append(" </span>   ");
  } else {
    // #################### 갤러리 & 리스트 & 틀고정 등

  }

  return div_sb.toString();
};

/**
 * 페이징 관련함수
 */
PD_GridJson.makeScreenListPaging_HTML = function(listId, listType, pageYn, pageLimit, pageDisplay, ctrlFn) {

  var div_sb = new StringBuilder();

  div_sb.append(" <div id='" + listId + "_TBL_PAGING' pageYn='" + pageYn + "' pageLimit='" + pageLimit + "' pageDisplay='" + pageDisplay + "' ctrlFn='" + ctrlFn
      + "' style='width:100%; display:inline-block; text-align:center;'></div> \r\n");

  return div_sb.toString();
};

/**
 * Frame resize
 */
PD_GridJson.fnFrameResize = function(arrParams) {

  switch (arrParams['type']) {
    case 'frame_horizontal_two_division':
      var leftClass = 'frame-left';
      var rightClass = 'frame-right';
      var wrapperWidth = parseFloat(jQuery(".frame-wrapper").width(), 10) - 30;
      var wrapperHalfWidth = parseFloat(wrapperWidth/2, 10);
      
      // 가로 2분할 프레임 리사이징
      var wrapperWidth = jQuery(".frame-wrapper").width();
      var frameLeftWidth = jQuery(".frame-left").width();
      var frameCenterWidth = jQuery(".frame-center").width();
      var frameRightWidth = jQuery(".frame-right").width();
      var changeRightWidth = wrapperWidth - frameLeftWidth - frameCenterWidth;
  
      
//      console.log("changeRightWidth : " + changeRightWidth);
//      jQuery(".frame-right").width(changeRightWidth);
      jQuery("." + leftClass).width(wrapperHalfWidth);
      jQuery("." + rightClass).width(wrapperHalfWidth);
  
      break;
    default:
      break;
  }
};
