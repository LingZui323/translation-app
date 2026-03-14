<template>
  <div class="image-translate-page">
    <div class="header">
      <h1>📷 图片翻译识别</h1>
      <button class="back-btn" @click="$router.push('/translation')">返回翻译页</button>
    </div>
    
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
        <h3>识别结果：</h3>
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
</template>

<script>
export default {
  name: 'ImageTranslatePage',
  data() {
    return {
      selectedImage: '', // 预览图片URL
      translateResult: '' // 翻译结果
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
      }
      reader.readAsDataURL(file)
    },

    // 模拟图片翻译识别（实际项目需对接OCR/翻译接口）
    handleImageTranslate() {
      this.translateResult = '【模拟识别结果】\n\n图片中识别到文字："Scenic spot ticket ¥50"\n\n翻译结果："景点门票 50元"\n\n识别语言：英语 → 中文'
    },

    // 复制翻译结果
    copyResult() {
      navigator.clipboard.writeText(this.translateResult)
      alert('翻译结果已复制！')
    }
  }
}
</script>

<style scoped>
.image-translate-page {
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

.translate-container {
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

/* 翻译结果区域 */
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
@media (max-width: 768px) {
  .translate-container {
    grid-template-columns: 1fr;
  }
}
</style>