<template>
  <div class="search">
    <van-nav-bar
      fixed
      title="商品列表"
      left-arrow
      @click-left="$router.go(-1)"
    />

    <van-search
      readonly
      shape="round"
      background="#ffffff"
      :value="seachQuery || '请搜索商品'"
      show-action
      @click="$router.push('/search')"
    >
      <template #action>
        <van-icon class="tool" name="apps-o" />
      </template>
    </van-search>
    <!-- 排序选项按钮 -->

    <van-tabs @click="getSortord">
      <van-tab title="综合">
        <div class="goods-list">
          <goodsItem :proList="proList"></goodsItem></div
      ></van-tab>

      <van-tab title="销量">
        <div class="goods-list">
          <goodsItem :proList="proList"></goodsItem></div
      ></van-tab>

      <van-tab title="价格">
        <div class="goods-list">
          <goodsItem :proList="proList"></goodsItem>
        </div>
        <template #title
          >价格<van-icon
            name="arrow-up"
            ref="goods_search_price_height" /><van-icon
            name="arrow-down"
            ref="goods_search_price_low" /></template
      ></van-tab>
    </van-tabs>
  </div>
</template>

<script>
import goodsItem from "@/components/goodItems.vue";
import {
  getSeachGoodsSales,
  getSeachGoodsComprehensive,
  getSeachGoodsPriceHeight,
  getSeachGoodsPriceLow,
} from "@/api/search.js";
export default {
  name: "Search-list",
  components: {
    goodsItem,
  },
  async created() {
    let {
      data: {
        list: { data },
      },
    } = await getSeachGoodsComprehensive(this.params);
    this.proList = data;
  },
  computed: {
    seachQuery() {
      return this.$route.query.search;
    },
  },
  methods: {
    async getSortord(name, title) {
      if (title === "综合") {
        let {
          data: {
            list: { data },
          },
        } = await getSeachGoodsComprehensive(this.params);
        this.proList = data;
        return;
      } else if (title === "销量") {
        let {
          data: {
            list: { data },
          },
        } = await getSeachGoodsSales(this.params);
        this.proList = data;
        return;
      } else {
        if (
          this.$refs.goods_search_price_height.classList.value.includes(
            "toRed"
          ) == false &&
          this.$refs.goods_search_price_low.classList.value.includes("toRed") ==
            false
        ) {
          this.$refs.goods_search_price_height.classList.add("toRed");
          let {
            data: {
              list: { data },
            },
          } = await getSeachGoodsPriceHeight(this.params);
          this.proList = data;
          return;
        } else {
          if (
            this.$refs.goods_search_price_height.classList.value.includes(
              "toRed"
            ) == true
          ) {
            this.$refs.goods_search_price_height.classList.remove("toRed");
            this.$refs.goods_search_price_low.classList.add("toRed");
            let {
              data: {
                list: { data },
              },
            } = await getSeachGoodsPriceLow(this.params);
            this.proList = data;
            return;
          } else {
            this.$refs.goods_search_price_low.classList.remove("toRed");
            this.$refs.goods_search_price_height.classList.add("toRed");
            let {
              data: {
                list: { data },
              },
            } = await getSeachGoodsPriceHeight(this.params);
            this.proList = data;
            return;
          }
        }
      }
    },
  },
  data() {
    return {
      params: {
        categoryId: this.$route.query.categoryId,
        goodsName: this.$route.query.search,
        page: 1,
      },

      proList: [],
    };
  },
};
</script>

<style lang="less" scoped>
.search {
  padding-top: 46px;
  ::v-deep .van-icon-arrow-left {
    color: #333;
  }
  .tool {
    font-size: 24px;
    height: 40px;
    line-height: 40px;
  }
}
.toRed {
  color: red;
}
// 商品样式
.goods-list {
  background-color: #f6f6f6;
}
</style>
