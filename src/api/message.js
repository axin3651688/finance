// message 页面获取消息列表
import request from 'utils/http'

// 获取消息左边栏数据
export function getSession(userId) {
    // console.log("getSession");
    // debugger
    return request({
        url: '/api/api/my_session',
        method: 'get',
        params: {
            "userId": userId,
        }
    })
}

// 获取单聊消息
export function findSingleMsg() {
    // console.log(" api findSingleMsg");
    // debugger
    return request({
        url: '/api/api/find_single_msg',
        method: 'post',
        data: {
            page: 1,
            receiverId: 244,
            senderId: 397,
            size: 10
        }
    })
}

// 发送消息，接受一个完整的数据对象
export function sendMsg(data) {
    console.log("api sendSingleMsg");
    // debugger
    return request({
        url: '/api/api/deliver',
        method: 'post',
        data: data
    })
}