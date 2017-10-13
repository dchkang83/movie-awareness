package com.app.models;

import com.app.common.models.ResponseCommonVO;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@SuppressWarnings("serial")
public class ValidRequestVO {
  
  private String surveyId; 
  private String memberId;

}

