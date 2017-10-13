package com.app.service;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.app.mapper.awareness.TargetMapper;
import com.app.models.TargetListRequestVO;
import com.app.models.TargetListVO;
import com.app.models.TargetVO;

@Service
public class TargetService {

  @Resource
  private TargetMapper targetMapper;
  
  public List<TargetListVO> getTargetList(TargetListRequestVO targetListRequestVO) throws Exception {
    return targetMapper.getTargetList(targetListRequestVO);
  }
  
  public int getTargetListTotalCount(TargetListRequestVO targetListRequestVO) {
    return targetMapper.getTargetListTotalCount(targetListRequestVO);
  }
  
  public TargetVO getTarget(String targetSrl) throws Exception {
    return targetMapper.getTarget(targetSrl);
  }
  
}
