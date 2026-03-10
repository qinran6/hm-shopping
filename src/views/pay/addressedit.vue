<template>
  <div class="address">
    <van-nav-bar
      fixed
      title="编辑地址"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <div class="content">
      <van-address-edit
        :area-list="areaList"
        show-postal
        show-delete
        show-set-default
        show-search-result
        :search-result="searchResult"
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        @delete="onDelete"
        @change-detail="onChangeDetail"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'AddressList',
  data () {
    return {
      // areaList: {},
      searchResult: []
    }
  },
  created () {
    this.$store.dispatch('address/getAreaAction')
  },
  computed: {
    ...mapState('address', ['regionList']),
    areaList () {
      return this.regionList
    }
  },
  methods: {
    onSave () {
      // Toast('save');
    },
    onDelete () {
      // Toast('delete')
    },
    onChangeDetail (val) {
      if (val) {
        this.searchResult = [
          {
            name: '黄龙万科中心',
            address: '杭州市西湖区'
          }
        ]
      } else {
        this.searchResult = []
      }
    }
  }
}
</script>

<style>
.content {
  padding-top: 47px;
}
</style>
