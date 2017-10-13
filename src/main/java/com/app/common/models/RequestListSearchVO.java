package com.app.common.models;

import java.io.Serializable;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

import com.app.common.util.StringUtils;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@SuppressWarnings("serial")
public abstract class RequestListSearchVO implements Serializable {
  
//  /** 회사코드 */
//  private String companyCode;
  
  @ApiModelProperty(value = "페이지 번호", required = true)
  @Setter private Integer pageNumber;

  @ApiModelProperty(value = "페이지 조회수", required = true)
  @Setter private Integer pageLimit;
  
  @ApiModelProperty(value = "페이지 정렬 (column1, column2 DESC")
  @Getter @Setter private String orderBy;
  
//  @ApiModelProperty(value = "정렬아이디")
//  private String orderById;
//  
//  @ApiModelProperty(value = "정렬타입")
//  private String orderByType;
  
  /**
   * parameter to table column name<br>
   * column value는 반드시 조회 테이블의 alias를 포함해야 한다.<br>
   * 검색항목 전부 설정해야 한다. 전체 검색(*)은 사용하지 않는다.<br>
   * Sample<br>
   * Map<String, String> tableColumnMap = new HashMap<>(); 
   * tableColumnMap.put("parameterName1", "table1.column_name1");
   * tableColumnMap.put("parameterName2", "table2.column_name4"); // JOIN 등이 있는 경우 table alias를 잘 설정해야 한다.
   * return tableColumnMap;
   * <br>
   * 설정한 컬럼은 조회 항목으로 자동으로 설정되어 조회된다.<br>
   * 검색 query에서는 xml에서는 조회 항목에 ${fields} 만 설정하면 되고 COUNT등 특수한 검색의 경우 기존 query를 사용하면 된다.
   * @return
   */
  protected abstract Map<String, String> getTableColumnMap();
  
  /**
   * search page number.
   * @return
   */
  public int getPageNumber() {
    return this.pageNumber != null ? this.pageNumber : this.getDefaultPageNumber();
  }
  
  /**
   * search page limit.
   * @return
   */
  public int getPageLimit() {
    return this.pageLimit != null ? this.pageLimit : this.getDefaultPageLimit();
  }
  
  /**
   * 디폴트 search page number.
   * @return
   */
  protected int getDefaultPageNumber() {
    return 1;
  }
  
  /**
   * 디폴트 search page limit.
   * @return
   */
  protected int getDefaultPageLimit() {
    return 100;
  }
  
  /**
   * 시작점
   * 
   * @return
   */
  private int getOffset() {
    return this.getPageLimit() * (this.getPageNumber()-1);
  }
  
  /**
   * 조회수
   * 
   * @return
   */
  private int getLimit() {
    return this.getPageLimit();
  }
  
  /**
   * 디폴트 order by 설정.<br>
   * Offset을 이용하기 위해서는 반드시 order by 항목이 있어야하기 때문에 디폴트로 설정이 필요 <br>
   * 리스트 조회가 아니면 empty string 반환
   * Table alias를 정의해야 하기 때문에 실제 업무 requestVO에서 선언한다.
   * @return
   */
  private String getOrders() {
    StringBuilder resultOrderBy = new StringBuilder();
    String orderBys = this.getOrderBy();
    
    // is empty return null
    if (StringUtils.isEmpty(orderBys)) {
      return orderBys;
    }
    
    // parameter to table column
    Map<String, String> tableColumnMap = getTableColumnMap();
    String[] orderByArr = orderBys.split(",");
    String orderBy = null;
    for (String orderByOrg : orderByArr) {
      orderBy = orderByOrg.trim().split(" ")[0];
      if (!tableColumnMap.containsKey(orderBy)) {
        continue;
      }
      
      if (resultOrderBy.length() > 0) {
        resultOrderBy.append(", ");
      }
      
      resultOrderBy.append(tableColumnMap.get(orderBy));
      
      // DESC 인경우 DESC 추가
      if (orderByOrg.replaceAll(orderBy, "").toUpperCase().indexOf("DESC") > 0) {
        resultOrderBy.append(" DESC");
      }
    }
    
    return resultOrderBy.toString();
  }
  
  
}
