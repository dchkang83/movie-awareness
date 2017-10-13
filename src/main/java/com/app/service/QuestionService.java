package com.app.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.app.common.models.TreeVO;
import com.app.mapper.awareness.QuestionMapper;
import com.app.models.QuestionListRequestVO;
import com.app.models.QuestionListVO;
import com.app.models.QuestionVO;

@Service
public class QuestionService {

  @Resource
  private QuestionMapper questionMapper;

  public List<QuestionListVO> getQuestionList(QuestionListRequestVO questionListRequestVO) throws Exception {
    return questionMapper.getQuestionList(questionListRequestVO);
  }
  
  public int getQuestionListTotalCount(QuestionListRequestVO questionListRequestVO) {
    return questionMapper.getQuestionListTotalCount(questionListRequestVO);
  }
  
  public QuestionVO getQuestion(String questionSrl) throws Exception {
    return questionMapper.getQuestion(questionSrl);
  }
  
  public int insertQuestion(QuestionVO questionVO) throws Exception {
    return questionMapper.insertQuestion(questionVO);
  }
  
  public int updateQuestion(QuestionVO questionVO) throws Exception {
    return questionMapper.updateQuestion(questionVO);
  }
  
  public int deleteQuestion(String questionSrl) throws Exception {
    return questionMapper.deleteQuestion(questionSrl);
  }

  public List<TreeVO> getQuestionItemTree(String surveySrl) throws Exception {
    return questionMapper.getQuestionItemTree(surveySrl);
  }
  
}
