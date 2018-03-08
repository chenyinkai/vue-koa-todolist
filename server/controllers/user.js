const userModel = require('../lib/mysql') // 引入数据库方法
const md5 = require('md5')

// 查询所有的用户
const getUserData = async ctx => {
  await userModel.findUser().then(result => {
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
}

// 先查询用户是否存在,不存在则插入数据
const register = async ctx => {
  await userModel.findName(ctx.request.body.name).then(result => {
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
}

// 登陆
const login = async ctx => {
  console.log('/login')
  await userModel.findName(ctx.request.body.name).then(result => {
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
}

module.exports = {
  getUserData,
  register,
  login
}
