/**
 * 后台账户管理
 */
const express = require("express")

const accountAPP = express()


accountAPP.get('/', (req, res) => {
    let { user} = req
    // 传到页面上去
    res.render('admin/account/index',{user:user})  //view/admin/account/index
})

module.exports = accountAPP