package com.todo.servlet;

import com.alibaba.fastjson.JSON;
import com.todo.utils.CommonResponse;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;

@WebServlet(
        name = "Test",
        urlPatterns = "/test"
)
public class Test extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp
            .getWriter()
            .println(new CommonResponse(1, "success", "data"));
    }
}
