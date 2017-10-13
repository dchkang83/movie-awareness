package com.app.models;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@SuppressWarnings("serial")
public class ItemTemplateListVO extends ItemTemplateVO {

  private String dbType;
}
