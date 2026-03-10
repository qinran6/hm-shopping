<template>
  <div class="address">
    <van-nav-bar
      fixed
      title="地址列表"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <div class="content">
      <van-address-list
      v-model="chosenAddressId"
      :list="list"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
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
      chosenAddressId: '1'
    }
  },
  created () {
    this.$store.dispatch('address/getAddressListAction')
  },
  computed: {
    ...mapState('address', ['addressList']),
    list () {
      return this.addressList
    }
  },
  methods: {
    onAdd () {
      this.$toast('新增地址')
    },
    onEdit (item, index) {
      console.log(item)
      this.$toast('编辑地址:' + index)
    }
  }
}
</script>

<style>
.content {
  padding-top: 38px;
}
</style>
