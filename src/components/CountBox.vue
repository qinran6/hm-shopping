<template>
  <div class="count-box">
    <button class="minus" @click="subCount">-</button>
    <input class="inp" @change="handleChange" type="text" :value="value">
    <button class="add" @click="addCount">+</button>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 1
    }
  },
  methods: {
    addCount () {
      this.$emit('input', this.value + 1)
    },
    subCount () {
      if (this.value > 1) {
        this.$emit('input', this.value - 1)
      }
    },
    handleChange (e) {
      const num = +e.target.value
      if (isNaN(num) || num < 1) {
        e.target.value = this.value
        return
      }
      this.$emit('input', num)
    }
  }
}
</script>

<style lang="less" scoped>
.count-box {
  width: 110px;
  display: flex;
  .add, .minus {
    width: 30px;
    height: 30px;
    outline: none;
    border: none;
    background-color: #efefef;
  }
  .inp {
    width: 40px;
    height: 30px;
    outline: none;
    border: none;
    margin: 0 5px;
    background-color: #efefef;
    text-align: center;
  }
}
</style>
