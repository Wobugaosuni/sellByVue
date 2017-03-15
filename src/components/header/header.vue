<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
      <!-- src属性需要绑定(v-bind)，让数据成为动态的数据，否则会直接读成是一个路径 -->
        <img width='64' height='64' :src="seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <!-- 加v-if判断，避免空指针异常。因为获取数据是异步的过程，开始初始化seller是一个空对象。将seller传给component header时就是一个空对象 -->
        <div class="support" v-if="seller.supports">
          <span :class="'icon ' + bgImageMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div class="support-count" v-on:click="onDetailShowClick">
        <span class="count" v-if="seller.supports">
          {{seller.supports.length}}个
        </span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="onDetailShowClick">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background" :style="'background-image: url(' + seller.avatar +')'"></div>

    <transition name="detail-transition">
      <div class="detail" v-show="detailShow">
        <div class="detail-wrapper">
          <h3 class="name">
            {{seller.name}}
          </h3>
          <div class="star-wrapper">
            <star :score="seller.score" :size='48'></star>
          </div>
          <div class="title">
            <div class="line border-1px"></div>
            <div class="text">优惠信息</div>
            <div class="line border-1px"></div>
          </div>
          <ul class="supports" v-if="seller.supports">
            <li v-for="item in seller.supports" class="support-item">
              <span :class="'icon ' + bgImageMap[item.type]"></span>
              <span class="text">{{item.description}}</span>
            </li>
          </ul>
          <div class="title">
            <div class="line border-1px"></div>
            <div class="text">商家公告</div>
            <div class="line border-1px"></div>
          </div>
          <div class="bulletin-container">
            <p>
              {{seller.bulletin}}
            </p>
          </div>
        </div>
        <div class="footer-wrapper" v-on:click="onDetailHideClick">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type='text/ecmascript-6'>
import star from '../star/star';
export default {
  components: {
    star
  },
  props: ['seller'],
  data () {
    return {
      detailShow: false
    };
  },
  methods: {
    onDetailShowClick: function () {
      this.detailShow = true;
    },
    onDetailHideClick: function () {
      this.detailShow = false;
    }
  },
  created () {
    this.bgImageMap = ['discount', 'decrease', 'special', 'invoice', 'guarantee'];
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">

@import '../../common/stylus/mixin.styl';
@import 'header.styl';

</style>
