const router = require('koa-router')() // 引入路由函数
const userApi = require('../controllers/user')
const taskApi = require('../controllers/task')

// 访问 / 跳转到index
router.get('/', async (ctx) => {
  await ctx.redirect('http://localhost:3000/server/views/index.html')
})

// 登陆注册相关
router.get('/userData', userApi.getUserData)
router.post('/register', userApi.register)
router.post('/login', userApi.login)

// task
router.get('/getTask', taskApi.getTask)
router.post('/task', taskApi.task)

module.exports = router
