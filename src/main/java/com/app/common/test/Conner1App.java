/**
 * ----------
 */
package com.app.common.test;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.Charset;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Conner1App {
  
  public static void main(String[] args) throws Exception {
    
    Conner1App conner1App = new Conner1App();
    conner1App.listFilesForFolder(new File("D:\\temp\\test\\conner_test"), new File("D:\\temp\\test\\conner_test_out"));
  }
  
  public void listFilesForFolder(final File folder, final File resultFolder) throws Exception {
    
    if( !resultFolder.exists() ) {
      resultFolder.mkdir();
    }
    
    for(final File fileEntry : folder.listFiles()) {
      if (fileEntry.isDirectory()) {
        String strOutFolderPath = fileEntry.getPath();
        strOutFolderPath = strOutFolderPath.replaceAll("conner_test", "conner_test_out");
        
        File outFolder = new File(strOutFolderPath);
        if( !outFolder.exists() ) {
          outFolder.mkdir();
        }
        
        listFilesForFolder(fileEntry, resultFolder);
      }
      else {
        if( fileEntry.getName().toLowerCase().indexOf("-sp.log") == -1 ) {
          createSpFile(fileEntry);
        }
      }
    }
  }
  
  public void createSpFile(File inFile) throws Exception {
    
    // 단품(현금)
    String strType1FilePath = inFile.getPath().substring(0, inFile.getPath().length()-4)+"-단품(현금).log";
    strType1FilePath = strType1FilePath.replaceAll("conner_test", "conner_test_out");
    File outFileType1 = new File(strType1FilePath);
    
    // 복합(현금)
    String strType2FilePath = inFile.getPath().substring(0, inFile.getPath().length()-4)+"-복합(현금).log";
    strType2FilePath = strType2FilePath.replaceAll("conner_test", "conner_test_out");
    File outFileType2 = new File(strType2FilePath);
    
    // 복합(현금)
    String strType3FilePath = inFile.getPath().substring(0, inFile.getPath().length()-4)+"-할인.log";
    strType3FilePath = strType3FilePath.replaceAll("conner_test", "conner_test_out");
    File outFileType3 = new File(strType3FilePath);
    
    // 복합(현금)
    String strType4FilePath = inFile.getPath().substring(0, inFile.getPath().length()-4)+"-환불.log";
    strType4FilePath = strType4FilePath.replaceAll("conner_test", "conner_test_out");
    File outFileType4 = new File(strType4FilePath);
    
    // 신용카드
    String strType5FilePath = inFile.getPath().substring(0, inFile.getPath().length()-4)+"-신용카드.log";
    strType5FilePath = strType5FilePath.replaceAll("conner_test", "conner_test_out");
    File outFileType5 = new File(strType5FilePath);
    
    // 기타
    String strOtherFilePath = inFile.getPath().substring(0, inFile.getPath().length()-4)+"-기타.log";
    strOtherFilePath = strOtherFilePath.replaceAll("conner_test", "conner_test_out");
    File outFileOther = new File(strOtherFilePath);
    
    
    
    System.out.println("\r\n################ STARTED");
//    System.out.println("### inFile.getPath() : " + inFile.getPath());
//    System.out.println("### outFile.getPath() : " + outFile.getPath());
    
    /**
     * 읽기
     */
    InputStream in = new FileInputStream(inFile);
    
    InputStreamReader reader = new InputStreamReader( in, Charset.forName("Cp1252"));
    
    StringBuffer sbFile = new StringBuffer();
    int ch;
    
    while ((ch = reader.read()) > -1) {
      sbFile.append((char)ch);
    }
    
    String fileText = new String(sbFile.toString().getBytes(reader.getEncoding()), Charset.forName("Cp949"));
    reader.close();
    
    Matcher matcher = null;
    
    /**
     * 쓰기
     */
    BufferedWriter bufferedWriterType1 = null;
    BufferedWriter bufferedWriterType2 = null;
    BufferedWriter bufferedWriterType3 = null;
    BufferedWriter bufferedWriterType4 = null;
    BufferedWriter bufferedWriterType5 = null;
    BufferedWriter bufferedWriterOther = null;
    
    try {
      bufferedWriterType1 = new BufferedWriter(new FileWriter(outFileType1));
      bufferedWriterType2 = new BufferedWriter(new FileWriter(outFileType2));
      bufferedWriterType3 = new BufferedWriter(new FileWriter(outFileType3));
      bufferedWriterType4 = new BufferedWriter(new FileWriter(outFileType4));
      bufferedWriterType5 = new BufferedWriter(new FileWriter(outFileType5));
      bufferedWriterOther = new BufferedWriter(new FileWriter(outFileOther));
      
      /**
       * 정규식 - spCorner_DelCard
       */
      String[] arrUser = fileText.split("로그인:");
      
      String strEmpNo = "";
      int userIndex = 0;
      for(String strUserText : arrUser) {
        strUserText = strUserText.trim();

//        System.out.println("### strUserText : " + strUserText);
        
        if(userIndex > 0) {
          strEmpNo = strUserText.substring(0, strUserText.indexOf(" / "));
          System.out.println("#################################### [EMPNO - " + strEmpNo + "] ####################################");
          
          String[] arrOrder = strUserText.split("\\[ 프린트 결정 부분 \\]");
          
          for(String strOrderText : arrOrder) {
            strOrderText = strOrderText.trim();
            
            String strTransNo = this.getTransNo(strOrderText);
            String strSaleTime = this.getSaleTime(strOrderText);
            
            strOrderText = this.clearGarbage(strOrderText, strTransNo);
//            System.out.println("### strOrderText : " + strOrderText);
            
            if( isType4(strOrderText) ) {
              // 환불
              bufferedWriterType4.write("SET @EMPNO = '"+strEmpNo+"'        -- 사원번호");
              bufferedWriterType4.newLine();
              bufferedWriterType4.write("SET @TRANSNO = '" + strTransNo + "' -- 거래번호");
              bufferedWriterType4.newLine();
              bufferedWriterType4.write("SET @SALETIME = '" + strSaleTime + "' -- 판매시간");
              bufferedWriterType4.newLine();
              bufferedWriterType4.write(strOrderText);
              bufferedWriterType4.newLine();
              bufferedWriterType4.newLine();
            }
            else if( isType3(strOrderText) ) {
              // 할인
              bufferedWriterType3.write("SET @EMPNO = '"+strEmpNo+"'        -- 사원번호");
              bufferedWriterType3.newLine();
              bufferedWriterType3.write("SET @TRANSNO = '" + strTransNo + "' -- 거래번호");
              bufferedWriterType3.newLine();
              bufferedWriterType3.write("SET @SALETIME = '" + strSaleTime + "' -- 판매시간");
              bufferedWriterType3.newLine();
              bufferedWriterType3.write(strOrderText);
              bufferedWriterType3.newLine();
              bufferedWriterType3.newLine();
            }
            else if( isType1(strOrderText) ) {
              // 단품 - 현금
              bufferedWriterType1.write("SET @EMPNO = '"+strEmpNo+"'        -- 사원번호");
              bufferedWriterType1.newLine();
              bufferedWriterType1.write("SET @TRANSNO = '" + strTransNo + "' -- 거래번호");
              bufferedWriterType1.newLine();
              bufferedWriterType1.write("SET @SALETIME = '" + strSaleTime + "' -- 판매시간");
              bufferedWriterType1.newLine();
              bufferedWriterType1.write(strOrderText);
              bufferedWriterType1.newLine();
              bufferedWriterType1.newLine();
            }
            else if( isType2(strOrderText) ) {
              // 복합 - 현금
              bufferedWriterType2.write("SET @EMPNO = '"+strEmpNo+"'        -- 사원번호");
              bufferedWriterType2.newLine();
              bufferedWriterType2.write("SET @TRANSNO = '" + strTransNo + "' -- 거래번호");
              bufferedWriterType2.newLine();
              bufferedWriterType2.write("SET @SALETIME = '" + strSaleTime + "' -- 판매시간");
              bufferedWriterType2.newLine();
              bufferedWriterType2.write(strOrderText);
              bufferedWriterType2.newLine();
              bufferedWriterType2.newLine();
            }
            else if( isType5(strOrderText) ) {
              // 신용카드
              bufferedWriterType5.write("SET @EMPNO = '"+strEmpNo+"'        -- 사원번호");
              bufferedWriterType5.newLine();
              bufferedWriterType5.write("SET @TRANSNO = '" + strTransNo + "' -- 거래번호");
              bufferedWriterType5.newLine();
              bufferedWriterType5.write("SET @SALETIME = '" + strSaleTime + "' -- 판매시간");
              bufferedWriterType5.newLine();
              bufferedWriterType5.write(strOrderText);
              bufferedWriterType5.newLine();
              bufferedWriterType5.newLine();
            }
            else {
              // 기타
              bufferedWriterOther.write("SET @EMPNO = '"+strEmpNo+"'        -- 사원번호");
              bufferedWriterOther.newLine();
              bufferedWriterOther.write("SET @TRANSNO = '" + strTransNo + "' -- 거래번호");
              bufferedWriterOther.newLine();
              bufferedWriterOther.write("SET @SALETIME = '" + strSaleTime + "' -- 판매시간");
              bufferedWriterOther.newLine();
              bufferedWriterOther.write(strOrderText);
              bufferedWriterOther.newLine();
              bufferedWriterOther.newLine();
            }
          }
//          System.out.println("==================================================================================== USER\r\n" + str);
        }
        userIndex++;
      }
//      System.out.println("fileText : " + fileText);
//      System.out.println("arrOrder.length : " + arrOrder.length);
      
      
      
      bufferedWriterType1.flush();
      bufferedWriterType2.flush();
      bufferedWriterType3.flush();
      bufferedWriterType4.flush();
      bufferedWriterType5.flush();
      bufferedWriterOther.flush();
    }
    catch(IOException ie) {
      ie.printStackTrace();
    }
    finally {
      if(bufferedWriterType1 != null) try { bufferedWriterType1.close(); } catch(IOException e) {}
      if(bufferedWriterType2 != null) try { bufferedWriterType2.close(); } catch(IOException e) {}
      if(bufferedWriterType3 != null) try { bufferedWriterType3.close(); } catch(IOException e) {}
      if(bufferedWriterType4 != null) try { bufferedWriterType4.close(); } catch(IOException e) {}
      if(bufferedWriterType5 != null) try { bufferedWriterType5.close(); } catch(IOException e) {}
      if(bufferedWriterOther != null) try { bufferedWriterOther.close(); } catch(IOException e) {}
    }
    
    System.out.println("################ ENDED");
  }
  
  public String clearGarbage(String strOrderText, String strTransNo) {
    
    StringBuffer sbOrderText = new StringBuffer();
    String[] arrOrderTextLine = strOrderText.split("\r\n");
    
    for(String line : arrOrderTextLine) {
      //sbOrderText.append("");
      if( line.indexOf("SSMenuBtn_Click") == -1 &&
//          line.indexOf("SSSettle_Click") == -1 &&
          line.indexOf("CashBox_Open") == -1 &&
          line.indexOf("[정상/반품판매구분]") == -1 &&
          line.indexOf("[판매완료] 거래번호-") == -1 &&
          line.indexOf(strTransNo) == -1 &&
          line.indexOf("판매완료처리됨") == -1 &&
          line.indexOf("[전체취소]") == -1 &&
          line.indexOf("debug Print") == -1 &&
          line.indexOf("Msg>") == -1 &&
          line.indexOf("aaa") == -1 &&
          line.indexOf("Sale_Print -[ 진입 ]") == -1 &&
          line.indexOf("aaaaa") == -1 &&
          line.indexOf("aaaaa") == -1 &&
          line.indexOf("aaaaa") == -1 &&
          line.indexOf("aaaaa") == -1 &&
          line.indexOf("aaaaa") == -1
          ) {
        sbOrderText.append(line);
        sbOrderText.append("\r\n");
      }
    }
    
    return sbOrderText.toString();
  }
  
  public String getTransNo(String strOrderText) {
    
    String strTransNo = "";
    Matcher matcher = null;
    
//    System.out.println("strOrderText : " + strOrderText);
    
    matcher = Pattern.compile("거래번호-([\\s\\S]*?)판매완료처리됨", Pattern.MULTILINE).matcher(strOrderText);
    while (matcher.find()) {
      
//      System.out.println("############## >> matcher.group(1) : " + matcher.group(1).trim());
      
      strTransNo = matcher.group(1);
      break;
    }
    
//    System.out.println("############## >> strTransNo : " + strTransNo);
    
    strTransNo = strTransNo.trim();
    strTransNo = strTransNo.replaceAll("\\[", "").replaceAll("\\]", "");
    
    return strTransNo;
  }
  
  public String getSaleTime(String strOrderText) {
    
    String strSaleTime = "";
    
    int index = strOrderText.indexOf("] [판매완료] 거래번호-");
    
    strSaleTime = index > -1 ? strOrderText.substring(index-8, index) : "";
    strSaleTime = strSaleTime.replaceAll(" ", "0");
    strSaleTime = "2017-08-10 " + strSaleTime;
    
    return strSaleTime;
  }
  
  /**
   * 단품 - 현금
   * 
   * @param strOrderText
   * @return
   */
  public boolean isType1(String strOrderText) {
    
    if( strOrderText.indexOf("[현금]") > -1 && strOrderText.indexOf("[상품신규선택]") > -1 &&
        strOrderText.indexOf("신용카드") == -1 && strOrderText.indexOf("할인") == -1 &&
        strOrderText.indexOf("셋트묶음메인상품") == -1 ) {
      return true;
    }
    
    return false;
  }
  
  /**
   * 복합 - 현금
   * 
   * @param strOrderText
   * @return
   */
  public boolean isType2(String strOrderText) {
    
    if( strOrderText.indexOf("[현금]") > -1 && strOrderText.indexOf("[셋트묶음메인상품]") > -1 &&
        strOrderText.indexOf("신용카드") == -1 && strOrderText.indexOf("할인") == -1) {
      return true;
    }
    
    return false;
  }
  
  /**
   * 복합 - 할인
   * 
   * @param strOrderText
   * @return
   */
  public boolean isType3(String strOrderText) {
    
    if( strOrderText.indexOf("할인") > -1 ) {
      return true;
    }
    
    return false;
  }
  
  /**
   * 복합 - 환불
   * 
   * @param strOrderText
   * @return
   */
  public boolean isType4(String strOrderText) {
    
    if( strOrderText.indexOf("[환불]") > -1 ) {
      return true;
    }
    
    return false;
  }
  
  /**
   * 신용카드
   * 
   * @param strOrderText
   * @return
   */
  public boolean isType5(String strOrderText) {
    
    if( strOrderText.indexOf("신용카드") > -1 ) {
      return true;
    }
    
    return false;
  }
  
}
