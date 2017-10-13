/**
 * 환불
 */
package com.app.common.test;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class RegularSpApp4 {
  
  public static void main(String[] args) throws Exception {
    System.out.println("################ STARTED");
    
    RegularSpApp4 regularSpApp = new RegularSpApp4();
    regularSpApp.listFilesForFolder(new File("D:\\temp\\test\\last_real"), new File("D:\\temp\\test\\RESULT_SP"));
    
    System.out.println("################ ENDED");
  }
  
  public void listFilesForFolder(final File folder, final File resultFolder) throws Exception {
    
    if( !resultFolder.exists() ) {
      resultFolder.mkdir();
    }
    
    for(final File fileEntry : folder.listFiles()) {
      if (fileEntry.isDirectory()) {
        String strOutFolderPath = fileEntry.getPath();
        strOutFolderPath = strOutFolderPath.replaceAll("last_real", "RESULT_SP");
        
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
    
//    File outFile = new File(inFile.getPath().replaceAll(".log", "")+"-SP.log");
//    String strOutFilePath = inFile.getPath().substring(0, inFile.getPath().length()-4)+"-SP.log";
//    strOutFilePath = strOutFilePath.replaceAll("last_real", "last_real"+File.separator+File.separator+"RESULT_SP");
    
    String strOutFilePath = inFile.getPath().substring(0, inFile.getPath().length()-4)+"-SP.log";
    strOutFilePath = strOutFilePath.replaceAll("last_real", "RESULT_SP");
    
    File outFile = new File(strOutFilePath);
    
    /**
     * 읽기
     */
    
    BufferedReader in = new BufferedReader( new FileReader(inFile));
    String s;
    
    StringBuffer sbFile = new StringBuffer();
//    StringBuffer sbSP = new StringBuffer();
    
    while ((s = in.readLine()) != null) {
      sbFile.append(s);
    }
    
    in.close();

    /**
     * 쓰기
     */
    BufferedWriter bufferedWriter = null;
    Matcher matcher = null;
    
    try {
      bufferedWriter = new BufferedWriter(new FileWriter(outFile));
      
      /**
       * 정규식
       */
      matcher = Pattern.compile("EXEC spCorner_PutSaleItemTran_ByUserCi3 (.+?)OUTPUT", Pattern.MULTILINE).matcher(sbFile.toString());
      while (matcher.find()) {
        bufferedWriter.write(matcher.group(0));
        bufferedWriter.newLine();
      }
      
      /**
       * 정규식
       */
      matcher = Pattern.compile("EXEC spCorner_PutSaleItemChoiceTran2 (.+?)OUTPUT", Pattern.MULTILINE).matcher(sbFile.toString());
      while (matcher.find()) {
        bufferedWriter.write(matcher.group(0));
        bufferedWriter.newLine();
      }
      
      /**
       * 정규식
       */
      matcher = Pattern.compile("EXEC USP_APPLE_TRAN_CORNERSHOP_SALE_RECEIVETYPE_UPDATE \'(.+?)\', (.+?), \'(.+?)\', \'(.+?)\'", Pattern.MULTILINE).matcher(sbFile.toString());
      
      while (matcher.find()) {
//        System.out.println("matcher.group(0) : " + matcher.group(0));
        
        bufferedWriter.write(matcher.group(0));
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
