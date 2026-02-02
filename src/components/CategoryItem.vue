<template>
  <div>
    <van-grid v-if="list.length > 0" column-num="3" icon-size="40">
      <van-grid-item
        v-for="item in list" :key="item.category_id"
        :icon="item.image.external_url"
        :text="item.name"
        @click="$router.push(`/searchlist?search=${item.name}&&categoryId=${item.category_id}`)"
      />
    </van-grid>
  </div>
</template>

<script>
export default {
  name: 'CategoryItem',
  props: {
    list: {
      type: Array,
      default: () => {
        return []
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
