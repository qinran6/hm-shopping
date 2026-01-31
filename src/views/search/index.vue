<template>
  <div class="search">
    <van-nav-bar
      title="商品搜索"
      left-arrow
      @click-left="$router.push('/home')"
    />
    <form action="/">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        clearable
        @search="onSearch(value)"
      >
        <template #action>
          <div @click="onSearch(value)">搜索</div>
        </template>
      </van-search>
    </form>
    <!-- 搜索历史 -->
     <div class="search-history" v-if="list.length>0">
      <div class="title">
        <span>最近搜索</span>
        <van-icon name="delete-o" size="16" @click="del"/>
      </div>
      <div class="list">
        <div v-for="(item) in list" :key="item" class="list-item" @click="onSearch(item)">{{item}}</div>
      </div>
     </div>
  </div>
</template>

<script>
import { getHistoryList, setHistoryList } from '@/utils/storage'

export default {
  name: 'SearchIndex',
  data () {
    return {
      value: '',
      list: getHistoryList()
    }
  },
  methods: {
    onSearch (key) {
      if (key !== '') {
        const index = this.list.indexOf(key)
        if (index !== -1) {
          this.list.splice(index, 1)
          this.list.unshift(key)
        } else {
          this.list.unshift(key)
        }
        this.value = ''
        setHistoryList(this.list)
        this.$router.push(`/searchList?search=${key}`)
      }
    },
    del () {
      this.list = []
      setHistoryList([])
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  .searchBtn {
    background-color: #fa2209;
    color: #fff;
  }
  ::v-deep .van-search__action {
    background-color: #c21401;
    color: #fff;
    padding: 0 20px;
    border-radius: 0 5px 5px 0;
    margin-right: 10px;
  }
  ::v-deep .van-icon-arrow-left {
    color: #333;
  }
  .title {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
  }
  .list {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 10px;
    gap: 5%;
  }
  .list-item {
    width: 30%;
    text-align: center;
    padding: 7px;
    line-height: 15px;
    border-radius: 50px;
    background: #fff;
    font-size: 13px;
    border: 1px solid #efefef;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-bottom: 10px;
  }
}
</style>
