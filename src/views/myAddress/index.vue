<template>
  <div class="address">
    <van-nav-bar
      title="收货地址"
      left-text="返回"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <!-- 收货地址列表 -->
    <div class="addressList" v-for="item in addressList" :key="item.address_id">
      <div class="addressDetail">
        <span>{{ item.name }} {{ item.phone }}</span
        ><br />
        <span
          >{{ item.region.province }} {{ item.region.city }}
          {{ item.region.region }} {{ item.detail }}</span
        >
      </div>
      <div class="addressHandle">
        <div class="left">
          <van-radio-group v-model="radio">
            <van-radio :name="item" icon-size="20px" checked-color="red"
              >默认地址</van-radio
            >
          </van-radio-group>
        </div>
        <div class="right">
          <label @click="handleEdit"> <van-icon name="edit" /> 编辑</label>
          <label @click="handleDelete">
            <van-icon name="delete" style="margin-left: 5px" /> 删除</label
          >
        </div>
      </div>
    </div>
    <div class="addAddress">
      <van-button
        type="primary"
        class="addButton"
        @click="$router.push('/address/add')"
        >添加新地址</van-button
      >
    </div>
  </div>
</template>

<script>
import { getAddress } from "@/api/address";
export default {
  name: "myAddress",
  components: {},
  data() {
    return {
      addressList: [],
      radio: 3,
    };
  },
  async created() {
    let {
      data: { list },
    } = await getAddress();
    this.addressList = list;
  },
  methods: {
    handleEdit() {
      //   console.log(1);
    },
    handleDelete() {},
  },
};
</script>

<style lang="less" scoped>
.address {
  background-color: #f5f5f5;
  min-height: 100vh;
  margin-bottom: 60px;
}

.addressList {
  margin: 15px;
  padding: 5px;
  height: 110px;
  font-size: 14px;
  width: 94%;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);
  border-radius: 5px;
  background-color: #fff;
  color: #4c4c4c;
  .addressDetail {
    border-bottom: 1px solid #ccc;
    margin: 10px;
    padding-bottom: 5px;
    span {
      padding: 5px;
    }
  }
  .addressHandle {
    .left {
      float: left;
      height: 15px;
    }
    .right {
      float: right;
      height: 15px;
      margin-right: 10px;
    }
  }
}
.addAddress {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 50px;
  width: 100%;
  .addButton {
    width: 90%;
    margin: 0 5%;
    background: linear-gradient(to right, red, rgb(234, 137, 155));
    border-radius: 100px;
  }
}
</style>
