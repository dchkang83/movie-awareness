package com.app.models;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@SuppressWarnings("serial")
public class QuestionTemplateListVO extends QuestionTemplateVO {

  private String surveyName;
}
