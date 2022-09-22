// 首页子应用（首页路由）
const express = require("express")
const article = require("../middleware/article");
const category =require("../middleware/category")
const { getList } = require("../model/article");
const { getHot } = require("../model/article");
const auth = require('../middleware/auth')
// 首页子应用
const indexApp = express()

indexApp.use(auth.getUser)


// 加载首页页面
// 这个估计是用了express？因为前面应该已经定义好了views文件夹的目录，所以render()渲染时会去这个文件夹找对应的模板去渲染。
// 渲染views下的index模板
// 调用热门文章

indexApp.get('/', [article.getHot, article.getList,category.getList], (req, res) => {
    let { hots, articles,categories,user} = req;
    res.render('index',{hots:hots,articles:articles,categories:categories,user:user})
})
module.exports = indexApp; 