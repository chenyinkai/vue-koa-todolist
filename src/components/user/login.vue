<template>
  <div class="login">
    <el-row class="content">
      <el-col :xs="24" :sm="{span: 6,offset: 9}">
        <span class="title">
        欢迎登录
        </span>
        <el-row>
          <el-input
            v-model="name"
            placeholder="账号"
            type="text">
          </el-input>
          <el-input
            v-model="password"
            placeholder="密码"
            type="password"
            @keyup.enter.native="loginToDo">
          </el-input>
          <el-button type="primary" @click="loginToDo">登录</el-button>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      name: '',
      password: ''
    }
  },
  methods: {
    loginToDo () {
      if (this.name && this.password) {
        this.$http
          .post(process.env.API_HOST + '/login', {
            name: this.name,
            pass: this.password
          })
          .then(result => {
            if (result.data.data === 0) {
              this.$router.push('/')
            } else {
              this.$message.error(result.data.msg)
            }
          })
      } else {
        this.$message.error('账号和密码不能为空')
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.el-row.content {
  padding: 16px;
}

.title {
  font-size: 28px;
}

.el-input {
  margin: 12px 0;
}

.el-button {
  width: 100%;
  margin-top: 12px;
}
</style>
