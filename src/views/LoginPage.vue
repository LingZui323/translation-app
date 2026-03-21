<template>
  <div class="login-page">
    <div class="login-card">
      <h1 class="login-title">景点信息智能翻译</h1>
      <div class="form-tab">
        <button :class="{ active: !isRegister }" @click="isRegister = false">登录</button>
        <button :class="{ active: isRegister }" @click="isRegister = true">注册</button>
      </div>
      
      <!-- 登录表单 -->
      <div v-if="!isRegister" class="form-content">
        <div class="form-item">
          <label>用户名：</label>
          <input v-model="loginForm.username" type="text" placeholder="随便输入用户名即可登录">
        </div>
        <div class="form-item">
          <label>密码：</label>
          <input v-model="loginForm.password" type="password" placeholder="随便输入密码即可登录">
        </div>
        <div class="form-item">
          <label>验证码：</label>
          <input type="text" placeholder="无需填写（测试用）" disabled>
        </div>
        <button class="submit-btn" @click="handleLogin">登录</button>
      </div>

      <!-- 注册表单（仅模拟，不调用后端） -->
      <div v-else class="form-content">
        <div class="form-item">
          <label>邮箱：</label>
          <input v-model="registerForm.email" type="email" placeholder="随便输入邮箱即可注册">
        </div>
        <div class="form-item">
          <label>用户名：</label>
          <input v-model="registerForm.username" type="text" placeholder="随便输入用户名即可注册">
        </div>
        <div class="form-item">
          <label>密码：</label>
          <input v-model="registerForm.password" type="password" placeholder="随便输入密码即可注册">
        </div>
        <div class="form-item">
          <label>验证码：</label>
          <input type="text" placeholder="无需填写（测试用）" disabled>
        </div>
        <button class="submit-btn" @click="handleRegister">注册</button>
      </div>
    </div>
  </div>
</template>

<script>
// 注释掉后端请求，仅保留前端模拟逻辑
// import axios from 'axios'
// const request = axios.create({
//   baseURL: 'http://localhost:8081/api',
//   timeout: 5000,
//   headers: { 'Content-Type': 'application/json;charset=utf-8' }
// })

export default {
  name: 'LoginPage',
  data() {
    return {
      isRegister: false,
      loginForm: { username: '', password: '' },
      registerForm: { email: '', username: '', password: '' }
    }
  },
  methods: {
    // 临时登录方法：跳过后端验证，直接保存用户名到本地
    handleLogin() {
      if (!this.loginForm.username || !this.loginForm.password) {
        return alert('请填写用户名和密码！')
      }
      // 模拟登录成功，不调用后端接口
      localStorage.setItem('translation_username', this.loginForm.username)
      alert(`登录成功！欢迎 ${this.loginForm.username}`)
      this.$router.push('/translation') // 跳转到翻译页
      // 清空表单
      this.loginForm.username = ''
      this.loginForm.password = ''
    },
    // 临时注册方法：仅提示，不调用后端接口
    handleRegister() {
      if (!this.registerForm.email || !this.registerForm.username || !this.registerForm.password) {
        return alert('请填写完整注册信息！')
      }
      // 模拟注册成功
      alert(`注册成功！用户名：${this.registerForm.username}，请登录`)
      this.isRegister = false // 切回登录标签
      // 清空表单
      this.registerForm.email = ''
      this.registerForm.username = ''
      this.registerForm.password = ''
    }
  }
}
</script>

<style scoped>
/* 登录页整体容器 - 添加背景图片 */
.login-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  /* 背景图片核心样式 */
  background: url("~@/../public/images/bg.jpeg") no-repeat center center; /* 替换为你的背景图路径 */
  background-size: cover; /* 背景图铺满整个页面 */
  background-attachment: fixed; /* 固定背景图，滚动时不移动 */
  position: relative;
}

/* 背景遮罩（可选，提升表单可读性） */
.login-page::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7); /* 白色半透明遮罩，可调整透明度 */
  z-index: 1;
}

/* 登录卡片 - 提升层级，显示在遮罩上方 */
.login-card {
  width: 400px;
  padding: 30px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  position: relative; /* 必须加，否则会被遮罩覆盖 */
  z-index: 2; /* 层级高于遮罩 */
}

.login-title {
  text-align: center;
  color: #42b983;
  margin-bottom: 20px;
}

.form-tab {
  display: flex;
  margin-bottom: 20px;
}

.form-tab button {
  flex: 1;
  padding: 10px;
  border: none;
  background: #f5f5f5;
  cursor: pointer;
}

.form-tab button.active {
  background: #42b983;
  color: white;
}

.form-content {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-item {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.form-item input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
}

.form-item input:disabled {
  background: #f5f5f5;
  color: #999;
}

.submit-btn {
  padding: 12px;
  border: none;
  border-radius: 6px;
  background: #42b983;
  color: white;
  font-size: 16px;
  cursor: pointer;
}
</style>