package com.app.models;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@SuppressWarnings("serial")
public class AnswerRequestVO {
  
  private String surveyId;
  private String memberId;
  private String questionSrl; 
  private String[] itemSrls;
  private String itemSrl;

}

