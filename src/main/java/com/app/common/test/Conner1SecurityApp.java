/**
 * 환불
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

public class Conner1SecurityApp {
  
  public static final String IN_ROOT_PATH = "D:\\temp\\01. conner1\\in";
  public static final String OUT_ROOT_PATH = "D:\\temp\\01. conner1\\out\\security";
  
  public static final File inFolder = new File(IN_ROOT_PATH);
  public static final File outFile  = new File(OUT_ROOT_PATH + "\\conner1-ALL-Security.log");
  
  public static Map<String, String> outMap = new HashMap<String, String>();
  
  public static void main(String[] args) throws Exception {
    System.out.println("################ STARTED");
    
    Conner1SecurityApp app = new Conner1SecurityApp();
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
        listFilesForFolder(fileEntry);
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
    
    /**
     * 읽기
     */
//    InputStream in;
//    in = new FileInputStream(inFile);
//    InputStreamReader reader = new InputStreamReader( in, Charset.forName("Cp1252"));
//    StringBuffer sbFile = new StringBuffer();
//    int ch;
//    
//    while ((ch = reader.read()) > -1) {
//      sbFile.append((char)ch);
//    }
//    
//    String fileText = new String(sbFile.toString().getBytes(reader.getEncoding()), Charset.forName("Cp949"));
//    reader.close();
    
//    String fileText = this.getFileText(inFile);
    
    
    // ### UTF-8
    String fileText = this.getFileText(inFile); 
    
    /**
     * 정규식 - spCorner_DelCard
     */
    Matcher matcher = Pattern.compile("DLL 승인요청: / ([\\s\\S]*?) / ", Pattern.MULTILINE).matcher(fileText);
    while (matcher.find()) {
//      list.add(matcher.group(1));
      outMap.put(matcher.group(1), matcher.group(1));
    }
    

    // ### ANSI
    fileText = this.getAnsiFileText(inFile); 
    
    /**
     * 정규식 - spCorner_DelCard
     */
    matcher = Pattern.compile("DLL 승인요청: / ([\\s\\S]*?) / ", Pattern.MULTILINE).matcher(fileText);
    while (matcher.find()) {
//      list.add(matcher.group(1));
      outMap.put(matcher.group(1), matcher.group(1));
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
        bufferedWriter.write(elem.getValue());
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
