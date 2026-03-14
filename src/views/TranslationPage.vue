<template>
  <div class="translation-container">
    <!-- 顶部导航：标题 + 登录/用户信息 -->
    <div class="header">
      <h1 class="title">景点信息智能翻译</h1>
      <div class="login-group">
        <!-- 未登录：跳转到独立登录页 -->
        <button v-if="!isLogin" class="login-btn" @click="$router.push('/login')">登录</button>
        <!-- 已登录：显示用户名 + 退出按钮 -->
        <div v-else class="user-info">
          <span class="username-text">用户：{{ currentUser }}</span>
          <button class="logout-btn" @click="handleLogout">退出登录</button>
        </div>
        <button class="visitor-btn">游客登录</button>
      </div>
    </div>

    <!-- 景点标签栏（放大 + 加图标） -->
<div class="spot-tabs">
  <button class="tab-item active" @click="$router.push('/hot-spots')">
    🔥 热门景点
  </button>
 <button class="tab-item" @click="$router.push('/menu-recognition')">
    🍽️ 菜单图片识别
  </button>
  <button class="tab-item" @click="$router.push('/recommend-spots')">
    景点信息查询
  </button>
  <!-- 新增入口 -->
  <button class="tab-item" @click="$router.push('/image-translate')">
    📷 图片翻译识别
  </button>
  <button class="tab-item" @click="$router.push('/travel-plan')">
    🗺️ 旅行方案推荐
  </button>
</div>

    <!-- 语言切换 -->
    <div class="lang-switch">
      <button 
        :class="{ active: isZhToEn }" 
        @click="isZhToEn = true"
      >
        中 → 英
      </button>
      <button 
        :class="{ active: !isZhToEn }" 
        @click="isZhToEn = false"
      >
        英 → 中
      </button>
    </div>

    <!-- 输入框 -->
    <div class="input-group">
      <textarea
        v-model="inputText"
        :placeholder="isZhToEn ? '请输入要翻译的中文...' : '请输入要翻译的英文...'"
        class="input-area"
        @input="handleTranslate"
      ></textarea>
    </div>

    <!-- 翻译结果 -->
    <div class="result-group">
      <textarea
        v-model="resultText"
        placeholder="翻译结果会显示在这里..."
        class="result-area"
        readonly
      ></textarea>
      <button class="copy-btn" @click="copyResult">复制结果</button>
    </div>

    <!-- 翻译历史 -->
    <div class="history-group" v-if="historyList.length > 0">
      <h3>翻译历史</h3>
      <ul class="history-list">
        <li v-for="(item, index) in historyList" :key="index">
          <span class="history-input">{{ item.input }}</span>
          <span class="history-arrow">→</span>
          <span class="history-result">{{ item.result }}</span>
          <button @click="deleteHistory(index)">删除</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TranslationPage',
  data() {
    return {
      // 原有翻译核心数据：完全保留
      inputText: '',       // 输入文本
      resultText: '',      // 翻译结果
      isZhToEn: true,      // 是否中译英
      historyList: [],     // 翻译历史
      
      // 仅保留登录状态相关数据（登录逻辑移到独立登录页）
      isLogin: false,      // 是否登录状态
      currentUser: ''      // 当前登录用户名
    }
  },
  // 页面加载时恢复登录状态
  mounted() {
    const username = localStorage.getItem('translation_username')
    if (username) {
      this.isLogin = true
      this.currentUser = username
    }
  },
  methods: {
    // 原有翻译方法：完全保留
    handleTranslate() {
      if (!this.inputText.trim()) {
        this.resultText = '';
        return;
      }

      // 简单模拟翻译逻辑（实际需对接API）
      if (this.isZhToEn) {
        this.resultText = this.mockZhToEn(this.inputText);
      } else {
        this.resultText = this.mockEnToZh(this.inputText);
      }

      // 保存历史记录（去重）
      const newItem = {
        input: this.inputText.trim(),
        result: this.resultText
      };
      const isExist = this.historyList.some(item => item.input === newItem.input);
      if (!isExist) {
        this.historyList.unshift(newItem); // 最新的在最前面
        if (this.historyList.length > 10) {
          this.historyList.pop(); // 最多保留10条
        }
      }
    },
    // 模拟中译英
    mockZhToEn(text) {
      const dict = {
        '你好': 'Hello',
        '欢迎使用翻译工具': 'Welcome to use the translation tool',
        '景点': 'Scenic spot',
        '门票': 'Ticket',
        '价格': 'Price',
        '热门景点': 'Popular scenic spots',
        '附近景点票价': 'Nearby scenic spot ticket prices',
        '推荐景点': 'Recommended scenic spots'
      };
      return dict[text] || `[模拟翻译] ${text} → English translation`;
    },
    // 模拟英译中
    mockEnToZh(text) {
      const dict = {
        'Hello': '你好',
        'Welcome': '欢迎',
        'Scenic spot': '景点',
        'Ticket': '门票',
        'Price': '价格',
        'Popular scenic spots': '热门景点',
        'Nearby scenic spot ticket prices': '附近景点票价',
        'Recommended scenic spots': '推荐景点'
      };
      return dict[text] || `[模拟翻译] ${text} → 中文翻译`;
    },
    // 复制结果
    copyResult() {
      if (!this.resultText) return;
      navigator.clipboard.writeText(this.resultText).then(() => {
        alert('复制成功！');
      });
    },
    // 删除历史记录
    deleteHistory(index) {
      this.historyList.splice(index, 1);
    },
    // 退出登录（优化：退出后跳登录页）
    handleLogout() {
      if (confirm('确定要退出登录吗？')) {
        this.isLogin = false
        this.currentUser = ''
        localStorage.removeItem('translation_username')
        alert('退出登录成功！')
        this.$router.push('/login') // 退出后自动跳登录页
      }
    }
  }
}
</script>

<style scoped>
/* 原有样式：完全保留 + 美化景点标签 */
.translation-container {
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  font-family: "Microsoft Yahei", sans-serif;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

/* 顶部标题 + 自定义大图标 */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.title {
  color: #333;
  margin: 0;
  font-size: 24px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.title::before {
  content: "";
  width: 40px;
  height: 40px;
  background: url("~@/../public/images/logo.png") no-repeat center center;
  background-size: 100% 100%;
  display: inline-block;
}

/* 登录按钮/用户信息样式 */
.login-group {
  display: flex;
  gap: 10px;
  align-items: center;
}

.login-btn, .visitor-btn {
  padding: 8px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.login-btn {
  background: #42b983;
  color: white;
}

.visitor-btn {
  background: #f5f5f5;
  color: #333;
  border: 1px solid #ddd;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.username-text {
  color: #333;
  font-size: 14px;
}

.logout-btn {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  background: #ff4444;
  color: white;
  cursor: pointer;
  font-size: 14px;
}

/* 重点：美化景点标签（放大 + 加图标） */
.spot-tabs {
  display: flex;
  gap: 15px; /* 加大按钮间距 */
  margin-bottom: 30px;
  background: #f8f8f8;
  padding: 15px; /* 加大内边距 */
  border-radius: 8px;
}

.tab-item {
  padding: 15px 25px; /* 放大按钮尺寸 */
  border: none;
  border-radius: 6px;
  background: #e0e0e0;
  color: #666;
  cursor: pointer;
  font-size: 18px; /* 放大字体 */
  display: flex;
  align-items: center;
  gap: 8px; /* 图标和文字间距 */
  transition: all 0.2s;
}

.tab-item.active {
  background: #42b983;
  color: white;
}

.tab-item:hover {
  background: #d0d0d0;
}

.tab-item.active:hover {
  background: #3aa876;
}

/* 语言切换按钮 */
.lang-switch {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.lang-switch button {
  padding: 10px 20px;
  margin: 0 10px;
  border: none;
  border-radius: 4px;
  background: #e0e0e0;
  cursor: pointer;
  font-size: 16px;
}

.lang-switch button.active {
  background: #42b983;
  color: white;
}

/* 输入/结果区域 */
.input-group, .result-group {
  margin-bottom: 20px;
}

.input-area, .result-area {
  width: 100%;
  height: 150px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
  resize: none;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.8);
}

.result-area {
  color: #333;
}

.copy-btn {
  margin-top: 10px;
  padding: 8px 15px;
  border: none;
  border-radius: 4px;
  background: #42b983;
  color: white;
  cursor: pointer;
}

/* 翻译历史 */
.history-group {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.history-list {
  list-style: none;
  padding: 0;
}

.history-list li {
  padding: 10px;
  margin: 5px 0;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 4px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.history-input {
  color: #666;
  margin-right: 10px;
}

.history-arrow {
  margin: 0 10px;
  color: #42b983;
}

.history-result {
  color: #333;
  flex: 1;
}

.history-list button {
  padding: 5px 10px;
  border: none;
  border-radius: 3px;
  background: #ff4444;
  color: white;
  cursor: pointer;
  font-size: 12px;
}

/* 移动端适配 */
@media (max-width: 600px) {
  .translation-container {
    margin: 20px;
    padding: 10px;
  }

  .header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .spot-tabs {
    flex-wrap: wrap;
  }

  .tab-item {
    flex: 1;
    min-width: 80px;
    padding: 8px 10px;
    font-size: 14px;
  }

  .input-area, .result-area {
    height: 120px;
  }
}
</style>