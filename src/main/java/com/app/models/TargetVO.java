package com.app.models;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@SuppressWarnings("serial")
public class TargetVO extends ResponseVO {

  private String targetSrl;
  private String verificationCode;
  private String memberCode;
  private String customerName;
  private String gender;
  private String birthday;
  private String mobileNumber;
  private String emailAddress;
  private String statusCode;
  private String surveySrl;
  private String pushSendDate;
}
