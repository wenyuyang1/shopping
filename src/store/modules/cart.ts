
let { getCartList, changeGoodCount, deleteGoods } = require('@/api/cart')
export default {
    namespaced: true,
    state() {
        return {
            cartList: [],
            cartTotal: 0
        }
    },
    mutations: {
        setCartList(state: any, cartList: any) {
            state.cartList = cartList;
        },
        setCartTotal(state: any, cartTotal: any) {
            state.cartTotal = cartTotal;
        },
        toggleGoodChecked(state: any, goodsId: any) {
            let good = state.cartList.find((item: any) => {
                // 小id不是Id，而且一定要return
                return item.goods_id == goodsId
            });
            good.checked = !good.checked;
        },
        toggleAllGoodsChecked(state: any, checked: any) {
            state.cartList.forEach((item: any) => {
                item.checked = checked;
            })
        },
        setGoodCount(state: any, obj: any) {
            let { goodId, number } = obj;
            let good = state.cartList.find((item: any) => {
                return item.goods_id == goodId
            })
            good.goods_num = number
        }

    },
    actions: {
        async getCartList(context: any) {
            let { data: { cartTotal, list } } = await getCartList();
            list.forEach((item: any) => {
                item.checked = true;
            });
            context.commit('setCartList', list);
            context.commit('setCartTotal', cartTotal);
        },
        async changeGoodNumberAction(context: any, obj: any) {
            let { goodId, number, skuId } = obj;

            context.commit('setGoodCount', { goodId, number });
            let res = await changeGoodCount(goodId, number, skuId);
            console.log(res);
        },
        async deleteCartGoodsActions(context: any) {
            let handleGoodsId = context.getters.cartCheckedList.map((item: any) => {
                return item.id;
            })
            await deleteGoods(handleGoodsId);
            context.dispatch('getCartList')
        }
    },
    getters: {
        // 购物车商品选中列表
        cartCheckedList(state: any) {
            return state.cartList.filter((item: any) => item.checked);
        },
        // 购物车商品选中数量
        cartCheckedNum(state: any, getters: any) {
            return getters.cartCheckedList.reduce((total: any, item: any) => {
                return total + item.goods_num;
            }, 0);
        },
        //购物车商品选中价格总数
        cartCheckedTotal(state: any, getters: any) {
            return getters.cartCheckedList.reduce((total: any, item: any) => {
                return total + item.goods.goods_price_min * item.goods_num;
            }, 0).toFixed(2);
        },
        // 全选框是否为全选状态判断
        isCartCheckedAll(state: any, getters: any) {
            return getters.cartCheckedList.length === state.cartList.length;
        }
    }
}

