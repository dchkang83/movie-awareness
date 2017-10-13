package com.app.common.test;

import java.io.UnsupportedEncodingException;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.Base64.Encoder;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;
import org.junit.Test;

public class AES256CipherTest {
  String id = "testid";
  String custrnmNo = "111111";
  String custNm = "테스트";

  @Test
  public void encDesTest() throws InvalidKeyException, UnsupportedEncodingException, NoSuchAlgorithmException, NoSuchPaddingException, InvalidAlgorithmParameterException, IllegalBlockSizeException, BadPaddingException {
    
    
    
    
    
    
    
    
//    AES256Cipher a256 = AES256Cipher.getInstance();
//    
////    String enId = a256.AES_Encode(id);
////    String enYyyymmdd = a256.AES_Encode(custrnmNo);
////    String enCustNm = a256.AES_Encode(custNm);
////
////    String desId = a256.AES_Decode(enId);
////    String desYyyymmdd = a256.AES_Decode(enYyyymmdd);
////    String desCustNm = a256.AES_Decode(enCustNm);
//    
//    System.out.println(">>>>>>>> " + a256.AES_Encode("Data Source=172.20.64.3;Initial Catalog=mssql1;Persist Security Info=True;User ID=cinus_user;Password=cinusmssql1"));
//    System.out.println(">>>>>>>> " + a256.AES_Decode(replaceData("LCHyBWyUh4LhaigAF2Ma1uk315wVVoQ9Du3BiEiKacjvLI2DJwM/qF2tffuDbf0uNs0a9Yr75rzBryk6AaZzJXUlDSmVW+xCoJLMSd9X9uS6ZbGuG9mc52Wzt4QSIJ6F/vsLeW3eDCIWHUq2PlAwxw==")));
    
//    assertThat(id, is(desId));
//    assertThat(custrnmNo, is(desYyyymmdd));
//    assertThat(custNm, is(desCustNm));
  }
  
  public static String replaceData(String str) {
    
//    str = str.replaceAll("", "");
    str = str.replaceAll("%2b", "+").replaceAll("%3d", "=").replaceAll("%2f", "/").replaceAll("%2B", "+").replaceAll("%3D", "=").replaceAll("%2F", "/").replaceAll(" ", "+");
    
    return str;
  }
}