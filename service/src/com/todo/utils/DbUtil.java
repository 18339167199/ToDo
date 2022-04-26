package com.todo.utils;

import java.sql.*;
import java.util.ResourceBundle;

/**
 * @author 李茂斌
 */
public class DbUtil {

    private static ResourceBundle bundle = ResourceBundle.getBundle("config/db");

    private static String driver = bundle.getString("driver");

    private static String url = bundle.getString("url");

    private static String user = bundle.getString("user");

    private static String password = bundle.getString("password");

    private DbUtil() {}

    static {
        try {
            Class.forName(driver);
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
    }

    public static Connection getConnection() throws SQLException {
        return DriverManager.getConnection(url, user, password);
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
