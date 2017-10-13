package com.app.models;

import com.app.common.models.ResponseCommonVO;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@SuppressWarnings("serial")
public class ResponseVO extends ResponseCommonVO {
  
  private String createdUserSrl;
  
  private String createdAt;
  
  private String updatedUserSrl;
  
  private String updatedAt;
}

