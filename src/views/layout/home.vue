<template>
  <div class="home">
    <van-nav-bar title="智慧商城" class="title" />
    <van-search
      @click="$router.push('/search')"
      shape="round"
      background="#f5f5f5"
      placeholder="请输入搜索关键词"
    />
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(item, index) in bannerList" :key="index">
        <img v-lazy="item.imgUrl" class="swipe_img" />
      </van-swipe-item>
    </van-swipe>
    <van-grid square column-num="5">
      <van-grid-item
        v-for="item in navList"
        @click="$router.push(`/searchlist?search=${item.text}`)"
        :key="item.id"
        class="grid_item"
        :text="item.text"
        :icon="item.imgUrl"
      />
    </van-grid>
    <van-image width="100%" height="134" :src="bigImage" />

    <p class="divider_youlike">—— 猜你喜欢 ——</p>
    <goodItem :proList="proList"></goodItem>
  </div>
</template>

<script>
import goodItem from "@/components/goodItems.vue";
import { getGoods } from "@/api/home";
export default {
  name: "goods-home",
  components: { goodItem },
  async beforeCreate() {
    let {
      data: {
        pageData: { items },
      },
    } = await getGoods();
    this.bannerList = items[1].data;
    this.navList = items[3].data;
    this.proList = items[6].data;
    this.bigImage = items[4].data[0].imgUrl;
  },
  data() {
    return {
      bannerList: [],
      navList: [],
      proList: [],
      bigImage: "",
    };
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.title {
  background-color: #c21401;
}
.swipe_img {
  width: 375px;
  height: 149px;
}
.grid_item {
  height: 100px;
}
.divider_youlike {
  height: 40px;
  text-align: center;
  line-height: 40px;
}
</style>
