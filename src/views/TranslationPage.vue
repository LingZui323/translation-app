<template>
  <div class="translation-wrapper">
    <!-- 左侧轮播竖幅 -->
    <div class="carousel-sidebar left-carousel">
      <div class="carousel-item" v-for="(item, index) in carouselList" :key="index" v-show="currentCarousel === index">
        <img :src="item.imgUrl" alt="轮播图" class="carousel-img">
      </div>
      <!-- 上一张/下一张按钮 -->
      <button class="carousel-btn prev-btn" @click="prevCarousel">
        ↑
      </button>
      <button class="carousel-btn next-btn" @click="nextCarousel">
        ↓
      </button>
      <!-- 页码跳转按钮 -->
      <div class="carousel-dots">
        <button 
          class="dot-btn" 
          :class="{ active: currentCarousel === index }"
          v-for="(item, index) in carouselList" 
          :key="index"
          @click="goToCarousel(index)"
        >
          {{ index + 1 }}
        </button>
      </div>
    </div>

    <!-- 核心内容区 -->
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
        </div>
      </div>

      <!-- 标签栏：全部改为路由跳转 -->
      <div class="spot-tabs">
        <!-- 🌟 改为跳转到文字/语音翻译页面 -->
        <button class="tab-item" @click="$router.push('/text-voice-translation')">
          📝 文字/语音翻译
        </button>
        <button class="tab-item" @click="$router.push('/spot-query')">
          🌟 景点信息查询
        </button>
        <button class="tab-item" @click="$router.push('/history-record')">
          📜 搜索历史记录
        </button>
      </div>

      <!-- 图片翻译核心区域（保留，作为主页面默认内容） -->
      <div class="translate-container">
        <!-- 图片上传区域 -->
        <div class="upload-area">
          <input 
            type="file" 
            id="image-upload" 
            accept="image/*" 
            @change="handleImageUpload"
            hidden
          >
          <label for="image-upload" class="upload-btn">
            {{ selectedImage ? '更换图片' : '点击上传图片' }}
          </label>
          
          <!-- 预览图片 -->
          <div class="preview-box" v-if="selectedImage">
            <img :src="selectedImage" alt="预览图片" class="preview-img">
          </div>
        </div>

        <!-- 翻译结果区域 -->
        <div class="result-area">
          <h3>图片识别结果：</h3>
          <textarea 
            class="result-text" 
            v-model="translateResult" 
            placeholder="上传图片后自动识别翻译..."
            readonly
          ></textarea>
          <button class="translate-btn" @click="handleImageTranslate" :disabled="!selectedImage">
            开始识别翻译
          </button>
          <button class="copy-btn" @click="copyResult" :disabled="!translateResult">
            复制结果
          </button>
        </div>
      </div>
    </div>

    <!-- 右侧轮播竖幅 -->
    <div class="carousel-sidebar right-carousel">
      <div class="carousel-item" v-for="(item, index) in carouselList" :key="index" v-show="currentCarousel === index">
        <img :src="item.imgUrl" alt="轮播图" class="carousel-img">
      </div>
      <!-- 上一张/下一张按钮 -->
      <button class="carousel-btn prev-btn" @click="prevCarousel">
        ↑
      </button>
      <button class="carousel-btn next-btn" @click="nextCarousel">
        ↓
      </button>
      <!-- 页码跳转按钮 -->
      <div class="carousel-dots">
        <button 
          class="dot-btn" 
          :class="{ active: currentCarousel === index }"
          v-for="(item, index) in carouselList" 
          :key="index"
          @click="goToCarousel(index)"
        >
          {{ index + 1 }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TranslationPage',
  data() {
    return {
      // 登录状态
      isLogin: false,      
      currentUser: '',      
      // 图片翻译核心数据
      selectedImage: '', // 预览图片URL
      translateResult: '', // 翻译结果
      // 历史记录（主页面不再显示，仅用于存储）
      historyList: [],     
      // 轮播图数据
      carouselList: [
        { imgUrl: '/images/carousel1.jpeg' },
        { imgUrl: '/images/carousel2.jpg' },
        { imgUrl: '/images/carousel3.jpg' }
      ],
      currentCarousel: 0, // 当前轮播索引
      carouselTimer: null // 轮播定时器
    }
  },
  mounted() {
    // 恢复登录状态
    const username = localStorage.getItem('translation_username')
    if (username) {
      this.isLogin = true
      this.currentUser = username
    }
    // 恢复历史记录（用于存储，主页面不显示）
    const history = localStorage.getItem('translationHistory')
    if (history) {
      this.historyList = JSON.parse(history)
    }
    // 启动轮播
    this.startCarousel()
  },
  beforeUnmount() {
    // 清除轮播定时器
    clearInterval(this.carouselTimer)
  },
  methods: {
    // 启动轮播
    startCarousel() {
      this.carouselTimer = setInterval(() => {
        this.nextCarousel()
      }, 3000)
    },
    // 上一张
    prevCarousel() {
      clearInterval(this.carouselTimer)
      this.currentCarousel = (this.currentCarousel - 1 + this.carouselList.length) % this.carouselList.length
      this.startCarousel()
    },
    // 下一张
    nextCarousel() {
      clearInterval(this.carouselTimer)
      this.currentCarousel = (this.currentCarousel + 1) % this.carouselList.length
      this.startCarousel()
    },
    // 跳转到指定页码
    goToCarousel(index) {
      clearInterval(this.carouselTimer)
      this.currentCarousel = index
      this.startCarousel()
    },
    // 图片上传处理
    handleImageUpload(e) {
      const file = e.target.files[0]
      if (!file) return
      
      // 生成预览URL
      const reader = new FileReader()
      reader.onload = (res) => {
        this.selectedImage = res.target.result
      }
      reader.readAsDataURL(file)
    },
    // 图片翻译识别
    handleImageTranslate() {
      // 模拟翻译结果
      this.translateResult = '【模拟识别结果】\n\n图片中识别到文字："Scenic spot ticket ¥50"\n\n翻译结果："景点门票 50元"\n\n识别语言：英语 → 中文'
      // 保存到历史记录（同步到本地存储，供独立页面使用）
      const newItem = {
        input: '图片翻译',
        result: this.translateResult.substring(0, 50) + '...'
      };
      const isExist = this.historyList.some(item => item.input === newItem.input);
      if (!isExist) {
        this.historyList.unshift(newItem);
        if (this.historyList.length > 10) {
          this.historyList.pop();
        }
        localStorage.setItem('translationHistory', JSON.stringify(this.historyList))
      }
    },
    // 复制翻译结果
    copyResult() {
      if (!this.translateResult) return;
      navigator.clipboard.writeText(this.translateResult).then(() => {
        alert('复制成功！');
      });
    },
    // 退出登录
    handleLogout() {
      if (confirm('确定要退出登录吗？')) {
        this.isLogin = false
        this.currentUser = ''
        localStorage.removeItem('translation_username')
        alert('退出登录成功！')
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style scoped>
/* 整体布局：两侧轮播 + 中间内容 */
.translation-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 0;
}

/* 轮播竖幅样式 */
.carousel-sidebar {
  width: 120px;
  height: 600px;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  position: relative;
}

.carousel-item {
  width: 100%;
  height: 100%;
}

.carousel-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 轮播控制按钮（变淡版） */
.carousel-btn {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 50%;
  background: rgba(0,0,0,0.2);
  color: white;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: all 0.2s;
}

.carousel-btn:hover {
  background: rgba(0,0,0,0.4);
}

.prev-btn {
  top: 10px;
}

.next-btn {
  bottom: 60px;
}

/* 页码跳转按钮样式 */
.carousel-dots {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 5px;
  z-index: 10;
}

.dot-btn {
  width: 25px;
  height: 25px;
  border: none;
  border-radius: 50%;
  background: rgba(255,255,255,0.2);
  color: #333;
  cursor: pointer;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dot-btn.active {
  background: #42b983;
  color: white;
}

.dot-btn:hover {
  background: rgba(255,255,255,0.4);
}

/* 核心内容区 */
.translation-container {
  flex: 1;
  max-width: 800px;
  margin: 0 20px;
  padding: 20px;
  font-family: "Microsoft Yahei", sans-serif;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

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

.login-group {
  display: flex;
  gap: 10px;
  align-items: center;
}

.login-btn {
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

/* 标签栏样式 */
.spot-tabs {
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
  background: #f8f8f8;
  padding: 15px;
  border-radius: 8px;
}

.tab-item {
  padding: 15px 25px;
  border: none;
  border-radius: 6px;
  background: #e0e0e0;
  color: #666;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  gap: 8px;
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

/* 图片翻译核心样式 */
.translate-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-bottom: 20px;
}

.upload-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.upload-btn {
  padding: 15px 30px;
  border: 2px dashed #42b983;
  border-radius: 8px;
  background: #f8f8f8;
  color: #42b983;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s;
  width: 100%;
  text-align: center;
}

.upload-btn:hover {
  background: #e8f5e9;
}

.preview-box {
  width: 100%;
  height: 300px;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.preview-img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.result-area {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.result-text {
  width: 100%;
  height: 300px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  resize: none;
  font-size: 14px;
}

.translate-btn, .copy-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  font-size: 14px;
}

.translate-btn {
  background: #42b983;
}

.translate-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.copy-btn {
  background: #2196f3;
}

.copy-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

/* 响应式适配 */
@media (max-width: 992px) {
  .carousel-sidebar {
    display: none;
  }
  .translation-container {
    margin: 0;
    max-width: 100%;
  }
}

@media (max-width: 768px) {
  .translate-container {
    grid-template-columns: 1fr;
  }
  .preview-box {
    height: 250px;
  }
  .result-text {
    height: 250px;
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
  .header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
}
</style>