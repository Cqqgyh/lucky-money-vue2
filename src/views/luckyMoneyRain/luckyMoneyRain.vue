<template>
  <div class="page-container">
    <div>
      <van-button type="danger" size="large">
        <van-swipe
            vertical
            class="notice-swipe"
            :autoplay="2000"
            :touchable="false"
            :show-indicators="false"
        >
          <van-swipe-item>不要走开</van-swipe-item>
          <van-swipe-item>红包马上降临</van-swipe-item>
        </van-swipe>
      </van-button>
      <van-button type="info" size="large" @click="showRewardMask">展示上次获取的红包</van-button>
    </div>

    <!--  红包活动容器-->
    <div v-if="isShowLuckyMoneyMask" class="lucky-money-container" ref="luckyMoneyContainerRef"></div>
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
import { creatRedPacket, getRedPacket } from '@/api/luckyMoney'
import WebsocketClass from '@/views/luckyMoneyRain/components/websocketClass'

export default {
  name: 'luckyMoneyRainPage',
  components: {
    CountdownMask,
    rewardMask,
  },
  data () {
    return {
      // 持续时长
      duration: 5000,
      // 生成速率
      generationRate: 200,
      // 倒计时
      countdown: 3000,
      // 红包总金额
      luckyMoneyTotalMoney: 1000,
      // 有效红包个数
      luckyMoneyNumber: 100,
      // 本次红包活动的唯一key值
      luckyMoneyKey: '',
      // 控制是否显示红包容器
      isShowLuckyMoneyMask: false,
      //  websocket实例
      websocketInstance: null,
    }
  },
  methods: {
    //#region <展示红包相关>
    // 显示红包容器
    showLuckyMoneyMask () {
      this.isShowLuckyMoneyMask = true
    },
    // 关闭红包容器
    closeLuckyMoneyMask () {
      this.isShowLuckyMoneyMask = false
    },
    //#endregion

    //#region <倒计时相关方法>
    //开启倒计时遮罩层
    showCountdownMask () {
      // 显示倒计时遮罩层
      console.log('显示倒计时遮罩层')
      this.$refs.countdownMaskRef.show()
    },
    //倒计时结束callback
    countDownFinishCallback () {
      console.log('执行倒计时结束回调')
      // 倒计时结束后，显示红包容器
      this.showLuckyMoneyMask()
      //   开启创建红包
      this.createLuckyMoneyByInterval()
    },
    //#endregion

    //#region <最终红包奖励相关方法>
    // 开启最终奖励遮罩层
    showRewardMask () {
      this.luckyMoneyKey ? this.$refs.rewardMaskRef.show() : this.$toast('请先开启红包活动')
    },
    // 关闭遮罩回调
    closeRewardMaskCallback () {
      console.log('关闭遮罩回调')
      // 关闭红包容器
      this.closeLuckyMoneyMask()
    },
    //#endregion

    //#region <创建红包相关>
    // 创建红包
    createLuckyMoney () {
      this.$refs.luckyMoneyContainerRef && new LuckyMoneyClass({
        parent: this.$refs.luckyMoneyContainerRef,
        clickCallback: this.clickLuckyMoneyCallback,
      })
    },
    // 手动创建本次红包活动：为了获取红包活动的唯一key值
    async createLuckyMoneyActive () {
      const res = await creatRedPacket(
          this.luckyMoneyTotalMoney,
          this.luckyMoneyNumber,
      )
      this.luckyMoneyKey = res.data
    },
    // 重置红包活动数据
    resetLuckyMoneyActiveData () {
      this.luckyMoneyKey = ''
    },
    // 点击红包的回调
    async clickLuckyMoneyCallback () {
      await getRedPacket(this.luckyMoneyKey)
    },
    /**
     * 定时创建红包
     * @param duration 持续时长 单位ms
     * @param timeInterval 红包生成速率 单位ms
     */
    createLuckyMoneyByInterval (duration = this.duration, timeInterval = this.generationRate) {
      console.log('开始掉落红包')
      let timer = setInterval(() => {
        this.createLuckyMoney()
      }, timeInterval)
      setTimeout(() => {
        console.log('结束掉落红包')
        // 结束生成红包
        clearInterval(timer)
        // 红包活动结束，打开奖励遮罩
        this.showRewardMask()
      }, duration)
      //#endregion

    },
    //#endregion

    //#region <流程控制相关>
    // 开启红包活动
    startLuckyMoneyActive () {
      // 重置红包活动数据
      this.resetLuckyMoneyActiveData()
      // 创建本次红包活动
      this.createLuckyMoneyActive()
      // 开启倒计时
      this.showCountdownMask()
    },
    //#endregion
  },
  mounted () {
    // 生成不重复的随机用户假Id，存储到localStorage中
    let token = localStorage.getItem('token')
    if (!token) {
      localStorage.setItem('token', Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2))
      token = localStorage.getItem('token')
    }
    // 通过websocket连接服务器
    const activityKey = this.$route.query.activityKey
    if (activityKey) {
      this.websocketInstance = new WebsocketClass(
          {
            url: `ws://rb.atguigu.cn/api/websocket/${activityKey}/${token}` ,
            onMessage: (res) => {
              this.duration = res.duration
              this.generationRate = res.generationRate
              this.luckyMoneyKey = res.redPackageKey
              // 开启红包活动
              this.startLuckyMoneyActive()
              // 3s后断开连接
              setTimeout(() => {
                this.websocketInstance.disconnect()
              }, 3000)

            },
          })
      this.websocketInstance.connect()
    }else {
      this.$toast('缺少必要的红包参数')
    }
  },
  destroyed () {
    // 离开页面时，断开websocket连接
    this.websocketInstance && this.websocketInstance.disconnect()
  }
}

</script>

<style scoped lang="scss">
.page-container {
  width: 100vw;
  height: 100vh;
  background: #fff;
}

.lucky-money-container {
  position: fixed;
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
