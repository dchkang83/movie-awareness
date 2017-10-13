/**
 * 공통 Controller
 *
 * @author kang.deokjoon
 * @version 1.0
 * @since 2017-07-11
 */
package com.app.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import lombok.extern.slf4j.Slf4j;

@Controller
@Slf4j
public class CommonController {
  
  @GetMapping("/")
  public String home() {
    log.info("/");
    return "/home";
  }
  
  @GetMapping("/about")
  public String about() {
    log.info("/about");
    return "/about";
  }

  @GetMapping("/403")
  public String error403() {
    log.info("/403");
    return "/error/403";
  }

//  @RequestMapping("/common/grid/pop-grid-config-setting")
//  @RequestMapping(value = "/common/grid/pop-grid-config-setting", method = {RequestMethod.POST,RequestMethod.GET}, produces = {MediaType.TEXT_HTML_VALUE})
//  @RequestMapping(value = "/common/grid/pop-grid-config-setting", method = RequestMethod.POST, produces = "text/html")
//  @PostMapping("/common/grid/pop-grid-config-setting")
  @PostMapping("/common/grid/pop-grid-config-setting")
  public String popGridConfigSetting(Model model, HttpServletRequest request) {
    log.info("/pop-grid-config-setting");
    
    log.info("glb_list_id : {}", request.getParameter("listId"));
    log.info("glb_xml_path : {}", request.getParameter("xmlPath"));
    log.info("glb_pop_layer_id : {}", request.getParameter("pop_layer_id"));
    
    return "/admin/contents/common/pop-grid-config-setting";
  }


}
