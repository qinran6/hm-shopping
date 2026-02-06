<template>
  <div class="prodetail">
    <van-nav-bar
      title="商品详情页"
      left-arrow
      @click-left="$router.go(-1)"
      fixed
    />

    <!-- 轮播图 -->
    <van-swipe class="myswipe" :autoplay="3000" @change="onChange">
      <van-swipe-item v-for="(item) in goodsImages" :key="item.filed_id">
        <img v-lazy="item.external_url" />
      </van-swipe-item>
      <template #indicator>
        <div class="custom-indicator">{{current + 1}}/{{goodsImages.length}}</div>
      </template>
    </van-swipe>

    <!-- 商品说明 -->
     <div class="info">
      <div class="title">
        <div class="price">
          <span class="now">￥{{ goodsdetail.goods_price_min }}</span>
          <span class="oldprice">￥{{ goodsdetail.goods_price_max }}</span>
        </div>
        <div class="sellcount">已售 {{ goodsdetail.goods_sales }} 件</div>
      </div>
      <div class="msg text-ellipsis-2">
        {{ goodsdetail.goods_name }}
      </div>

      <div class="service">
        <div class="left-words">
          <span><van-icon name="passed" />七天无理由退货</span>
          <span><van-icon name="passed" />48小时发货</span>
        </div>
        <div class="right-icon">
          <van-icon name="arrow" />
        </div>
      </div>
    </div>

    <!-- 商品评价 -->
    <div class="comment">
      <div class="comment-title">
        <div class="left">商品评价 ({{ commentTotal }}条)</div>
        <div class="right">查看更多 <van-icon name="arrow" /> </div>
      </div>
      <div class="comment-list" v-if="commentList.length > 0">
        <div class="comment-item" v-for="item in commentList" :key="item.comment_id">
          <div class="top">
            <img :src="item.user.avatar_url || defaultImg" alt="">
            <div class="name">{{ item.user.nick_name }}</div>
            <van-rate :size="16" :value="item.score / 2" color="#ffd21e" void-icon="star" void-color="#eee"/>
          </div>
          <div class="content">
            {{ item.content }}
          </div>
          <div class="time">
            {{ item.create_time }}
          </div>
        </div>
      </div>
    </div>

    <!-- 商品描述 -->
    <div class="desc" v-html="goodsdetail.content">
    </div>

    <!-- 底部 -->
    <van-goods-action class="footer">
      <van-goods-action-icon class="icon-home" icon="wap-home-o" text="首页" @click="$router.push('/home')" />
      <van-goods-action-icon class="icon-cart" icon="cart-o" text="购物车" @click="$router.push('/cart')" />
      <van-goods-action-button @click="addFn"  class="btn-add" type="warning" text="加入购物车" />
      <van-goods-action-button @click="buyFn" class="btn-buy" type="danger" text="立即购买" />
    </van-goods-action>

    <!-- 加入购物车的弹层 -->
    <van-action-sheet v-model="showPannel" :title="mode === 'cart' ? '加入购物车' : '立即购买'">
      <div class="product">
        <div class="product-title">
          <div class="left">
            <img :src="goodsdetail.goods_image" alt="">
          </div>
          <div class="right">
            <div class="price">
              <span>¥</span>
              <span class="nowprice">{{ goodsdetail.goods_price_min }}</span>
            </div>
            <div class="count">
              <span>库存</span>
              <span>{{ goodsdetail.stock_total }}</span>
            </div>
          </div>
        </div>
        <div class="num-box">
          <span>数量</span>
          <!-- v-model 本质上 :value 和 @input 的简写 -->
          <CountBox v-model="addCount"></CountBox>
        </div>

        <!-- 有库存才显示提交按钮 -->
        <div class="showbtn" v-if="goodsdetail.stock_total > 0">
          <div class="btn" v-if="mode === 'cart'" @click="addCart">加入购物车</div>
          <div class="btn now" v-else @click="goBuyNow">立刻购买</div>
        </div>

        <div class="btn-none" v-else>该商品已抢完</div>
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
import { getListRow, getProdetailData } from '@/api/prodetail'
import CountBox from '@/components/CountBox.vue'
import defaultImg from '@/assets/default-avatar.png'
export default {
  name: 'ProdetailIndex',
  components: {
    CountBox
  },
  created () {
    this.getProDetail()
    this.getComList()
  },
  data () {
    return {
      proList: [],
      goodsImages: [],
      current: 0,
      goodsdetail: {},
      commentList: [],
      commentTotal: 0,
      defaultImg,
      showPannel: false,
      mode: 'cart',
      addCount: 1
    }
  },
  computed: {
    goodsId () {
      return this.$route.params.id
    }
  },
  methods: {
    onChange (index) {
      this.current = index
    },
    async getProDetail () {
      const res = await getProdetailData(this.goodsId)
      console.log(res)
      this.goodsImages = res.data.detail.goods_images
      this.goodsdetail = res.data.detail
    },
    async getComList () {
      const res = await getListRow(this.goodsId)
      console.log(res)
      this.commentList = res.data.list
      this.commentTotal = res.data.total
    },
    addFn () {
      this.mode = 'cart'
      this.showPannel = true
    },
    buyFn () {
      this.mode = 'buynow'
      this.showPannel = true
    },
    addCart () {

    },
    goBuyNow () {

    }
  }
}
</script>

<style lang="less" scoped>
.prodetail {
  ::v-deep .van-icon-arrow-left {
    color: #333;
  }
  .myswipe{
    padding-top: 46px;
  }
  img {
    display: block;
    width: 100%;
  }
  .custom-indicator {
    position: absolute;
    right: 10px;
    bottom: 10px;
    padding: 5px 10px;
    font-size: 12px;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 15px;
  }
  .desc {
    width: 100%;
    overflow: scroll;
    ::v-deep img {
      display: block;
      width: 100%!important;
    }
  }
  .info {
    padding: 10px;
  }
  .title {
    display: flex;
    justify-content: space-between;
    .now {
      color: #fa2209;
      font-size: 20px;
    }
    .oldprice {
      color: #959595;
      font-size: 16px;
      text-decoration: line-through;
      margin-left: 5px;
    }
    .sellcount {
      color: #959595;
      font-size: 16px;
      position: relative;
      top: 4px;
    }
  }
  .msg {
    font-size: 16px;
    line-height: 24px;
    margin-top: 5px;
  }
  .service {
    display: flex;
    justify-content: space-between;
    line-height: 40px;
    margin-top: 10px;
    font-size: 16px;
    background-color: #fafafa;
    .left-words {
      span {
        margin-right: 10px;
      }
      .van-icon {
        margin-right: 4px;
        color: #fa2209;
      }
    }
  }

  .comment {
    padding: 10px;
  }
  .comment-title {
    display: flex;
    justify-content: space-between;
    .right {
      color: #959595;
    }
  }

  .comment-item {
    font-size: 16px;
    line-height: 30px;
    .top {
      height: 30px;
      display: flex;
      align-items: center;
      margin-top: 20px;
      img {
        width: 20px;
        height: 20px;
      }
      .name {
        margin: 0 10px;
      }
    }
    .time {
      color: #999;
    }
  }

  .footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 55px;
    background-color: #fff;
    border-top: 1px solid #ccc;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    .icon-home, .icon-cart {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      .van-icon {
        font-size: 24px;
      }
    }
    .btn-add,
    .btn-buy {
      height: 36px;
      line-height: 36px;
      width: 120px;
      border-radius: 18px;
      background-color: #ffa900;
      text-align: center;
      color: #fff;
      font-size: 14px;
    }
    .btn-buy {
      background-color: #fe5630;
    }
  }
}

.tips {
  padding: 10px;
}

// 弹层的样式
.product {
  .product-title {
    display: flex;
    .left {
      img {
        width: 90px;
        height: 90px;
      }
      margin: 10px;
    }
    .right {
      flex: 1;
      padding: 10px;
      .price {
        font-size: 14px;
        color: #fe560a;
        .nowprice {
          font-size: 24px;
          margin: 0 5px;
        }
      }
    }
  }

  .num-box {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    align-items: center;
  }

  .btn, .btn-none {
    height: 40px;
    line-height: 40px;
    margin: 20px;
    border-radius: 20px;
    text-align: center;
    color: rgb(255, 255, 255);
    background-color: rgb(255, 148, 2);
  }
  .btn.now {
    background-color: #fe5630;
  }
  .btn-none {
    background-color: #cccccc;
  }
}

.footer .icon-cart {
  position: relative;
  padding: 0 6px;
  .num {
    z-index: 999;
    position: absolute;
    top: -2px;
    right: 0;
    min-width: 16px;
    padding: 0 4px;
    color: #fff;
    text-align: center;
    background-color: #ee0a24;
    border-radius: 50%;
  }
}
</style>
