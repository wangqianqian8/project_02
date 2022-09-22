/**
 * 后台首页子应用
 */
const express = require("express")
const user = require('../../middleware/user')
const pv = require("../../middleware/pv")
const category = require("../../middleware/category")
const article = require("../../middleware/article")


const indexAPP = express()

/**
 * 加载首页
 */
indexAPP.get('/', [user.lastLoginTime,pv.getTotal,category.getCount,article.getCount], (req, res) => {
    let { user, lastLoginTime, articleCount, categoryCount ,PvTotal} = req
    // 传到页面上去
    res.render('admin/index',{user:user,lastLoginTime:lastLoginTime,articleCount:articleCount,categoryCount:categoryCount,PvTotal:PvTotal})  //view/admin/index
})

/**
 * 访问量接口
 */
indexAPP.get('/pvs', [pv.getAll], (req, res) => {
    let { pvs } = req
    let data = {}
    // data对象里面自定义data属性 ，将中间件req和路由req相同，里面的pvs返回sql查询结果集数组传给它
    data.data = pvs
    data.start = pvs[0].time
    data.end = pvs[pvs.length - 1].time
    res.json(data)
})


module.exports = indexAPP