package com.app.models;

import java.util.HashMap;
import java.util.Map;

import com.app.common.models.RequestListSearchVO;
import com.app.common.util.StringUtils;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
@SuppressWarnings("serial")
public class QuestionListRequestVO extends RequestListSearchVO {
  
  @ApiModelProperty(value = "검색타입")
  private String srchType;
  
  @ApiModelProperty(value = "검색내용")
  private String srchText;
  
  /**
   * parameter to table column name column value는 반드시 조회 테이블의 alias를 포함해야 한다.
   * 검색항목 전부 설정해야 한다.
   * 
   * @return
   */
  @Override
  protected Map<String, String> getTableColumnMap() {
    Map<String, String> tableColumnMap = new HashMap<>();
    tableColumnMap.put("questionSrl",   "qt.question_srl");
    tableColumnMap.put("questionName",  "qt.question_name");
    
    return tableColumnMap;
  }
  
  /**
   * 조회 테이블의 컬럼
   * @return
   */
  private String getSrchColumn() {
    String srchColumn = this.getSrchType();
    
    // is empty return null
    if (StringUtils.isEmpty(srchColumn)) {
      return srchColumn;
    }
    else {
      // parameter to table column
      Map<String, String> tableColumnMap = getTableColumnMap();
      if (!tableColumnMap.containsKey(srchColumn)) {
        return "";
      }
      else {
        return tableColumnMap.get(srchColumn);
      }
    }
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
