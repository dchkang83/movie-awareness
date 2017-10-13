package com.app.common.util;

import java.text.Format;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.apache.commons.lang3.text.WordUtils;

import com.google.common.base.CaseFormat;

public class StringUtils {

  /**
   * String null check
   * 
   * @param str
   * @return
   */
  public static boolean isEmpty(String str) {
    if (str == null) {
      return true;
    }

    return str.isEmpty();
  }

  /**
   * String is number
   * 0 ~ 2147483647
   * 
   * @param str
   * @return
   */
  public static boolean isNumber(String str) {
    if (str == null) {
      return true;
    }
    
    // +- false
    if (str.indexOf("-") != -1 || str.indexOf("+") != -1) {
      return false;
    }
    
    try {
      Integer.parseInt(str);
    } catch (NumberFormatException nfe) {
      return false;
    }
    return true;
  }

  /**
   * Date to String
   * 
   * @param date
   * @param format
   * @return
   */
  public static String dateToStr(Date date, String format) {
    Format formatter = new SimpleDateFormat(format);
    return formatter.format(date);
  }

  
  /**
   * make set method name
   * 
   * @param str
   * @param delimiter
   * @return
   */
  public static String makeSetMethodName(String str, String delimiter) {
    if (isEmpty(str)) {
      return null;
    }

    StringBuilder setMethodName = new StringBuilder("set");
    // delimiter가 없을 경우 set + 첫글자 대문자
    if (str.indexOf(delimiter) < 0) {
      setMethodName.append(WordUtils.capitalize(str));
      return setMethodName.toString();
    }
    
    String[] strArr = str.split(delimiter);
    for (String s : strArr) {
      setMethodName.append(WordUtils.capitalize(s));
    }
    return setMethodName.toString();
  }

  /**
   * make get method name
   * 
   * @param str
   * @param delimiter
   * @return
   */
  public static String makeGetMethodName(String str, String delimiter) {
    if (isEmpty(str)) {
      return null;
    }

    StringBuilder getMethodName = new StringBuilder("get");
    // delimiter가 없을 경우 get + 첫글자 대문자
    if (str.indexOf(delimiter) < 0) {
      getMethodName.append(WordUtils.capitalize(str));
      return getMethodName.toString();
    }
    
    String[] strArr = str.split(delimiter);
    for (String s : strArr) {
      getMethodName.append(WordUtils.capitalize(s));
    }
    return getMethodName.toString();
  }

  /**
   * 카멜표기를 구분자로 변경
   * 
   * @param str
   * @param delimiter
   * @return
   */
  public static String camelToFormat(String str, CaseFormat caseFormat) {
    if (isEmpty(str)) {
      return null;
    }

    return CaseFormat.UPPER_CAMEL.to(caseFormat, str);
  }
  
  /**
   * replace to empty string
   * 
   * @param str
   * @param targetStrs
   * @return
   */
  public static String replaceEmptyStr(String str, String... targetStrs) {
    if (isEmpty(str) || targetStrs == null || targetStrs.length == 0) {
      return null;
    }

    for (String targetStr : targetStrs) {
      str = str.replaceAll(targetStr, "");
    }
    
    return str;
  }

}
