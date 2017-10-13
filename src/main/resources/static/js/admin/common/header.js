/**
 * onLoad Event
 */
jQuery(document).ready(function() {
	
	var l_active_menu	= null;
	jQuery('div.navi_edge ul li').mouseover(function() {
		PD_Common.fnMenuOn(jQuery('div.navi_edge ul li'), jQuery(this), 'action');
    });
    jQuery('div.navi_edge ul li').mouseout(function() {
    	PD_Common.fnMenuOut(jQuery('div.navi_edge ul li'), 'default', 'action');
    	if(l_active_menu != null) {
    		PD_Common.fnMenuOn(jQuery('div.navi_edge ul li'), l_active_menu, 'action');
    	}
    });
    jQuery('div.navi_edge ul li a').click(function() {
        jQuery('div.navi_edge ul li a').each(function() {
        	jQuery(this).removeClass('active_on');
        });
        
    	jQuery(this).addClass('active_on');
    	l_active_menu	= jQuery(this).parent().parent();
    });
});

jQuery(function(){
	floatBox("#header_menu");
	function floatBox(ele, flag) {
		var box = jQuery(ele);
		var fixed_box_offset = box.offset();
		var box_size = {"width": "99%", "height":  box.height()};
		var footer_box_offset = jQuery("#footer").offset();
		jQuery(window).scroll(function() {
			var win_height 		= jQuery(window).height();
			var contents_height = jQuery('#ADMIN_MAIN_CONTENTS').height();
			var footer_height 	= jQuery('#footer').height();
			
//			jQuery('#ADMIN_MAIN_CONTENTS').scrollTop();
			jQuery('#footer').height(260);
			
			// 컨텐츠 내용이 스크롤 탑시에 0보다 작아질 경우 에러 방지
			var scroll_val = jQuery(this).scrollTop();
			if(scroll_val > fixed_box_offset.top) {
				if(box.css("top") != 0) {
					box.css({
						"position": "fixed",
						"z-index": 80,
						"width": box_size.width,
						"height": box_size.height,
						"top": 0,
						"bottom": "auto"
					});
				}
				if(flag == 1) {
					if(scroll_val > (footer_box_offset.top - box_size.height)) {
						//スタイルを追加
						if(box.css("bottom") != 0) {
							box.css({
								"position": "absolute",
								"z-index": 80,
								"width": box_size.width,
								"height": box_size.height,
								"top": "auto",
								"bottom": 0
							});
						}
					}
				}
			} 
			else {
				box.removeAttr("style");
			}
		});
	}
});
    