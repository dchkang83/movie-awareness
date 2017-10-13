package com.app.models;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@SuppressWarnings("serial")
public class ItemVO extends ResponseVO {

  private String itemSrl;
  private String itemName;
  private String itemDescription;
  private String sortNumber;
  private String questionSrl;
}
