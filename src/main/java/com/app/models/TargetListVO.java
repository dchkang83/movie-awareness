package com.app.models;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@SuppressWarnings("serial")
public class TargetListVO extends TargetVO {

  private String surveyName;
  private String genderName;
}
