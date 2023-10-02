<template>
  <div class="desktop">
    <router-view></router-view>
    <van-tabbar v-model="active">
      <van-tabbar-item replace to="/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/categroy" icon="apps-o"
        >分类</van-tabbar-item
      >
      <van-tabbar-item replace to="/shoppingCar" icon="shopping-cart-o"
        >购物车</van-tabbar-item
      >
      <van-tabbar-item replace to="/myDetail" icon="contact-o"
        >我的</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script lang="ts">
export default {
  name: "goods-desktop",
  components: {},
  data() {
    return {
      active: "",
    };
  },
  methods: {},
};
</script>

<style lang="less" scoped></style>
