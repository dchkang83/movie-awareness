package com.app.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.app.mapper.awareness.CustomerMapper;
import com.app.models.QuestionRequestVO;
import com.app.models.QuestionVO;
import com.app.models.ValidRequestVO;
import com.app.models.ValidResponseVO;
import com.app.models.AnswerRequestVO;
import com.app.models.AnswerResponseVO;

@Service
public class CustomerService {

  @Resource
  private CustomerMapper customerMapper;

  public List<QuestionVO> getQuestion(QuestionRequestVO params) throws Exception {
    return customerMapper.getQuestion(params);
  }
  
  public int valid(ValidRequestVO params) throws Exception {
	return customerMapper.valid(params);
  }
  
  public int answer(AnswerRequestVO params) throws Exception {
	return customerMapper.answer(params);
  }
}
