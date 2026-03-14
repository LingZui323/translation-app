<template>
  <div class="menu-recognition-page">
    <div class="header">
      <h1>🍽️ 菜单图片识别</h1>
      <button class="back-btn" @click="$router.push('/translation')">返回翻译页</button>
    </div>
    
    <div class="recognition-container">
      <!-- 图片上传区域 -->
      <div class="upload-area">
        <input 
          type="file" 
          id="menu-upload" 
          accept="image/*" 
          @change="handleImageUpload"
          hidden
        >
        <label for="menu-upload" class="upload-btn">
          {{ selectedImage ? '更换菜单图片' : '点击上传菜单图片' }}
        </label>
        
        <!-- 预览图片 -->
        <div class="preview-box" v-if="selectedImage">
          <img :src="selectedImage" alt="菜单预览" class="preview-img">
        </div>
      </div>

      <!-- 识别结果区域 -->
      <div class="result-area">
        <h3>识别结果：</h3>
        <!-- 识别按钮 -->
        <button 
          class="recognize-btn" 
          @click="handleMenuRecognition" 
          :disabled="!selectedImage"
        >
          开始识别菜单
        </button>
        
        <!-- 结果列表 -->
        <div class="result-list" v-if="menuList.length > 0">
          <div class="menu-item" v-for="(menu, index) in menuList" :key="index">
            <div class="menu-name">
              <strong>菜品：</strong>{{ menu.name }}（{{ menu.nameEn }}）
            </div>
            <div class="menu-price">
              <strong>价格：</strong>{{ menu.price }}
            </div>
            <div class="menu-ingredients">
              <strong>配料：</strong>{{ menu.ingredients }}
            </div>
          </div>
        </div>

        <!-- 空状态/提示 -->
        <div class="empty-tip" v-else-if="isRecognized">
          未识别到菜单信息，请上传清晰的菜单图片
        </div>
        <div class="empty-tip" v-else>
          上传菜单图片后点击「开始识别菜单」获取菜品信息
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MenuRecognitionPage',
  data() {
    return {
      selectedImage: '', // 预览图片URL
      menuList: [],      // 识别后的菜单列表
      isRecognized: false // 是否已执行识别
    }
  },
  methods: {
    // 处理图片上传
    handleImageUpload(e) {
      const file = e.target.files[0]
      if (!file) return
      
      // 生成预览URL
      const reader = new FileReader()
      reader.onload = (res) => {
        this.selectedImage = res.target.result
        this.menuList = [] // 清空之前的识别结果
        this.isRecognized = false
      }
      reader.readAsDataURL(file)
    },

    // 模拟菜单识别（实际项目需对接OCR接口）
    handleMenuRecognition() {
      this.isRecognized = true
      // 模拟识别结果（可根据实际需求扩展）
      this.menuList = [
        {
          name: '宫保鸡丁',
          nameEn: 'Kung Pao Chicken',
          price: '¥38.00',
          ingredients: '鸡肉、花生米、干辣椒、花椒、葱段、姜片、蒜片、白糖、醋、酱油'
        },
        {
          name: '麻婆豆腐',
          nameEn: 'Mapo Tofu',
          price: '¥22.00',
          ingredients: '豆腐、牛肉末、豆瓣酱、辣椒面、花椒面、姜蒜末、葱花、生抽、料酒'
        },
        {
          name: '鱼香肉丝',
          nameEn: 'Yu-Shiang Shredded Pork',
          price: '¥32.00',
          ingredients: '猪肉丝、木耳、胡萝卜、笋丝、泡椒、葱姜蒜、白糖、醋、生抽、料酒'
        },
        {
          name: '水煮鱼',
          nameEn: 'Boiled Fish with Chili',
          price: '¥88.00',
          ingredients: '草鱼、豆芽、干辣椒、花椒、姜片、蒜片、豆瓣酱、盐、料酒、淀粉'
        }
      ]
      alert('菜单识别成功！')
    }
  }
}
</script>

<style scoped>
.menu-recognition-page {
  max-width: 900px;
  margin: 50px auto;
  padding: 20px;
  background: rgba(255,255,255,0.9);
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(0,0,0,0.1);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.back-btn {
  padding: 8px 15px;
  border: none;
  border-radius: 4px;
  background: #42b983;
  color: white;
  cursor: pointer;
}

.recognition-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
}

/* 图片上传区域 */
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
  height: 350px;
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

/* 识别结果区域 */
.result-area {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.recognize-btn {
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  background: #42b983;
  color: white;
  cursor: pointer;
  font-size: 16px;
}

.recognize-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.result-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-height: 350px;
  overflow-y: auto;
}

.menu-item {
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 8px;
  background: #f8f8f8;
}

.menu-name {
  font-size: 16px;
  color: #42b983;
  margin-bottom: 5px;
}

.menu-price {
  color: #e67e22;
  margin-bottom: 5px;
}

.menu-ingredients {
  color: #666;
  font-size: 14px;
  line-height: 1.6;
}

/* 空状态 */
.empty-tip {
  text-align: center;
  padding: 50px;
  color: #999;
  font-size: 16px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 响应式适配 */
@media (max-width: 768px) {
  .recognition-container {
    grid-template-columns: 1fr;
  }
  .preview-box, .empty-tip {
    height: 250px;
  }
}
</style>