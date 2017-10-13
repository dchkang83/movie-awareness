package com.app.mapper.mssql3;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.app.models.MemberListRequestVO;
import com.app.models.MemberVO;
import com.app.models.SurveyVO;

@Repository
public interface MemberMapper {
  
  public List<MemberVO> getMemberList(MemberListRequestVO memberListRequestVO);
  
  public int getMemberListTotalCount(MemberListRequestVO memberListRequestVO);
  
  public List<List<MemberVO>> getMembers(SurveyVO surveyVO);

}
