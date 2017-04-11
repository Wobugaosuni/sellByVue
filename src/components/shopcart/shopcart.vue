<template>
  <div role="component:shopcart">
    <div class="content-wrapper">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo-content" :class="{'cart-highlight': totalCount}">
            <i class="icon-shopping_cart"></i>
          </div>
          <div class="count-wrapper" v-show="totalCount">{{totalCount}}</div>
        </div>
        <div class="price-wrapper" :class="{'cart-highlight': totalCount}">￥{{totalPrice}}</div>
        <div class="vertical-divider-wrapper">
          <div class="divider-content vertical-divider"></div>
        </div>
        <div class="goods-describe">另需配送费￥{{seller.deliveryPrice}}元</div>
      </div>
      <div class="content-right" :class="payClass">{{payDescribe}}</div>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>

  export default {
    data () {
      return {
      };
    },
    // prop验证
    props: {
      selectFoods: {
        type: Array,
        default () {
          return [{
            price: 11,
            count: 1
          }];
        }
      },
      seller: {
        type: Object
      }
    },
    components: {
    },
    computed: {
      // 总价格
      totalPrice () {
        let total = 0;
        this.selectFoods.forEach(food => {
          total += food.price * food.count;
        });
        return total;
      },
      totalCount () {
        let count = 0;
        this.selectFoods.forEach(food => {
          count += food.count;
        });
        return count;
      },
      payDescribe () {
        let minPrice = this.seller.minPrice;
        let totalPrice = this.totalPrice;
        if (totalPrice === 0) {
          return `￥${minPrice}元起送`;
        } else if (totalPrice < minPrice) {
          let diff = minPrice - totalPrice;
          return `还差￥${diff}元起送`;
        } else {
          return '去结算';
        }
      },
      payClass () {
        if (this.totalPrice < this.seller.minPrice) {
          return 'total-price-not-enough';
        } else {
          return 'total-price-enough';
        }
      }
    }
  };
</script>

<style lang='stylus' rel='stylesheet/stylus'>
@import './shopcart.styl';

</style>
