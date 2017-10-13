package com.app.common.models;

import java.io.Serializable;
import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@SuppressWarnings("serial")
public class ResponseListVO implements Serializable {

  private int totalCount;
  
  private int pageNumber;
  
  private int pageLimit;
  
  List<? extends ResponseCommonVO> items;

  public ResponseListVO(int totalCount, int pageNumber, int pageLimit, List<? extends ResponseCommonVO> items) {
    this.totalCount = totalCount;
    this.pageNumber = pageNumber;
    this.pageLimit = pageLimit;
    this.items = items;
  }
}
