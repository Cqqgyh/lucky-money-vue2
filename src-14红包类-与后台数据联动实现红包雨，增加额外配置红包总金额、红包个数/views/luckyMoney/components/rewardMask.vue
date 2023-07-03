<template>
  <van-overlay :show="isShowMask" @click="close">
    <div class="wrapper" @click.stop>
      <div class="reward" v-if="amount">
        <span class="reward-description">恭喜获得</span>
        <div>
          <span class="reward-amount">{{ amount }}</span>
          <span class="reward-amount-description">元</span>
        </div>
      </div>
      <van-icon @click="close" class="reward-close" name="cross" color="#ea482d" size="10vw"/>
    </div>
  </van-overlay>
</template>
<script>
import { getRedPacketRecord } from '@/api/luckyMoney'

export default {
  name: 'rewardMaskPage',
  props: {
    // 红包key 用于获取本次活动最终奖励金额
    luckyMoneyKey: {
      type: String,
      required: true,
    },
    // 关闭遮罩层回调，可以在关闭遮罩时做一些操作
    closeCallback: {
      type: Function,
      default: () => {},
    },
  },
  data () {
    return {
      // 是否显示遮罩层
      isShowMask: false,
      // 奖励金额
      amount: '',
    }
  },
  methods: {
    // 开启遮罩层
    show () {
      // 获取本次奖励的金额
      this.getAmount()
      // 开启遮罩层
      this.isShowMask = true
    },
    // 关闭遮罩层
    close () {
      // 关闭遮罩层
      this.isShowMask = false
      // 关闭遮罩层回调
      this.closeCallback && this.closeCallback()
      // 重置奖励金额
      this.amount = ''
    },
    // 获取本次奖励的金额
    async getAmount () {
      const res = await getRedPacketRecord(this.luckyMoneyKey)
      this.amount =  res.data ? res.data.toFixed(2) : '0.00'
    },
  },
}

</script>


<style scoped lang="scss">
.wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-image: url('@/assets/images/reward.png');
  background-repeat: no-repeat;
  background-size: 70vw;
  /*位置居中*/
  background-position: center;

  .reward {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transform: translateY(-70px);

    .reward-description {
      /*恭喜获得红包字体描述文字*/
      font-size: 20px;
      color: #68150d;
      font-weight: bold;
    }

    .reward-amount {
      /*红包金额*/
      font-size: 45px;
      color: #ea482d;
      font-weight: bold;
    }

    .reward-amount-description {
      /*红包金额描述文字*/
      font-size: 20px;
      color: #F05A6B;
      font-weight: bold;
    }
  }
  .reward-close{
    position: absolute;
    right: 2vw;
    top: 3vh;
  }
}


</style>
