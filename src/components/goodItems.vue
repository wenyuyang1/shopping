<template>
  <div>
    <div
      class="goodItem"
      v-show="item.goods_id"
      @click="$router.push(`/prodetail/${item.goods_id}`)"
      v-for="item in proList"
      :key="item.goodS_id"
    >
      <div class="left">
        <img :src="item.goods_image" alt="" />
      </div>
      <div class="right">
        <p>{{ item.goods_name }}</p>
        <div class="count">已售 {{ item.goods_sales }} 件</div>
        <div class="price">
          <div class="new">￥{{ item.goods_price_max }}</div>
          <div class="old">￥{{ item.goods_price_min }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "goodItem",
  props: { proList: { type: Array, default: () => [] } },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.goodItem {
  height: 148px;
  width: 100vw;
  margin-bottom: 6px;
  padding: 10px;
  background-color: #fff;
  display: flex;
  .left {
    width: 127px;
    img {
      display: block;
      height: 100%;
      width: 127px;
    }
  }
  .right {
    flex: 1;
    font-size: 14px;
    line-height: 1.3;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

    .count {
      color: #999;
      font-size: 12px;
    }
    .price {
      color: #999;
      font-size: 16px;
      .new {
        color: #f03c3c;
        margin-right: 10px;
      }
      .old {
        text-decoration: line-through;
        font-size: 12px;
      }
    }
  }
}
.goodItem:last-child {
  margin-bottom: 70px;
}
</style>
