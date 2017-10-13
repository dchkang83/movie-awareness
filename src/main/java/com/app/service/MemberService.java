package com.app.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.app.mapper.awareness.SurveyMapper;
import com.app.mapper.awareness.TargetMapper;
import com.app.mapper.mssql3.MemberMapper;
import com.app.models.MemberListRequestVO;
import com.app.models.MemberVO;
import com.app.models.SurveyVO;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class MemberService {
  
  @Resource
  private MemberMapper memberMapper;
  
  @Resource
  private SurveyMapper surveyMapper;
  
  @Resource
  private TargetMapper targetMapper;
  
  public List<MemberVO> getMemberList(MemberListRequestVO memberListRequestVO) throws Exception {
    return memberMapper.getMemberList(memberListRequestVO);
  }
  
  public int getMemberListTotalCount(MemberListRequestVO memberListRequestVO) {
    return memberMapper.getMemberListTotalCount(memberListRequestVO);
  }
  
  public int getMembers(String surveySrl) throws Exception {
    
    int result = 0;
    
    SurveyVO surveyVO = surveyMapper.getSurvey(surveySrl);

    log.debug(">>> STEP 1");
    
    List<List<MemberVO>> resultList = memberMapper.getMembers(surveyVO);
    List<MemberVO> insertList = new ArrayList<MemberVO>();
    log.debug(">>> STEP 2");
    
    for(List<MemberVO> tempList : resultList) {
      insertList.addAll(tempList);
    }
    
    Map<String, Object> mp = new HashMap<String, Object>();
    mp.put("surveySrl", surveySrl);
    mp.put("list", insertList);

    log.debug(">>> resultList.size : {}", resultList.size());
    log.debug(">>> resultList.toString : {}", resultList.toString());
    
    log.debug(">>> insertList.size : {}", insertList.size());
    log.debug(">>> insertList.toString : {}", insertList.toString());
    
    if(insertList.size() > 0) {
      result = targetMapper.insertTargetBatch(mp);
    }
    
    log.debug(">>> result : {}", result);
    
    return result;
  }
  
  
}
