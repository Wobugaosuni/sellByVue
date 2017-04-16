<template>
  <div role="page:goods">
    <div class="menus-wrapper" ref="menusWrapper">
      <ul class="menus">
        <li v-for="(item, index) in goods" class="menu border-1px" :class="{'current': currentIndex === index}" @click="onCurrentMenuClick(index, $event)">
          <span class="text">
            <span v-if="item.type > 0" :class="'icon ' + menusIconMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="item in goods" class="foods-list-hook">
          <h3 class="title">{{item.name}}</h3>
          <ul>
            <li v-for="food in item.foods" class="food-wrapper border-1px">
              <div class="food-image">
                <img :src="food.image" width="58" height="58" />
              </div>
              <div class="food-info">
                <p class="food-name">{{food.name}}</p>
                <p class="food-description">{{food.description}}</p>
                <div class="food-sales">
                  <span>月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price-count-wrapper">
                  <div class="food-price">
                    <span class="new-price">￥{{food.price}}</span>
                    <span class="old-price" v-show="food.oldPrice.length > 0">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cart-control-wrapper">
                    <cart-control :food="food" v-on:addToCart="addFood"></cart-control>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart :seller="seller" :selectFoods="selectFoods" ref="shopcart"></shopcart>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
import shopcart from '../../components/shopcart/shopcart';
import cartControl from '../cart-control/cart-control';
import Vue from 'vue';

export default {
  data () {
    return {
      goods: [],
      foodsHeight: [],
      scrollY: 0
    };
  },

  props: {
    seller: {
      type: Object
    }
  },

  components: {
    shopcart,
    'cart-control': cartControl
  },

  beforeCreate () {
    // console.log('goodsbeforeCreate');
    // debugger;
  },

  computed: {
    // 将滚动的位置与左边的索引做映射
    currentIndex: function () {
      let foodsHeight = this.foodsHeight;
      let scrollY = this.scrollY;
      for (let i = 0; i < foodsHeight.length; i++) {
        let height1 = foodsHeight[i];
        let height2 = foodsHeight[i + 1];
        // 当遍历到最后一个元素时，height2为undefined，所以需要做判断
        if (!height2 || scrollY < height2 && scrollY >= height1) {
          return i;
        }
      }
      // 当没有滚动时，当前索引为0
      return 0;
    },

    selectFoods: function () {
      let foods = [];
      this.goods.map(good => {
        good.foods.map(food => {
          if (food.count) {
            foods.push(food);
          }
        });
      });
      return foods;
    }
  },

  created () {
    // ajax异步请求，获取goods数据
    this.axios.get('/api/goods').then((response) => {
      this.goods = response.data.data;

      this.goods.map(good => {
        good.foods.map(food => {
          // 给对象添加新属性，vue是不能检测到变化的
          // 需要用Vue.set()接口来新增属性，检测属性的变化
          Vue.set(food, 'count', 0);
        });
      });
      // console.log('goods', this.goods);

      // 由于数据获取是异步的，到此处虽然数据回来了，但DOM还没更新
      // 利用vue提供的接口，将回调延迟到DOM更新之后执行
      // 备注：操作原生DOM时，都可以使用$nextTick这个接口
      this.$nextTick(() => {
        // DOM现在更新了，执行回调，可滚动
        this.initScroll();
        // 执行回调，计算每一类商品的高度
        this.calculateHeight();
      });
      // console.log(this.goods);
    });
    this.menusIconMap = ['discount', 'decrease', 'special'];
  },

  methods: {
    initScroll: function () {
      let menusWrapper = this.$refs.menusWrapper;
      let foodsWrapper = this.$refs.foodsWrapper;
      /* eslint-disable no-new */
      // 暴露为全局的
      this.menusScroll = new BScroll(menusWrapper, {
        // 插件会阻止掉默认事件（我们定义的），设为true让它不阻止
        click: true
      });

      this.foodsScroll = new BScroll(foodsWrapper, {
        click: true,
        // 滚动时实时派发scroll事件，监听滚动的位置，接收位置的参数，如下的onscroll
        probeType: 3
      });

      // 当滚动时，把滚动的实时位置暴露出来
      this.foodsScroll.on('scroll', (position) => {
        this.scrollY = Math.abs(Math.round(position.y));
      });
    },

    calculateHeight: function () {
      // 第一类的高度为0，所以0作为数组的第一个元素
      this.foodsHeight.push(0);
      let foodsList = document.getElementsByClassName('foods-list-hook');
      let height = 0;
      for (let i = 0; i < foodsList.length; i++) {
        height += foodsList[i].clientHeight;
        this.foodsHeight.push(height);
      }
    },

    onCurrentMenuClick: function (index, event) {
      // 在点击时，手机端模拟器派发一次点击，但PC端派发两次
      // 解决方法，传进event，通过event._constructed（插件自带的属性）是否为true来判断是否原生。如果是原生，return，不执行下面的语句
      if (!event._constructed) {
        return;
      }
      let foodsList = document.getElementsByClassName('foods-list-hook');
      // 将点击时对应的右侧元素拿到，利用scrollToElement这个接口实现滚动
      this.foodsScroll.scrollToElement(foodsList[index], 300);
      // console.log('menu click index', index);
      // debugger;
    },

    addFood: function (target, currentFood) {
      // 触发shopcart的drop方法，并把值传进去
      this.$refs.shopcart.drop(target, currentFood);
    }
  },
  beforeMount () {
    // console.log('goodsbeforeMount');
    // debugger;
  },
  mounted () {
    // console.log('goodsmounted');
    // debugger;
  },
  beforeUpdate () {
    // console.log('goodsbeforeUpdate');
    // debugger;
  },
  updated () {
    // console.log('goodsupdated');
    // debugger;
  },
  activated () {
    // console.log('goodsactivated');
    // debugger;
  },
  beforeDestroy () {
    // console.log('goodsbeforeDestroy');
    // debugger;
  },
  destroyed () {
    // console.log('goodsdestroyed');
    // debugger;
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin.styl";
@import "./goods.styl";
</style>
