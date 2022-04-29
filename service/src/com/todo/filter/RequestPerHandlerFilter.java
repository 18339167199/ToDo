package com.todo.filter;

import jakarta.servlet.*;

import java.io.IOException;

public class RequestPerHandlerFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        Filter.super.init(filterConfig);
    }

    @Override
    public void destroy() {
        Filter.super.destroy();
    }

    @Override
    public void doFilter(ServletRequest req, ServletResponse resp, FilterChain chain) throws IOException, ServletException {
        resp.setContentType("application/json;charset=utf-8");
        chain.doFilter(req, resp);
    }
}
