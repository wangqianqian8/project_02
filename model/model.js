const mysql = require("mysql")

// 数据模型的基类，所有数据模型都要继承这个类，
// 封装了数据库操作
module.exports = class Model {
    // 数据库连接对象
    static conn = null;

    // 数据库连接方法
    static connection() {
        Model.conn = mysql.createConnection({
            host: '127.0.0.1',
            user: 'root',
            password: 'admin123',
            database: 'blog'
        })
        Model.conn.connect(err => {
            if (err) {
                console.log(`数据库连接失败: ${err.message}`);
            }
        })
    }


    /**
     * 关闭数据库连接
     */
    static end() {
        if (Model.conn != null) {
            Model.conn.end();
        }
    }
    /**
     * 通用查询方法
     * @param {string} sql 要执行的sql语句
     * @param {Array} params 给sql语句的占位符进行赋值的参数数组
     */
    // 通用查询,sql语句占位符传参
    static query(sql, params = []) {
        // 由于sql语句执行时异步操作，要promise同步化
        return new Promise((resolve, reject) => {
            // 数据库连接
            this.connection()
            // 数据库查询
            Model.conn.query(sql, params, (err, results) => {
                if (err) { reject(err) }
                else { resolve(results) }
            })
            // 数据库关闭
            this.end()
        })

    }
}