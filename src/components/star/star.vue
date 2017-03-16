<template>
  <div role="component:star">
    <div :class="'star ' + starType">
      <span v-for="itemClass in itemClasses" :class="'star-item ' + itemClass"></span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const LENGTH = 5;
  const CLS_ON = 'on';
  const CLS_OFF = 'off';
  const CLS_HALF = 'half';

  export default {
    props: ['size', 'score'],
    computed: {
      starType: function () {
        return 'star-' + this.size;
      },
      itemClasses () {
        let result = [];
        let score = Math.floor(this.score * 2) / 2;
        let integer = Math.floor(score);
        let hasDecimals = score % 1 !== 0;
        for (let i = 0; i < integer; i++) {
          result.push(CLS_ON);
        }
        if (hasDecimals) {
          result.push(CLS_HALF);
        }
        while (result.length < LENGTH) {
          result.push(CLS_OFF);
        }
        return result;
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin.styl';

// [role="component:star"]
  .star
    // font-size: 0
    text-align: center

    .star-item
      display: inline-block
      background-repeat: no-repeat

      &:last-child
        margin-right: 0

  &.star-24

    .star-item
      width: 10px
      height: 10px
      background-size: 10px 10px
      margin-right: 3px

      &.on
        bgImage('star24_on')

      &.half
        bgImage('star24_half')

      &.off
        bgImage('star24_off')

  &.star-36

    .star-item
      width: 15px
      height: 15px
      background-size: 15px 15px
      margin-right: 7px

      &.on
        bgImage('star36_on')

      &.half
        bgImage('star36_half')

      &.off
        bgImage('star36_off')

  &.star-48

    .star-item
      width: 20px
      height: 19px
      background-size: 20px 19px
      margin-right: 20px;

      &.on
        bgImage('star48_on')

      &.half
        bgImage('star48_half')

      &.off
        bgImage('star48_off')


</style>
