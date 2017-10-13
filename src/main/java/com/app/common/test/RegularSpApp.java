package com.app.common.test;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
//import java.util.ArrayList;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class RegularSpApp {
  
  public static void main(String[] args) throws Exception {

    System.out.println("################ STARTED");
    
    RegularSpApp regularSpApp = new RegularSpApp();
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
//        System.out.println("origin strOutFolderPath >>> " + strOutFolderPath);
        strOutFolderPath = strOutFolderPath.replaceAll("last_real", "RESULT_SP");
//        System.out.println("result strOutFolderPath >>> " + strOutFolderPath);
        
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
  
  
  public boolean isTransNo(String strRowText) {
    boolean bFlag = true;
    
    /*
    String[] arrTransNo = {
        "15712017081012400001",
        "15712017081012400002",
        "15712017081012400003",
        "15712017081012400004",
        "15712017081012400005",
        "15712017081012400007",
        "15712017081012400008",
        "15712017081012400009",
        "15712017081012400010",
        "15712017081012400011",
        "15712017081012400012",
        "15712017081012400013",
        "15712017081012400014",
        "15712017081012400015",
        "15712017081012400016",
        "15712017081012400017",
        "15712017081012400018",
        "15712017081012400019",
        "15712017081012400020",
        "15712017081012400021",
        "15712017081012400022",
        "15712017081012400023",
        "15712017081012400024",
        "15712017081012400025",
        "15712017081012400026",
        "15712017081012400027",
        "15712017081012400028",
        "15712017081012400029",
        "15712017081012400030",
        "15712017081012400031",
        "15712017081012400032",
        "15712017081012400033",
        "15712017081012400034",
        "15712017081012400035",
        "15712017081012400036",
        "15712017081012400037",
        "15712017081012400038",
        "15712017081012400039",
        "15712017081012400040",
        "15712017081012400041",
        "15712017081012400042",
        "15712017081012400043",
        "15712017081012400044",
        "15712017081012400045",
        "15712017081012400046",
        "15712017081012400047",
        "15712017081012400048",
        "15712017081012400049",
        "15712017081012400051",
        "15712017081012400052",
        "15712017081012400053",
        "15712017081012400054",
        "15712017081012400055",
        "15712017081012400056",
        "15712017081012400057",
        "15712017081012400058"
    };
    
    
    for(String str : arrTransNo) {
      if( strRowText.indexOf(str) > -1 ) {
        bFlag = true;
        break;
      }
    }    
    */
    
    return bFlag;
  }
  
  public void createSpFile(File inFile) throws Exception {
//    File outFile = new File(inFile.getPath().replaceAll(".log", "")+"-SP.log");
//    String strOutFilePath = inFile.getPath().substring(0, inFile.getPath().length()-4)+"-SP.log";
//    strOutFilePath = strOutFilePath.replaceAll("last_real", "last_real"+File.separator+File.separator+"RESULT_SP");
    
    String strOutFilePath = inFile.getPath().substring(0, inFile.getPath().length()-4)+"-SP.log";
    strOutFilePath = strOutFilePath.replaceAll("last_real", "RESULT_SP");
    
    File outFile = new File(strOutFilePath);
    
//    System.out.println("### inFile.getPath() : " + inFile.getPath());
//    System.out.println("### outFile.getPath() : " + outFile.getPath());
    
    /**
     * 읽기
     */
    BufferedReader in = new BufferedReader( new FileReader(inFile));
    String s;
    
    StringBuffer sbFile = new StringBuffer();
    
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
      bufferedWriter.write("use corner");
      bufferedWriter.newLine();
      bufferedWriter.write("go");
      bufferedWriter.newLine();
      bufferedWriter.write("declare @retvalue int");
      bufferedWriter.newLine();
      
      /**
       * 정규식 - spCorner_PutSaleItemTran_ByUserCi2
       */
      matcher = Pattern.compile("EXEC spCorner_PutSaleItemTran_ByUserCi2(.+?)OUTPUT", Pattern.MULTILINE).matcher(sbFile.toString());
      while (matcher.find()) {
        String str = matcher.group(0);
        str = str.replaceAll("spCorner_PutSaleItemTran_ByUserCi2", "spCorner_PutSaleItemTran_ByUserCi2_TEST");
        
        bufferedWriter.write(str);
        bufferedWriter.newLine();
      }
      
      /**
       * 정규식 - spCorner_PutSaleItemChoiceTran3
       */
      matcher = Pattern.compile("EXEC spCorner_PutSaleItemChoiceTran3(.+?)OUTPUT", Pattern.MULTILINE).matcher(sbFile.toString());
      while (matcher.find()) {
        String str = matcher.group(0);
        str = str.replaceAll("spCorner_PutSaleItemChoiceTran3", "spCorner_PutSaleItemChoiceTran3_TEST");
        
        if( isTransNo(str) ) {
          bufferedWriter.write(str);
          bufferedWriter.newLine();
        }
      }
      
      /**
       * 정규식 - spCorner_PutSaleSettleTran
       */
      matcher = Pattern.compile("EXEC spCorner_PutSaleSettleTran(.+?)OUTPUT", Pattern.MULTILINE).matcher(sbFile.toString());
      while (matcher.find()) {
        String str = matcher.group(0);
        str = str.replaceAll("spCorner_PutSaleSettleTran", "spCorner_PutSaleSettleTran_TEST");

        if( isTransNo(str) ) {
          bufferedWriter.write(str);
          bufferedWriter.newLine();
        }
      }
      
      /**
       * 정규식 - spCorner_PutCard
       */
      matcher = Pattern.compile("EXEC spCorner_PutCard(.+?)OUTPUT", Pattern.MULTILINE).matcher(sbFile.toString());
      while (matcher.find()) {
        String str = matcher.group(0);
//        str = str.replaceAll("spCorner_PutCard", "spCorner_PutCard");
        str = str.replaceAll("spCorner_PutCard_2012", "spCorner_PutCard_2012_TEST");
        
        if( isTransNo(str) ) {
          bufferedWriter.write(str);
          bufferedWriter.newLine();
        }
      }
      
      
      /**
       * 정규식 - spCorner_UpdateCardTransNo
       */
      matcher = Pattern.compile("EXEC spCorner_UpdateCardTransNo(.+?)OUTPUT", Pattern.MULTILINE).matcher(sbFile.toString());
      while (matcher.find()) {
        String str = matcher.group(0);
        
        if( isTransNo(str) ) {
          bufferedWriter.write(str);
          bufferedWriter.newLine();
        }
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
