<template>
  <div class="rank-container">
    <!-- 顶部返回按钮 + 标题 -->
    <div class="rank-header">
      <button class="back-btn" @click="$router.go(-1)">← 返回</button>
      <h2>全球热门景点排行榜（按点击量）</h2>
    </div>

    <!-- 中美景点排行榜 -->
    <div class="rank-list">
      <!-- 中国热门景点 -->
      <div class="rank-group">
        <h3 class="group-title">🇨🇳 中国热门景点 Top10</h3>
        <ul class="rank-items">
          <li v-for="(spot, index) in chinaSpots" :key="index" class="rank-item">
            <!-- 排名数字 -->
            <div class="rank-num" :class="getRankClass(index)">
              {{ index + 1 }}
            </div>
            <!-- 景点信息 -->
            <div class="spot-info">
              <h4 class="spot-name">{{ spot.name }}</h4>
              <p class="spot-desc">{{ spot.desc }}</p>
              <p class="spot-click">点击量：{{ spot.clickCount }}</p>
            </div>
          </li>
        </ul>
      </div>

      <!-- 美国热门景点 -->
      <div class="rank-group">
        <h3 class="group-title">🇺🇸 美国热门景点 Top10</h3>
        <ul class="rank-items">
          <li v-for="(spot, index) in usaSpots" :key="index" class="rank-item">
            <div class="rank-num" :class="getRankClass(index)">
              {{ index + 1 }}
            </div>
            <div class="spot-info">
              <h4 class="spot-name">{{ spot.name }}</h4>
              <p class="spot-desc">{{ spot.desc }}</p>
              <p class="spot-click">点击量：{{ spot.clickCount }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HotSpotsRank',
  data() {
    return {
      // 中国热门景点（按点击量降序排列）
      chinaSpots: [
        {
          name: '故宫（北京）',
          desc: '中国明清两代的皇家宫殿，世界文化遗产',
          clickCount: '987万+'
        },
        {
          name: '长城（八达岭）',
          desc: '世界七大奇迹之一，中华民族的象征',
          clickCount: '956万+'
        },
        {
          name: '张家界国家森林公园',
          desc: '世界自然遗产，阿凡达取景地',
          clickCount: '892万+'
        },
        {
          name: '西湖（杭州）',
          desc: '中国十大名胜之一，三面环山一面城',
          clickCount: '875万+'
        },
        {
          name: '兵马俑（西安）',
          desc: '世界第八大奇迹，秦始皇陵陪葬坑',
          clickCount: '861万+'
        },
        {
          name: '黄山（安徽）',
          desc: '天下第一奇山，奇松、怪石、云海、温泉',
          clickCount: '823万+'
        },
        {
          name: '九寨沟（四川）',
          desc: '世界自然遗产，童话般的水景王国',
          clickCount: '798万+'
        },
        {
          name: '布达拉宫（拉萨）',
          desc: '世界上海拔最高的宫殿，藏传佛教圣地',
          clickCount: '785万+'
        },
        {
          name: '桂林山水（阳朔）',
          desc: '山水甲天下，喀斯特地貌代表',
          clickCount: '769万+'
        },
        {
          name: '丽江古城（云南）',
          desc: '世界文化遗产，纳西族风情古城',
          clickCount: '753万+'
        }
      ],
      // 美国热门景点（按点击量降序排列）
      usaSpots: [
        {
          name: '纽约自由女神像',
          desc: '美国的象征，自由与民主的标志',
          clickCount: '898万+'
        },
        {
          name: '拉斯维加斯大道',
          desc: '世界娱乐之都，奢华酒店与赌场聚集地',
          clickCount: '876万+'
        },
        {
          name: '黄石国家公园',
          desc: '世界上第一个国家公园，地热景观闻名',
          clickCount: '854万+'
        },
        {
          name: '迪士尼乐园（奥兰多）',
          desc: '世界上最大的迪士尼乐园，童话世界',
          clickCount: '832万+'
        },
        {
          name: '大峡谷国家公园',
          desc: '世界自然遗产，科罗拉多河切割形成',
          clickCount: '819万+'
        },
        {
          name: '好莱坞环球影城',
          desc: '电影主题乐园，体验电影拍摄场景',
          clickCount: '798万+'
        },
        {
          name: '尼亚加拉大瀑布',
          desc: '世界三大跨国瀑布之一，气势磅礴',
          clickCount: '785万+'
        },
        {
          name: '白宫（华盛顿）',
          desc: '美国总统官邸，美国政治象征',
          clickCount: '767万+'
        },
        {
          name: '夏威夷威基基海滩',
          desc: '世界著名海滩，冲浪与度假胜地',
          clickCount: '754万+'
        },
        {
          name: '旧金山金门大桥',
          desc: '世界著名悬索桥，旧金山地标',
          clickCount: '738万+'
        }
      ]
    }
  },
  methods: {
    // 给前三名添加特殊样式（金/银/铜）
    getRankClass(index) {
      if (index === 0) return 'first';
      if (index === 1) return 'second';
      if (index === 2) return 'third';
      return '';
    }
  }
}
</script>

<style scoped>
/* 整体容器 */
.rank-container {
  max-width: 900px;
  margin: 50px auto;
  padding: 20px;
  font-family: "Microsoft Yahei", sans-serif;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

/* 顶部标题 + 返回按钮 */
.rank-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 30px;
  border-bottom: 1px solid #eee;
  padding-bottom: 15px;
}

.back-btn {
  padding: 8px 15px;
  border: none;
  border-radius: 4px;
  background: #42b983;
  color: white;
  cursor: pointer;
  font-size: 14px;
}

.rank-header h2 {
  margin: 0;
  color: #333;
  font-size: 22px;
}

/* 排行榜分组 */
.rank-group {
  margin-bottom: 40px;
}

.group-title {
  color: #333;
  font-size: 18px;
  margin-bottom: 20px;
  padding-left: 10px;
  border-left: 4px solid #42b983;
}

/* 排行榜列表（竖版） */
.rank-items {
  list-style: none;
  padding: 0;
  margin: 0;
}

/* 单个景点项 */
.rank-item {
  display: flex;
  align-items: center;
  padding: 15px;
  margin-bottom: 10px;
  background: #f8f8f8;
  border-radius: 8px;
  transition: all 0.2s;
}

.rank-item:hover {
  background: #f0f0f0;
  transform: translateY(-2px);
}

/* 排名数字 */
.rank-num {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #e0e0e0;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: bold;
  margin-right: 20px;
  flex-shrink: 0;
}

/* 前三名特殊样式 */
.rank-num.first {
  background: #ffd700; /* 金牌色 */
  color: white;
}

.rank-num.second {
  background: #c0c0c0; /* 银牌色 */
  color: white;
}

.rank-num.third {
  background: #cd7f32; /* 铜牌色 */
  color: white;
}

/* 景点信息 */
.spot-info {
  flex: 1;
}

.spot-name {
  margin: 0 0 5px 0;
  color: #333;
  font-size: 16px;
}

.spot-desc {
  margin: 0 0 5px 0;
  color: #666;
  font-size: 14px;
  line-height: 1.5;
}

.spot-click {
  margin: 0;
  color: #999;
  font-size: 12px;
}

/* 移动端适配 */
@media (max-width: 600px) {
  .rank-container {
    margin: 20px;
    padding: 15px;
  }

  .rank-item {
    flex-wrap: wrap;
  }

  .rank-num {
    margin-bottom: 10px;
  }
}
</style>