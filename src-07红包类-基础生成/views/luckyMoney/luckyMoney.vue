<template>
  <div class="page-container">
    <van-button type="info" size="large" @click="showCountdownMask">开启倒计时</van-button>
    <van-button type="info" size="large" @click="showRewardMask">开启最终奖励</van-button>
    <!--  红包活动容器-->
    <div class="lucky-money-container" ref="luckyMoneyContainerRef"></div>
    <!--  倒计时遮罩层-->
    <countdown-mask ref="countdownMaskRef" :countdown="countdown"
                    :countDownFinishCallback="countDownFinishCallback"></countdown-mask>
    <!--    最终奖励遮罩层-->
    <reward-mask ref="rewardMaskRef" :closeCallback="closeRewardMaskCallback"
                 :luckyMoneyKey="luckyMoneyKey"></reward-mask>

  </div>
</template>
<script>
import CountdownMask from '@/views/luckyMoney/components/countdownMask.vue'
import rewardMask from '@/views/luckyMoney/components/rewardMask.vue'
import LuckyMoneyClass from '@/views/luckyMoney/components/luckyMoneyClass'

export default {
  name: 'luckyMoneyPage',
  components: {
    CountdownMask,
    rewardMask,
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
    //#region <创建红包相关>
    // 创建红包
    createLuckyMoney () {
      this.$refs.luckyMoneyContainerRef && new LuckyMoneyClass({
        parent: this.$refs.luckyMoneyContainerRef,
        clickCallback: () => {
          console.log('clickCallback',1)
        },
      })
      this.$refs.luckyMoneyContainerRef && new LuckyMoneyClass({
        parent: this.$refs.luckyMoneyContainerRef,
        clickCallback: () => {
          console.log('clickCallback',2)
        },
      })
    },
    //#endregion

  },
  mounted () {
    this.createLuckyMoney()
  },
}

</script>

<style scoped lang="scss">
.page-container {
  width: 100vw;
  height: 100vh;
  background: #fff;
}

.lucky-money-container {
  //position: fixed;
  position: relative;
  top: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  /*红包雨背景颜色，渐变，微透明*/
  background: linear-gradient(180deg, rgba(255, 215, 0, 1) 0%, rgba(255, 165, 0, 1) 100%);
}

.notice-swipe {
  height: 40px;
  line-height: 40px;
}
</style>
