<template>
  <div class="login">
    <div class="box">
      <el-input v-model="name" placeholder="请输入用户名"></el-input>
      <el-input v-model="password" placeholder="请输入密码"></el-input>
    </div>
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
  }
}
</script>

<style scoped>

</style>
