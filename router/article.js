/**
 * 文章子路由
 */
const express = require("express")

const article = require("../middleware/article")
// 因为list.html里面包含header，header中有category
const category = require("../middleware/category")
// const { getListByArticleId } = require("../model/tab")
const auth = require('../middleware/auth')

const articleApp = express()
articleApp.use(category.getList,auth.getUser)

// 文章列表页 article/list/1
articleApp.get('/list/:id', [article.getListByCategoryId,category.getList,category.getCategoryById],(req, res) => {
     let {articles,categories,category} = req
    res.render('list',{articles:articles,categories:categories,category:category})
})


// 文章详情页 获取栏目列表article/1
articleApp.get('/:id',[article.getArticleById,article.getTabs,article.getPrev,article.getNext],(req, res) => {
    // 把categories从req下拿出来
    let { categories,article,tabs,prev,next,user} = req
    // 把categories渲染到页面
    res.render('article',{categories:categories,article:article,tabs:tabs,prev:prev,next:next,user:user})
})



module.exports = articleApp