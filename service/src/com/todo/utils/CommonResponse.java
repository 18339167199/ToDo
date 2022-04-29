package com.todo.utils;

import com.alibaba.fastjson.JSON;
import java.util.HashMap;

public class CommonResponse {
    private HashMap hashMap = new HashMap();

    private int code;

    private String message;

    private Object data;

    public CommonResponse(int code, String message, Object data) {
        this.code = code;
        this.message = message;
        this.data = data;

        hashMap.put("code", code);
        hashMap.put("message", message);
        hashMap.put("data", data);
    }

    public void setCode(int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public Object getData() {
        return data;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    @Override
    public String toString() {
        return JSON.toJSONString(hashMap);
    }
}
