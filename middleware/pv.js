/**
 * 访问量子应用
 */
const Pv = require("../model/pv")
module.exports = {
/**
 * 
 * 获取总访问量
 */
    getTotal: (req, res, next) => {
        Pv.getTotal().then(results => {
            // hots自己命名封装到req下，把results传下去
            req.PvTotal = results
            next()
        }).catch(err => {
            // 把err传下去
            next(err)
        })
    },
     
/**
 * 
 * 获取全部记录
 */
    getAll: (req, res, next) => {
        Pv.getAll().then(results => {
            // hots自己命名封装到req下，把results传下去
            req.pvs = results
            next()
        }).catch(err => {
            // 把err传下去
            next(err)
        })
    },
     
}