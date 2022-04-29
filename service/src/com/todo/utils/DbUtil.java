package com.todo.utils;

import java.sql.*;
import java.util.ResourceBundle;

/**
 * @author 李茂斌
 */
public class DbUtil {

    private final static ResourceBundle BUNDLE = ResourceBundle.getBundle("config/db");

    private final static String DRIVER = BUNDLE.getString("driver");

    private final static String URL = BUNDLE.getString("url");

    private final static String USER = BUNDLE.getString("user");

    private final static String PASSWORD = BUNDLE.getString("password");

    private DbUtil() {}

    static {
        try {
            Class.forName(DRIVER);
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
    }

    public static Connection getConnection() throws SQLException {
        return DriverManager.getConnection(URL, USER, PASSWORD);
    }

    public static void close(Connection conn, Statement stmt) {
        if (conn != null) {
            try {
                conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        if (stmt != null) {
            try {
                stmt.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }

    public static void close(Connection conn, Statement stmt, ResultSet rs) {
        close(conn, stmt);
        if (rs != null) {
            try {
                rs.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
}
