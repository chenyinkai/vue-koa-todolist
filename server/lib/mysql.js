const mysql = require('mysql')
const config = require('./default')

var pool = mysql.createPool({
  host: config.database.HOST,
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE
})

let query = function (sql, values) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        resolve(err)
      } else {
        connection.query(sql, values, (err, rows) => {
          if (err) {
            reject(err)
          } else {
            resolve(rows)
          }
          connection.release()
        })
      }
    })
  })
}

const userinfo =
  `create table if not exists userinfo(
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(100) NOT NULL,
        pass VARCHAR(40) NOT NULL,
        PRIMARY KEY ( id )
    );`

const task =
  `create table if not exists task(
        id int(11) unsigned NOT NULL AUTO_INCREMENT,
        name varchar(40) DEFAULT NULL,
        content varchar(100) DEFAULT NULL,
        PRIMARY KEY ( id )
    );`

let createTable = function (sql) {
  return query(sql, [])
}
// 建表
createTable(userinfo)
createTable(task)

// 查询所有的用户
let findUser = function () {
  let _sql = `
        SELECT name FROM userinfo
    `
  return query(_sql)
}

// 查询用户名是否已存在
let findName = function (name) {
  let _sql = `
        SELECT * FROM userinfo WHERE name='${name}'
    `
  return query(_sql)
}

// 注册写入数据库
let insert = function (name, pass) {
  let _sql = `
        INSERT INTO userinfo (name, pass) VALUES ('${name}', '${pass}')
    `
  return query(_sql)
}

// 查询用户任务总数
let findUserTask = function (name) {
  let _sql = `
        SELECT * FROM task WHERE name='${name}'
    `
  return query(_sql)
}

// 分页查询用户任务
let findUserTaskLimit = function (name, index, num) {
  let _sql = `
        SELECT * FROM task WHERE name='${name}' LIMIT ${index},${num}
    `
  return query(_sql)
}

// 任务写入数据库
let taskInsert = function (name, content) {
  let _sql = `
        INSERT INTO task (name, content) VALUES ('${name}', '${content}')
    `
  return query(_sql)
}

module.exports = {
  findUser,
  insert,
  findName,
  findUserTask,
  taskInsert,
  findUserTaskLimit
}
