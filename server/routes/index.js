const router = require('koa-router')() // 引入路由函数
const userApi = require('../controllers/user')
const taskApi = require('../controllers/task')

// 访问 / 跳转到index
router.get('/', async (ctx) => {
  await ctx.redirect('http://localhost:3000/server/views/index.html')
})

// 登陆注册相关
router.get('/api/userData', userApi.getUserData)
router.post('/api/register', userApi.register)
router.post('/api/login', userApi.login)

// task
router.get('/api/getTask', taskApi.getTask)
router.post('/api/task', taskApi.task)

module.exports = router
