package com.todo.utils;

import jakarta.servlet.ServletRequest;
import java.io.BufferedReader;
import java.io.IOException;

public class RequestHandler {

    public static void handerRequest(ServletRequest req) {
        req.setAttribute("body", getJSONString(req));
    }

    private static String getJSONString(ServletRequest req) {
        StringBuffer stringBuffer = new StringBuffer();
        String line;

        try {
            BufferedReader reader = req.getReader();
            while ((line = reader.readLine()) != null) {
                stringBuffer.append(line);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        return stringBuffer
                .toString()
                .replaceAll("\\s", "")
                .replaceAll("\n", "");
    }
}
