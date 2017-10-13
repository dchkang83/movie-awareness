package com.app.common.test;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.SecretKey;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.InvalidAlgorithmParameterException;
import org.apache.commons.codec.binary.Base64;

public class AES256Cipher {

  private static volatile AES256Cipher INSTANCE;

  /*
  final static String secretKey = "12345678901234567890123456789012"; // 32bit
  static String IV = ""; // 16bit
  */
//  // 내부
//  final static String secretKey = "Oi81NmhhNS4+NWleOTY9LT0uNS9mYGYuPF46X2tgNS4=";
//  static String IV = "OWA+NTUuN148Mzctay1pLTgxNy41X2guOWFpLTo2NS4=";
  
  // 외부
  final static String secretKey = "Oi81NmhhNS4+NWleOTY9LT0uNS9mYGYuPF46X2tgNS4=";
  static String IV = "OWA+NTUuN148Mzctay1pLTgxNy41X2guOWFpLTo2NS4=";
  
  static byte[] putSecretKey = null;
  static byte[] putSecretIV = null;
  
  

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
  

  public static AES256Cipher getInstance() throws Exception {
    
    System.out.println("decryptCustom(secretKey) : " + decryptCustom(secretKey));
    System.out.println("hex2Byte(decryptCustom(secretKey)) : " + hex2Byte(decryptCustom(secretKey)));
    
    
    putSecretKey = hex2Byte(decryptCustom(secretKey));
    putSecretIV = hex2Byte(decryptCustom(IV));
    
    
    if (INSTANCE == null) {
      synchronized (AES256Cipher.class) {
        if (INSTANCE == null)
          INSTANCE = new AES256Cipher();
      }
    }
    return INSTANCE;
  }

  private AES256Cipher() {
//    IV = secretKey.substring(0, 16);
//    IV = secretKey.substring(0, 16);
  }

  // 암호화
  public static String AES_Encode(String str)
      throws java.io.UnsupportedEncodingException, NoSuchAlgorithmException, NoSuchPaddingException, InvalidKeyException, InvalidAlgorithmParameterException, IllegalBlockSizeException, BadPaddingException {
    byte[] keyData = putSecretKey;

    SecretKey secureKey = new SecretKeySpec(keyData, "AES");

    Cipher c = Cipher.getInstance("AES/CBC/PKCS5Padding");
    c.init(Cipher.ENCRYPT_MODE, secureKey, new IvParameterSpec(putSecretIV));

    byte[] encrypted = c.doFinal(str.getBytes("UTF-8"));
    String enStr = new String(Base64.encodeBase64(encrypted));

    return enStr;
  }

  // 복호화
  public static String AES_Decode(String str)
      throws java.io.UnsupportedEncodingException, NoSuchAlgorithmException, NoSuchPaddingException, InvalidKeyException, InvalidAlgorithmParameterException, IllegalBlockSizeException, BadPaddingException {
    byte[] keyData = putSecretKey;
    SecretKey secureKey = new SecretKeySpec(keyData, "AES");
    Cipher c = Cipher.getInstance("AES/CBC/PKCS5Padding");
    c.init(Cipher.DECRYPT_MODE, secureKey, new IvParameterSpec(putSecretIV));

    byte[] byteStr = Base64.decodeBase64(str.getBytes());

    return new String(c.doFinal(byteStr), "UTF-8");
  }
}