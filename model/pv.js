/**
 * 访问量模型
 * 
 */

 module.exports = class Tab extends require("./model") {
    /**
     * 获取总访问量
     */
    static getTotal() {
        return new Promise((resolve, reject) => {
            let sql = 'select sum(hits) as total from pv'
            // 父类方法
            this.query(sql).then(results => {
                resolve(results[0].total)
            }).catch(err => {
                console.log(`获取总访问量失败:${err.message}`);
                // 把错误扔给下面中间件，中间件进行处理
                reject(err)
            })
        })
     }
     

    /**
     * 获取全部访问量
     */
    static getAll() {
        return new Promise((resolve, reject) => {
            let sql = 'select `time`,hits from pv order by `time` asc'
            // 父类方法
            this.query(sql).then(results => {
                // 返回sql查询结果集数组
                resolve(results)
            }).catch(err => {
                console.log(`获取全部访问量失败:${err.message}`);
                // 把错误扔给下面中间件，中间件进行处理
                reject(err)
            })
        })
    }
}
