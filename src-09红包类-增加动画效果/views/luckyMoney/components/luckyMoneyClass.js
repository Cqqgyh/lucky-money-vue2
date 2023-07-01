// 导入默认图片地址
import defaultUrl from '@/assets/images/luckyMoney.png'

// 定义一个红包类
export default class LuckyMoney {
  // 红包图片背景     默认值：defaultUrl
  url = ''
  // 图片宽度        默认值：'20vw'
  width = ''
  // 图片高度        默认值：this.width ? 'auto' : '20vw'
  height = ''
  // 插入到哪个父元素中 默认值：document.body;
  parent = ''
  // 为了避免红包重合，设计不同的轨道，共5个轨道 默认值： [0, 15, 35, 55, 75]
  orbit = ''
  // 动画            默认值： 'drop 2s linear'
  animation = ''
  // 动画持续时长：为了让每个图都有自己的动画时长，体现到实际效果上就是下落速度的不同      默认值： `${Math.random() * 5 + 1}s`
  animationDuration = ''

  // img元素，用于销毁红包
  img = document.createElement('img')
  // 图片点击事件回调
  clickCallback = () => {}

  // 构造函数
  constructor (data={}) {
    this.url = data.url || defaultUrl
    this.width = data.width || '20vw'
    this.height = data.height || this.width ? 'auto' : '20vw'
    this.parent = data.parent || document.body
    this.orbit = data.orbit || [0, 15, 35, 55, 75]
    this.animation = data.animation || 'drop 2s linear'
    this.animationDuration = data.animationDuration ||
      `${Math.random() * 5 + 1}s`
    this.clickCallback = data.clickCallback
    // 创建红包
    this.create()
  }

  //  创建红包
  create () {
    //     生成img标签
    this.img = document.createElement('img')
    //     设置img标签的src属性
    this.img.src = this.url
    // 设置图片定位:让每个图片互不影响位置，且方便设置初始位置
    this.img.style.position = 'absolute'
    // 设置img标签的宽高
    this.img.style.width = this.width
    this.img.style.height = this.height
    // 为了避免红包重合，使用预定的轨道设置偏移量
    this.img.style.left = `${this.orbit[Math.round(Math.random() * (this.orbit.length - 1))]}vw`
    // 添加style，动画属性属性
    this.img.style.animation = this.animation
    // 动画持续时长
    this.img.style.animationDuration = this.animationDuration
    // 图片点击事件
    this.img.onclick = this.click.bind(this)
    // 将img标签添加到parent中
    this.parent.appendChild(this.img)
  }

  // 销毁红包
  destroy () {
    // 销毁img标签
    this.img.remove()
  }

  // 图片点击事件
  click () {
    // 销毁图片
    this.destroy()
    // 执行回调函数
    this.clickCallback && this.clickCallback()
  }
}
