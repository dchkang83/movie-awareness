/**
 * 시스템 로그인 - Controller
 *
 * @author kang.deokjoon
 * @version 1.0
 * @since 2017-07-04
 */
package com.app.common.exception;

@SuppressWarnings("serial")
public class ValidationException extends RuntimeException {

  public ValidationException(String errorCode, String message) {
    super(message);
    this.errorCode = errorCode;
  }
  
  private String errorCode;

  /**
   * @return the errorCode
   */
  public String getErrorCode() {
    return errorCode;
  }

  /**
   * @param errorCode the errorCode to set
   */
  public void setErrorCode(String errorCode) {
    this.errorCode = errorCode;
  }
  
}

