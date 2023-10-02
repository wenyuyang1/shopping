<template>
  <div>
    <div class="cart" v-if="cartTotal">
      <van-nav-bar title="购物车" fixed />
      <!-- 购物车开头 -->
      <div class="cart-title">
        <span class="all"
          >总共<i>{{ cartTotal }}</i
          >件商品</span
        >
        <span v-if="!isEdit" class="edit" @click="isEdit = !isEdit">
          <van-icon name="edit" />
          编辑
        </span>
        <span v-else class="edit" @click="isEdit = !isEdit">取消</span>
      </div>

      <!-- 购物车列表 -->
      <div class="cart-list">
        <div class="cart-item" v-for="item in cartList" :key="item.goods_id">
          <van-checkbox
            :value="item.checked"
            @click="changeGoodChecked(item.goods_id)"
          ></van-checkbox>
          <div class="show">
            <img
              :src="item.goods.goods_image"
              alt=""
              @click="$router.push(`/prodetail/${item.goods_id}`)"
            />
          </div>
          <div class="info">
            <span
              class="tit text-ellipsis-2"
              @click="$router.push(`/prodetail/${item.goods_id}`)"
              >{{ item.goods.goods_name }}</span
            >
            <span class="bottom">
              <div class="price">
                ¥ <span>{{ item.goods.goods_price_min }}</span>
              </div>
              <div class="count-box">
                <countBox
                  :value="item.goods_num"
                  @input="
                    (val) =>
                      changeGoodNumber(item.goods_id, val, item.goods_sku_id)
                  "
                ></countBox>
              </div>
            </span>
          </div>
        </div>
      </div>

      <div class="footer-fixed">
        <div class="all-check" @click="toggleAllGoodChecked">
          <van-checkbox icon-size="18" :value="isCartCheckedAll"></van-checkbox>
          全选
        </div>

        <div class="all-total">
          <div class="price">
            <span>合计：</span>
            <span
              >¥ <i class="totalPrice">{{ cartCheckedTotal }}</i></span
            >
          </div>
          <van-button
            v-if="isEdit"
            type="warning"
            round
            hairline
            color="#fa2209"
            :disabled="cartCheckedNum == 0 ? true : false"
            @click="deleteCartGoods"
            >删除({{ cartCheckedNum }})</van-button
          >
          <van-button
            v-else
            type="warning"
            round
            hairline
            color="#fa2209"
            @click="goPay"
            :disabled="cartCheckedNum == 0 ? true : false"
            >结算({{ cartCheckedNum }})</van-button
          >
        </div>
      </div>
    </div>
    <div v-else>
      <div class="cart-box" v-if="cartList.length > 0">
        <!-- 购物车开头 -->
        <div class="cart-title">...</div>
        <!-- 购物车列表 -->
        <div class="cart-list">...</div>
        <div class="footer-fixed">...</div>
      </div>

      <div class="empty-cart" v-else>
        <img src="@/assets/empty.png" alt="" />
        <div class="tips">您的购物车是空的, 快去逛逛吧</div>
        <div class="btn" @click="$router.push('/')">去逛逛</div>
      </div>
    </div>
  </div>
</template>

<script>
import countBox from "@/components/countBox.vue";
import { mapGetters, mapState } from "vuex";
import store from "@/store";
import hasToken from "@/mixins/hasToken";
export default {
  name: "CartPage",
  data() {
    return {
      isEdit: false,
    };
  },
  components: {
    countBox,
  },
  computed: {
    ...mapState("cart", ["cartList", "cartTotal"]),
    ...mapGetters("cart", [
      "cartCheckedList",
      "cartCheckedNum",
      "cartCheckedTotal",
      "isCartCheckedAll",
    ]),
  },
  mixins: [hasToken],
  created() {
    if (!this.hasToken()) {
      this.$store.dispatch("cart/getCartList");
    }
  },
  methods: {
    // 全选框逻辑  通过取反并判断isCartCheckedAll的值来修改所有购物车商品的checked状态
    toggleAllGoodChecked() {
      store.commit("cart/toggleAllGoodsChecked", !this.isCartCheckedAll);
    },
    // 选择框逻辑
    changeGoodChecked(id) {
      store.commit("cart/toggleGoodChecked", id);
    },
    // 数量加减逻辑
    changeGoodNumber(goodId, number, skuId) {
      store.dispatch("cart/changeGoodNumberAction", { goodId, number, skuId });
    },
    // 删除购物车商品逻辑
    deleteCartGoods() {
      this.$dialog
        .confirm({
          message: "确认删除选中的所有商品吗？",
        })
        .then(() => {
          store.dispatch("cart/deleteCartGoodsActions");
          this.isEdit = false;
        })
        .catch(() => {
          this.$dialog.close();
        });
    },
    goPay() {
      this.$router.push({
        path: "/pay",
        query: {
          mode: "cart",
          cartIds: this.cartCheckedList.map((item) => item.id).join(","),
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
// 主题 padding
.cart {
  padding-top: 46px;
  padding-bottom: 100px;
  background-color: #f5f5f5;
  min-height: 100vh;
  .cart-title {
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    font-size: 14px;
    .all {
      i {
        font-style: normal;
        margin: 0 2px;
        color: #fa2209;
        font-size: 16px;
      }
    }
    .edit {
      .van-icon {
        font-size: 18px;
      }
    }
  }

  .cart-item {
    margin: 0 10px 10px 10px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    background-color: #ffffff;
    border-radius: 5px;

    .show img {
      width: 87px;
      height: 87px;
    }
    .info {
      width: 210px;
      padding: 10px 5px;
      font-size: 14px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .bottom {
        display: flex;
        justify-content: space-between;
        .price {
          display: flex;
          align-items: flex-end;
          color: #fa2209;
          font-size: 12px;
          span {
            font-size: 16px;
          }
        }
      }
    }
  }
}

.footer-fixed {
  position: fixed;
  left: 0;
  bottom: 50px;
  height: 50px;
  width: 100%;
  border-bottom: 1px solid #ccc;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;

  .all-check {
    display: flex;
    align-items: center;
    .van-checkbox {
      margin-right: 5px;
    }
  }

  .all-total {
    display: flex;
    line-height: 36px;
    .price {
      font-size: 14px;
      margin-right: 10px;
      .totalPrice {
        color: #fa2209;
        font-size: 18px;
        font-style: normal;
      }
    }
  }
}
.empty-cart {
  padding: 80px 30px;
  img {
    width: 140px;
    height: 92px;
    display: block;
    margin: 0 auto;
  }
  .tips {
    text-align: center;
    color: #666;
    margin: 30px;
  }
  .btn {
    width: 110px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    background-color: #fa2c20;
    border-radius: 16px;
    color: #fff;
    display: block;
    margin: 0 auto;
  }
}
</style>
