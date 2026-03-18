<template>
  <div class="text-voice-page">
    <!-- 顶部导航 -->
    <div class="header">
      <h1 class="title">📝 文字/语音翻译</h1>
      <div class="nav-buttons">
        <button class="back-btn" @click="$router.push('/translation')">返回主页</button>
        <div class="user-info">
          <span>用户：{{ currentUser }}</span>
          <button class="logout-btn" @click="handleLogout">退出</button>
        </div>
      </div>
    </div>

    <!-- 功能切换标签 -->
    <div class="function-tabs">
      <button :class="{ active: activeTab === 'text' }" @click="activeTab = 'text'">文字翻译</button>
      <button :class="{ active: activeTab === 'voice' }" @click="activeTab = 'voice'">语音翻译</button>
    </div>

    <!-- 文字翻译功能 -->
    <div class="function-content" v-if="activeTab === 'text'">
      <div class="text-translate-container">
        <div class="source-area">
          <div class="lang-select">
            <label>源语言：</label>
            <select v-model="sourceLang">
              <option value="zh">中文</option>
              <option value="en">英语</option>
              <option value="jp">日语</option>
              <option value="kr">韩语</option>
              <option value="fr">法语</option>
            </select>
          </div>
          <textarea 
            v-model="sourceText" 
            placeholder="请输入需要翻译的文字..."
            class="source-text"
          ></textarea>
        </div>

        <div class="target-area">
          <div class="lang-select">
            <label>目标语言：</label>
            <select v-model="targetLang">
              <option value="en">英语</option>
              <option value="zh">中文</option>
              <option value="jp">日语</option>
              <option value="kr">韩语</option>
              <option value="fr">法语</option>
            </select>
          </div>
          <textarea 
            v-model="targetText" 
            placeholder="翻译结果将显示在这里..."
            class="target-text"
            readonly
          ></textarea>
        </div>

        <div class="text-btn-group">
          <button class="translate-btn" @click="handleTextTranslate" :disabled="!sourceText">
            开始翻译
          </button>
          <button class="swap-btn" @click="swapLang">交换语言</button>
          <button class="copy-btn" @click="copyTextResult" :disabled="!targetText">
            复制结果
          </button>
        </div>
      </div>
    </div>

    <!-- 语音翻译功能 -->
    <div class="function-content" v-if="activeTab === 'voice'">
      <div class="voice-translate-container">
        <div class="voice-lang-select">
          <label>识别语言：</label>
          <select v-model="voiceLang">
            <option value="zh">中文</option>
            <option value="en">英语</option>
            <option value="jp">日语</option>
            <option value="kr">韩语</option>
          </select>
        </div>

        <div class="voice-status">
          <span>{{ voiceStatus }}</span>
        </div>

        <div class="voice-btn-group">
          <button 
            class="record-btn" 
            :class="{ recording: isRecording }"
            @click="toggleRecord"
          >
            {{ isRecording ? '停止录音' : '开始录音' }}
          </button>
          <button class="play-btn" @click="playVoice" :disabled="!voiceText">
            播放结果
          </button>
          <button class="copy-voice-btn" @click="copyVoiceResult" :disabled="!voiceText">
            复制文字
          </button>
        </div>

        <div class="voice-result">
          <h3>语音识别结果：</h3>
          <textarea 
            v-model="voiceText" 
            placeholder="录音后将显示识别的文字..."
            readonly
          ></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TextVoiceTranslation',
  data() {
    return {
      // 登录状态
      currentUser: '',
      // 文字翻译
      activeTab: 'text',
      sourceLang: 'zh',
      targetLang: 'en',
      sourceText: '',
      targetText: '',
      // 语音翻译
      voiceLang: 'zh',
      isRecording: false,
      voiceStatus: '未开始录音',
      voiceText: '',
      recorder: null,
      audioContext: null,
      audioBlob: null
    }
  },
  mounted() {
    // 获取登录用户信息
    this.currentUser = localStorage.getItem('translation_username') || ''
    // 初始化语音识别（浏览器原生API）
    this.initVoiceRecognition()
  },
  methods: {
    // 文字翻译
    handleTextTranslate() {
      // 模拟翻译结果（实际项目可对接百度/谷歌翻译API）
      const translateMap = {
        '你好': { en: 'Hello', jp: 'こんにちは', kr: '안녕하세요', fr: 'Bonjour' },
        '谢谢': { en: 'Thank you', jp: 'ありがとう', kr: '고맙습니다', fr: 'Merci' },
        '景点': { en: 'Scenic spot', jp: '名所', kr: '명소', fr: 'Site touristique' },
        '门票': { en: 'Ticket', jp: 'チケット', kr: '티켓', fr: 'Billet' },
        'Hello': { zh: '你好', jp: 'こんにちは', kr: '안녕하세요', fr: 'Bonjour' },
        'Thank you': { zh: '谢谢', jp: 'ありがとう', kr: '고맙습니다', fr: 'Merci' }
      }

      // 简单匹配翻译结果
      const lowerText = this.sourceText.trim().toLowerCase()
      let result = ''
      
      if (translateMap[this.sourceText]) {
        result = translateMap[this.sourceText][this.targetLang]
      } else if (translateMap[lowerText]) {
        result = translateMap[lowerText][this.targetLang]
      } else {
        result = `【模拟翻译】${this.sourceText} → ${this.targetLang.toUpperCase()}: ${this.sourceText}`
      }

      this.targetText = result

      // 保存到历史记录
      const history = JSON.parse(localStorage.getItem('translationHistory') || '[]')
      const newItem = {
        input: `文字翻译(${this.sourceLang}→${this.targetLang}): ${this.sourceText}`,
        result: this.targetText
      }
      if (!history.some(item => item.input === newItem.input)) {
        history.unshift(newItem)
        if (history.length > 10) history.pop()
        localStorage.setItem('translationHistory', JSON.stringify(history))
      }
    },
    // 交换源语言和目标语言
    swapLang() {
      const temp = this.sourceLang
      this.sourceLang = this.targetLang
      this.targetLang = temp
      // 交换文字
      const tempText = this.sourceText
      this.sourceText = this.targetText
      this.targetText = tempText
    },
    // 复制文字翻译结果
    copyTextResult() {
      navigator.clipboard.writeText(this.targetText).then(() => {
        alert('文字翻译结果复制成功！')
      })
    },

    // 语音翻译相关
    initVoiceRecognition() {
      // 检查浏览器是否支持语音识别
      window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      if (!window.SpeechRecognition) {
        this.voiceStatus = '您的浏览器不支持语音识别，请更换Chrome/Edge浏览器'
        return
      }

      this.recorder = new window.SpeechRecognition()
      this.recorder.continuous = true // 连续识别
      this.recorder.interimResults = true // 实时返回结果
      this.recorder.lang = this.getVoiceLangCode() // 设置语言

      // 识别结果回调
      this.recorder.onresult = (e) => {
        let transcript = ''
        for (let i = e.resultIndex; i < e.results.length; i++) {
          transcript += e.results[i][0].transcript
        }
        this.voiceText = transcript
      }

      // 开始录音回调
      this.recorder.onstart = () => {
        this.isRecording = true
        this.voiceStatus = '正在录音，请说话...'
      }

      // 结束录音回调
      this.recorder.onend = () => {
        this.isRecording = false
        this.voiceStatus = '录音结束，识别完成'
        // 保存到历史记录
        if (this.voiceText) {
          const history = JSON.parse(localStorage.getItem('translationHistory') || '[]')
          const newItem = {
            input: `语音翻译(${this.voiceLang}): 语音识别`,
            result: this.voiceText
          }
          if (!history.some(item => item.input === newItem.input)) {
            history.unshift(newItem)
            if (history.length > 10) history.pop()
            localStorage.setItem('translationHistory', JSON.stringify(history))
          }
        }
      }

      // 错误回调
      this.recorder.onerror = (e) => {
        this.voiceStatus = `录音错误：${e.error}`
        this.isRecording = false
      }
    },
    // 切换录音状态
    toggleRecord() {
      if (!window.SpeechRecognition) return

      if (this.isRecording) {
        this.recorder.stop()
      } else {
        this.voiceText = ''
        this.recorder.lang = this.getVoiceLangCode()
        this.recorder.start()
      }
    },
    // 播放语音（模拟）
    playVoice() {
      if (!this.voiceText) return
      // 模拟语音播放（实际项目可对接语音合成API）
      const synth = window.speechSynthesis
      const utterance = new SpeechSynthesisUtterance(this.voiceText)
      utterance.lang = this.getVoiceLangCode()
      synth.speak(utterance)
      this.voiceStatus = '正在播放语音...'
    },
    // 复制语音识别结果
    copyVoiceResult() {
      navigator.clipboard.writeText(this.voiceText).then(() => {
        alert('语音识别文字复制成功！')
      })
    },
    // 获取语音语言代码
    getVoiceLangCode() {
      const langMap = {
        zh: 'zh-CN',
        en: 'en-US',
        jp: 'ja-JP',
        kr: 'ko-KR'
      }
      return langMap[this.voiceLang] || 'zh-CN'
    },

    // 退出登录
    handleLogout() {
      if (confirm('确定要退出登录吗？')) {
        localStorage.removeItem('translation_username')
        this.$router.push('/login')
        alert('退出登录成功！')
      }
    }
  }
}
</script>

<style scoped>
.text-voice-page {
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

.back-btn {
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

/* 功能切换标签 */
.function-tabs {
  display: flex;
  gap: 0;
  margin-bottom: 30px;
  border-radius: 8px;
  overflow: hidden;
}

.function-tabs button {
  flex: 1;
  padding: 15px;
  border: none;
  background: #f5f5f5;
  color: #666;
  cursor: pointer;
  font-size: 18px;
  transition: all 0.2s;
}

.function-tabs button.active {
  background: #42b983;
  color: white;
}

.function-tabs button:hover:not(.active) {
  background: #e8f5e9;
}

/* 文字翻译样式 */
.text-translate-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(0,0,0,0.05);
}

.source-area, .target-area {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.lang-select {
  display: flex;
  align-items: center;
  gap: 10px;
}

.lang-select label {
  font-weight: bold;
  color: #333;
}

.lang-select select {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.source-text, .target-text {
  width: 100%;
  height: 200px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  resize: none;
  font-size: 16px;
}

.target-text {
  background: #f8f8f8;
  color: #333;
}

.text-btn-group {
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-top: 10px;
}

.translate-btn, .swap-btn, .copy-btn {
  padding: 10px 25px;
  border: none;
  border-radius: 6px;
  color: white;
  cursor: pointer;
  font-size: 16px;
}

.translate-btn {
  background: #42b983;
}

.translate-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.swap-btn {
  background: #2196f3;
}

.copy-btn {
  background: #ff9800;
}

.copy-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

/* 语音翻译样式 */
.voice-translate-container {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.voice-lang-select {
  display: flex;
  align-items: center;
  gap: 10px;
}

.voice-lang-select label {
  font-weight: bold;
  color: #333;
}

.voice-lang-select select {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.voice-status {
  text-align: center;
  font-size: 18px;
  color: #666;
  padding: 10px;
  background: #f8f8f8;
  border-radius: 8px;
}

.voice-btn-group {
  display: flex;
  gap: 15px;
  justify-content: center;
}

.record-btn, .play-btn, .copy-voice-btn {
  padding: 12px 30px;
  border: none;
  border-radius: 6px;
  color: white;
  cursor: pointer;
  font-size: 16px;
}

.record-btn {
  background: #ff4444;
}

.record-btn.recording {
  background: #d32f2f;
  animation: pulse 1s infinite;
}

.play-btn {
  background: #42b983;
}

.play-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.copy-voice-btn {
  background: #2196f3;
}

.copy-voice-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.voice-result {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.voice-result h3 {
  color: #333;
  margin: 0;
  font-size: 18px;
}

.voice-result textarea {
  width: 100%;
  height: 200px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  resize: none;
  font-size: 16px;
  background: #f8f8f8;
}

@keyframes pulse {
  0% { opacity: 1; }
  50% { opacity: 0.7; }
  100% { opacity: 1; }
}

/* 响应式适配 */
@media (max-width: 768px) {
  .header {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
  .text-btn-group, .voice-btn-group {
    flex-direction: column;
  }
  .source-text, .target-text, .voice-result textarea {
    height: 150px;
  }
}
</style>