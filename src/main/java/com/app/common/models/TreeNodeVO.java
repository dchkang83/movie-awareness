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
public class TreeNodeVO implements Serializable {
  
  private String id;
  private String text;
  
}
