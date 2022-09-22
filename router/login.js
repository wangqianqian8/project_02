/**
 * 登录子路由
 */
 const express = require("express")
 const User = require('../model/user')  //把模型层user加载出来
const log = require('../middleware/log')
 const loginApp = express()
//  加载登录页
loginApp.get('/', (req, res) => {
    
    res.render('login', { msg:''})
 })
//  实现登录操作
loginApp.post('/', (req, res, next) => {
    // req.query用来获取get方法传递的参数
    // req.body用来获取post方法传递的参数，req.body需要借助第三方插件body-parser来配置
    let { username, password } = req.body
    User.login(username, password).then(result => {
        if (result) {
            // 登陆成功后进行封装
            req.log = {
                time: new Date(),
                handle: '登录',
                ip: req.ip.split(':')[3]
            }
            // 调add传回去
            log.add(req,res,next)
            // 登录成功后记录session,session存储(key = value)
            req.session.user = result
            // URL跳转（重定向）的实现：res.location(path)与res.redirect([status],path) status表示要设置的HTTP状态码
            res.redirect('/')
        } else {
            res.render('login', { msg: '登录失败，用户名或密码错误' })
        }
    }).catch(err => {
        next(err)
    })
    
})



 module.exports = loginApp