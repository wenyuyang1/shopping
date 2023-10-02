<template>
  <div class="addressAdd">
    <van-nav-bar
      title="编辑收货地址"
      left-text="返回"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <div class="title">收货地址</div>
    <van-form @submit="onSubmit" class="addressForm">
      <!-- 姓名 -->
      <van-field
        v-model="name"
        name="姓名"
        label="姓名"
        placeholder="请输入收货人姓名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <!-- 手机号 -->
      <van-field
        v-model="phone"
        name="pattern "
        label="手机"
        placeholder="请输入收货人手机号"
        :rules="[{ pattern, message: '请填写正确的手机号' }]"
      />
      <!-- 地区选择 -->
      <van-field
        readonly
        clickable
        name="area"
        :value="address"
        label="地区"
        placeholder="点击选择省市区"
        :rules="[{ required: true, message: '请输入省市区' }]"
        @click="showArea = true"
      />
      <van-popup v-model="showArea" position="bottom">
        <van-area
          :area-list="areaList"
          @confirm="onConfirm"
          @cancel="showArea = false"
        />
      </van-popup>
      <!-- 详细地址 -->
      <van-field
        v-model="addressDetail"
        name="addressDetail"
        label="详细地址"
        placeholder="街道门牌、楼层等详细"
        :rules="[{ required: true, message: '请输入详细地址' }]"
      />
      <!-- 提交按钮 -->
      <div style="margin: 16px">
        <van-button
          round
          block
          color="linear-gradient(to left, #ff9000, #ff5000)"
          @click="onSubmit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { areaList } from "@vant/area-data";
import { addAddress } from "@/api/address";
export default {
  name: "addressAdd",
  components: {},
  data() {
    return {
      address: "",
      addressDetail: "",
      showArea: false,
      areaList,
      name: "",
      phone: "",
      pattern: /^1[3-9][0-9]{9}$/,
    };
  },
  methods: {
    // 拼接地址
    onConfirm(values) {
      this.address = values
        .filter((item) => !!item)
        .map((item) => item.name)
        .join("/");
      this.showArea = false;
    },
    async onSubmit() {
      let [v1, v2, v3] = this.address.split("/");
      let res = await addAddress(
        this.addressDetail,
        this.name,
        this.phone,
        v1,
        v2,
        v3
      );
      console.log(res);
    },
  },
};
</script>

<style lang="less" scoped>
.addressAdd {
  min-height: 100vh;
  background-color: #f5f5f5;
}
.title {
  height: 35px;
  width: 100%;
  color: #4c4c4c;
  position: relative;
  top: 10px;
  left: 7px;
}
.addressForm {
  margin: 0 2vw;
}
</style>
