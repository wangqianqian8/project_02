/**
 * 标签数据模型
 * 
 */

module.exports = class Tab extends require("./model") {
    /**
     * 获取指定文章的标签列表
     * @param {*} num 
     * @returns 
     */
    static getListByArticleId(id) {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT id,`name` from tabs where article_id = ?'
            // 父类方法
            this.query(sql, id).then(results => {
                resolve(results)
            }).catch(err => {
                console.log(`获取指定文章的标签列表失败:${err.message}`);
                // 把错误扔给下面中间件，中间件进行处理
                reject(err)
            })
        })
    }
}
