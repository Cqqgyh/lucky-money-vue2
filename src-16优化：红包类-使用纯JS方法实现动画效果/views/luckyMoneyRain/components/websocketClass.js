export default class websocketClass {
  url= ''
  // 用来存放websocket实例
  socketTask= null
  // 连接是否处于断开状态的标识
  isDisconnect= true
  // 心跳定时器
  heartbeatTimer= null
  // 心跳间隔时间
  heartbeatInterval= 3000
  // 收到消息的回调
  onMessage= () => {}
  /**
   * @description websocketClass构造函数
   * @param {Object} data
   * @param {string} data.url - websocket地址：ws://139.198.163.91:8500/api/websocket/{token}
   * @param {function} [data.onMessage] - 收到消息的回调
   * @param {number} [data.heartbeatInterval] - 心跳间隔时间
   */
  constructor (data) {
    this.url = data.url || this.url
    this.onMessage = data?.onMessage?.bind(this) || this.onMessage.bind(this)
    this.heartbeatInterval = data.heartbeatInterval || this.heartbeatInterval
  }
  // 连接
  connect = () => {
    if (this.isDisconnect) {
      this.isDisconnect = false
      console.log('WebSocket连接中...', this.url)
      console.log('socketTask', this.socketTask)
      this.socketTask = new WebSocket(this.url)
      this.socketTask.onopen = () => {
        console.log('WebSocket连接已打开')
        this.startHeartbeat()
      }

      this.socketTask.onclose = () => {
        console.log('WebSocket连接已关闭')
        if (this.isDisconnect) {
          setTimeout(() => {
            console.log('WebSocket尝试重新连接')
            this.connect()
          }, 1000)
        }
      }

      this.socketTask.onerror = (error) => {
        console.error('WebSocket连接发生错误:', error)
        this.isDisconnect = true
      }

      this.socketTask.onmessage = (res) => {
        let data = JSON.parse(res.data)
        console.log('收到服务器消息:', data)
        this.onMessage && this.onMessage(data)
      }
    }
  }
  // 断开连接
  disconnect = () => {
    console.log('主动断开')
    if (this.socketTask) {
      this.isDisconnect = false
      this.socketTask.close()
      this.stopHeartbeat()
      this.socketTask = null
    }
  }
  // 发送心跳
  startHeartbeat = () => {
    this.heartbeatTimer = setInterval(() => {
      if (this.socketTask) {
        console.log('发送心跳')
        this.sendMessage({})
      }
    }, this.heartbeatInterval)
  }
  // 停止心跳
  stopHeartbeat = () => {
    clearInterval(this.heartbeatTimer)
  }
  // 发送消息
  sendMessage = (message) => {
    console.log('发送消息:sendMessage', message)
    if (this.socketTask) {
      this.socketTask.send({
        data: JSON.stringify(message),
      })
    }
  }
}
