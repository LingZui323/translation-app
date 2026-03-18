<template>
  <div class="spot-query-page">
    <!-- 顶部导航 -->
    <div class="header">
      <h1 class="title">🌟 景点信息查询</h1>
      <div class="nav-buttons">
        <button class="back-btn" @click="$router.push('/translation')">返回主页</button>
        <button class="login-btn" v-if="!isLogin" @click="$router.push('/login')">登录</button>
        <div v-else class="user-info">
          <span>{{ currentUser }}</span>
          <button class="logout-btn" @click="handleLogout">退出</button>
        </div>
      </div>
    </div>

    <!-- 查询区域 -->
    <div class="query-container">
      <div class="search-box">
        <input 
          type="text" 
          v-model="keyword" 
          placeholder="请输入景点名称（如：故宫、长城）"
          class="search-input"
        >
        <button class="search-btn" @click="searchSpot">查询</button>
      </div>

      <!-- 结果展示 -->
      <div class="result-container" v-if="spotInfo">
        <div class="spot-card">
          <h2>{{ spotInfo.name }}</h2>
          <div class="spot-detail">
            <p><strong>景点简介：</strong>{{ spotInfo.desc }}</p>
            <p><strong>门票价格：</strong>{{ spotInfo.ticket }}</p>
            <p><strong>开放时间：</strong>{{ spotInfo.time }}</p>
            <p><strong>地址：</strong>{{ spotInfo.address }}</p>
            <p><strong>推荐理由：</strong>{{ spotInfo.reason }}</p>
          </div>
        </div>
      </div>

      <div class="empty-result" v-if="keyword && !spotInfo">
        未查询到该景点信息，请尝试其他关键词～
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SpotQuery',
  data() {
    return {
      keyword: '',
      spotInfo: null,
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
  },
  methods: {
    // 模拟景点查询
    searchSpot() {
      if (!this.keyword.trim()) {
        alert('请输入景点名称！')
        return
      }

      // 模拟景点数据库
      const spotDB = {
        '故宫': {
          name: '北京故宫博物院',
          desc: '中国明清两代的皇家宫殿，旧称紫禁城，是中国古代宫廷建筑之精华',
          ticket: '旺季60元/人，淡季40元/人',
          time: '8:30-17:00（4月1日-10月31日），8:30-16:30（11月1日-3月31日）',
          address: '北京市东城区景山前街4号',
          reason: '世界文化遗产，中国古代宫殿建筑的巅峰之作'
        },
        '长城': {
          name: '八达岭长城',
          desc: '明长城中保存最好的一段，也是最具代表性的一段，是明代长城的精华',
          ticket: '40元/人',
          time: '7:30-17:30（旺季），7:30-17:00（淡季）',
          address: '北京市延庆区军都山关沟古道北口',
          reason: '不到长城非好汉，中国的标志性景点'
        },
        '颐和园': {
          name: '颐和园',
          desc: '中国清朝时期的皇家园林，前身为清漪园，坐落在北京西郊',
          ticket: '旺季30元/人（园区），60元/人（通票）；淡季20元/人（园区），50元/人（通票）',
          time: '6:30-18:00（旺季），7:00-17:00（淡季）',
          address: '北京市海淀区新建宫门路19号',
          reason: '中国古典园林之首，世界著名园林景观'
        },
        '西湖': {
          name: '杭州西湖',
          desc: '中国大陆首批国家重点风景名胜区和中国十大风景名胜之一',
          ticket: '免费（部分景点收费）',
          time: '全天开放',
          address: '浙江省杭州市西湖区龙井路1号',
          reason: '上有天堂，下有苏杭，西湖是杭州的灵魂'
        }
      }

      // 匹配结果
      this.spotInfo = spotDB[this.keyword] || null

      // 保存到历史记录
      if (this.spotInfo) {
        const history = JSON.parse(localStorage.getItem('translationHistory') || '[]')
        const newItem = {
          input: `景点查询：${this.keyword}`,
          result: this.spotInfo.name
        }
        if (!history.some(item => item.input === newItem.input)) {
          history.unshift(newItem)
          if (history.length > 10) history.pop()
          localStorage.setItem('translationHistory', JSON.stringify(history))
        }
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
.spot-query-page {
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

.query-container {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(0,0,0,0.05);
}

.search-box {
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
}

.search-input {
  flex: 1;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
}

.search-btn {
  padding: 12px 25px;
  border: none;
  border-radius: 6px;
  background: #42b983;
  color: white;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.2s;
}

.search-btn:hover {
  background: #3aa876;
}

.result-container {
  margin-top: 20px;
}

.spot-card {
  background: #f8f8f8;
  padding: 25px;
  border-radius: 8px;
}

.spot-card h2 {
  color: #42b983;
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 24px;
}

.spot-detail p {
  margin: 10px 0;
  line-height: 1.6;
  color: #333;
}

.empty-result {
  text-align: center;
  padding: 50px;
  color: #999;
  font-size: 18px;
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
  .search-box {
    flex-direction: column;
  }
  .spot-card {
    padding: 15px;
  }
}
</style>