<template>
  <div class="hello">
    <el-row>
      <el-col :xs="24" :sm="{span:12,offset:6}">
        <router-link to="/login">
          <el-button type="primary" round>登录</el-button>
        </router-link>
        <router-link to="/register">
          <el-button type="primary" round>注册</el-button>
        </router-link>
        <router-link to="/task">
          <el-button type="primary" round>任务</el-button>
        </router-link>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
h1, h2
  font-weight: normal
ul
  list-style-type: none
  padding: 0
li
  display: inline-block
  margin: 0 10px
a
  color: #42b983
</style>
