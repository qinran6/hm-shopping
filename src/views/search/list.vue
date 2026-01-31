<template>
  <div class="search">
    <van-nav-bar
      flexed
      title="商品列表"
      left-arrow
      @click-left="$router.go(-1)"
    />

    <van-search
      readonly
      show-action
      shape="round"
      background="#ffffff"
      :value="$route.query.search || '搜索商品'"
      @click="$router.push('/search')"
    >
      <template #action>
        <van-icon class="tool" name="apps-o" />
      </template>
    </van-search>
    <!-- 排序选项按钮 -->
    <van-dropdown-menu>
      <van-dropdown-item v-model="value1" :options="option1" @change="updateList" />
      <van-dropdown-item v-model="value2" :options="option2" @change="updateList" />
    </van-dropdown-menu>

    <div class="goods-list">
      <GoodsItem v-for="item in goodsList" :key="item.goods_id" :item="item"></GoodsItem>
    </div>
  </div>
</template>

<script>
import { getGoodsList } from '@/api/search'
import GoodsItem from '@/components/GoodsItem.vue'
export default {
  name: 'ListIndex',
  data () {
    return {
      value1: 'all',
      value2: 0,
      option1: [
        { text: '综合搜索', value: 'all' },
        { text: '销量搜索', value: 'sales' },
        { text: '价格搜索', value: 'price' }
      ],
      option2: [
        { text: '价格从低到高', value: 0 },
        { text: '价格从高到低', value: 1 }
      ],
      goodsList: []
    }
  },
  components: {
    GoodsItem
  },
  computed: {
    queryObj () {
      return {
        goodsName: this.$route.query.search,
        page: 1,
        sortType: this.value1,
        sortPrice: this.value2
      }
    }
  },
  async created () {
    const res = await getGoodsList(this.queryObj)
    console.log(res)
    this.goodsList = res.data.list.data
  },
  methods: {
    async updateList () {
      const res = await getGoodsList(this.queryObj)
      console.log(res)
      this.goodsList = res.data.list.data
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  ::v-deep .van-icon-arrow-left {
    color: #333;
  }
  .tool {
    font-size: 24px;
    height: 40px;
    line-height: 40px;
  }

}

// 商品样式
.goods-list {
  background-color: #f6f6f6;
}
</style>
