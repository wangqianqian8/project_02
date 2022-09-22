/**
 * 用户中间件
 */
const User =require("../model/user")
module.exports = {
    /**
     * 最后一次登录时间的获取
     */
    lastLoginTime: (req, res, next) => {
        User.lastLoginTime().then(results => {
            req.lastLoginTime = results
            next()
        }).catch(err => {
            next(err)
        })
    }
}