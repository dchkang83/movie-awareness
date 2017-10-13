package com.app.models;

import java.util.HashMap;
import java.util.Map;

import com.app.common.models.RequestListSearchVO;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
@SuppressWarnings("serial")
public class TargetListRequestVO extends RequestListSearchVO {
  
  @ApiModelProperty(value = "설문조사순번")
  private String targetSrl;
  
  @ApiModelProperty(value = "설문조사명")
  private String targetName;
  
  /**
   * parameter to table column name column value는 반드시 조회 테이블의 alias를 포함해야 한다.
   * 검색항목 전부 설정해야 한다.
   * 
   * @return
   */
  @Override
  protected Map<String, String> getTableColumnMap() {
    Map<String, String> tableColumnMap = new HashMap<>();
    tableColumnMap.put("targetName",   "sv.target_name");
    tableColumnMap.put("targetStatus", "sv.target_status");
    tableColumnMap.put("startDate",    "sv.start_date");
    tableColumnMap.put("endDate",      "sv.end_date");
    
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
