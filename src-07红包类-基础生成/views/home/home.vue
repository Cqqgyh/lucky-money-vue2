<template>
  <div class="home-container">
    <van-button type="info" size="large" to="/luckyMoney">写法</van-button>
    <van-button type="info" size="large" to="/luckyMoneyRain">监听红包雨</van-button>
  </div>
</template>
<script>
export default {
  name: 'homePage',
}

</script>

<style scoped lang="scss">
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 20vh;
}
</style>
