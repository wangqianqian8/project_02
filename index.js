// -----------------------------入口模块-----------------------------------------
const express = require("express");
const multer = require("multer")
const session = require("cookie-session")
const path = require("path")
const fs = require("fs")

// 创建主应用
const app = express();

// 1.上传配置  在设置静态资源之前
const upload = multer({
    dest: './static/upload',  //上传文件的存储目录
    limits: {
        fileSize:1024*1024*2  //单个文件大小的限定2m以内
    }
})
// -----模板引擎的设置
app.set('view engine', 'html');
// 模板引擎所在的目录
app.set('views', `${__dirname}/views`);
// 将ejs后缀改成html,原来的模板不需要改名
app.engine('html', require('ejs').renderFile);


// 静态资源配置
app.use(express.static('static'))
// POST请求处理 
// 通过 express.urlencoded() 这个中间件，来解析表单中的 url-encoded 格式的数据name=zhangsan&age = 18
app.use(express.urlencoded({extended:true}))

// SESSION配置
app.use(session({
    keys: ['secret'],
    maxAge:1000 * 60 *30  //会话最长有效期30min
}))
// 
app.use((req, res, next) => {
    // 当用户点击时每隔一分钟对当前会话进行延时
    req.session.nowInMinutes = Math.floor(Date.now()/60e3)
})

// 调用首页子应用
// app.use('/',require('./router/index'))
// app.use('/index', require('./router/index'))
app.use(/\/(index)?/,require('./router/index'))

// 调用文章子应用
app.use('/article',require('./router/article'))

// 调用搜索子应用
app.use('/search',require('./router/search'))

// 调用登录子应用
app.use('/login', require('./router/login'))

// 进入后台的权限验证,给所有页面加
app.use('/admin/?*',require('./middleware/auth').allowToAdmin)

// 2.上传操作
app.post('/admin/*', upload.single('upload'),(req, res, next) => {
    let { file } = req
    if (file) {
        // file.originalname 文件上传的原名称，通过它得到文件后缀
        let extname = path.extname(file.originalname)
        // file.path 上传后的文件路径，包含目录和文件  extname扩展名
        fs.renameSync(file.path, file.path + extname)
        // file.filename 上传后的文件名
        req.uploadUrl = '/upload/' + file.filename + extname
    }
    next()
})
// 调用后台首页
app.use(/\/admin\/(index)?/, require('./router/admin/index'))

// 调用后台文章管理
app.use('/admin/article/',require('./router/admin/article'))

// 调用后台类目管理
app.use('/admin/category/',require('./router/admin/category'))

// 调用后台日志管理
app.use('/admin/log/',require('./router/admin/log'))

// 调用后台账户管理
app.use('/admin/account/',require('./router/admin/account'))



// 退出
app.get('/user/logout', (req, res) => {
    req.session.user = null
    res.render('login',{msg:'退出成功'})
})

app.listen(3000)