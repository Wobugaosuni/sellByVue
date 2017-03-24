<template>
  <div role="page:goods">
    <div class="goods">
      <div class="menus-wrapper">
        <ul class="menus">
          <li v-for="item in goods" class="menu border-1px">
            <span class="text">
              <span v-if="item.type > 0" :class="'icon ' + menusIconMap[item.type]"></span>{{item.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper">
        <ul>
          <li v-for="item in goods">
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
                  <div class="food-price">
                    <span class="new-price">￥{{food.price}}</span>
                    <span class="old-price" v-show="food.oldPrice.length > 0">￥{{food.oldPrice}}</span>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      goods: []
    };
  },
  beforeCreate () {
    // console.log('goodsbeforeCreate');
    // debugger;
  },
  created () {
    // console.log('goodscreated');
    // debugger;
    // ajax异步请求，获取goods数据
    this.axios.get('/api/goods').then((response) => {
      this.goods = response.data.data;
      console.log(this.goods);
    });
    this.menusIconMap = ['discount', 'decrease', 'special'];
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
