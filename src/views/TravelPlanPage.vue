<template>
  <div class="travel-plan-page">
    <div class="header">
      <h1>🗺️ 景点旅行方案推荐</h1>
      <button class="back-btn" @click="$router.push('/translation')">返回翻译页</button>
    </div>

    <!-- 方案筛选 -->
    <div class="filter-area">
      <select v-model="selectedCity" class="filter-select">
        <option value="">选择城市</option>
        <option value="beijing">北京</option>
        <option value="shanghai">上海</option>
        <option value="chengdu">成都</option>
        <option value="hangzhou">杭州</option>
      </select>
      <select v-model="travelDays" class="filter-select">
        <option value="">选择游玩天数</option>
        <option value="1">1天</option>
        <option value="2">2天</option>
        <option value="3">3天</option>
        <option value="5">5天</option>
      </select>
      <button class="search-btn" @click="getTravelPlan">生成方案</button>
    </div>

    <!-- 方案列表 -->
    <div class="plan-list" v-if="travelPlans.length > 0">
      <div class="plan-item" v-for="(plan, index) in travelPlans" :key="index">
        <h3>{{ plan.title }}</h3>
        <div class="plan-content">
          <p><strong>行程天数：</strong>{{ plan.days }}</p>
          <p><strong>推荐景点：</strong>{{ plan.spots.join('、') }}</p>
          <p><strong>行程安排：</strong>{{ plan.schedule }}</p>
          <p><strong>注意事项：</strong>{{ plan.notes }}</p>
        </div>
      </div>
    </div>

    <!-- 空状态 -->
    <div class="empty-tip" v-else>
      请选择城市和游玩天数，点击「生成方案」获取推荐行程
    </div>
  </div>
</template>

<script>
export default {
  name: 'TravelPlanPage',
  data() {
    return {
      selectedCity: '', // 选中城市
      travelDays: '', // 游玩天数
      travelPlans: [] // 旅行方案列表
    }
  },
  methods: {
    // 生成旅行方案（模拟数据，实际需对接接口）
    getTravelPlan() {
      if (!this.selectedCity || !this.travelDays) {
        return alert('请选择城市和游玩天数！')
      }

      // 模拟方案数据
      const planData = {
        beijing: {
          1: [{
            title: '北京1日精华游',
            days: '1天',
            spots: ['天安门广场', '故宫博物院', '景山公园'],
            schedule: '上午：天安门广场 → 故宫博物院（建议游玩3小时）；下午：景山公园（俯瞰故宫全景）；晚上：王府井小吃街',
            notes: '故宫需提前预约，建议穿舒适的鞋子，景区内餐饮较少可自备零食'
          }],
          3: [{
            title: '北京3日深度游',
            days: '3天',
            spots: ['天安门/故宫', '八达岭长城', '颐和园/圆明园', '南锣鼓巷/什刹海'],
            schedule: 'Day1：天安门广场 → 故宫 → 景山；Day2：八达岭长城 → 奥林匹克公园；Day3：颐和园 → 南锣鼓巷 → 什刹海',
            notes: '长城建议早出发避开人流，颐和园较大可乘坐观光车，南锣鼓巷小吃偏贵可按需选择'
          }]
        },
        shanghai: {
          2: [{
            title: '上海2日休闲游',
            days: '2天',
            spots: ['上海迪士尼乐园', '外滩', '陆家嘴', '豫园'],
            schedule: 'Day1：上海迪士尼乐园（全天）；Day2：豫园 → 外滩 → 陆家嘴（东方明珠/上海中心）',
            notes: '迪士尼需提前购票，建议早到抢热门项目；外滩夜景最佳观赏时间19:00-21:00'
          }]
        },
        chengdu: {
          2: [{
            title: '成都2日慢游',
            days: '2天',
            spots: ['大熊猫基地', '宽窄巷子', '锦里', '武侯祠', '春熙路'],
            schedule: 'Day1：大熊猫基地（上午最佳）→ 宽窄巷子；Day2：武侯祠 → 锦里 → 春熙路',
            notes: '大熊猫基地建议7:30-8:00入园，锦里晚上夜景更美，成都火锅偏辣可提前告知店家调整'
          }]
        },
        hangzhou: {
          2: [{
            title: '杭州2日西湖游',
            days: '2天',
            spots: ['西湖（断桥/苏堤）', '灵隐寺', '雷峰塔', '河坊街'],
            schedule: 'Day1：西湖环湖游（断桥→苏堤→三潭印月）；Day2：灵隐寺 → 雷峰塔 → 河坊街',
            notes: '西湖可租共享单车游览，灵隐寺香火券需单独购买，河坊街特产可比价后购买'
          }]
        }
      }

      // 匹配方案
      this.travelPlans = planData[this.selectedCity][this.travelDays] || [{
        title: `【${this.getCityName()}${this.travelDays}天定制游】`,
        days: `${this.travelDays}天`,
        spots: ['暂无推荐景点'],
        schedule: '暂无具体行程安排',
        notes: '可根据个人喜好定制专属行程'
      }]
    },

    // 城市编码转名称
    getCityName() {
      const cityMap = {
        beijing: '北京',
        shanghai: '上海',
        chengdu: '成都',
        hangzhou: '杭州'
      }
      return cityMap[this.selectedCity] || ''
    }
  }
}
</script>

<style scoped>
.travel-plan-page {
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

/* 筛选区域 */
.filter-area {
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.filter-select {
  flex: 1;
  min-width: 150px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.search-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background: #42b983;
  color: white;
  cursor: pointer;
}

/* 方案列表 */
.plan-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.plan-item {
  padding: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
  background: #f8f8f8;
}

.plan-item h3 {
  margin-top: 0;
  color: #42b983;
  border-bottom: 1px dashed #ddd;
  padding-bottom: 10px;
}

.plan-content {
  line-height: 1.8;
  color: #333;
}

/* 空状态 */
.empty-tip {
  text-align: center;
  padding: 50px;
  color: #999;
  font-size: 16px;
}
</style>