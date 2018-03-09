<template>
  <div class="register">
    <el-row class="content">
      <el-col :xs="24" :sm="{span: 6,offset: 9}">
        <span class="title">
        欢迎注册
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
            type="password">
          </el-input>
          <el-input
            v-model="passwordConfirm"
            placeholder="确认密码"
            type="password"
            @keyup.enter.native="registerToDo">
          </el-input>
          <el-button type="primary" @click="registerToDo">立即注册</el-button>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'register',
  data () {
    return {
      name: '',
      password: '',
      passwordConfirm: ''
    }
  },
  methods: {
    registerToDo () {
      if (this.name && this.password && this.passwordConfirm) {
        if (this.password === this.passwordConfirm) {
          this.$http
            .post(process.env.API_HOST + '/api/register', {
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
          this.$message.error('密码输入不一致')
        }
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
