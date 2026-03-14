<template>
  <div class="spots-page">
    <div class="header">
      <h1>🌟 景点信息查询</h1>
      <button class="back-btn" @click="$router.push('/translation')">返回翻译页</button>
    </div>
    <div class="spots-list">
      <div class="spot-item">
        <h3>示例景点1</h3>
        <p>这是一个推荐景点的示例内容</p>
      </div>
      <div class="spot-item">
        <h3>示例景点2</h3>
        <p>这是另一个推荐景点的示例内容</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecommendSpotsPage'
}
</script>

<style scoped>
.spots-page {
  max-width: 800px;
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
.spots-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}
.spot-item {
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0,0,0,0.05);
}
.spot-item h3 {
  color: #42b983;
  margin-top: 0;
}
</style>