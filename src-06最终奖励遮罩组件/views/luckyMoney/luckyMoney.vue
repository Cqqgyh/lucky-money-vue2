<template>
  <div class="page-container">
    <van-button type="info" size="large" @click="showCountdownMask">开启倒计时</van-button>
    <van-button type="info" size="large" @click="showRewardMask">开启最终奖励</van-button>
    <!--  倒计时遮罩层-->
    <countdown-mask ref="countdownMaskRef" :countdown="countdown"
                    :countDownFinishCallback="countDownFinishCallback"></countdown-mask>
    <!--    最终奖励遮罩层-->
    <reward-mask ref="rewardMaskRef" :closeCallback="closeRewardMaskCallback" :luckyMoneyKey="luckyMoneyKey"></reward-mask>

  </div>
</template>
<script>
import CountdownMask from '@/views/luckyMoney/components/countdownMask.vue'
import rewardMask from '@/views/luckyMoney/components/rewardMask.vue'

export default {
  name: 'luckyMoneyPage',
  components: {
    CountdownMask,
    rewardMask
  },
  data () {
    return {
      // 倒计时
      countdown: 3000,
      // 本次红包活动的唯一key值
      luckyMoneyKey: '123',
    }
  },
  methods: {
    //#region <倒计时相关方法>
    //开启倒计时遮罩层
    showCountdownMask () {
      this.$refs.countdownMaskRef.show()
    },
    //倒计时结束callback
    countDownFinishCallback () {
      console.log('countDownFinishCallback')
    },
    //#endregion
    //#region <最终红包奖励相关方法>
    // 开启最终奖励遮罩层
    showRewardMask () {
      this.$refs.rewardMaskRef.show()
    },
    // 关闭遮罩回调
    closeRewardMaskCallback () {
      console.log('closeLuckyMoneyMask')
    },
    //#endregion

  },
}

</script>

<style scoped lang="scss">
.page-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 20vh;
}
</style>
