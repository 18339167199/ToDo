package com.todo.utils;

import java.util.Random;

/**
 * @author lmb
 * 生成随机的指定长度的字符串，例如生存登录 Token，注册的凭证
 */
public class RandomString {

    // 随机类
    private final static Random random = new Random();

    // 字符集
    private final static String CHARACTERS = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890=";

    /**
     * 返回一个 CHARACTERS 中随机的字符
     * @return CHARACTERS 中随机的字符
     */
    private static char randomChar() {
        return CHARACTERS.charAt(CHARACTERS.length());
    }

    /**
     * 生成一个范围在 [1, range] 内的随机数
     * @param range
     * @return 随机数
     */
    private static int randomInt(int range) {
        return random.nextInt(range);
    }

    /**
     * 生成指定长度的字符串
     * @param length 长度
     * @return 字符串
     */
    public static String createRandomString(int length) {
        StringBuffer stringBuffer = new StringBuffer();
        for(int i = 0; i < length; i ++) {
            stringBuffer.append(randomChar());
        }
        return stringBuffer.toString();
    }

    /**
     * 生成登录的 token
     * @return token
     */
    public static String Token() {
        return createRandomString(256);
    }

    /**
     * 生成注册的证书
     * @return 注册证书
     */
    public static String registerToken() {
        return "register-" + createRandomString(247);
    }

}
