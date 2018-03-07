const userModel = require('../lib/mysql') // 引入数据库方法

// 获取用户任务
const getTask = async ctx => {
  let total = 0
  let index = (ctx.request.query.pageNum - 1) * ctx.request.query.pageSize
  await userModel.findUserTask(ctx.request.query.name).then(resule => {
    total = resule.length
  })
  await userModel
    .findUserTaskLimit(
      ctx.request.query.name,
      index,
      ctx.request.query.pageSize
    )
    .then(result => {
      let contentList = []
      for (let i = 0; i < result.length; i++) {
        contentList.push(result[i].content)
      }
      if (result.length) {
        ctx.body = {
          data: 0,
          total: total,
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
}

// 插入任务
const task = async ctx => {
  await userModel
    .taskInsert(ctx.request.body.name, ctx.request.body.content)
    .then(result => {
      ctx.body = {
        data: 0,
        msg: '注册成功'
      }
    })
}

module.exports = {
  getTask,
  task
}
