/**
 *  고객용 설문입출력
 *
 * @author choi.junghyun
 * @version 1.0
 * @since 2017-07-18
 */
package com.app.controller.customer;

import java.io.IOException;
import java.util.List;

import javax.annotation.Resource;
import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.common.controller.CommonRestController;
import com.app.models.QuestionRequestVO;
import com.app.models.QuestionVO;
import com.app.models.SurveyVO;
import com.app.models.AnswerRequestVO;
import com.app.models.AnswerResponseVO;
import com.app.service.CustomerService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import com.app.models.ValidRequestVO;
import com.app.models.ValidResponseVO;


@RestController
@Slf4j
@Api(value = "SurveyController", tags = "고객 - 설문입출력")
@RequestMapping("/api/customer")
public class SurveyController2 extends CommonRestController {
  
  @Resource
  private CustomerService customerService;
  
  @ApiOperation(value = "고객설문 - 설문로드", notes = "조사코드 / 스텝")
  @GetMapping(path = "/survey/{surveyId}/{step}")
  public ResponseEntity<List<QuestionVO>> getQuestion(@PathVariable String surveyId, @PathVariable String step) throws Exception {    
	  log.debug("###### QUESTION LOAD - surveyId : {}, step : {}", surveyId, step);
	  
	  QuestionRequestVO params = new QuestionRequestVO();
	  params.setSurveyId(surveyId);
	  params.setStep(step);
	
	  List<QuestionVO> result = customerService.getQuestion(params);
	  
	  return new ResponseEntity<List<QuestionVO>>(result, HttpStatus.OK);
  }
  
  @ApiOperation(value = "고객설문 - surveyId, memberId 검증", notes = "조사코드, 멤버코드")
  @GetMapping(path = "/valid/{surveyId}/{memberId}")
  public ResponseEntity<ValidResponseVO> valid(@PathVariable String surveyId, @PathVariable String memberId) throws Exception {	  
	  log.debug("### Validtion surveyId : {}, memberId : {}", surveyId, memberId);
	  
	  ValidRequestVO params = new ValidRequestVO();
	  params.setSurveyId(surveyId);
	  params.setMemberId(memberId);
	  
	  ValidResponseVO result = new ValidResponseVO();
	  result.setIsValid(false);
	  
	  if (surveyId.length() < 1 || memberId.length() < 1) {
		result.setIsValid(false);
	  } else {	 
		int cnt = customerService.valid(params);
		if (cnt >= 1) {
			result.setIsValid(true);
		}
	  }
	  
	  return new ResponseEntity<ValidResponseVO>(result, HttpStatus.OK);
  }
  
  @ApiOperation(value = "고객설문 - 답변처리", notes = "조사코드/멤버아이디/스텝(질문지)/답변코드")
  @PostMapping(path = "/survey/answer/")
  public ResponseEntity<AnswerResponseVO> answer(@Valid AnswerRequestVO answerRequestVO) throws Exception {
	//log.debug("###### Answer Requested: {}, item Size: {}", answerRequestVO.toString(), answerRequestVO.getItemSrls().length);
	log.debug("###### Answer Requested");

	AnswerResponseVO result = new AnswerResponseVO();
    result.setIsSuccess(true);
    
    //return new ResponseEntity<AnswerResponseVO>(result, HttpStatus.OK);
    
	String[] itemSrls = answerRequestVO.getItemSrls();
	for (int i=0; i<itemSrls.length; i++) {
		log.debug("#### ANSWERED ITEM IS : {}", itemSrls[i]);
		
		answerRequestVO.setItemSrl(itemSrls[i]);
				
		int effectedRow = customerService.answer(answerRequestVO);
	    if (effectedRow == 0) {
	      result.setIsSuccess(false);
	    }
	}
    
    log.debug("###### result : {}", result.toString());
    
    return new ResponseEntity<AnswerResponseVO>(result, HttpStatus.OK);
  }
}
