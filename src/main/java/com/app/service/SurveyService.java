package com.app.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.app.mapper.awareness.ItemMapper;
import com.app.mapper.awareness.QuestionMapper;
import com.app.mapper.awareness.QuestionTemplateMapper;
import com.app.mapper.awareness.SurveyMapper;
import com.app.models.QuestionTemplateListVO;
import com.app.models.QuestionVO;
import com.app.models.SurveyListRequestVO;
import com.app.models.SurveyVO;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class SurveyService {

  @Resource
  private SurveyMapper surveyMapper;

  @Resource
  private QuestionMapper questionMapper;

  @Resource
  private QuestionTemplateMapper questionTemplateMapper;

  @Resource
  private ItemMapper itemMapper;

  public List<SurveyVO> getSurveyList(SurveyListRequestVO surveyListRequestVO) throws Exception {
    return surveyMapper.getSurveyList(surveyListRequestVO);
  }
  
  public int getSurveyListTotalCount(SurveyListRequestVO surveyListRequestVO) {
    return surveyMapper.getSurveyListTotalCount(surveyListRequestVO);
  }
  
  public SurveyVO getSurvey(String surveySrl) throws Exception {
    return surveyMapper.getSurvey(surveySrl);
  }
  
  public int insertSurvey(SurveyVO surveyVO) throws Exception {
    
    int result = 0;
    
    result += surveyMapper.insertSurvey(surveyVO);
//    log.debug("survey_srl : {}", surveyVO.getSurveySrl());
    
    List<QuestionTemplateListVO> questionList = questionTemplateMapper.getQuestionTemplateListAll();
    
    for(QuestionTemplateListVO questionTemplateListVO : questionList) {
      QuestionVO questionVO = new QuestionVO();
      questionVO.setQuestionName(questionTemplateListVO.getQuestionName());
      questionVO.setQuestionDescription(questionTemplateListVO.getQuestionDescription());
      questionVO.setQuestionType(questionTemplateListVO.getQuestionType());
      questionVO.setSortNumber(questionTemplateListVO.getSortNumber());
      questionVO.setChoiceMaxLimit(questionTemplateListVO.getChoiceMaxLimit());
      questionVO.setSurveySrl(surveyVO.getSurveySrl());
      
      result += questionMapper.insertQuestion(questionVO);
//      log.debug("question_srl : {}", questionVO.getQuestionSrl());

      Map<String, String> paramMap = new HashMap<String, String>();
      paramMap.put("questionSrl", questionVO.getQuestionSrl());
      paramMap.put("templateQuestionSrl", questionTemplateListVO.getQuestionSrl());
      
      result += itemMapper.insertItemDumy(paramMap);
    }
    
    return result;
  }
  
  public int updateSurvey(SurveyVO surveyVO) throws Exception {
    return surveyMapper.updateSurvey(surveyVO);
  }
  
  public int deleteSurvey(String surveySrl) throws Exception {
    return surveyMapper.deleteSurvey(surveySrl);
  }
  
}
