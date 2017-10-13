/**
 *  질문지 템플릿 관리 - Controller
 *
 * @author kang.deokjoon
 * @version 1.0
 * @since 2017-07-04
 */
package com.app.controller.admin;

import java.util.List;

import javax.annotation.Resource;
import javax.validation.Valid;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.common.controller.CommonRestController;
import com.app.common.models.ResponseListVO;
import com.app.common.models.TreeVO;
import com.app.models.QuestionTemplateListRequestVO;
import com.app.models.QuestionTemplateListVO;
import com.app.models.QuestionTemplateVO;
import com.app.service.QuestionTemplateService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@Api(value = "QuestionTemplateController", tags = "질문지 템플릿 관리")
@RequestMapping("/admin")
public class QuestionTemplateController extends CommonRestController {
  
  @Resource
  private QuestionTemplateService questionTemplateService;
  
  @ApiOperation(value = "질문지 템플릿 관리 - 리스트", notes = "질문지 템플릿 리스트")
  @GetMapping(path = "/template/questions")
  public ResponseEntity<ResponseListVO> getQuestionTemplateListSearch(@Valid QuestionTemplateListRequestVO questionTemplateListRequestVO) throws Exception {
    
    List<QuestionTemplateListVO> list = questionTemplateService.getQuestionTemplateList(questionTemplateListRequestVO);
    int totalCount = questionTemplateService.getQuestionTemplateListTotalCount(questionTemplateListRequestVO);
    
    log.debug("list : {}", list);
    log.debug("list.toString : {}", list.toString());
    
    ResponseListVO responseListVO = new ResponseListVO(totalCount, questionTemplateListRequestVO.getPageNumber(), questionTemplateListRequestVO.getPageLimit(), list);
    
    return new ResponseEntity<ResponseListVO>(responseListVO, HttpStatus.OK);
  }
  
  @ApiOperation(value = "질문지 템플릿 관리 - 상세", notes = "질문지 템플릿 상세")
  @GetMapping(path = "/template/questions/{questionSrl}")
  public ResponseEntity<QuestionTemplateVO> getQuestionTemplateDetailSearch(@PathVariable String questionSrl) throws Exception {
    
    QuestionTemplateVO result = questionTemplateService.getQuestionTemplate(questionSrl);
    
    return new ResponseEntity<QuestionTemplateVO>(result, HttpStatus.OK);
  }
  
  @ApiOperation(value = "질문지 템플릿 관리 - 등록", notes = "질문지 템플릿 등록")
  @PostMapping(path = "/template/questions")
  public ResponseEntity insertQuestionTemplate(@Valid QuestionTemplateVO questionTemplateVO) throws Exception {
    
    int result = questionTemplateService.insertQuestionTemplate(questionTemplateVO);
    log.debug("### insertQuestionTemplate / questionSrl >> {}", questionTemplateVO.getQuestionSrl());
    
    return new ResponseEntity(result, HttpStatus.OK);
  }
  
  @ApiOperation(value = "질문지 템플릿 관리 - 수정", notes = "질문지 템플릿 수정")
  @PutMapping(path = "/template/questions/{questionSrl}", produces = "application/json")
//  @PutMapping(path = "/template/questions", produces = "application/json")
  public ResponseEntity<String> updateQuestionTemplate(@PathVariable String questionSrl, @RequestBody @Valid QuestionTemplateVO questionTemplateVO) throws Exception {
//  public ResponseEntity<String> updateQuestionTemplate(@RequestBody @Valid QuestionTemplateVO questionTemplateVO) throws Exception {
    
    System.out.println("questionTemplateVO.getQuestionTemplateName() : " + questionTemplateVO.getQuestionName());
    System.out.println("questionTemplateVO.toString() : " + questionTemplateVO.toString());
    
    int result = questionTemplateService.updateQuestionTemplate(questionTemplateVO);
    
    
    final HttpHeaders httpHeaders= new HttpHeaders();
    httpHeaders.setContentType(MediaType.APPLICATION_JSON);
    
//    return new ResponseEntity(HttpStatus.OK);
    return new ResponseEntity<String>("{\"test\": \"jsonResponseExample\"}", httpHeaders, HttpStatus.OK);
  }
  
  @ApiOperation(value = "질문지 템플릿 관리 - 삭제", notes = "질문지 템플릿 삭제")
  @DeleteMapping(path = "/template/questions/{questionSrl}")
  public ResponseEntity deleteQuestionTemplate(@PathVariable String questionSrl) throws Exception {
    
    int result = questionTemplateService.deleteQuestionTemplate(questionSrl);
    
    return new ResponseEntity(HttpStatus.OK);
  }

  @ApiOperation(value = "질문지 템플릿/항목 - 트리", notes = "질문지 템플릿/항목 트리")
  @GetMapping(path = "/template/questions/items/tree/{surveySrl}")
  public ResponseEntity<List<TreeVO>> getQuestionTemplateItemTree(@PathVariable String surveySrl) throws Exception {
    
    List<TreeVO> list = questionTemplateService.getQuestionTemplateItemTree(surveySrl);
    
    log.debug("list : {}", list);
    log.debug("list.toString : {}", list.toString());
    
//    ResponseListVO responseListVO = new ResponseListVO(0, 0, 0, list);
    
    return new ResponseEntity<List<TreeVO>>(list, HttpStatus.OK);
  }
}
