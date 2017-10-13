package com.app.models;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@SuppressWarnings("serial")
public class SurveyVO extends ResponseVO {

  private String surveySrl;
  
  private String surveyName;
  
  private String surveyDescription;
  
  private String surveyStatus;
  
  private String startDate;
  
  private String endDate;
  
  private String blMale10;
  private String blMale20;
  private String blMale30;
  private String blMale40;
  private String blMale50;
  
  private String blFemale10;
  private String blFemale20;
  private String blFemale30;
  private String blFemale40;
  private String blFemale50;
  
  private boolean isBlock;
  
  private boolean isFinish;
}
