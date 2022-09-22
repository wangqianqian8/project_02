/**
 * 文章类目数据模型
 */
module.exports = class Category extends require("./model") {
   
    /**导航条文字
     * 获取文章类目列表
     */
    static getList() {
        return new Promise((resolve, reject) => {
            // index值越大文章越靠前
            let sql = 'select id,`name`,`index` from  category order by `index` desc'
            // 父类方法
            this.query(sql).then(results => {
                resolve(results)
            }).catch(err => {
                console.log(`获取文章类目列表失败:${err.message}`);
                // 把错误扔给下面中间件，中间件进行处理
                reject(err)
            })
        })
    }
     

    /**
     * 获取指定编号的类目详情
     * @returns {integer} id 类目编号
     */
    static getCategoryById(id) {
        return new Promise((resolve, reject) => {
               
            let sql = 'select id,`name`,`index` from category where id=?'
            // 父类方法
            this.query(sql, id).then(results => {
                // 只获取一条数据
                resolve(results[0])
            }).catch(err => {
                console.log(`获取指定编号的类目详情失败:${err.message}`);
                // 把错误扔给下面中间件，中间件进行处理
                reject(err)
            })
        })
    }
     


    /**
 * 总类目数
 *  
 */
    static getCount() {
        return new Promise((resolve, reject) => {
               
            let sql = 'select count(1) as `count` from category'
            // 父类方法
            this.query(sql).then(results => {
                resolve(results[0].count)
            }).catch(err => {
                console.log(`获取类目数失败:${err.message}`);
                // 把错误扔给下面中间件，中间件进行处理
                reject(err)
            })
        })
    }
     

    /**
 * 新增类目
 *
 */
    static add(name, index) {
        return new Promise((resolve, reject) => {
               
            let sql = 'INSERT INTO category (`name`,`index`) VALUES (?,?)'
            // 父类方法
            this.query(sql, [name, index]).then(results => {
                resolve(results.insertId)
            }).catch(err => {
                console.log(`新增类目失败:${err.message}`);
                // 把错误扔给下面中间件，中间件进行处理
                reject(err)
            })
        })
    }

    /**
        * 删除类目
        * @param {integer} id 类目编号
        */
    static del(id) {
        return new Promise((resolve, reject) => {
            let sql = 'DELETE FROM category WHERE id = ?'
            this.query(sql, id).then(results => {
                resolve(results.affectedRows)
            }).catch(err => {
                console.log(`删除类目失败：${err.message}`)
                reject(err)
            })
        })
    }
    /**
        * 修改类目名称
        * @param {integer} id 类目编号
        */
    static setName(id,name) {
        return new Promise((resolve, reject) => {
            let sql = 'UPDATE category SET `name` = ? WHERE id = ?'
            this.query(sql, [name,id]).then(results => {
                resolve(results.affectedRows)
            }).catch(err => {
                console.log(`修改类目名称失败：${err.message}`)
                reject(err)
            })
        })
    }
    /**
        * 修改类目排序号
        * @param {integer} id 类目编号
        */
    static setIndex(id,index) {
        return new Promise((resolve, reject) => {
            let sql = 'UPDATE category SET `index` = ? WHERE id = ?'
            this.query(sql, [index,id]).then(results => {
                resolve(results.affectedRows)
            }).catch(err => {
                console.log(`修改类目排序号失败：${err.message}`)
                reject(err)
            })
        })
    }

}