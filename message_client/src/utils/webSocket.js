import store from '@/store' // vuex
import socketCoreProcess from './socketCoreProcess.js'

export default function webSocket(data) {
  let url = data.url
  let timer = null

  let initSocket = function () {
    let socketIsClosed = false
    let websocket = null
    // 首先判断是否 支持 WebSocket
    if ('WebSocket' in window) {
      websocket = new WebSocket(url)
    } else if ('MozWebSocket' in window) {
      websocket = new MozWebSocket(url)
    } else {
      websocket = new SockJS(url)
    }

    // 打开连接时
    websocket.onopen = function (evnt) {
      console.log('  websocket.onopen  ')
      console.log('open-timer:', timer)
      updateUserSocketOffLine(false) // 设置socket是否离线
      window.socket = websocket
      socketIsClosed = false
      if (timer) {
        clearInterval(timer)
      }
      timer = null
    }

    // 收到消息时
    websocket.onmessage = function (evnt) {
      let data = evnt.data
      socketCoreProcess(websocket, JSON.parse(data))
    }

    // 关闭连接时
    websocket.onclose = function (e) {
      console.log('websocket 断开: ', e)
      socketIsClosed = true
      updateUserSocketOffLine(true) // 设置socket是否离线
      closeShow()
    }

    // 链接错误时
    websocket.onerror = function (evnt) {
      console.log('  websocket.onerror  ')
    }

    // socket 发送消息
    websocket.deliver = function (data) {
      console.log('websocket.deliver:', data)
      if (socketIsClosed) {
        return closeShow()
      }
      websocket.send(JSON.stringify(data))
    }

    return websocket
  }

  let closeShow = function () {
    // debugger;
    console.log('close-timer:', timer)
    if (!timer) {
      timer = setInterval(function () {
        initSocket()
        console.log('socket尝试重连······', timer)
      }, 5000)
    }
  }

  return initSocket()
}

/**
 * 当用户（自己）socket断开连接时，把用户的头像置灰，上线时恢复
 * true：在线，false：离线
 */
function updateUserSocketOffLine(val) {
  store.dispatch('ActionSetMessageStore', {socketOffLine: val})
}
