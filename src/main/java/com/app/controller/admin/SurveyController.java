/**
 *  설문관리 - Controller
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
import com.app.models.SurveyListRequestVO;
import com.app.models.SurveyVO;
import com.app.service.SurveyService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@Api(value = "SurveyController", tags = "설문관리")
@RequestMapping("/admin")
public class SurveyController extends CommonRestController {
  
  @Resource
  private SurveyService surveyService;
  
  @ApiOperation(value = "설문관리 - 리스트", notes = "설문 리스트")
  @GetMapping(path = "/surveys")
  public ResponseEntity<ResponseListVO> getSurveyListSearch(@Valid SurveyListRequestVO surveyListRequestVO) throws Exception {
    
    List<SurveyVO> list = surveyService.getSurveyList(surveyListRequestVO);
    int totalCount = surveyService.getSurveyListTotalCount(surveyListRequestVO);
    
    ResponseListVO responseListVO = new ResponseListVO(totalCount, surveyListRequestVO.getPageNumber(), surveyListRequestVO.getPageLimit(), list);
    
    return new ResponseEntity<ResponseListVO>(responseListVO, HttpStatus.OK);
  }
  
  @ApiOperation(value = "설문관리 - 상세", notes = "설문 상세")
  @GetMapping(path = "/surveys/{surveySrl}")
  public ResponseEntity<SurveyVO> getSurveyDetailSearch(@PathVariable String surveySrl) throws Exception {
    
    SurveyVO result = surveyService.getSurvey(surveySrl);
    
    return new ResponseEntity<SurveyVO>(result, HttpStatus.OK);
  }
  
  @ApiOperation(value = "설문관리 - 등록", notes = "설문 등록")
  @PostMapping(path = "/surveys")
  public ResponseEntity insertSurvey(@Valid SurveyVO surveyVO) throws Exception {
    
    int result = surveyService.insertSurvey(surveyVO);
    log.debug("### insertSurvey / surveySrl >> {}", surveyVO.getSurveySrl());
    
    return new ResponseEntity(result, HttpStatus.OK);
  }
  
  @ApiOperation(value = "설문관리 - 수정", notes = "설문 수정")
  @PutMapping(path = "/surveys/{surveySrl}", produces = "application/json")
//  @PutMapping(path = "/surveys", produces = "application/json")
  public ResponseEntity<String> updateSurvey(@PathVariable String surveySrl, @RequestBody @Valid SurveyVO surveyVO) throws Exception {
//  public ResponseEntity<String> updateSurvey(@RequestBody @Valid SurveyVO surveyVO) throws Exception {
    
    System.out.println("surveyVO.getSurveyName() : " + surveyVO.getSurveyName());
    System.out.println("surveyVO.toString() : " + surveyVO.toString());
    
    int result = surveyService.updateSurvey(surveyVO);
    
    
    final HttpHeaders httpHeaders= new HttpHeaders();
    httpHeaders.setContentType(MediaType.APPLICATION_JSON);
    
//    return new ResponseEntity(HttpStatus.OK);
    return new ResponseEntity<String>("{\"test\": \"jsonResponseExample\"}", httpHeaders, HttpStatus.OK);
  }
  
  @ApiOperation(value = "설문관리 - 삭제", notes = "설문 삭제")
  @DeleteMapping(path = "/surveys/{surveySrl}")
  public ResponseEntity deleteSurvey(@PathVariable String surveySrl) throws Exception {
    
    int result = surveyService.deleteSurvey(surveySrl);
    
    return new ResponseEntity(HttpStatus.OK);
  }
}
