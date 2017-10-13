/**
 * NAME : PD_GridData.js
 * DESC : 데이터를 화면에 뿌려주는 함수 모음
 * VER  : 1.0
 * Copyright 2015 덕준님 Group All rights reserved
 * ============================================================================================
 *                변   경   사   항
 * ============================================================================================
 * VERSION    DATE    AUTHOR    DESCRIPTION
 * ============================================================================================
 * 1.0    2015.03.16    kang d.j  최초작성
 */

PD_GridData = function() { };

/**
 * 서버로 부터 받은 데이터를 화면에 display한다.
 */
PD_GridData.setListData = function(id, data, dataType) {
	this.setDataListJSON(id, data, dataType);
	
	// 라인 Hover 이벤트 - 현재 안씀.
	PD_GridUtils.fnTrHover(id);
	
	// 라인 Click 이벤트
	PD_GridUtils.fnTrClick(id);
};

/**
 * 서버로 부터 받은 데이터를 화면에 display한다. (미구현)
 */
PD_GridData.setListDataXML = function(jsonData) {
	
};

/**
 * List row 데이터를 만든다.
 */
PD_GridData.setDataListJSON = function (id, jsonData, dataType) {
	
	if(dataType == 'LIST') {
		PD_GridUtils.removeListAllRow(id,	dataType);
		
		if(jsonData) {
			this.setDataListJSON_HTML(id,	jsonData);
		}
	}
	else if(dataType == 'GALLERY') {
		PD_GridUtils.removeListAllRow(id,	dataType);
		
		if(jsonData) {
			this.setDataGalleryJSON_HTML(id,	jsonData);
		}
	}
	else if(dataType == 'LIST,GALLERY') {
		PD_GridUtils.removeListAllRow(id,	dataType);
		
		if(jsonData) {
			this.setDataListJSON_HTML(id, 		jsonData);
			this.setDataGalleryJSON_HTML(id,	jsonData);
		}
	}
};

/**
 * List row 데이터를 만든다.
 */
PD_GridData.setDataListJSON_HTML = function (listId, jsonData) {
	
	var objTblBox	= PD_GridUtils.getObject(listId+"_TBL_LIST_BOX");
	var event		= null;
	
	try {
		// 호출중에 창 닫으면 에러발생 대응
		event	= objTblBox.getAttribute("event");
	}
	catch(e) {

		// alert('111111111111111111111 setDataListJSON_HTML');
//		alert(e);
//		console.log("PD_GridData.setDataListJSON_HTML Exception[message] : " + e);
//		return;
	  return;
	}
	
	var ctrlFn		= PD_Mask.fnNVL(objTblBox.getAttribute("ctrlFn"));		// 페이징시 호출
                                                                    // 함수
	
	// ###################### Paging variable STARTED
	var objPaging	= PD_GridUtils.getObject(listId+"_TBL_PAGING");
	
	var pageYn		= "N";
	// var ctrlFn = "";
	var totalCount		= jsonData['totalCount'];	// 총건수
	var pageLimit	= 0;	// 페이지제한
	var pageNumber		= 0;	// 현재페이지
	// var pageLimit = 10; // 한페이지에 보여줄 건수
	var pageDisplay	= 10;	// 한화면에 링크 (1,2,3,4,5) 갯수

	if(objPaging) {
		pageYn		= PD_Mask.fnNVL(objPaging.getAttribute("pageYn"));		// 페이징 표시여부
		pageDisplay	= PD_Mask.fnNVL(objPaging.getAttribute("pageDisplay"));	// 한화면에
                                                                        // 링크
                                                                        // (1,2,3,4,5)
                                                                        // 갯수
		// ctrlFn = PD_Mask.fnNVL(objPaging.getAttribute("ctrlFn")); // 페이징시 호출 함수
		pageDisplay	= parseInt(pageDisplay, 10);
		pageDisplay	= (pageDisplay == null || pageDisplay == 'null' || typeof pageDisplay == "undefined" || pageDisplay == '') ? 10 : pageDisplay;
		totalCount		= jsonData['totalCount'];	// 총건수
		
		if(pageYn == 'Y') {
			pageLimit	= jsonData['pageLimit'];// 현재건수
			pageNumber		= jsonData['pageNumber'];	// 현재페이지
		}
		
		PD_GridUtils.fnSetInnerHTML(listId+"_TOT_CNT", PD_Mask.fnGetMaskValue({val:totalCount, dataMask:'M'}));
	}
	// ###################### Paging variable ENDED
	var jsonRows	= jsonData['items'];
	var bClick		= false;
	var bDbClick	= false;
	var eventScript	= "";
	
	if(event != "") {
		var aEvent = event.split(",");
		for(var e=0; e<aEvent.length; e++) {
			if(aEvent[e] == "C") 		bClick		= true;
			else if(aEvent[e] == "D")	bDbClick	= true;
		}
	}
	
	var objFixedTbl	= PD_GridUtils.getObject(listId+"_TBL_FIXED");
	var objListTbl	= PD_GridUtils.getObject(listId+"_TBL_LIST");
	
	var objFixedHD	= null;
	var objFixedHD2	= null;
	var objListHD	= null;
	var objListHD2	= null;
	
	
	var thFixedCnt	= 0;
	var thListCnt	= 0;
	
	var fixed_d_sb	= new StringBuilder();
	var list_d_sb	= new StringBuilder();
	
// alert('objListTbl.rows[0] : ' + objListTbl.rows[0].cells.length);
// alert('objListTbl.rows[1] : ' + objListTbl.rows[1].cells.length);
	
	if(objFixedTbl) {
		objFixedHD	= objFixedTbl.rows[0];
		objFixedHD2	= objFixedTbl.rows[1];
		thFixedCnt	= parseInt(objFixedHD.cells.length, 10);
	}
	
	if(objListTbl) {
		objListHD	= objListTbl.rows[0];
		objListHD2	= objListTbl.rows[1];
		thListCnt	= parseInt(objListHD.cells.length, 10);
	}
	else {
		PD_Utils.MsgBox(listId + "에 해당되는 화면 LIST ID가 없습니다.", "E", "N");
		return;
	}
	
	if(objFixedTbl) {
		for(var rowKey in jsonRows) {
			var rowData	= jsonRows[rowKey];	// ROW [OBJECT]
// alert(JSON.stringify(rowData));
// alert(rowData['company_cd']);
			
			fixed_d_sb.append("<tr>	\r\n");
			
			var twoRowIndexCnt	= 0;
			var colIndex		= 0;
			for(var oneRowIndex=0; oneRowIndex<thFixedCnt; oneRowIndex++) {
				try {
					var colKey	= oneRowIndex;
					var colspan	= objFixedHD.cells[colKey].getAttribute("colspan");
					colspan		= colspan==null ? 1 : parseInt(colspan, 10);
					
					for(var twoRowIndex=0; twoRowIndex<colspan; twoRowIndex++) {
						var objFixedHDCell	= null;
						
						if(colspan > 1) {
							objFixedHDCell	= objFixedHD2.cells[twoRowIndexCnt];
							twoRowIndexCnt++;
						}
						else {
							objFixedHDCell	= objFixedHD.cells[colKey];
						}
						
						var id			= objFixedHDCell.getAttribute("th_id");
						var tit			= objFixedHDCell.getAttribute("th_tit");
						var cls			= objFixedHDCell.getAttribute("th_cls");
						var style		= objFixedHDCell.getAttribute("th_style");
						var type		= objFixedHDCell.getAttribute("th_type");
						var req			= objFixedHDCell.getAttribute("th_req");
						var align		= objFixedHDCell.getAttribute("th_align");
						var mask		= objFixedHDCell.getAttribute("th_mask");
						var edit		= objFixedHDCell.getAttribute("th_edit");
						var th_width	= objFixedHDCell.getAttribute("th_width");
						var th_height	= objFixedHDCell.getAttribute("th_height");
						var th_render	= objFixedHDCell.getAttribute("th_render");
						
						var val	= rowData[id];
						val		= val==null||val=='' ? ' ' : val;
						val		= PD_Mask.fnReplaceStr(val, "<br>", " ");

						align	= align==null||align=='' ? 'center' : align;
						
						eventScript	= "";
						
						if(bClick) {
							eventScript	+= " onclick=\"javascript:PD_GridUtils.fnListEventCtrl('LIST_CLICK', '"+ctrlFn+"', '"+listId+"', '"+id+"', '"+(parseInt(rowKey,10)+1)+"', '"+colIndex+"');\"";
						}
						if(bDbClick) {
							eventScript += " ondblclick=\"javascript:PD_GridUtils.fnListEventCtrl('LIST_DBCLICK', '"+ctrlFn+"', '"+listId+"', '"+id+"', '"+(parseInt(rowKey,10)+1)+"', '"+colIndex+"');\"";
						}
						
						if(th_width == 0) {
							style	+= "display: none;";
						}
						
						if(tit == 'Y') {
							fixed_d_sb.append("	<td title='"+val+"' class='"+cls+"' "+eventScript+" style='text-align:"+align+"; "+style+"'>	");
						}
						else {
							fixed_d_sb.append("	<td class='"+cls+"' "+eventScript+" style='text-align:"+align+"; "+style+"'>	");
						}
						
						if(type == 'num_asc') {
							var rownum	= ( (pageLimit*(pageNumber-1)) + (parseInt(rowKey, 10)+1) );
							fixed_d_sb.append(	PD_Mask.fnGetMaskValue({val:rownum, dataMask:mask})	);
						}
						else if(type == 'num_desc') {
							var rownum	= ( totalCount-(pageLimit*(pageNumber-1)) - (parseInt(rowKey, 10)) );
							fixed_d_sb.append(	PD_Mask.fnGetMaskValue({val:rownum, dataMask:mask})	);
						}
						else {
							fixed_d_sb.append(		this.setField_HTML(type, edit, mask, (parseInt(rowKey,10)+1), id, val, th_width, th_height, th_render, rowData)	);
						}
						
						fixed_d_sb.append("	</td>	\r\n");
	
						colIndex++;
					}
				}
				catch(e) {
					// console.log("id : " + id + "\tmessage : " + e);
				}
			}
			
			fixed_d_sb.append("</tr>	\r\n");
		}
		
		PD_GridUtils.fnSetInnerHTML(listId+"_TBODY_FIXED", fixed_d_sb.toString());
	}
	
	if(objListTbl) {
		for(var rowKey in jsonRows) {
			var rowData	= jsonRows[rowKey];	// ROW [OBJECT]
			list_d_sb.append("<tr>	\r\n");
			
			var twoRowIndexCnt	= 0;
			var colIndex		= 0;
			for(var oneRowIndex=0; oneRowIndex<thListCnt; oneRowIndex++) {
				try {
					var colKey	= oneRowIndex;
					var colspan	= objListHD.cells[colKey].getAttribute("colspan");
					colspan		= colspan==null ? 1 : parseInt(colspan, 10);
					
					for(var twoRowIndex=0; twoRowIndex<colspan; twoRowIndex++) {
						var objListHDCell	= null;
						
						if(colspan > 1) {
							objListHDCell	= objListHD2.cells[twoRowIndexCnt];
							twoRowIndexCnt++;
						}
						else {
							objListHDCell	= objListHD.cells[colKey];
						}
						
						var id			= objListHDCell.getAttribute("th_id");
						var tit			= objListHDCell.getAttribute("th_tit");
						var cls			= objListHDCell.getAttribute("th_cls");
						var style		= objListHDCell.getAttribute("th_style");
						var type		= objListHDCell.getAttribute("th_type");
						var req			= objListHDCell.getAttribute("th_req");
						var align		= objListHDCell.getAttribute("th_align");
						var mask		= objListHDCell.getAttribute("th_mask");
						var edit		= objListHDCell.getAttribute("th_edit");
						var th_width	= objListHDCell.getAttribute("th_width");
						var th_height	= objListHDCell.getAttribute("th_height");
						var th_render	= objListHDCell.getAttribute("th_render");
						
						
						var val	= rowData[id];
						val		= val==null||val=='' ? ' ' : val;
						val		= PD_Mask.fnReplaceStr(val, "<br>", " ");
						
						align	= align==null||align=='' ? 'center' : align;
						
						eventScript	= "";
						
						if(bClick) {
							eventScript	+= " onclick=\"javascript:PD_GridUtils.fnListEventCtrl('LIST_CLICK', '"+ctrlFn+"', '"+listId+"', '"+id+"', '"+(parseInt(rowKey,10)+1)+"', '"+colIndex+"');\"";
						}
						if(bDbClick) {
							eventScript += " ondblclick=\"javascript:PD_GridUtils.fnListEventCtrl('LIST_DBCLICK', '"+ctrlFn+"', '"+listId+"', '"+id+"', '"+(parseInt(rowKey,10)+1)+"', '"+colIndex+"');\"";
						}
						
						if(th_width == 0) {
							style	+= "display: none;";
						}
						
						
						// alert(JSON.stringify(rowData));
						
						if(tit == 'Y') {
							
							// 묶음, 추가 아이콘 텍스트로 대체
							if(~val.indexOf("icon_delivery_group.gif")) {
								title = "[묶음]"+val.replace(/(<([^>]+)>)/ig,"");
							}
							else if(~val.indexOf("icon_add_option.gif")) {
								title = "[추가]"+val.replace(/(<([^>]+)>)/ig,"");
							}							
							else {
								title = val;
							}
							
							list_d_sb.append("	<td width='"+th_width+"' title='"+title+"' class='"+cls+"' "+eventScript+" style='text-align:"+align+"; "+style+"'>	");
						}
						else {
							list_d_sb.append("	<td width='"+th_width+"' class='"+cls+"' "+eventScript+" style='text-align:"+align+"; "+style+"'>	");
						}
						
						if(type == 'num_asc') {
							var rownum	= ( (pageLimit*(pageNumber-1)) + (parseInt(rowKey, 10)+1) );
							list_d_sb.append(	PD_Mask.fnGetMaskValue({val:rownum, dataMask:mask})	);
						}
						else if(type == 'num_desc') {
							var rownum	= ( totalCount-(pageLimit*(pageNumber-1)) - (parseInt(rowKey, 10)) );
							list_d_sb.append(	PD_Mask.fnGetMaskValue({val:rownum, dataMask:mask})	);
						}
						else {
							list_d_sb.append(		this.setField_HTML(type, edit, mask, (parseInt(rowKey,10)+1), id, val, th_width, th_height, th_render, rowData)	);
						}
						
						list_d_sb.append("	</td>	\r\n");
						
						colIndex++;
					}
				}
				catch(e) {
					// console.log("id : " + id + "\tmessage : " + e);
				}
			}
			list_d_sb.append("</tr>	\r\n");
		}
		
		PD_GridUtils.fnSetInnerHTML(listId+"_TBODY_LIST", list_d_sb.toString());
	}
	
	if(objPaging && pageYn == 'Y') {
		var appendHTML	= this.makeScreenListPaging_HTML(listId, totalCount, pageLimit, pageNumber, pageDisplay, ctrlFn);
		PD_GridUtils.fnSetInnerHTML(listId+"_TBL_PAGING", appendHTML);
	}
	
	// ScrollBar catch 후 헤더쪽에도 적용
	PD_GridUtils.fnSetListDataScrollCatch(listId);
};

/**
 * 페이징 관련함수
 */
PD_GridData.makeScreenListPaging_HTML = function(listId, totalCount, pageLimit, pageNumber, pageDisplay, ctrlFn) {
	
  totalCount	= parseInt(PD_Mask.fnNVL2(totalCount, 0), 10);
	
	var html_sb	= new StringBuilder();
	
	if(!pageDisplay || pageDisplay == 0)
		pageDisplay = 10;
	
	var pageindex	= parseInt(totalCount/pageLimit, 10);
	var pagerem		= (totalCount%pageLimit);
	if(pagerem != 0)
		pageindex++;
	
	var preindex	= parseInt((pageNumber-1)/pageDisplay, 10);	// pageDisplay :
                                                        // page인덱스를 몇개씩 보여줄것인지
                                                        // 설정
	var start		= pageDisplay*preindex;					// page 시작번호구하기
	var last		= start + pageDisplay;	// page 종료번호구하기
	
	
//	alert("pageDisplay : " + pageDisplay + "\r\npreindex : " + preindex + "\r\nstart : " + start);
//  alert("start : " + start + "\r\nlast : " + last);
	
	
	if(last >= pageindex)
		last	= pageindex;
	
	/*
   * html_sb.append("<div class='line_nowrap' style='width:100%;'>");
   * html_sb.append(" <span class='paginate9' style='width:100%;'>");
   */
	html_sb.append("	<div class='paginate9'>");
	
	if(totalCount == 0) {
		html_sb.append("	<strong>1</strong>");
	}
	else {
		if(start > 0) {
			html_sb.append("		<a href=\"javascript:PD_GridUtils.fnPaginate('"+listId+"', 1, '"+ctrlFn+"');\" class='paging_link'>FIRST</a>");
			html_sb.append("		<a href=\"javascript:PD_GridUtils.fnPaginate('"+listId+"', "+start+", '"+ctrlFn+"');\" class='paging_link'>PREV</a>");
		}
		else {
			// html_sb.append(" FIRST");
			if(pageNumber > pageDisplay)
				html_sb.append("	<a href=\"javascript:PD_GridUtils.fnPaginate('"+listId+"', "+pageLimit+", '"+ctrlFn+"');\" class='paging_link'>PREV</a>");
			// else
			// html_sb.append(" PREV");
		}
		
		
		for(var i=1+(start); i<=last; i++) {
			if(i == pageNumber)
				html_sb.append("	<strong>"+i+"</strong>");
			else {
				html_sb.append("	<a href=\"javascript:PD_GridUtils.fnPaginate('"+listId+"', "+i+", '"+ctrlFn+"');\" class='paging_link'>"+i+"</a>");
			}
		}
		
		if(last < pageindex) {
			html_sb.append("		<a href=\"javascript:PD_GridUtils.fnPaginate('"+listId+"', "+(last+1)+", '"+ctrlFn+"');\" class='paging_link'>NEXT</a>");
			html_sb.append("		<a href=\"javascript:PD_GridUtils.fnPaginate('"+listId+"', "+(pageindex)+", '"+ctrlFn+"');\" class='paging_link'>LAST</a>");
		}
		else {
			if(pageNumber <= last)
				html_sb.append("		NEXT"	);
			else
				html_sb.append("		<a href=\"javascript:PD_GridUtils.fnPaginate('"+listId+"', "+(pageindex+1)+", '"+ctrlFn+"');\" class='paging_link'>NEXT</a>"	);
			
			html_sb.append("		LAST");
		}
	}
	
	html_sb.append("		총 : " + PD_Mask.fnGetMaskValue({val:totalCount, dataMask:'M'}) + "건");
	html_sb.append("	</span>");
	
	
	/*
   * html_sb.append(" <span class='right_fixed'>"); html_sb.append(" aaa");
   * html_sb.append(" </span>"); html_sb.append("</div>");
   */
	html_sb.append("	</div>");
	
	return html_sb.toString();
};

/**
 * List row 데이터를 만든다.
 */
PD_GridData.setDataGalleryJSON_HTML = function (listId, jsonData) {
	
	var objGalleryHeader	= PD_GridUtils.getObject(listId+"_TBL_GALLERY_HEADER");
	var objGalleryBox		= PD_GridUtils.getObject(listId+"_TBL_GALLERY_BOX");
	
	if(!objGalleryHeader || !objGalleryBox) {
		PD_Utils.MsgBox(listId + "에 해당되는 화면 LIST ID가 없습니다.", "E", "N");
		return;
	}
	
	var g_header	= eval(objGalleryHeader.innerHTML);
	
	var g_width		= objGalleryHeader.getAttribute("g_width");
	var g_height	= objGalleryHeader.getAttribute("g_height");
	var g_cls		= objGalleryHeader.getAttribute("g_cls");
	var g_event		= objGalleryHeader.getAttribute("g_event");
	var g_ctrlFn	= objGalleryHeader.getAttribute("g_ctrlFn");
	
	var bClick		= false;
	var bDbClick	= false;
	var eventScript	= "";
	
	if(g_event != "") {
		var aEvent 		= g_event.split(",");
		for(var e=0; e<aEvent.length; e++) {
			if(aEvent[e] == "C") 		bClick		= true;
			else if(aEvent[e] == "D")	bDbClick	= true;
		}
	}
	
	var jsonRows	= jsonData['items'];
	
	var gallery_d_sb		= new StringBuilder();
	var gallery_image_sb	= new StringBuilder();
	var gallery_desc_sb		= new StringBuilder();
	
	gallery_d_sb.append("	<div id='"+listId+"_TBL_GALLERY_DATA' style='right:150px;'>	\r\n");
	
	if(jsonRows!=null) {
		gallery_d_sb.append("		<div class='"+g_cls+"'>		\r\n");
		
		for(var rowKey in jsonRows) {
			var rowData	= jsonRows[rowKey];	// ROW [OBJECT]
			
			for(var header_idx=0; header_idx<g_header.length; header_idx++) {
				var val		= PD_Mask.fnNVL(eval("rowData."+g_header[header_idx].id));
				val			= PD_Mask.fnGetMaskValue( {val:val, dataMask:g_header[header_idx].mask} );
				
				eventScript	= "";
				if(bClick) {
					eventScript	+= " onclick=\"javascript:PD_GridUtils.fnListEventCtrl('GALLERY_CLICK', '"+g_ctrlFn+"', '"+listId+"', '"+g_header[header_idx].id+"', '"+(parseInt(rowKey,10)+1)+"', '')\";";
				}
				if(bDbClick) {
					eventScript += " ondblclick=\"javascript:PD_GridUtils.fnListEventCtrl('GALLERY_DBCLICK', '"+g_ctrlFn+"', '"+listId+"', '"+g_header[header_idx].id+"', '"+(parseInt(rowKey,10)+1)+"', '')\";";
				}
				
				if(g_header[header_idx].type == 'image') {
					var alt_val	= val;
					if(g_header[header_idx].alt_id) {
						alt_val	= PD_Mask.fnNVL(eval("rowData."+g_header[header_idx].alt_id));;
					}
					
					gallery_image_sb.append("	    <a href='#' "+eventScript+">				\r\n");
					gallery_image_sb.append("	        <img id='gell_img' src='"+val+"' alt='"+alt_val+"' onerror=\"this.onerror=null;this.src=\'/trunk/img/comm/no_image.png\'\">	\r\n");
					gallery_image_sb.append("	    </a>										\r\n");
				}
				else {
					// title tag 표시여부
					var valTit	= "";
					if(g_header[header_idx].tit && g_header[header_idx].tit == 'Y') {
						valTit	= " title='"+val+"'";
					}
					
					// 70byte 이상이면 자른다.
					var valTxt	= val;
					
					var strReg 		= new RegExp("<img*[^>]*\\.(jpg|gif|png)","gim");
					var match_img 	=  valTxt.match(strReg);
					var limit_byte	= (match_img) ? 100 : 70;	// 텍스트에 이미지가 들어있으면, 제한 바이트수를
                                                    // 늘린다.
					
					if(val.fnGetByte() > limit_byte) {
						valTxt	= val.fnCutByte(limit_byte) + "...";
					}
					
					gallery_desc_sb.append("	<div class='"+g_header[header_idx].cls+"' style='"+g_header[header_idx].style+"' "+valTit+" "+eventScript+">"+valTxt+"</div>	\r\n");
				}
			}
			
			gallery_d_sb.append("	<div class='img'>				\r\n");
			gallery_d_sb.append(		gallery_image_sb.toString()	);
			gallery_d_sb.append("	    <div class='desc'>			\r\n");
			gallery_d_sb.append(			gallery_desc_sb.toString()	);
			gallery_d_sb.append("	    </div>						\r\n");
			gallery_d_sb.append("	</div>							\r\n");
			
			gallery_image_sb.clear();
			gallery_desc_sb.clear();
		}
		
		gallery_d_sb.append("		</div>										\r\n");
	}
	else {
		gallery_d_sb.append("		<div style='padding-top: 20px; text-align: center; width:100%;'>		\r\n");
		gallery_d_sb.append("			검색된 정보가 없습니다.	\r\n");
		gallery_d_sb.append("		</div>									\r\n");
	}
	
	gallery_d_sb.append("	</div>											\r\n");
	
	PD_GridUtils.fnSetInnerHTML(listId+"_TBL_GALLERY_BOX", gallery_d_sb.toString());
};

/**
 * List row 데이터를 만든다.
 */
PD_GridData.setField_HTML = function (type, edit, mask, rowIndex, id, val, th_width, th_height, th_render, rowData) {
	
	var field_sb	= new StringBuilder();
	
	var readonly	= "";
	if(type=='checkbox' || type=='radio') {
		readonly	= edit != 'Y' ? "disabled='disabled'" : "";
	}
	else if(type=='text') {
		readonly	= edit != 'Y' ? "readonly='readonly'" : "";
	}
	

	var fn_render	= eval(th_render);
	if(typeof fn_render == 'function') {
		val	= fn_render.call(this, {id:id, val:val, rowIndex:rowIndex, rowData:rowData});
		field_sb.append( val );
	}
	else {
		switch ( type ) {
			case 'checkbox'	:
				field_sb.append("	<input type='checkbox' name='"+id+"' id='"+(id+rowIndex)+"' value='"+val+"' "+readonly+" />	");
				break;
			case 'radio'	:
				field_sb.append("	<input type='radio' name='"+id+"' id='"+(id+rowIndex)+"' value='"+val+"' "+readonly+" />	");
				break;
			case 'text'	:
				field_sb.append("	<input type='text' name='"+id+"' id='"+(id+rowIndex)+"' value='"+PD_Mask.fnGetMaskValue({val:val.trim(), dataMask:mask})+"' "+readonly+" style='width:100%' />	");
				break;
			case 'image'	:
				// field_sb.append( val);
				field_sb.append("	<img id='gell_img' src='"+val+"' height='"+th_height+"px' onerror=\"this.onerror=null;this.src=\'/trunk/img/comm/no_image.png\'\" style='max-width:78px' />	");
				break;
			case 'tag'	:
				field_sb.append(	val	);
				break;
// case '' :
// field_sb.append( PD_Mask.fnGetMaskValue({val:val.trim(), dataMask:mask}) );
// break;
        /*
			default			:
			  // JSON 변경시 추가
			  field_sb.append( PD_Mask.fnGetMaskValue({val:val.trim(), dataMask:mask})  );
				break;
				*/
			default  :
        field_sb.append(" <input type='hidden' name='"+id+"' id='"+(id+rowIndex)+"' value='"+val+"' style='width:10px;' /> ");
        field_sb.append(" <span>"+PD_Mask.fnGetMaskValue({val:val.trim(), dataMask:mask})+"</span> ");
        break;
		}
	}
	
	return field_sb.toString();
};

/**
 * List row 데이터를 만든다.
 */
PD_GridData.addDataListJSON_HTML = function (listId, jsonData) {
	var objTblBox	= PD_GridUtils.getObject(listId+"_TBL_LIST_BOX");
	var event		= objTblBox.getAttribute("event");
	var ctrlFn		= PD_Mask.fnNVL(objTblBox.getAttribute("ctrlFn"));		// 페이징시 호출
                                                                    // 함수
	
	// ###################### Paging variable STARTED
	var objPaging	= PD_GridUtils.getObject(listId+"_TBL_PAGING");
	
	var pageYn		= "N";
	// var ctrlFn = "";
	var totalCount		= jsonData['totalCount'];	// 총건수
	var pageLimit	= 0;	// 현재건수
	var pageNumber		= 0;	// 현재페이지
	// var pageLimit = 10; // 한페이지에 보여줄 건수
	var pageDisplay	= 10;	// 한화면에 링크 (1,2,3,4,5) 갯수
	
	/*
   * if(objPaging) { pageYn = PD_Mask.fnNVL(objPaging.getAttribute("pageYn")); //
   * 페이징 표시여부 pageDisplay = PD_Mask.fnNVL(objPaging.getAttribute("pageDisplay")); //
   * 한화면에 링크 (1,2,3,4,5) 갯수 //ctrlFn =
   * PD_Mask.fnNVL(objPaging.getAttribute("ctrlFn")); // 페이징시 호출 함수 pageDisplay =
   * parseInt(pageDisplay, 10); pageDisplay = (pageDisplay == null ||
   * pageDisplay == 'null' || typeof pageDisplay == "undefined" || pageDisplay ==
   * '') ? 10 : pageDisplay; totalCount = jsonData['totalCount']; // 총건수
   * 
   * if(pageYn == 'Y') { pageLimit = jsonData['pageLimit'];// 현재건수 pageNumber =
   * jsonData['pageNumber']; // 현재페이지 }
   * 
   * PD_GridUtils.fnSetInnerHTML(listId+"_TOT_CNT",
   * PD_Mask.fnGetMaskValue({val:totalCount, dataMask:'M'})); }
   */
	
	// ###################### Paging variable ENDED
	var jsonRows	= jsonData['items'];
	var bClick		= false;
	var bDbClick	= false;
	var eventScript	= "";
	
	if(event != "") {
		var aEvent = event.split(",");
		for(var e=0; e<aEvent.length; e++) {
			if(aEvent[e] == "C") 		bClick		= true;
			else if(aEvent[e] == "D")	bDbClick	= true;
		}
	}
	
	var objFixedTbl	= PD_GridUtils.getObject(listId+"_TBL_FIXED");
	var objListTbl	= PD_GridUtils.getObject(listId+"_TBL_LIST");
	
	var objFixedHD	= null;
	var objFixedHD2	= null;
	var objListHD	= null;
	var objListHD2	= null;
	
	var thFixedCnt	= 0;
	var thListCnt	= 0;
	
	var fixed_d_sb	= new StringBuilder();
	var list_d_sb	= new StringBuilder();
	
// alert('objListTbl.rows[0] : ' + objListTbl.rows[0].cells.length);
// alert('objListTbl.rows[1] : ' + objListTbl.rows[1].cells.length);
	
	if(objFixedTbl) {
		objFixedHD	= objFixedTbl.rows[0];
		objFixedHD2	= objFixedTbl.rows[1];
		thFixedCnt	= parseInt(objFixedHD.cells.length, 10);
	}
	
	if(objListTbl) {
		objListHD	= objListTbl.rows[0];
		objListHD2	= objListTbl.rows[1];
		thListCnt	= parseInt(objListHD.cells.length, 10);
	}
	else {
		PD_Utils.MsgBox(listId + "에 해당되는 화면 LIST ID가 없습니다.", "E", "N");
		return;
	}
	
	if(objFixedTbl) {
		for(var rowKey in jsonRows) {
			var rowData	= jsonRows[rowKey];	// ROW [OBJECT]
			fixed_d_sb.append("<tr>	\r\n");
			
			var twoRowIndexCnt	= 0;
			var colIndex		= 0;
			for(var oneRowIndex=0; oneRowIndex<thFixedCnt; oneRowIndex++) {
				try {
					var colKey	= oneRowIndex;
					var colspan	= objFixedHD.cells[colKey].getAttribute("colspan");
					colspan		= colspan==null ? 1 : parseInt(colspan, 10);
					
					for(var twoRowIndex=0; twoRowIndex<colspan; twoRowIndex++) {
						var objFixedHDCell	= null;
						
						if(colspan > 1) {
							objFixedHDCell	= objFixedHD2.cells[twoRowIndexCnt];
							twoRowIndexCnt++;
						}
						else {
							objFixedHDCell	= objFixedHD.cells[colKey];
						}
						
						var id			= objFixedHDCell.getAttribute("th_id");
						var tit			= objFixedHDCell.getAttribute("th_tit");
						var cls			= objFixedHDCell.getAttribute("th_cls");
						var style		= objFixedHDCell.getAttribute("th_style");
						var type		= objFixedHDCell.getAttribute("th_type");
						var req			= objFixedHDCell.getAttribute("th_req");
						var align		= objFixedHDCell.getAttribute("th_align");
						var mask		= objFixedHDCell.getAttribute("th_mask");
						var edit		= objFixedHDCell.getAttribute("th_edit");
						var th_width	= objFixedHDCell.getAttribute("th_width");
						var th_height	= objFixedHDCell.getAttribute("th_height");
						var th_render	= objFixedHDCell.getAttribute("th_render");
						
						var val	= rowData[id];
						val		= val==null||val=='' ? ' ' : val;
						val		= PD_Mask.fnReplaceStr(val, "<br>", " ");
						
						align	= align==null||align=='' ? 'center' : align;
						
						eventScript	= "";
						
						if(bClick) {
							eventScript	+= " onclick=\"javascript:PD_GridUtils.fnListEventCtrl('LIST_CLICK', '"+ctrlFn+"', '"+listId+"', '"+id+"', '"+(parseInt(rowKey,10)+1)+"', '"+colIndex+"');\"";
						}
						if(bDbClick) {
							eventScript += " ondblclick=\"javascript:PD_GridUtils.fnListEventCtrl('LIST_DBCLICK', '"+ctrlFn+"', '"+listId+"', '"+id+"', '"+(parseInt(rowKey,10)+1)+"', '"+colIndex+"');\"";
						}
						
						if(th_width == 0) {
							style	+= "display: none;";
						}
						
						if(tit == 'Y') {
							fixed_d_sb.append("	<td title='"+val+"' class='"+cls+"' "+eventScript+" style='text-align:"+align+"; "+style+"'>	");
						}
						else {
							fixed_d_sb.append("	<td class='"+cls+"' "+eventScript+" style='text-align:"+align+"; "+style+"'>	");
						}
						
						if(type == 'num_asc') {
							var rownum	= ( (pageLimit*(pageNumber-1)) + (parseInt(rowKey, 10)+1) );
							fixed_d_sb.append(	PD_Mask.fnGetMaskValue({val:rownum, dataMask:mask})	);
						}
						else if(type == 'num_desc') {
							var rownum	= ( totalCount-(pageLimit*(pageNumber-1)) - (parseInt(rowKey, 10)) );
							fixed_d_sb.append(	PD_Mask.fnGetMaskValue({val:rownum, dataMask:mask})	);
						}
						else {
							fixed_d_sb.append(		this.setField_HTML(type, edit, mask, (parseInt(rowKey,10)+1), id, val, th_width, th_height, th_render, rowData)	);
						}
						
						fixed_d_sb.append("	</td>	\r\n");
	
						colIndex++;
					}
				}
				catch(e) {
					// console.log("id : " + id + "\tmessage : " + e);
				}
			}
			
			fixed_d_sb.append("</tr>	\r\n");
		}
		
		// PD_GridUtils.fnSetInnerHTML(listId+"_TBODY_FIXED", fixed_d_sb.toString());
		PD_GridUtils.fnAddInnerHTML(listId+"_TBODY_FIXED", fixed_d_sb.toString());
	}
	
	if(objListTbl) {
		for(var rowKey in jsonRows) {
			var rowData	= jsonRows[rowKey];	// ROW [OBJECT]
			list_d_sb.append("<tr>	\r\n");
			
			var twoRowIndexCnt	= 0;
			var colIndex		= 0;
			for(var oneRowIndex=0; oneRowIndex<thListCnt; oneRowIndex++) {
				try {
					var colKey	= oneRowIndex;
					var colspan	= objListHD.cells[colKey].getAttribute("colspan");
					colspan		= colspan==null ? 1 : parseInt(colspan, 10);
					
					for(var twoRowIndex=0; twoRowIndex<colspan; twoRowIndex++) {
						var objListHDCell	= null;
						
						if(colspan > 1) {
							objListHDCell	= objListHD2.cells[twoRowIndexCnt];
							twoRowIndexCnt++;
						}
						else {
							objListHDCell	= objListHD.cells[colKey];
						}
						
						var id			= objListHDCell.getAttribute("th_id");
						var tit			= objListHDCell.getAttribute("th_tit");
						var cls			= objListHDCell.getAttribute("th_cls");
						var style		= objListHDCell.getAttribute("th_style");
						var type		= objListHDCell.getAttribute("th_type");
						var req			= objListHDCell.getAttribute("th_req");
						var align		= objListHDCell.getAttribute("th_align");
						var mask		= objListHDCell.getAttribute("th_mask");
						var edit		= objListHDCell.getAttribute("th_edit");
						var th_width	= objListHDCell.getAttribute("th_width");
						var th_height	= objListHDCell.getAttribute("th_height");
						var th_render	= objListHDCell.getAttribute("th_render");
						
						var val	= rowData[id];
						val		= val==null||val=='' ? ' ' : val;
						val		= PD_Mask.fnReplaceStr(val, "<br>", " ");
						
						align	= align==null||align=='' ? 'center' : align;
						
						eventScript	= "";
						
						if(bClick) {
							eventScript	+= " onclick=\"javascript:PD_GridUtils.fnListEventCtrl('LIST_CLICK', '"+ctrlFn+"', '"+listId+"', '"+id+"', '"+(parseInt(rowKey,10)+1)+"', '"+colIndex+"');\"";
						}
						if(bDbClick) {
							eventScript += " ondblclick=\"javascript:PD_GridUtils.fnListEventCtrl('LIST_DBCLICK', '"+ctrlFn+"', '"+listId+"', '"+id+"', '"+(parseInt(rowKey,10)+1)+"', '"+colIndex+"');\"";
						}
						
						if(th_width == 0) {
							style	+= "display: none;";
						}
						
						if(tit == 'Y') {
							list_d_sb.append("	<td width='"+th_width+"' title='"+val+"' class='"+cls+"' "+eventScript+" style='text-align:"+align+"; "+style+"'>	");
						}
						else {
							list_d_sb.append("	<td width='"+th_width+"' class='"+cls+"' "+eventScript+" style='text-align:"+align+"; "+style+"'>	");
						}
						
						if(type == 'num_asc') {
							var rownum	= ( (pageLimit*(pageNumber-1)) + (parseInt(rowKey, 10)+1) );
							list_d_sb.append(	PD_Mask.fnGetMaskValue({val:rownum, dataMask:mask})	);
						}
						else if(type == 'num_desc') {
							var rownum	= ( totalCount-(pageLimit*(pageNumber-1)) - (parseInt(rowKey, 10)) );
							list_d_sb.append(	PD_Mask.fnGetMaskValue({val:rownum, dataMask:mask})	);
						}
						else {
							list_d_sb.append(		this.setField_HTML(type, edit, mask, (parseInt(rowKey,10)+1), id, val, th_width, th_height, th_render, rowData)	);
						}
						
						list_d_sb.append("	</td>	\r\n");
						
						colIndex++;
					}
				}
				catch(e) {
					// console.log("id : " + id + "\tmessage : " + e);
				}
			}
			list_d_sb.append("</tr>	\r\n");
		}
		
		// PD_GridUtils.fnSetInnerHTML(listId+"_TBODY_LIST", list_d_sb.toString());
		PD_GridUtils.fnAddInnerHTML(listId+"_TBODY_LIST", list_d_sb.toString());
	}
	
	/*
   * if(objPaging && pageYn == 'Y') { var appendHTML =
   * this.makeScreenListPaging_HTML(listId, totalCount, pageLimit, pageNumber,
   * pageDisplay, ctrlFn); PD_GridUtils.fnSetInnerHTML(listId+"_TBL_PAGING",
   * appendHTML); }
   */
	
	// ScrollBar catch 후 헤더쪽에도 적용
	PD_GridUtils.fnSetListDataScrollCatch(listId);
};
