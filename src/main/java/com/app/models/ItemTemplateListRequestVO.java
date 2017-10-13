package com.app.models;

import java.util.HashMap;
import java.util.Map;

import com.app.common.models.RequestListSearchVO;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
@SuppressWarnings("serial")
public class ItemTemplateListRequestVO extends RequestListSearchVO {
  
  private String questionSrl;
  
  /**
   * parameter to table column name column value는 반드시 조회 테이블의 alias를 포함해야 한다.
   * 검색항목 전부 설정해야 한다.
   * 
   * @return
   */
  @Override
  protected Map<String, String> getTableColumnMap() {
    Map<String, String> tableColumnMap = new HashMap<>();
    tableColumnMap.put("itemName",         "itt.item_name");
    tableColumnMap.put("itemDescription",  "itt.item_description");
    tableColumnMap.put("sortNumber",       "itt.sort_number");
    
    return tableColumnMap;
  }
  
  /**
   * 디폴트 search page number.
   * @return
   */
  @Override
  protected int getDefaultPageNumber() {
    return 1;
  }

  /**
   * 디폴트 search page limit.
   * @return
   */
  @Override
  protected int getDefaultPageLimit() {
    return 10;
  }
}
