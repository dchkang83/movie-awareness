package com.app.models;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@SuppressWarnings("serial")
public class QuestionRequestVO {
  
  private String surveyId; 
  private String step;

}

