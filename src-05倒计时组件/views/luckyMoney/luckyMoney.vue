<template>
  <div class="page-container">
    <van-button type="info" size="large" @click="showCountdownMask">开启倒计时</van-button>
    <!--  倒计时遮罩层-->
    <countdown-mask ref="countdownMaskRef" :countdown="countdown"
                    :countDownFinishCallback="countDownFinishCallback"></countdown-mask>
  </div>
</template>
<script>
import CountdownMask from '@/views/luckyMoney/components/countdownMask.vue'

export default {
  name: 'luckyMoneyPage',
  components: {
    CountdownMask,
  },
  data () {
    return {
      // 倒计时
      countdown: 3000,
    }
  },
  methods: {
    //开启倒计时遮罩层
    showCountdownMask () {
      this.$refs.countdownMaskRef.show()
    },
    //倒计时结束callback
    countDownFinishCallback () {
      console.log('countDownFinishCallback')
    },
  },
}

</script>

<style scoped lang="scss">
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 26vh;
}
</style>
