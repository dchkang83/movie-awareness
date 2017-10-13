package com.app.mapper.awareness;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.app.common.models.TreeVO;
import com.app.models.QuestionTemplateListRequestVO;
import com.app.models.QuestionTemplateListVO;
import com.app.models.QuestionTemplateVO;

@Repository
public interface QuestionTemplateMapper {
  
  public List<QuestionTemplateListVO> getQuestionTemplateList(QuestionTemplateListRequestVO questionTemplateListRequestVO);
  
  public int getQuestionTemplateListTotalCount(QuestionTemplateListRequestVO questionTemplateListRequestVO);
  
  public QuestionTemplateVO getQuestionTemplate(String questionSrl);
  
  public int insertQuestionTemplate(QuestionTemplateVO questionTemplateVO);
  
  public int updateQuestionTemplate(QuestionTemplateVO questionTemplateVO);
  
  public int deleteQuestionTemplate(String questionSrl);
  
  public List<TreeVO> getQuestionTemplateItemTree(String surveySrl);
  
  public List<QuestionTemplateListVO> getQuestionTemplateListAll();
}
