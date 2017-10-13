package com.app.common.test;

//import java.util.Base64;
import org.apache.commons.codec.binary.Base64;

public class Test {

  public static void main(String[] args) throws Exception {

    String OutsideKey = "Oi81NmhhNS4+NWleOTY9LT0uNS9mYGYuPF46X2tgNS4=";
    String OutsideIv = "OWA+NTUuN148Mzctay1pLTgxNy41X2guOWFpLTo2NS4=";
    
    String decodedString = "";
    decodedString = OutsideKey;
    
    
    
    String text = "hello java";
    
    /* base64 encoding */
    byte[] encoded = Base64.encodeBase64(text.getBytes());
    
    /* base64 decoding */
//    byte[] decoded = Base64.decodeBase64(encoded);
    byte[] decoded = Base64.decodeBase64(OutsideKey);
    
    System.out.println("원문 : " + text);
    System.out.println("Base 64 인코딩 후[" + new String(encoded).length() + "] : " + new String(encoded));
    System.out.println("Base 64 디코딩 후[" + new String(decoded).length() + "] : " + new String(decoded));

    
    
    

//    decodedString = decryptCustom(OutsideKey);
//    decodedString = decryptCustom(new String(decoded));
    decodedString = new String(decoded);
    System.out.println("decodedString[" + decodedString.length() + "] : " + decodedString);
    

    decodedString = new String(hex2Byte(decodedString), "UTF-8");
    System.out.println("LAST KEY decodedString[" + decodedString.length() + "] : " + decodedString);
    
    
//    decodedString = decryptCustom(OutsideKey);
//    System.out.println("decodedString[" + decodedString.length() + "] : " + decodedString);
//    
//    decodedString = new String(hex2Byte(decodedString), "UTF-8");
//    System.out.println("decodedString[" + decodedString.length() + "] : " + decodedString);
  }
  
  private static String decryptCustom(String data) {
    String returnData = "";
    
    byte[] byteBuffer = Base64.encodeBase64(data.getBytes());
    
    for (int i = 0; i < byteBuffer.length; i++) {
      if (i % 2 == 0) {
        byteBuffer[i] = (byte) (byteBuffer[i] - 5);
      } else {
        byteBuffer[i] = (byte) (byteBuffer[i] + 3);
      }
    }

//    returnData = Base64.getEncoder().encodeToString(byteBuffer);
    returnData = new String(byteBuffer);
    
    return returnData;
  }

  public static byte[] hex2Byte(String hex) throws Exception {
    byte[] arrayOfByte = new byte[hex.length() / 2];
    for (int i = 0; i < arrayOfByte.length; i++) {
      arrayOfByte[i] = (byte) Integer.parseInt(hex.substring(2 * i, 2 * i + 2), 16);
    }
    return arrayOfByte;
  }
}