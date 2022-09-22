const Category = require('../model/category')  //把模型层article加载出来

/**
 * 文章类目中间件
 */
module.exports = {

    /**
     * 获取文章类目列表
     */
    getList:(req, res, next) => {
        Category.getList().then(results => {
            // hots自己命名封装到req下，把results传下去
            req.categories = results
            next()
        }).catch(err => {
            // 把err传下去
            next(err)
        })
    },

     /**
     * 获取指定文章类目详情
     */
      getCategoryById: (req, res, next) => {
        // 通过参数获取id
        let id = req.params.id
        Category.getCategoryById(id).then(results => {
            // category自己命名封装到req下，把results传下去路由article。js
            req.category = results
            next()
        }).catch(err => {
            // 把err传下去
            next(err)
        })
    },


     /**
 * 
 * 获取类目数
 */
 getCount: (req, res, next) => {
    Category.getCount().then(results => {
        req.categoryCount = results
        next()
    }).catch(err => {
        // 把err传下去
        next(err)
    })
},
     /**
 * 
 * 添加类目
 * post请求
 */
    add:(req, res, next) => {
     let {name,index} = req.body
    Category.add(name,index).then(results => {
        req.insertId = results
        next()
    }).catch(err => {
        // 把err传下去
        next(err)
    })
},
   /**
     * 删除类目
     */
    del: (req, res, next) => {
        let { id } = req.query
        Category.del(id).then(results => {
            req.affectedRows = results
            next()
        }).catch(err => {
            next(err)
        })
    },
   /**
     * 修改类目名称
     */
    setName: (req, res, next) => {
        let { id,name } = req.body
        Category.setName(id,name).then(results => {
            req.affectedRows = results
            next()
        }).catch(err => {
            next(err)
        })
    },
   /**
     * 修改类目排序号
     */
    setIndex: (req, res, next) => {
        let { id,index } = req.body
        Category.setIndex(id,index).then(results => {
            req.affectedRows = results
            next()
        }).catch(err => {
            next(err)
        })
    },
}