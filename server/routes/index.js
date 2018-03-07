const router = require('koa-router')() // 引入路由函数
const userModel = require('../lib/mysql') // 引入数据库方法
const md5 = require('md5')

// 访问 / 跳转到index
router.get('/', async (ctx, next) => {
  console.log(ctx)
  await ctx.redirect('http://localhost:3000/server/views/index.html')
})

// 查询所有的用户
router.get('/userData', async (ctx, next) => {
  await userModel.findUser()
    .then(result => {
      console.log(result.length)
      if (result.length) {
        ctx.body = {
          data: 0,
          total: result.length,
          name: result,
          msg: '查询成功'
        }
      } else {
        try {
          throw Error('暂时没有注册用户')
        } catch (error) {
          console.log(error)
        }
        ctx.body = {
          data: 2,
          msg: '暂时没有注册用户'
        }
      }
    })
})

// 先查询用户是否存在,不存在则插入数据
router.post('/register', async (ctx, next) => {
  await userModel.findName(ctx.request.body.name)
    .then(result => {
      if (result.length) {
        try {
          throw Error('用户已存在')
        } catch (error) {
          console.log(error)
        }
        ctx.body = {
          data: 1,
          msg: '用户已存在'
        }
      } else {
        ctx.body = {
          data: 0,
          msg: '注册成功'
        }
        userModel.insert(ctx.request.body.name, md5(ctx.request.body.pass))
      }
    })
})

// 登录
router.post('/login', async (ctx, next) => {
  await userModel.findName(ctx.request.body.name)
    .then(result => {
      if (result.length) {
        if (md5(ctx.request.body.pass) === result[0].pass) {
          ctx.body = {
            data: 0,
            msg: '登录成功'
          }
        } else {
          ctx.body = {
            data: 3,
            msg: '密码不正确'
          }
        }
      } else {
        try {
          throw Error('用户不存在')
        } catch (error) {
          console.log(error)
        }
        ctx.body = {
          data: 1,
          msg: '用户不存在'
        }
      }
    })
})

// 获取用户任务
router.get('/getTask', async (ctx, next) => {
  await userModel.findUserTask(ctx.request.query.name)
    .then(result => {
      let contentList = []
      for (let i = 0; i < result.length; i++) {
        contentList.push(result[i].content)
      }
      if (result.length) {
        ctx.body = {
          data: 0,
          name: result[0].name,
          list: contentList,
          msg: '查询成功'
        }
      } else {
        try {
          throw Error('暂时没有任务')
        } catch (error) {
          console.log(error)
        }
        ctx.body = {
          data: 2,
          msg: '暂时没有任务'
        }
      }
    })
})

// 插入用户任务
router.post('/task', async (ctx, next) => {
  await userModel.taskInsert(ctx.request.body.name, ctx.request.body.content)
    .then(result => {
      ctx.body = {
        data: 0,
        msg: '注册成功'
      }
    })
})

module.exports = router
