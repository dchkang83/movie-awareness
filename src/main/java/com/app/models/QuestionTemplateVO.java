package com.app.models;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@SuppressWarnings("serial")
public class QuestionTemplateVO extends ResponseVO {

  private String questionSrl;
  private String questionName;
  private String questionDescription;
  private String questionType;
  private String itemSrl;
  private String itemName;
  private String itemDescription;
  private String sortNumber;
  private String choiceMaxLimit;
  
}
