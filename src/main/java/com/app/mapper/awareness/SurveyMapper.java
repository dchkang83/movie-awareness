package com.app.mapper.awareness;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.app.models.SurveyListRequestVO;
import com.app.models.SurveyVO;

@Repository
public interface SurveyMapper {
  
  public List<SurveyVO> getSurveyList(SurveyListRequestVO surveyListRequestVO);
  
  public int getSurveyListTotalCount(SurveyListRequestVO surveyListRequestVO);
  
  public SurveyVO getSurvey(String surveySrl);
  
  public int insertSurvey(SurveyVO surveyVO);
  
  public int updateSurvey(SurveyVO surveyVO);
  
  public int deleteSurvey(String surveySrl);


}
