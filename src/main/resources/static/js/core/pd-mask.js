/**
 * NAME : PD_Mask.js
 * DESC : Mask 함수 모음
 * VER  : 1.0
 * Copyright 2015 덕준님 Group All rights reserved
 * ============================================================================================
 *                변   경   사   항
 * ============================================================================================
 * VERSION    DATE    AUTHOR    DESCRIPTION
 * ============================================================================================
 * 1.0    2015.03.16    kang d.j  최초작성
 * 1.1    2015.06.19    kang d.j  수정 (구조변경)
 */

PD_Mask = function() {
};

/**
 * val에 mask에 해당되는 format을 준다.
 */
PD_Mask.fnGetMaskValue = function(arrParams) {
  var rtnVal = arrParams['val'];
  var sVal = arrParams['val'];

  // console.log("PD_Mask.fnGetMaskValue : " + rtnVal);

  if (arrParams['dataMask'] == "")
    return sVal;

  switch (arrParams['dataMask']) {
  case 'date':
  case 'date_picker':
    // 데이터 형식
    arrParams['delimeter'] = '-';
    rtnVal = PD_Mask.fnDateMask(arrParams);
    break;
  case 'num':
    // 숫자만
    arrParams['decimal'] = false;
    arrParams['abs'] = true;
    arrParams['comma'] = false;
    arrParams['prefix_zero'] = true;
    rtnVal = PD_Mask.fnGetNumFloatMask(arrParams);
    break;
  case "M":
  case 'num_int':
    // 정수 (+- 포함)
    arrParams['decimal'] = false;
    arrParams['abs'] = false;
    arrParams['comma'] = true;
    arrParams['prefix_zero'] = false;
    rtnVal = PD_Mask.fnGetNumFloatMask(arrParams);
    break;
  case 'num_int_abs':
    // 정수 (양수만)
    arrParams['decimal'] = false;
    arrParams['abs'] = true;
    arrParams['comma'] = true;
    arrParams['prefix_zero'] = false;
    rtnVal = PD_Mask.fnGetNumFloatMask(arrParams);
    break;
  case 'num_float':
    // 실수 (+- 포함)
    arrParams['decimal'] = true;
    arrParams['abs'] = false;
    arrParams['comma'] = true;
    arrParams['prefix_zero'] = false;
    rtnVal = PD_Mask.fnGetNumFloatMask(arrParams);
    break;
  case 'num_float_abs':
    // 실수 (양수만)
    arrParams['decimal'] = true;
    arrParams['abs'] = true;
    arrParams['comma'] = true;
    arrParams['prefix_zero'] = false;
    rtnVal = PD_Mask.fnGetNumFloatMask(arrParams);
    break;
  case 'percent':
    // 실수 (양수만)
    arrParams['decimal'] = true;
    arrParams['abs'] = true;
    // arrParams['comma'] = true;
    // arrParams['prefix_zero']= false;
    rtnVal = PD_Mask.fnGetPercentMask(arrParams);
    break;
  case 'num_int_string':
    // 전화번호형 숫자
    arrParams['decimal'] = false;
    arrParams['abs'] = false;
    arrParams['comma'] = false;
    arrParams['prefix_zero'] = true;
    rtnVal = PD_Mask.fnGetNumStringMask(arrParams);
    break;
  case 'password':
    // 패스워드
    break;
  case 'email':
    // 이메일
    break;
  case 'url':
    // 도메인
    break;
  default:
    break;
  }

  return rtnVal;
};

/**
 * val에 mask에 해당되는 format을 준다.
 */
PD_Mask.fnGetMaskValueFocusOut = function(obj) {

  var arrParams = new Object();
  var rtnVal = obj.val();
  var sVal = obj.val();

  arrParams['val'] = obj.val();
  arrParams['dataMask'] = obj.attr('data-mask');
  arrParams['toFixed'] = obj.attr('data-to-fixed');

  if (obj.attr('data-mask') == "")
    return sVal;

  switch (obj.attr('data-mask')) {
  case 'percent':
    // 실수 (양수만)
    arrParams['decimal'] = true;
    arrParams['abs'] = true;
    rtnVal = PD_Mask.fnGetPercentMaskFocusOut(arrParams);
    break;
  default:
    break;
  }

  return rtnVal;
};

/**
 * val에 mask에 해당되는 format을 준다.
 */
PD_Mask.isMaskValue = function(arrParams) {
  var rtnVal = true;
  var sVal = arrParams['val'];

  /*
   * if(arrParams['dataMask'] == "") return sVal;
   */

  switch (arrParams['dataMask']) {
  case 'date':
  case 'date_picker':
    // 데이터 형식
    rtnVal = PD_Mask.isValidDate(sVal);
    break;
  case 'num':
    // 숫자만
    arrParams['decimal'] = false;
    arrParams['abs'] = true;
    arrParams['comma'] = false;
    arrParams['prefix_zero'] = true;
    rtnVal = PD_Mask.isNumFloatMask(arrParams);
    break;
  case "M":
  case 'num_int':
    // 정수 (+- 포함)
    arrParams['decimal'] = false;
    arrParams['abs'] = false;
    arrParams['comma'] = true;
    arrParams['prefix_zero'] = false;
    rtnVal = PD_Mask.isNumFloatMask(arrParams);
    break;
  case 'num_int_abs':
    // 정수 (양수만)
    arrParams['decimal'] = false;
    arrParams['abs'] = true;
    arrParams['comma'] = true;
    arrParams['prefix_zero'] = false;
    rtnVal = PD_Mask.isNumFloatMask(arrParams);
    break;
  case 'num_float':
    // 실수 (+- 포함)
    arrParams['decimal'] = true;
    arrParams['abs'] = false;
    arrParams['comma'] = true;
    arrParams['prefix_zero'] = false;
    rtnVal = PD_Mask.isNumFloatMask(arrParams);
    break;
  case 'num_float_abs':
    // 실수 (양수만)
    arrParams['decimal'] = true;
    arrParams['abs'] = true;
    arrParams['comma'] = true;
    arrParams['prefix_zero'] = false;
    rtnVal = PD_Mask.isNumFloatMask(arrParams);
    break;
  case 'percent':
    // 실수 (양수만)
    arrParams['decimal'] = true;
    arrParams['abs'] = true;
    arrParams['comma'] = true;
    arrParams['prefix_zero'] = false;
    rtnVal = PD_Mask.isNumFloatMask(arrParams);
    break;
  case 'num_int_string':
    // 전화번호형 숫자
    arrParams['decimal'] = false;
    arrParams['abs'] = false;
    arrParams['comma'] = false;
    arrParams['prefix_zero'] = true;
    rtnVal = PD_Mask.isNumFloatMask(arrParams);
    break;
  case 'password':
    // 패스워드
    rtnVal = PD_Mask.isPassword(sVal);
    break;
  case 'email':
    // 이메일
    rtnVal = PD_Mask.isCheckEmailFormat(sVal);
    break;
  case 'url':
    // 도메인
    rtnVal = PD_Mask.isCheckUrl(sVal);
    break;
  default:
    break;
  }

  return rtnVal;
};

/**
 * 문장내에서 ":", "-" 마스크 제거
 */
PD_Mask.fnRemoveMaskValue = function(arrParams) {
  var val = arrParams['val'];

  switch (arrParams['dataMask']) {
  case 'date':
  case 'date_picker':
    // 데이터 '-' 제거
    // val = PD_Mask.fnRemoveDateMask(val);
    break;
  case "M":
  case 'num_int':
  case 'num_int_abs':
  case 'num_float':
  case 'num_float_abs':
  case 'percent':
    // 숫자형 ',' 제거
    val = PD_Mask.fnRemoveComma(val);
    break;
  default:
    break;
  }

  return val;
};

/**
 * delimeter attach
 */
PD_Mask.fnAddComma = function(val) {
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * float type mask ( +- 허용 )
 */
PD_Mask.fnGetNumFloatMask = function(arrParams) {

  var val = arrParams['val']; // 값
  if (!val && val != 0)
    return 'NONE';

  var decimal = arrParams['decimal']; // 소수점 - 여부
  var abs = arrParams['abs']; // 양수/음수 - 여부
  var comma = arrParams['comma']; // 콤마 - 여부
  var prefix_zero = arrParams['prefix_zero']; // 첫자리 0 허용 여부
  var arrVal = val.toString().split(".");
  var rtnVal = arrVal[0];
  var sign = '';
  var prefix = rtnVal.substring(0, 1);

  if (!(prefix == '-' || prefix == '+')) {
    prefix = '';
  }
  // 숫자만 축출
  rtnVal = PD_Mask.fnGetNumOnly(rtnVal);

  // 콤마
  if (comma) {
    rtnVal = PD_Mask.fnRemoveComma(rtnVal);
  }

  // 음수, 양수
  if (arrParams['val'] && arrParams['val'].length > 1) {
    if (abs) {
      rtnVal = Math.abs(rtnVal);
    }

    // 소수점
    if (decimal) {
      rtnVal = Math.floor(rtnVal);
    } else {
      rtnVal = Math.round(rtnVal);
    }
  }

  // 콤마
  if (comma) {
    rtnVal = PD_Mask.fnAddComma(rtnVal);
  }

  // 소수점 이하 추가
  if (decimal && arrVal.length > 1) {
    rtnVal = rtnVal + "." + arrVal[1];
  }

  // 음수/양수(+,-) 유지
  rtnVal = prefix + rtnVal;

  // 값 없을때 0으로 설정
  if (rtnVal == '')
    rtnVal = 0;

  return rtnVal;
};

/**
 * 백분율 ( +- 허용 )
 */
PD_Mask.fnGetPercentMask = function(arrParams) {

  var val = arrParams['val']; // 값
  if (!val && val != 0)
    return 'NONE';

  var decimal = arrParams['decimal']; // 소수점 - 여부
  var abs = arrParams['abs']; // 양수/음수 - 여부
  var arrVal = val.toString().split(".");
  var integer_val = arrVal[0];
  var decimal_val = arrVal[1];
  var prefix = integer_val.substring(0, 1);
  var to_fixed = PD_Mask.fnNVL2(arrParams['toFixed'], 0); // 소수점 픽스

  if (!(prefix == '-' || prefix == '+')) {
    prefix = '';
  }

  // 숫자만 축출
  integer_val = PD_Mask.fnGetNumOnly(integer_val);

  integer_val = integer_val.substring(0, 3);

  if (decimal_val && decimal_val.length > 0 && to_fixed > 0) {
    decimal_val = decimal_val.substring(0, to_fixed);
  }

  if (arrParams['val'] && arrParams['val'].length > 2 && to_fixed > 0) {
    integer_val = integer_val + '.';
  }

  // 소수점 이하 추가
  if (decimal && arrVal.length > 1) {
    integer_val = integer_val + decimal_val;
  }

  // 음수, 양수
  if (integer_val && integer_val.length > 1) {
    if (abs) {
      prefix = "";
    }
  }

  // 음수/양수(+,-) 유지
  var rtnVal = prefix + integer_val;

  // 값 없을때 0으로 설정
  if (rtnVal == '')
    rtnVal = 0;

  return rtnVal;
};

/**
 * 백분율 ( +- 허용 ) - FOCUS OUT
 */
PD_Mask.fnGetPercentMaskFocusOut = function(arrParams) {

  var val = arrParams['val']; // 값
  var to_fixed = PD_Mask.fnNVL2(arrParams['toFixed'], 0); // 소수점 픽스

  val = parseFloat(val);
  val = val.toFixed(to_fixed);

  return val;
};

/**
 * 숫자형 number type
 */
PD_Mask.fnGetNumStringMask = function(arrParams) {
  var val = arrParams['val']; // 값
  var arrVal = val.toString().split(".");
  var rtnVal = arrVal[0];

  return rtnVal;
};

/**
 * comma remove
 */
PD_Mask.fnRemoveComma = function(val) {
  /*
   * if(!val && val != 0) return '';
   */
  if (!val)
    return "0";

  return val.toString().replace(/,/gi, ''); // g는 모든 pattern 검색, i는 대소문자 구분 안함
};

/**
 * 문장내에서 ":", "-" 마스크 제거
 */
PD_Mask.fnRemoveDateMask = function(val) {
  if (!val)
    return '';

  var pattern = /[:\/-]/g;
  return val.toString().replace(pattern, '');
};

/**
 * 문자열의 특정 문자열을 지정 문자열로 치환해준다.
 */
PD_Mask.fnReplaceStr = function(str, delimeter1, delimeter2) {
  if (str == "" || delimeter1 == "")
    return str;

  try {
    var s_Data = "";
    var s_Tmp = str;
    var i = s_Tmp.indexOf(delimeter1);

    while (i != -1) {
      s_Data = s_Data + s_Tmp.substring(0, i) + delimeter2;
      s_Tmp = s_Tmp.substring(i + delimeter1.length);
      i = s_Tmp.indexOf(delimeter1);
    }
    s_Data = s_Data + s_Tmp;
    return s_Data;
  } catch (e) {
    return str;
  }
};

/**
 * null여부 체크
 */
PD_Mask.fnNVL = function(val) {
  if (val != null && (typeof val != "undefined")) {
    if ((typeof val.valueOf() == "string" && val.length > 0) || (typeof val.valueOf() == "number")) {
      return val;
    } else {
      return '';
    }
  } else {
    return '';
  }
};

/**
 * null여부 체크
 */
PD_Mask.fnNVL2 = function(val, replace_val) {
  if (val != null && val != "" && (typeof val != "undefined")) {
    if ((typeof val.valueOf() == "string" && val.length > 0) || (typeof val.valueOf() == "number")) {
      return val;
    } else {
      return replace_val;
    }
  } else {
    return replace_val;
  }
};

/**
 * 날짜 마스크
 */
PD_Mask.fnDateMask = function(arrParams) {
  var delimeter = arrParams['delimeter'];
  var val = arrParams['val'];

  val = PD_Mask.fnReplaceStr(val, delimeter, "");

  if (val.length > 7)
    val = val.substring(0, 4) + delimeter + val.substring(4, 6) + delimeter + val.substring(6, val.length);
  else if (val.length > 6)
    val = val.substring(0, 4) + delimeter + val.substring(4, 6) + val.substring(6, val.length);
  else if (val.length > 4)
    val = val.substring(0, 4) + delimeter + val.substring(4, val.length);

  return val;
};

// ################################################## 정규식 체크
/**
 * Float 체크
 */
PD_Mask.isNumFloatMask = function(arrParams) {

  var rtnVal = true;
  var val = arrParams['val']; // 값
  var decimal = arrParams['decimal']; // 소수점 - 여부
  var abs = arrParams['abs']; // 양수/음수 - 여부
  var comma = arrParams['comma']; // 콤마 - 여부
  var prefix_zero = arrParams['prefix_zero']; // 첫자리 0 허용 여부

  if (comma) {
    val = PD_Mask.fnReplaceStr(val, ",", "");
  }

  var pattern = '';

  switch (arrParams['dataMask']) {
  case 'num':
    pattern = /^[0-9]*$/;
    rtnVal = pattern.test(val);
    break;
  case 'num_int_string':
    pattern = /^[0-9]*$/;
    rtnVal = pattern.test(val);
    break;
  case 'num_int':
    pattern = /^[+-]?\d+(?:\d+)?$/;
    rtnVal = pattern.test(val);
    break;
  case 'num_int_abs':
    pattern = /^[+]?\d+(?:\d+)?$/;
    rtnVal = pattern.test(val);
    break;
  case 'num_float':
    // pattern = /^[+-]?\d+(?:[.]\d+)?$/;
    pattern = /^[+-]?\d+\.?\d*$/;
    rtnVal = pattern.test(val);
    break;
  case 'num_float_abs':
    // pattern = /^[+]?\d+(?:[.]\d+)?$/;
    pattern = /^[+]?\d+\.?\d*$/;
    rtnVal = pattern.test(val);
    break;
  case 'percent':
    // pattern = /^[-|+]?\d+\.?\d*$/;
    pattern = /^[+-]?\d+\.?\d*$/;
    rtnVal = pattern.test(val);
    break;
  default:
    break;
  }

  return rtnVal;
};

/**
 * 숫자인지 아닌지 true/false return
 */
PD_Mask.isNumber = function(str) {
  var regExp = /[^\d]/i;
  var isVaild = !(regExp.test(str));

  return isVaild;
};

/**
 * 날짜포맷에 맞는지 검사
 */
PD_Mask.isDateFormat = function(d) {
  var df = /[0-9]{4}-[0-9]{2}-[0-9]{2}/;
  return d.match(df);
};

/**
 * 날짜가 유효한지 검사
 */
PD_Mask.isValidDate = function(d) {
  // 포맷에 안맞으면 false리턴
  if (!PD_Mask.isDateFormat(d)) {
    return false;
  }

  var month_day = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
  var dateToken = d.split('-');
  var year = Number(dateToken[0]);
  var month = Number(dateToken[1]);
  var day = Number(dateToken[2]);

  // 날짜가 0이면 false
  if (day == 0) {
    return false;
  }

  var isValid = false;

  // 윤년일때
  if (PD_Mask.isLeaf(year)) {
    if (month == 2) {
      if (day <= month_day[month - 1] + 1) {
        isValid = true;
      }
    } else {
      if (day <= month_day[month - 1]) {
        isValid = true;
      }
    }
  } else {
    if (day <= month_day[month - 1]) {
      isValid = true;
    }
  }

  return isValid;
};

/**
 * 윤년여부 검사
 */
PD_Mask.isLeaf = function(year) {
  var leaf = false;
  if (year % 4 == 0) {
    leaf = true;
    if (year % 100 == 0) {
      leaf = false;
    }
    if (year % 400 == 0) {
      leaf = true;
    }
  }

  return leaf;
};

/**
 * 한글 체크
 */
PD_Mask.isKorTextCheck = function($str) {
  var str = $str;
  var check = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
  var result = str.match(check);
  if (result)
    return true; // 한글일 경우

  return false; // 한글이 아닐경우
};

/**
 * 특수문자 체크
 */
PD_Mask.isCheckStringFormat = function(string) {
  // var stringRegx=/^[0-9a-zA-Z가-힝]*$/;
  var stringRegx = /[~!@\#$%<>^*\=+\’]/gi;
  var isValid = true;
  if (stringRegx.test(string)) {
    isValid = false;
  }
  return isValid;
};

/**
 * ' " 만 체크
 */
PD_Mask.isCheckQuotation = function(string) {
  // var stringRegx=/^[0-9a-zA-Z가-힝]*$/;
  var stringRegx = /['"]/gi;
  var isValid = true;
  if (stringRegx.test(string)) {
    isValid = false;
  }
  return isValid;
};

/**
 * 이메일 체크
 */
PD_Mask.isCheckEmailFormat = function(string) {
  var stringRegx = /^[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[@]{1}[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[.]{1}[A-Za-z]{2,5}$/;
  var isValid = true;

  if (string.search(stringRegx) == -1 && string != "") {
    isValid = false;
  }

  return isValid;
};

/**
 * 패스워드 체크 true/false return
 */
PD_Mask.isPassword = function(str) {
  // var regExp =
  // /^.*(?=^.{6,20}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[~,!,@,#,$,*,(,),=,+,_,.,|]).*$/;
  // var regExp =
  // /^.*(?=^.{6,20}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[~,!,@,#,$,%,^,&,*,(,),_,+,-,=,|,{,},.]).*$/;
  var regExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*+=-])(?=.*[0-9]).{6,20}$/;

  var isVaild = regExp.test(str);

  return isVaild;
};

/**
 * 도메인(URL) 체크
 */
PD_Mask.isCheckUrl = function(str) {

  var regExp = /^(((http(s?))\:\/\/)?)([0-9a-zA-Z\-]+\.)+[a-zA-Z]{2,6}(\:[0-9]+)?(\/\S*)?$/;
  var isVaild = regExp.test(str);

  return isVaild;
};

/**
 * 숫자만값만 축출
 */
PD_Mask.fnGetNumOnly = function(val) {
  val = new String(val);
  var regex = /[^0-9]/g;
  val = val.replace(regex, '');

  return val;
};

/**
 * 특정 길이만큼의 문자열을 채워준다. 예) lpad("11", "0", 3, "L") -> "011"
 **/
PD_Mask.fnPadStr = function(str, chr, cnt, align) {
  var temp = "";
  for (var i = 0; i < (cnt - str.length); i++) {
    temp += chr;
  }

  if (align == "L")
    return temp + str;
  else
    return str + temp;
}
