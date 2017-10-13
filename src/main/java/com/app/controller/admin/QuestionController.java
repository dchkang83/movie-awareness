/**
 *  질문지 관리 - Controller
 *
 * @author kang.deokjoon
 * @version 1.0
 * @since 2017-07-04
 */
package com.app.controller.admin;

import java.util.List;
import java.util.Map;

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
import com.app.models.QuestionListRequestVO;
import com.app.models.QuestionListVO;
import com.app.models.QuestionVO;
import com.app.service.QuestionService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@Api(value = "QuestionController", tags = "질문지 관리")
@RequestMapping("/admin")
public class QuestionController extends CommonRestController {
  
  @Resource
  private QuestionService questionService;
  
  @ApiOperation(value = "질문지 관리 - 리스트", notes = "질문지 리스트")
  @GetMapping(path = "/questions")
  public ResponseEntity<ResponseListVO> getQuestionListSearch(@Valid QuestionListRequestVO questionListRequestVO) throws Exception {
    
    List<QuestionListVO> list = questionService.getQuestionList(questionListRequestVO);
    int totalCount = questionService.getQuestionListTotalCount(questionListRequestVO);

    log.debug("list : {}", list);
    log.debug("list.toString : {}", list.toString());
    
    ResponseListVO responseListVO = new ResponseListVO(totalCount, questionListRequestVO.getPageNumber(), questionListRequestVO.getPageLimit(), list);
    
    return new ResponseEntity<ResponseListVO>(responseListVO, HttpStatus.OK);
  }
  
  @ApiOperation(value = "질문지 관리 - 상세", notes = "질문지 상세")
  @GetMapping(path = "/questions/{questionSrl}")
  public ResponseEntity<QuestionVO> getQuestionDetailSearch(@PathVariable String questionSrl) throws Exception {
    
    QuestionVO result = questionService.getQuestion(questionSrl);
    
    return new ResponseEntity<QuestionVO>(result, HttpStatus.OK);
  }
  
  @ApiOperation(value = "질문지 관리 - 등록", notes = "질문지 등록")
  @PostMapping(path = "/questions")
  public ResponseEntity insertQuestion(@Valid QuestionVO questionVO) throws Exception {
    
    int result = questionService.insertQuestion(questionVO);
    log.debug("### insertQuestion / questionSrl >> {}", questionVO.getQuestionSrl());
    
    return new ResponseEntity(result, HttpStatus.OK);
  }
  
  @ApiOperation(value = "질문지 관리 - 수정", notes = "질문지 수정")
  @PutMapping(path = "/questions/{questionSrl}", produces = "application/json")
//  @PutMapping(path = "/questions", produces = "application/json")
  public ResponseEntity<String> updateQuestion(@PathVariable String questionSrl, @RequestBody @Valid QuestionVO questionVO) throws Exception {
//  public ResponseEntity<String> updateQuestion(@RequestBody @Valid QuestionVO questionVO) throws Exception {
    
    System.out.println("questionVO.getQuestionName() : " + questionVO.getQuestionName());
    System.out.println("questionVO.toString() : " + questionVO.toString());
    
    int result = questionService.updateQuestion(questionVO);
    
    
    final HttpHeaders httpHeaders= new HttpHeaders();
    httpHeaders.setContentType(MediaType.APPLICATION_JSON);
    
//    return new ResponseEntity(HttpStatus.OK);
    return new ResponseEntity<String>("{\"test\": \"jsonResponseExample\"}", httpHeaders, HttpStatus.OK);
  }
  
  @ApiOperation(value = "질문지 관리 - 삭제", notes = "질문지 삭제")
  @DeleteMapping(path = "/questions/{questionSrl}")
  public ResponseEntity deleteQuestion(@PathVariable String questionSrl) throws Exception {
    
    int result = questionService.deleteQuestion(questionSrl);
    
    return new ResponseEntity(HttpStatus.OK);
  }

  @ApiOperation(value = "질문지/항목 - 트리", notes = "질문지/항목 트리")
  @GetMapping(path = "/questions/items/tree/{surveySrl}")
  public ResponseEntity<List<TreeVO>> getQuestionItemTree(@PathVariable String surveySrl) throws Exception {
    
    List<TreeVO> list = questionService.getQuestionItemTree(surveySrl);
    
    log.debug("list : {}", list);
    log.debug("list.toString : {}", list.toString());
    
//    ResponseListVO responseListVO = new ResponseListVO(0, 0, 0, list);
    
    return new ResponseEntity<List<TreeVO>>(list, HttpStatus.OK);
  }
}
