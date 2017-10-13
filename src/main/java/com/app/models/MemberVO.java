package com.app.models;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@SuppressWarnings("serial")
public class MemberVO extends ResponseVO {
  
  private String memberCode;
  private String marketingruleagreeyn;
  private String authGubun;
  private String cinemaCode;
  private String memberName;
  private String webId;
  private String memberClass;
  private String memberGrade;
  private String sex;
  private String birthday;
  private String tel;
  private String mobile;
  private String emailAddr;
  private String mobileAuthYN;
  private String eMailAuthYN;
  private String smsReceiveYN;
  private String mailingReceiveYN;
  private String addr01;
  private String addr02;
  private String zipCode;
  private String age;
  private String retireYN;
  private String mCGubun;
  private String mCAuthGubun;
  private String oldCinusVip;
  private String cinemaCode2;
  private String cinemaCode3;
  private String lastYearMemberGrade;
  private String birthDayPopUpYN;
  private String handPhonePopYN;
  private String emailPopUPYN;
  private String lockAccountYN;
  private String mobileLoginYN;
  private String kioskMobileBirthdayLoginYN;
  
  
}
