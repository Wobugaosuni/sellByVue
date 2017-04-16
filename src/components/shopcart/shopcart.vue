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
    <div class="balls-wrapper" v-for="ball in balls">
      <transition name="ball"
        @before-enter="beforeBallEnter"
        @enter="ballEnter"
        @after-enter="afterBallEnter"
      >
        <div v-show="ball.isShow" class="ball-content">
          <div class="ball-inner inner-hook"></div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>

  export default {
    data () {
      return {
        balls: [
          {
            isShow: false
          },
          {
            isShow: false
          },
          {
            isShow: false
          },
          {
            isShow: false
          },
          {
            isShow: false
          }
        ]
      };
    },

    // prop验证
    props: {
      selectFoods: {
        type: Array,
        default () {
          return [{
            // price: 11,
            // count: 1
          }];
        }
      },
      seller: {
        type: Object
      }
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

      // 总数量
      totalCount () {
        let count = 0;
        this.selectFoods.forEach(food => {
          count += food.count;
        });
        return count;
      },

      // 付款描述
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
    },

    methods: {
      drop: function (target, currentFood) {
        let balls = this.balls;

        for (let i = 0; i < balls.length; i++) {
          if (!balls[i].isShow) {
            balls[i].isShow = true;
            balls[i].element = target;
            balls[i].currentFood = currentFood;
            // this.dropBalls.push(balls[i]);
            console.log('balls[i]', balls[i]);
            return;
          };
        };
      },

      beforeBallEnter: function (el) {
        // console.log('el', el);
        let count = this.balls.length;
        while (count--) {
          let ball = this.balls[count];
          if (ball.isShow) {
            // 获取相对于屏幕的top和left
            let rect = ball.element.getBoundingClientRect();
            let x = rect.left - 34;
            let y = -(window.innerHeight - rect.top - 29);
            // 取到第一个元素做x轴的动画
            let innerBall = el.getElementsByClassName('inner-hook')[0];
            innerBall.style.backgroundImage = `url(${ball.currentFood.image})`;

            el.style.display = '';

            el.style.transform = `translate3d(0, ${y}px, 0)`;
            innerBall.style.transform = `translate3d(${x}px, 0, 0)`;
          }
        }
      },

      ballEnter: function (el, done) {
        /* eslint-disable no-unused-vars */
        let hook = el.offsetHeight;
        let innerBall = el.getElementsByClassName('inner-hook')[0];

        el.style.transform = 'translate3d(0, 0, 0)';
        innerBall.style.transform = 'translate3d(0, 0, 0)';
        // innerBall.style.width = 0;
        // innerBall.style.height = 0;
        done();
      },

      afterBallEnter: function (el) {
        let balls = this.balls;

        balls.map(ball => {
          if (ball.isShow) {
            ball.isShow = false;
          }
        });
      }
    }
  };
</script>

<style lang='stylus' rel='stylesheet/stylus'>
@import './shopcart.styl';

</style>
