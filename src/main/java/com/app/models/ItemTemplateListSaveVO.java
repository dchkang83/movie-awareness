package com.app.models;

import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@SuppressWarnings("serial")
public class ItemTemplateListSaveVO {

  private String questionSrl;
  
  private List<ItemTemplateListVO> itemList;
}
