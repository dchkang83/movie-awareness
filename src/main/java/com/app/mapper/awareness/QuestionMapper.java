package com.app.mapper.awareness;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.app.common.models.TreeVO;
import com.app.models.QuestionListRequestVO;
import com.app.models.QuestionListVO;
import com.app.models.QuestionVO;

@Repository
public interface QuestionMapper {
  
  public List<QuestionListVO> getQuestionList(QuestionListRequestVO questionListRequestVO);
  
  public int getQuestionListTotalCount(QuestionListRequestVO questionListRequestVO);
  
  public QuestionVO getQuestion(String questionSrl);
  
  public int insertQuestion(QuestionVO questionVO);
  
  public int updateQuestion(QuestionVO questionVO);
  
  public int deleteQuestion(String questionSrl);
  
  public List<TreeVO> getQuestionItemTree(String surveySrl);
  
}
