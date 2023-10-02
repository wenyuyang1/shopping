import Vue from "vue";
import store from "@/store";
import VueRouter, { RouteConfig } from "vue-router";

// 首页常访问同步组件
import Layout from "@/views/layout/index.vue";
import Home from "@/views/layout/home.vue";
import categroy from "@/views/layout/categroy.vue";
import myDetail from "@/views/layout/myDetail.vue";
import shoppingCar from "@/views/layout/shoppingCart.vue";


// 异步组件加载
const Search = () => import("@/views/search/index.vue");
const SearchList = () => import("@/views/search/list.vue");
const ProDetail = () => import("@/views/prodetail/index.vue");
const Login = () => import("@/views/login/index.vue");
const Pay = () => import("@/views/pay/index.vue");
const MyOrder = () => import("@/views/myOrder/index.vue");
const MyAddress = () => import("@/views/myAddress/index.vue");
const MyAddressAdd = () => import("@/views/myAddress/add.vue");


Vue.use(VueRouter);
// vue2的路由不能和vue3一样用
const routes: Array<RouteConfig> = [
  {
    path: "/",
    redirect: "/home",
    component: Layout,
    children: [

      { path: 'home', component: Home },
      { path: 'categroy', component: categroy },
      { path: 'myDetail', component: myDetail },
      { path: 'shoppingCar', component: shoppingCar }
    ]
  },
  {
    path: "/login",
    component: Login,
  },

  {
    path: "/search",
    component: Search,
  },
  {
    path: "/searchlist",
    component: SearchList,
  },
  {
    path: "/prodetail/:id",
    component: ProDetail,
  },
  {
    path: "/address",
    component: MyAddress,
  },
  {
    path: "/address/add",
    component: MyAddressAdd,
  },
  {
    path: "/pay",
    component: Pay,
  },
  {
    path: "/myorder",
    component: MyOrder,
  },
];

const router = new VueRouter({
  routes,
});

// 设置一个权限数组来管理需要拦截的特殊权限路由
const authURLs = ['/pay', '/myorder']
// to和from里的fullpath包含路径的query和params参数，而path只包含path路径
router.beforeEach(
  (to, from, next) => {
    if (!authURLs.includes(to.path)) {
      next()
      return
    }
    let token = store.getters.token
    if (token) {
      next()
    } else {
      next('/login')
    }

  }
)
export default router;
