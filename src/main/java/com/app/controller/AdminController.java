/**
 * 어드민 Controller
 *
 * @author kang.deokjoon
 * @version 1.0
 * @since 2017-07-11
 */
package com.app.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.extern.slf4j.Slf4j;

@Controller
@RequestMapping("/admin")
@Slf4j
public class AdminController {

  @GetMapping("/login")
  public String login() {
    log.info("/admin/login");
    return "/admin/login";
  }

  @GetMapping("/logout")
  public void logout() {
    log.info("/admin/logout");
  }

  @GetMapping("/index")
  public String index(Model model) {
    log.info("/admin/index");
    
    
    model.addAttribute("val1", "attributeValue 111");
    
    return "/admin/index";
  }
  
  @GetMapping("/nomal-grid-list")
  public String nomalList() {
    log.info("/admin/contents/nomal-grid-list");
    return "/admin/contents/nomal-grid-list";
  }

  @GetMapping("/fiexd-grid-list")
  public String fiexdList() {
    log.info("/admin/contents/fiexd-grid-list");
    return "/admin/contents/fiexd-grid-list";
  }
  
  

  @GetMapping("/question/question-mang")
  public String questionManage() {
    log.info("질문지 관리");
    return "/admin/contents/question-mang";
  }
  
  @GetMapping("/question/question-list")
  public String questionList() {
    log.info("질문지 리스트");
    return "/admin/contents/question-list";
  }
  
  @GetMapping("/question/question-form1")
  public String questionForm1() {
    log.info("질문지 Form1");
    return "/admin/contents/question-form1";
  }
  
  @GetMapping("/question/question-form2")
  public String questionForm2() {
    log.info("질문지 Form2");
    return "/admin/contents/question-form2";
  }

  @GetMapping("/question-template/question-template-mang")
  public String questionTemplateManage() {
    log.info("질문지 템플릿 관리");
    return "/admin/contents/question-template-mang";
  }
  
  @GetMapping("/question-template/question-template-list")
  public String questionTemplateList() {
    log.info("질문지 템플릿 리스트");
    return "/admin/contents/question-template-list";
  }
  
  @GetMapping("/question-template/question-template-form1")
  public String questionTemplateForm1() {
    log.info("질문지 템플릿 Form1");
    return "/admin/contents/question-template-form1";
  }
  
  @GetMapping("/question-template/question-template-form2")
  public String questionTemplateForm2() {
    log.info("설문조사상세 Form2");
    return "/admin/contents/question-template-form2";
  }
  
  @GetMapping("/survey/survey-mang")
  public String surveyManage() {
    log.info("설문조사관리");
    return "/admin/contents/survey-mang";
  }
  
  @GetMapping("/survey/survey-list")
  public String surveyList() {
    log.info("설문조사리스트");
    return "/admin/contents/survey-list";
  }
  
  @GetMapping("/survey/survey-form1")
  public String surveyForm1() {
    log.info("설문조사상세 Form1");
    return "/admin/contents/survey-form1";
  }
  
  @GetMapping("/survey/survey-form2")
  public String surveyForm2() {
    log.info("설문조사상세 Form2");
    return "/admin/contents/survey-form2";
  }
  
  @GetMapping("/survey/target-list")
  public String targetList() {
    log.info("설문대상자");
    return "/admin/contents/target-list";
  }
  
  @GetMapping("/survey/mssql3-member-list")
  public String mssql3MemberList() {
    log.info("설문대상자");
    return "/admin/contents/mssql3-member-list";
  }
  
}
