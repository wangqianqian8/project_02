/**
 * 搜索子路由
 */
 const express = require("express")

 const article = require("../middleware/article")
// 因为list.html里面包含header，header中有category
const category = require("../middleware/category")
const auth = require('../middleware/auth')
 const searchApp = express()
//  传值调用中间件
searchApp.get('/', [article.getListByKeyWord,category.getList,auth.getUser], (req, res) => {
     let {articles,categories,user} = req
     res.render('search',{articles:articles,categories:categories,keyword:req.query.keyword,user:user})
 })
 
 module.exports = searchApp