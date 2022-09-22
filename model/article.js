// const { param } = require("../router/admin/article")

/**
 * 文章属性模型
 * @param{integer}num
 */
module.exports = class Article extends require("./model") {
    /**
     * 获取热门文章
     * @param {integer} num 条目数
     * @returns 
     */
    static getHot(num) {
        return new Promise((resolve, reject) => {
            let sql = 'select id,title,content,`time`,thumbnail from article where hot = 1 limit ?'
            // 父类方法
            this.query(sql,num).then(results => {
                resolve(results)
            }).catch(err => {
                console.log(`获取热门文章失败:${err.message}`);
                // 把错误扔给下面中间件，中间件进行处理
                reject(err)
            })
        })
    }

    /**
     * 获取文章列表
     */
    static getList(){
            return new Promise((resolve, reject) => {
                let sql = 'select id,title,content,`time` from article order by time desc'
                // 父类方法
                this.query(sql).then(results => {
                    resolve(results)
                }).catch(err => {
                    console.log(`获取文章列表失败:${err.message}`);
                    // 把错误扔给下面中间件，中间件进行处理
                    reject(err)
                })
            })
    }
    

    /**
     * 获取指定类目的文章列表
     *  @param{integer} id 类目编号
     */
    static getListByCategoryId(id){
            return new Promise((resolve, reject) => {
                let sql = 'select id,title,content,`time` from article where category_id=? order by time desc'
                // 父类方法
                this.query(sql,id).then(results => {
                    resolve(results)
                }).catch(err => {
                    console.log(`获取指定类目的文章列表失败:${err.message}`);
                    // 把错误扔给下面中间件，中间件进行处理
                    reject(err)
                })
            })
    }
    

    /**
     * 获取指定关键词的文章列表
     *  @param{string} keyword 关键词  
     */
    static getListByKeyWord(keyword){
        return new Promise((resolve, reject) => {
                // like '%java%'模糊查询
                let sql = 'select id,title,content,`time` from article where title like ? order by time desc'
                // 父类方法
                this.query(sql,`%${keyword}%`).then(results => {
                    resolve(results)
                }).catch(err => {
                    console.log(`获取指定类目的文章列表失败:${err.message}`);
                    // 把错误扔给下面中间件，中间件进行处理
                    reject(err)
                })
            })
    }
    


    /**
     * 获取指定文章的详情
     *  @param{integer} id 文章编号 
     */
    static getArticleById(id){
        return new Promise((resolve, reject) => {
               
                let sql = 'select a.id,a.title,a.content,a.`time`,a.hits,a.category_id ,c.name ,a.`thumbnail`,a.hot from article a,category c where a.id = ? and a.`category_id` = c.id'
                // 父类方法
                this.query(sql,id).then(results => {
                    resolve(results[0])
                }).catch(err => {
                    console.log(`获取指定文章的详情失败:${err.message}`);
                    // 把错误扔给下面中间件，中间件进行处理
                    reject(err)
                })
            })
    }
    


    /**
     * 上一篇文章
     *  @param{integer} id 当前文章的编号 
     */
    static getPrevArticle(id){
        return new Promise((resolve, reject) => {
               
                let sql = 'select id,title from article where id < ? order by id desc limit 1'
                // 父类方法
                this.query(sql,id).then(results => {
                    resolve(results[0])
                }).catch(err => {
                    console.log(`获取上一篇文章失败:${err.message}`);
                    // 把错误扔给下面中间件，中间件进行处理
                    reject(err)
                })
            })
    }
    
    


    /**
     * 下一篇文章
     *  @param{integer} id 当前文章的编号 
     */
    static getNextArticle(id){
        return new Promise((resolve, reject) => {
               
                let sql = 'select id,title from article where id > ? order by id asc limit 1'
                // 父类方法
                this.query(sql,id).then(results => {
                    resolve(results[0])
                }).catch(err => {
                    console.log(`获取下一篇文章失败:${err.message}`);
                    // 把错误扔给下面中间件，中间件进行处理
                    reject(err)
                })
            })
    }
    



    /**
     * 总博文数
     *  category_id,hot
     */
    static getCount(category_id,hot){
        return new Promise((resolve, reject) => {
               
            let sql = 'select count(1) as `count` from article where 1=1'
            // 查询满足category_is=一个传入的参数由中间件层获取
            sql += category_id != -1 && category_id ? ` and category_id=${category_id}` :'' // and有空格
            sql += hot != -1 && hot ? ` and hot=${hot}`:''

                // 父类方法
                this.query(sql).then(results => {
                    resolve(results[0].count)
                }).catch(err => {
                    console.log(`获取总博文数失败:${err.message}`);
                    // 把错误扔给下面中间件，中间件进行处理
                    reject(err)
                })
            })
    }
    


    
   
    /**
     * 获取指定页的文章列表
     * @param {integer} start 起始索引
     * @param {integer} size  查询条目数
     * @returns 
     */
     static getPage(start,size,category_id,hot){
        return new Promise((resolve, reject) => {
         
            let sql = 'SELECT id,title,`thumbnail`,hot FROM article WHERE 1=1'

            sql += category_id != -1 && category_id ? ` AND category_id=${category_id}` : ''
            sql += hot != -1 && hot ? ` AND hot=${hot}` : ''

            sql += ' ORDER BY `time` DESC LIMIT ?,?'
            // 父类方法
            this.query(sql,[start,size]).then(results => {
                resolve(results)
            }).catch(err => {
                console.log(`获取指定页文章列表失败:${err.message}`);
                // 把错误扔给下面中间件，中间件进行处理
                reject(err)
            })
        })
    }
    

    /**
     * 设置热门
     * id 文章编号
     * hot 热门状态
     */
     static setHot(id,hot){
        return new Promise((resolve, reject) => {
         
            let sql = 'UPDATE article SET hot = ? WHERE id = ?'
            // 父类方法
            this.query(sql,[hot,id]).then(results => {
                // 因为是更新语句返回受影响的行数
                resolve(results.affectedRows)
            }).catch(err => {
                console.log(`设置热门失败:${err.message}`);
                // 把错误扔给下面中间件，中间件进行处理
                reject(err)
            })
        })
}

   
   /**
     * 添加文章
     * @param {Object} article 文章对象
     */
    static add(article) {
        return new Promise((resolve, reject) => {
            let sql = 'INSERT INTO article SET ?'
            this.query(sql, article).then(results => {
                resolve(results.insertId)
            }).catch(err => {
                console.log(`添加文章失败：${err.message}`)
                reject(err)
            })
        })
    }
/**
 * 删除文章
 * @param {integer} id 文章编号
 */
    static del(id){
        return new Promise((resolve, reject) => {
         
            let sql = 'DELETE FROM article WHERE id = ?'
            // 父类方法
            this.query(sql,id).then(results => {
                // 因为是更新语句返回受影响的行数
                resolve(results.affectedRows)
            }).catch(err => {
                console.log(`删除文章失败:${err.message}`);
                // 把错误扔给下面中间件，中间件进行处理
                reject(err)
            })
        })
}

    /**
     * 编辑文章
     * @param {Object} article 文章对象
     */
     static edit(article) {
        return new Promise((resolve, reject) => {
            let sql = 'UPDATE article SET title = ?, content = ?, hot = ?, category_id = ?, thumbnail = ? WHERE id = ?'
            this.query(sql, [article.title, article.content, article.hot, article.category_id, article.thumbnail, article.id]).then(results => {
                resolve(results.affectedRows)
            }).catch(err => {
                console.log(`编辑文章失败：${err.message}`)
                reject(err)
            })
        })
    }


}