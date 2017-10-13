/**
 * 시스템 로그인 - Controller
 *
 * @author kang.deokjoon
 * @version 1.0
 * @since 2017-07-04
 */
package com.app.common.controller;

import java.io.UnsupportedEncodingException;
import java.lang.reflect.Method;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.app.common.ErrorCodeConstants;
import com.app.common.exception.ValidationException;
import com.app.common.util.StringUtils;

public class CommonRestController {

  private Logger logger = LoggerFactory.getLogger(getClass());

  /**
   * request에서 Query String 및 조회 조건을 VO에 설정
   * @param req
   * @return
   */
  protected <T> T getRequestVO(HttpServletRequest req, Class<T> type) throws Exception {
    String requestMethod = req.getMethod();
    logger.debug("METHOD : {}", requestMethod);
    // Request method GET
    if ("GET".equalsIgnoreCase(requestMethod) || "DELETE".equalsIgnoreCase(requestMethod)) {
      return getRequestVOByGET(req, type);
    }
    
    // Request method POST
    Object obj = type.newInstance();
    return type.cast(obj);
  }
  
  /**
   * reflect로 실행할 메소드 목록 설정
   * @param obj
   * @param methodNames
   * @return
   * @throws NoSuchMethodException
   */
  private Map<String, Method> getMethods(Object obj, List<String> methodNames) throws NoSuchMethodException {
    Map<String, Method> methods = new HashMap<>();

    // Method 대상 목록이 없을 경우 null 반환
    if (methodNames == null || methodNames.isEmpty()) {
      return methods;
    }
    
    // 대상 method가 있을 경우
    for (String methodName : methodNames) {
      Method method = obj.getClass().getMethod(methodName, String.class);
      methods.put(methodName, method);
    }
    
    return methods;
  }
  
  /**
   * Method type GET
   * @param req
   * @param type
   * @return
   * @throws Exception
   */
  @SuppressWarnings("unchecked")
  private <T> T getRequestVOByGET(HttpServletRequest req, Class<T> type) throws Exception {
    // qs, offset, limit, orders, fields
    String qs = req.getParameter("qs");
    String offset = req.getParameter("offset");
    String limit = req.getParameter("limit");
    String orders = req.getParameter("orders");
    String fields = req.getParameter("fields");

    Object obj = type.newInstance();
    // query string 에서 조회 대상 parameter를 설정
    if (StringUtils.isEmpty(qs)) {
      qs = "";
    }

    // trim
    if (!StringUtils.isEmpty(offset)) {
      offset = offset.trim();
    }
    if (!StringUtils.isEmpty(limit)) {
      limit = limit.trim();
    }
    if (!StringUtils.isEmpty(orders)) {
      orders = orders.trim();
    }
    if (!StringUtils.isEmpty(fields)) {
      fields = fields.trim();
    }

    /* query string 파싱
     * 1. qs를 URL Decoding 
     * qs는 key%3Dvalue,key2%3Dvalue2 형태로 설정되어 있기 때문에 %3D를 디코딩해서 "="로 변환
     * 2. 콤마(,)로 구분하여 parameter 분리
     * 3. key=value 중 key 목록으로 method명 생성 후 reflect를 이용하여 자동으로 set method에 설정
     * 4. 필수 체크 확인하여 필수 항목이 입력되지 않으면 ValidationException 발생
     */
    List<String> methodNames = new ArrayList<>();
    Map<String, Method> parameterMethods = new HashMap<>();
    Map<String, Object> parameterValues = new HashMap<>();
    Method method = null;
    
    try {
      // decode
      String queryString = URLDecoder.decode(qs, "UTF-8");
      
      // 콤마(,)로 분리하여 parameter 취득 
      String[] parameters = queryString.split(",");
      
      // parameter가 key=value형식이 아니면 무시
      String setMethodName = null;
      for (String parameter : parameters) {
        if (StringUtils.isEmpty(parameter) || parameter.split("=").length != 2) {
          continue;
        }
        
        setMethodName = StringUtils.makeSetMethodName(parameter.split("=")[0].trim(), "-");
        methodNames.add(setMethodName);
        // method의 Value를 Map에 설정
        parameterValues.put(setMethodName, parameter.split("=")[1].trim());
      }
      
      // 해당 API의 Value Object method를 생성
      parameterMethods = getMethods(obj, methodNames);
      
      // set method에 값을 setting
      Iterator<String> it = parameterMethods.keySet().iterator();
      String key = null;
      while (it.hasNext()) {
        key = it.next();
        method = parameterMethods.get(key);
        method.invoke(obj, parameterValues.get(key));
      }

      // offset, limit. order setting
      if (!StringUtils.isEmpty(offset) && StringUtils.isNumber(offset)) {
        method = obj.getClass().getMethod("setOffset", Integer.class);
        int offsetInt = Integer.parseInt(offset) - 1;
        if (offsetInt < 0) {
          offsetInt = 0;
        }
        method.invoke(obj, offsetInt);
      } else {
        // default 0
        method = obj.getClass().getMethod("setOffset", Integer.class);
        method.invoke(obj, 0);
      }
      
      if (!StringUtils.isEmpty(limit) && StringUtils.isNumber(limit)) {
        method = obj.getClass().getMethod("setLimit", Integer.class);
        method.invoke(obj, Integer.parseInt(limit));
      } else {
        // default limit setting
        Method methodOrder = obj.getClass().getMethod("getDefaultlimit");
        int defaultLimit = (Integer) methodOrder.invoke(obj);
        method = obj.getClass().getMethod("setLimit", Integer.class);
        method.invoke(obj, defaultLimit);
      }
      
      if (!StringUtils.isEmpty(orders)) {
        method = obj.getClass().getMethod("setOrders", String.class);
        method.invoke(obj, orders);
        // order name change : parameter to table column
        // Class<T> type의 getOrderBy() 호출
        Method methodOrder = obj.getClass().getMethod("getOrderBy");
        String orderBy = (String) methodOrder.invoke(obj);
        // order by는 Offset을 이용하기 위해서는 반드시 설정해야 함.
        if (orderBy == null || orderBy.isEmpty()) {
          methodOrder = obj.getClass().getMethod("getDefaultOrderBy");
          orderBy = (String) methodOrder.invoke(obj);
        }
        
        method = obj.getClass().getMethod("setOrders", String.class);
        method.invoke(obj, orderBy);
      } else {
        // default order by setting
        Method methodOrder = obj.getClass().getMethod("getDefaultOrderBy");
        String orderBy = (String) methodOrder.invoke(obj);
        method = obj.getClass().getMethod("setOrders", String.class);
        method.invoke(obj, orderBy);
      }

      // fields setting
      method = obj.getClass().getMethod("setFields", String.class);
      method.invoke(obj, fields);
      
      // return fields change : parameter to table column
      // Class<T> type의 getColumnFields() 호출
      Method methodColumnFields = obj.getClass().getMethod("getColumnFields");
      
      method = obj.getClass().getMethod("setFields", String.class);
      method.invoke(obj, methodColumnFields.invoke(obj));

      // 필수항목 체크
      // 필수 항목 가져오기 CommonSearchVO getRequiredParameters()
      Method requiredMethod = obj.getClass().getMethod("getRequiredParameters");
      Set<String> requiredSet = (Set<String>) requiredMethod.invoke(obj);
      for (String parameter : parameters) {
        if (StringUtils.isEmpty(parameter) || parameter.split("=").length != 2) {
          continue;
        }
        // 필수 체크 : getRequiredParameters 에 등록한 필수 항목이 전부 있는지 확인
        // parameter항목을 Empty String으로 치환하여 제거
        requiredSet.remove(parameter.split("=")[0].trim());
      }
      // 필수항목이 없을 경우 에러
      if (requiredSet != null && !requiredSet.isEmpty()) {
        Iterator<String> itReq = requiredSet.iterator();
        StringBuilder errorRequrieds = new StringBuilder();
        while (itReq.hasNext()) {
          if (errorRequrieds.length() > 0) {
            errorRequrieds.append(",");
          }
          errorRequrieds.append(itReq.next());
        }
        throw new ValidationException(ErrorCodeConstants.VALIDATION_ERROR_PARAMETER, "Required parameters [" + errorRequrieds.toString() + "].");
      }
      
    } catch (UnsupportedEncodingException e) {
      // ValidationException 호출 : error code, message
      throw new ValidationException(ErrorCodeConstants.VALIDATION_ERROR_ENCODING, "Not supported encoding type. Only allowed UTF-8.");
    } catch (NoSuchMethodException e) {
      // ValidationException 호출 : error code, message
      String errorField = e.getMessage().substring(e.getMessage().indexOf(".set") + 4, e.getMessage().lastIndexOf("("));
      throw new ValidationException(ErrorCodeConstants.VALIDATION_ERROR_NOT_FOUND_PARAMETER, "Not supported parameter name [" + errorField + "].");
    }
    
    return type.cast(obj);
  }
}
