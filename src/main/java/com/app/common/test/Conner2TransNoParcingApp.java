/**
 * 할인 패턴 찾기
 */
package com.app.common.test;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.Charset;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Conner2TransNoParcingApp {
  
  public static final String IN_ROOT_PATH = "D:\\temp\\02. conner2\\in";
//  public static final String IN_ROOT_PATH = "D:\\temp\\02. conner2\\in\\test";
  public static final String OUT_ROOT_PATH = "D:\\temp\\02. conner2\\out\\transNo";
  
  public static final File inFolder = new File(IN_ROOT_PATH);
  public static final File outFile  = new File(OUT_ROOT_PATH + "\\conner2-ALL-TransNo.txt");
  
  public static Map<String, String> outMap = new HashMap<String, String>();
  
  public static void main(String[] args) throws Exception {
    System.out.println("\r\n################ STARTED");
    
    Conner2TransNoParcingApp app = new Conner2TransNoParcingApp();
    app.listFilesForFolder(inFolder);
    app.writeFile();
    
    System.out.println("################ ENDED");
  }
  
  /**
   * 폴더 스캔
   * 
   * @param folder
   * @param resultFolder
   * @throws Exception
   */
  public void listFilesForFolder(final File folder) throws Exception {
    
    for(final File fileEntry : folder.listFiles()) {
      if (fileEntry.isDirectory()) {
        this.listFilesForFolder(fileEntry);
      }
      else {
        String fileName = fileEntry.getName().toLowerCase();
        String extension = fileName.substring(fileName.length() - 3, fileName.length());
        extension = extension.toLowerCase();
        
        if( extension.equals("log") ) {
//          System.out.println("extension >> " + extension);
//          System.out.println("### fileEntry.getPath() : " + fileEntry.getPath());
          this.getPattern(fileEntry);
        }
      }
    }
  }
  
  /**
   * 정규식
   * 
   * @param inFile
   * @throws Exception
   */
  public void getPattern(File inFile) throws Exception {
    
    String fileText = "";
    Matcher matcher = null;
    
    /**
     * UTF-8
     */
    fileText = this.getAnsiFileText(inFile);
    
    // 정상
    matcher = Pattern.compile("EXEC spCorner_PutSaleItemTran_ByUserCi2 ([\\s\\S]*?)OUTPUT", Pattern.MULTILINE).matcher(fileText);
    while (matcher.find()) {
      
      String[] arrSpText  = matcher.group(1).trim().split(",");
      
      String strTransNo   = arrSpText[0].trim();
      String strSaleTime  = arrSpText[26].trim();
      
      outMap.put(strTransNo, strSaleTime);
    }
    
    // 환불
    matcher = Pattern.compile("EXEC spCorner_RefundTransNo_Item (.+?)OUTPUT", Pattern.MULTILINE).matcher(fileText);
    while (matcher.find()) {
      
      String[] arrSpText  = matcher.group(1).trim().split(",");
      
      String strTransNo   = arrSpText[2].trim();
      String strSaleTime  = "''";
      
      outMap.put(strTransNo, strSaleTime);
    }
    
    /**
     * ANSI
     */
    fileText = this.getAnsiFileText(inFile);
    
    // 정상
    matcher = Pattern.compile("EXEC spCorner_PutSaleItemTran_ByUserCi2 ([\\s\\S]*?)OUTPUT", Pattern.MULTILINE).matcher(fileText);
    while (matcher.find()) {
      
      String[] arrSpText  = matcher.group(1).trim().split(",");
      
      String strTransNo   = arrSpText[0].trim();
      String strSaleTime  = arrSpText[26].trim();
      
      outMap.put(strTransNo, strSaleTime);
    }
    
    // 환불
    matcher = Pattern.compile("EXEC spCorner_RefundTransNo_Item (.+?)OUTPUT", Pattern.MULTILINE).matcher(fileText);
    while (matcher.find()) {
      
      String[] arrSpText  = matcher.group(1).trim().split(",");
      
      String strTransNo   = arrSpText[2].trim();
      String strSaleTime  = "''";
      
      outMap.put(strTransNo, strSaleTime);
    }
  }
  
  /**
   * 파일 읽기 - UTF-8
   * 
   * @param inFile
   * @return
   * @throws Exception
   */
  public String getFileText(File inFile) throws Exception {
    BufferedReader in = new BufferedReader( new FileReader(inFile));
    String s;
    
    StringBuffer sbFile = new StringBuffer();
    
    while ((s = in.readLine()) != null) {
      sbFile.append(s);
    }
    
    in.close();
    
    return sbFile.toString();
  }

  /**
   * 파일 읽기 - ANSI
   * 
   * @param inFile
   * @return
   * @throws Exception
   */
  public String getAnsiFileText(File inFile) throws Exception {
    InputStream in = new FileInputStream(inFile);
    InputStreamReader reader = new InputStreamReader( in, Charset.forName("Cp1252"));
    StringBuffer sbFile = new StringBuffer();
    int ch;
    
    while ((ch = reader.read()) > -1) {
      sbFile.append((char)ch);
    }
    
    String fileText = sbFile.toString();
    fileText = new String(fileText.getBytes(reader.getEncoding()), Charset.forName("Cp949"));
    
    reader.close();
    
    return fileText;
  }
  
  /**
   * 파일쓰기
   */
  public void writeFile() {
    BufferedWriter bufferedWriter = null;
    
    try {
      bufferedWriter = new BufferedWriter(new FileWriter(outFile));
      
      for( Map.Entry<String, String> elem : outMap.entrySet() ) {
//        System.out.println( String.format("키 : %s, 값 : %s", elem.getKey(), elem.getValue()) );
        String sql = "INSERT INTO mssql1.DBO.TB_CORNER_LOG_SAVE (TRANSNO, CREATEDATE)";
        
        bufferedWriter.write( String.format("%s VALUES ( %s, %s );", sql, elem.getKey(), elem.getValue()) );
        bufferedWriter.newLine();
      }
      
      bufferedWriter.flush();
    }
    catch(IOException ie) {
      ie.printStackTrace();
    }
    finally {
      if(bufferedWriter != null) try { bufferedWriter.close(); } catch(IOException e) {}
    }
  }
}
