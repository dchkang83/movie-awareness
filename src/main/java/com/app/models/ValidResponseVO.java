package com.app.models;

import com.app.common.models.ResponseCommonVO;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@SuppressWarnings("serial")
public class ValidResponseVO extends ResponseVO {
  
  private Boolean isValid;
  
}

