package com.app.mapper.awareness;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.app.models.TargetListRequestVO;
import com.app.models.TargetListVO;
import com.app.models.TargetVO;

@Repository
public interface TargetMapper {
  
  public int insertTargetBatch(Map<String, Object> paramMap);
  
  public List<TargetListVO> getTargetList(TargetListRequestVO targetListRequestVO);
  
  public int getTargetListTotalCount(TargetListRequestVO targetListRequestVO);
  
  public TargetVO getTarget(String targetSrl);


}
