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
public class MemberListRequestVO extends RequestListSearchVO {
  
  @ApiModelProperty(value = "설문조사순번")
  private String mssql3MemberSrl;
  
  @ApiModelProperty(value = "설문조사명")
  private String mssql3MemberName;
  
  /**
   * parameter to table column name column value는 반드시 조회 테이블의 alias를 포함해야 한다.
   * 검색항목 전부 설정해야 한다.
   * 
   * @return
   */
  @Override
  protected Map<String, String> getTableColumnMap() {
    Map<String, String> tableColumnMap = new HashMap<>();
    tableColumnMap.put("marketingruleagreeyn",  "A.MARKETINGRULEAGREEYN");
    tableColumnMap.put("push01Yn",              "A.PUSH01_YN");
    tableColumnMap.put("webId",                 "A.Web_id");
    tableColumnMap.put("memberName",            "A.MemberName");
    
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
