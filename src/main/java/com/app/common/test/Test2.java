package com.app.common.test;

//import java.util.Base64;
import org.apache.commons.codec.binary.Base64;

public class Test2 {

  public static void main(String[] args) throws Exception {

    String OutsideKey = "Oi81NmhhNS4+NWleOTY9LT0uNS9mYGYuPF46X2tgNS4=";
    String OutsideIv  = "OWA+NTUuN148Mzctay1pLTgxNy41X2guOWFpLTo2NS4=";
    
    /*
      <!-- 내부용key -->
      <add key="InsideKey" value="Oi81NmhhNS4+NWleOTY9LT0uNS9mYGYuPF46X2tgNS4="/>
      <!-- 내부용iv -->
      <add key="InsideIv" value="OWA+NTUuN148Mzctay1pLTgxNy41X2guOWFpLTo2NS4="/>
      
      tmpKey  "Oi81NmhhNS4+NWleOTY9LT0uNS9mYGYuPF46X2tgNS4="  string
      tmpIv "OWA+NTUuN148Mzctay1pLTgxNy41X2guOWFpLTo2NS4="  string
      
      key "5209cd0198da49808102aca17a5bfc01"  string
      iv  "4c98012a7620f0d034210bc14dd05901"  string
    */
    
    System.out.println("IN  : Oi81NmhhNS4+NWleOTY9LT0uNS9mYGYuPF46X2tgNS4=");
    System.out.println("OUT1[32] : 5209cd0198da49808102aca17a5bfc01");
    System.out.println("OUT2[32] : 5209cd0198da49808102aca17a5bfc01");
    System.out.println("");
    
    String strOutsideKey = decryptCustom(OutsideKey);
    System.out.println("OutsideKey[" + strOutsideKey.length() + "] : " + strOutsideKey);
    
    String strOutsideIv = decryptCustom(OutsideIv);
    System.out.println("OutsideIv[" + strOutsideIv.length() + "] : " + strOutsideIv);
    
    
//    String strOut1 = "";
//////    System.out.println("OUT2[" + strOut1.length() + "] : " + strOut1);
//    strOut1 = new String(hex2Byte(strOutsideKey), "UTF-8");
//    System.out.println("decodedString[" + strOut1.length() + "] : " + strOut1);
    
    
    System.out.println("");

    AES256Cipher a256 = AES256Cipher.getInstance();
    System.out.println("AES_Encode >>>>>>>> " + a256.AES_Encode("Data Source=172.20.64.3;Initial Catalog=mssql1;Persist Security Info=True;User ID=cinus_user;Password=cinusmssql1"));
    System.out.println("AES_Decode >>>>>>>> " + a256.AES_Decode(replaceData("LCHyBWyUh4LhaigAF2Ma1uk315wVVoQ9Du3BiEiKacjvLI2DJwM/qF2tffuDbf0uNs0a9Yr75rzBryk6AaZzJXUlDSmVW+xCoJLMSd9X9uS6ZbGuG9mc52Wzt4QSIJ6F/vsLeW3eDCIWHUq2PlAwxw==")));
    
    
  }
  

  public static String replaceData(String str) {
    
//    str = str.replaceAll("", "");
    str = str.replaceAll("%2b", "+").replaceAll("%3d", "=").replaceAll("%2f", "/").replaceAll("%2B", "+").replaceAll("%3D", "=").replaceAll("%2F", "/").replaceAll(" ", "+");
    
    return str;
  }
  
  
  
  
  private static String decryptCustom(String data) throws Exception {
    String returnData = "";
    
    byte[] byteBuffer = Base64.decodeBase64(data);
    
    for (int i = 0; i < byteBuffer.length; i++) {
      if (i % 2 == 0) {
        byteBuffer[i] = (byte) (byteBuffer[i] - 5);
      } else {
        byteBuffer[i] = (byte) (byteBuffer[i] + 3);
      }
    }
    
    returnData = new String(byteBuffer, "UTF-8");
    
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