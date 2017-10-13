package com.app.service;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.app.common.models.TreeVO;
import com.app.mapper.awareness.QuestionTemplateMapper;
import com.app.models.QuestionTemplateListRequestVO;
import com.app.models.QuestionTemplateListVO;
import com.app.models.QuestionTemplateVO;

@Service
public class QuestionTemplateService {

  @Resource
  private QuestionTemplateMapper questionTemplateMapper;

  public List<QuestionTemplateListVO> getQuestionTemplateList(QuestionTemplateListRequestVO questionTemplateListRequestVO) throws Exception {
    return questionTemplateMapper.getQuestionTemplateList(questionTemplateListRequestVO);
  }
  
  public int getQuestionTemplateListTotalCount(QuestionTemplateListRequestVO questionTemplateListRequestVO) {
    return questionTemplateMapper.getQuestionTemplateListTotalCount(questionTemplateListRequestVO);
  }
  
  public QuestionTemplateVO getQuestionTemplate(String questionSrl) throws Exception {
    return questionTemplateMapper.getQuestionTemplate(questionSrl);
  }
  
  public int insertQuestionTemplate(QuestionTemplateVO questionTemplateVO) throws Exception {
    return questionTemplateMapper.insertQuestionTemplate(questionTemplateVO);
  }
  
  public int updateQuestionTemplate(QuestionTemplateVO questionTemplateVO) throws Exception {
    return questionTemplateMapper.updateQuestionTemplate(questionTemplateVO);
  }
  
  public int deleteQuestionTemplate(String questionSrl) throws Exception {
    return questionTemplateMapper.deleteQuestionTemplate(questionSrl);
  }

  public List<TreeVO> getQuestionTemplateItemTree(String surveySrl) throws Exception {
    return questionTemplateMapper.getQuestionTemplateItemTree(surveySrl);
  }
  
}
