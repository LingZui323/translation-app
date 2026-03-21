<template>
  <div class="history-page">
    <!-- 顶部导航 -->
    <div class="header">
      <h1 class="title">📜 搜索历史记录</h1>
      <div class="nav-buttons">
        <button class="back-btn" @click="$router.push('/translation')">返回主页</button>
        <button class="login-btn" v-if="!isLogin" @click="$router.push('/login')">登录</button>
        <div v-else class="user-info">
          <span>{{ currentUser }}</span>
          <button class="logout-btn" @click="handleLogout">退出</button>
        </div>
      </div>
    </div>

    <!-- 历史记录容器 -->
    <div class="history-container">
      <div class="history-header">
        <h2>我的操作记录</h2>
        <button class="clear-btn" @click="clearAllHistory" :disabled="historyList.length === 0">
          清空全部
        </button>
      </div>

      <!-- 历史记录列表 -->
      <ul class="history-list" v-if="historyList.length > 0">
        <li v-for="(item, index) in historyList" :key="index" class="history-item">
          <div class="history-content">
            <span class="history-type">{{ item.input }}</span>
            <span class="history-result">{{ item.result }}</span>
          </div>
          <button class="delete-btn" @click="deleteHistory(index)">删除</button>
        </li>
      </ul>

      <!-- 空状态 -->
      <div class="empty-history" v-if="historyList.length === 0">
        <img src="/images/empty.png" alt="暂无记录" class="empty-img">
        <p>暂无搜索历史记录</p>
        <button class="go-translate" @click="$router.push('/translation')">去翻译/查询</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HistoryRecord',
  data() {
    return {
      historyList: [],
      isLogin: false,
      currentUser: ''
    }
  },
  mounted() {
    // 恢复登录状态
    const username = localStorage.getItem('translation_username')
    if (username) {
      this.isLogin = true
      this.currentUser = username
    }
    // 加载历史记录
    this.loadHistory()
  },
  methods: {
    // 加载历史记录
    loadHistory() {
      const history = localStorage.getItem('translationHistory')
      this.historyList = history ? JSON.parse(history) : []
    },
    // 删除单条历史
    deleteHistory(index) {
      this.historyList.splice(index, 1)
      localStorage.setItem('translationHistory', JSON.stringify(this.historyList))
    },
    // 清空全部历史
    clearAllHistory() {
      if (confirm('确定要清空所有历史记录吗？')) {
        this.historyList = []
        localStorage.removeItem('translationHistory')
      }
    },
    // 退出登录
    handleLogout() {
      if (confirm('确定退出登录吗？')) {
        localStorage.removeItem('translation_username')
        this.isLogin = false
        this.currentUser = ''
        alert('退出成功！')
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style scoped>
.history-page {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  font-family: "Microsoft Yahei", sans-serif;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}

.title {
  color: #333;
  margin: 0;
  font-size: 28px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.nav-buttons {
  display: flex;
  align-items: center;
  gap: 15px;
}

.back-btn, .login-btn {
  padding: 8px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  background: #42b983;
  color: white;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #333;
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

.history-container {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(0,0,0,0.05);
}

.history-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.history-header h2 {
  color: #333;
  margin: 0;
  font-size: 20px;
}

.clear-btn {
  padding: 8px 15px;
  border: none;
  border-radius: 4px;
  background: #ff4444;
  color: white;
  cursor: pointer;
  font-size: 14px;
}

.clear-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.history-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.history-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  margin-bottom: 10px;
  background: #f8f8f8;
  border-radius: 8px;
  transition: background 0.2s;
}

.history-item:hover {
  background: #f0f0f0;
}

.history-content {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.history-type {
  font-weight: bold;
  color: #42b983;
  font-size: 16px;
}

.history-result {
  color: #666;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 600px;
}

.delete-btn {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  background: #ff4444;
  color: white;
  cursor: pointer;
  font-size: 14px;
}

.empty-history {
  text-align: center;
  padding: 50px 20px;
  color: #999;
}

.empty-img {
  width: 150px;
  height: 150px;
  margin-bottom: 20px;
  opacity: 0.5;
}

.empty-history p {
  font-size: 18px;
  margin-bottom: 30px;
}

.go-translate {
  padding: 10px 25px;
  border: none;
  border-radius: 4px;
  background: #42b983;
  color: white;
  cursor: pointer;
  font-size: 16px;
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
  .history-result {
    max-width: 200px;
  }
}
</style>