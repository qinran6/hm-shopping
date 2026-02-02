<template>
  <div class="category">
    <van-nav-bar title="全部分类" fixed />

    <van-search
      readonly
      shape="round"
      background="#f1f1f2"
      placeholder="请输入搜索关键词"
      @click="$router.push('/search')"
    />

    <div class="list-box">
      <div class="left">
        <van-sidebar v-model="activeKey">
          <van-sidebar-item v-for="item in categoryList" :key="item.category_id" :title="item.name">

          </van-sidebar-item>
        </van-sidebar>
      </div>
      <div class="right" v-if="categoryList.length > 0">
        <CategoryItem :list="categoryList[activeKey].children"></CategoryItem>
      </div>
    </div>
  </div>
</template>

<script>
import { getCategoryData } from '@/api/category'
import CategoryItem from '@/components/CategoryItem.vue'

export default {
  name: 'CategoryIndex',
  components: {
    CategoryItem
  },
  data () {
    return {
      activeKey: 0,
      categoryList: []
    }
  },
  async created () {
    const res = await getCategoryData()
    console.log(res)
    this.categoryList = res.data.list
  }
}
</script>

<style lang="less" scoped>
// 主题 padding
.category {
  padding-bottom: 50px;
  height: 100vh;
  .list-box {
    padding-top: 100px;
    height: 100%;
    display: flex;
    .left {
      width: 85px;
      height: 100%;
      background-color: #f3f3f3;
      overflow: auto;
    }
    .right {
      flex: 1;
      height: 100%;
      background-color: #ffffff;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-content: flex-start;
      // padding: 10px 0;
      overflow: auto;
    }
  }
}

// 导航条样式定制
.van-nav-bar {
  z-index: 999;
}

// 搜索框样式定制
.van-search {
  position: fixed;
  width: 100%;
  top: 46px;
  z-index: 999;
}
</style>
