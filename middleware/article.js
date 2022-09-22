const Article = require('../model/article')  //把模型层article加载出来
const Tab = require("../model/tab")
/**
 * 文章中间件
 */
module.exports = {

/**
 * 获取热门文章
 */
    getHot:(req, res, next) => {
        Article.getHot(3).then(results => {
            // hots自己命名封装到req下，把results传下去
            req.hots = results
            next()
        }).catch(err => {
            // 把err传下去
            next(err)
        })
    },
    /**
     * 获取最新文章
     */
    getList:(req, res, next) => {
        Article.getList().then(results => {
            // hots自己命名封装到req下，把results传下去
            req.articles = results
            next()
        }).catch(err => {
            // 把err传下去
            next(err)
        })
    },
  /**
     * 获取指定类目下的文章资源
     */
    getListByCategoryId: (req, res, next) => {
        // 通过参数获取id
        let id = req.params.id
        Article.getListByCategoryId(id).then(results => {
            // hots自己命名封装到req下，把results传下去
            req.articles = results
            next()
        }).catch(err => {
            // 把err传下去
            next(err)
        })
    },


      /**
     * 获取指定关键字的文章列表
     */
       getListByKeyWord: (req, res, next) => {
        // 表单通过query查询获取id
        let keyword = req.query.keyword
        Article.getListByKeyWord(keyword).then(results => {
            // hots自己命名封装到req下，把results传下去
            req.articles = results
            next()
        }).catch(err => {
            // 把err传下去
            next(err)
        })
    },
       
       /**
        * 获取指定文章的详情
        */
    getArticleById: (req, res, next) => {
        let { id } = req.params
           Article.getArticleById(id).then(results => {
            // hots自己命名封装到req下，把results传下去
            req.article = results
            next()
        }).catch(err => {
            // 把err传下去
            next(err)
        })
    },
    
        /**
        * 获取指定文章的标签列表
        */
         getTabs: (req, res, next) => {
            let id  = req.params.id
               Tab.getListByArticleId(id).then(results => {
                // hots自己命名封装到req下，把results传下去
                req.tabs = results
                next()
            }).catch(err => {
                // 把err传下去
                next(err)
            })
        },
    
        /**
        * 上一篇
        */
         getPrev: (req, res, next) => {
            let id  = req.params.id
               Article.getPrevArticle(id).then(results => {
                // hots自己命名封装到req下，把results传下去
                req.prev = results
                next()
            }).catch(err => {
                // 把err传下去
                next(err)
            })
        },
    
        /**
        * 下一篇
        */
         getNext: (req, res, next) => {
            let id  = req.params.id
               Article.getNextArticle(id).then(results => {
                // hots自己命名封装到req下，把results传下去
                req.next = results
                next()
            }).catch(err => {
                // 把err传下去
                next(err)
            })
        },

/**
 * 
 * 获取总博文数
 */
 getCount: (req, res, next) => {
    Article.getCount(req.query.category_id,req.query.hot).then(results => {
        // hots自己命名封装到req下，把results传下去
        req.articleCount = results
        next()
    }).catch(err => {
        // 把err传下去
        next(err)
    })
    },
    /**
     * 获取指定页的文章列表
     */
       getPage: (req, res, next) => {
        // 2.从路由中取值传入res.start,res.sizes
        Article.getPage(res.start,res.size,req.query.category_id,req.query.hot).then(results => {
            req.pageList = results
            next()
        }).catch(err => {
            // 把err传下去
            next(err)
        })
    },
       
    /**
     * 设置热门推荐
     */
    setHot: (req, res, next) => {
        //    从get参数取出来
        let { id, hot } = req.query
        Article.setHot(id, hot).then(results => {
            req.affectedRows = results
            next()
        }).catch(err => {
            // 把err传下去
            next(err)
        })
    },
     /**
     * 添加文章
     */
      add: (req, res, next) => {
        let { title, content, hot, category_id } = req.body
        let article = {
            title: title,
            content: content,
            hot: hot ? 1 : 0,
            category_id: category_id,
            thumbnail: req.uploadUrl ? req.uploadUrl : null
        }

        Article.add(article).then(results => {
            req.insertId = results
            next()
        }).catch(err => {
            next(err)
        })
    },
       /**
     * 删除文章
     */
    del: (req, res, next) => {
        //    从get参数取出来
        let { id } = req.query
        Article.del(id).then(results => {
            req.affectedRows = results
            next()
        }).catch(err => {
            // 把err传下去
            next(err)
        })
    },
       
       /**
     * 编辑文章
     */
    edit: (req, res, next) => {
        let { title, content, hot, category_id, thumbnail, id } = req.body
        let article = {
            title: title,
            content: content,
            hot: hot ? 1 : 0,
            category_id: category_id,
            thumbnail: req.uploadUrl ? req.uploadUrl : thumbnail,
            id: id
        }
        Article.edit(article).then(results => {
            req.affectedRows = results
            next()
        }).catch(err => {
            next(err)
        })
    }
}

 

