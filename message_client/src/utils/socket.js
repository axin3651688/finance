import {
    isJSON
} from "utils"
import {
    Message,
    MessageBox,
    Notification
} from 'element-ui'
import router from '@/router'
import {
    login
} from "@m_api/login.js";

export const webSocket = function (data) {
    window.websocket = null;
    // let url = `${window.location.origin}/socket.io/`;
    // url = url.replace(/(http|https)/, 'ws');
    window.websocket = new WebSocket(data.url);

    // let heartCheck = {
    //   timeout: 30000,


    //   timeoutObj: null,
    //   serverTimeoutObj: null,
    //   reset: function(){
    //     clearTimeout(this.timeoutObj);
    //     clearTimeout(this.serverTimeoutObj);
    //     this.start();
    //   },
    //   start: function(){
    //     var self = this;
    //     this.timeoutObj = setTimeout(function(){
    //       let msg = {code: '1111'};
    //       msg = JSON.stringify(msg);
    //       websocket.send(msg);
    //       self.serverTimeoutObj = setTimeout(function(){
    //         websocket.close();//如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
    //       }, self.timeout)
    //     }, this.timeout)
    //   },
    // };

    websocket.onopen = function (e) { //连接成功
        console.log('连接成功！');
        let bean = {
            Authorization: data.sessionId
        };
        bean = JSON.stringify(bean);
        websocket.send(bean);
        //heartCheck.start();
    }

    let comebackLogin = function (message, code) { //返回登陆界面
        MessageBox.confirm(message.msg, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '重新登陆',
            type: 'warning',
            closeOnClickModal: false,
            closeOnPressEscape: false
        }).then(() => { //返回登陆界面
            router.push({
                path: '/login'
            })
        }).catch(() => { //重新登陆
            if (Object.is(code, 2005)) {
                router.push({
                    path: '/login'
                });
            } else {
                toLogin();
            }
        });
    }

    let flag = null;
    websocket.onmessage = function (msg) { //数据接收
        let res = msg.data;
        if (isJSON(res)) {
            let message = JSON.parse(res);
            if (Object.is(message.code, 2003)) {
                comebackLogin(message);
            } else if (Object.is(message.code, 1001)) {
                console.info(message.msg);
            } else if (Object.is(message.code, 1002)) {
                comebackLogin(message);
            } else if (Object.is(message.code, 2005)) {
                comebackLogin(message, 2005);
            } else if (Object.is(message.code, 1112)) {
                //heartCheck.reset();
                if (flag) {
                    clearInterval(flag);
                }
                flag = setInterval(function () {
                    let msg = {
                        code: '1111'
                    };
                    console.info("来心跳了！");
                    websocket.send(JSON.stringify(msg));
                }, 10000);

            }
        }
    }
    websocket.onclose = function () { //关闭
        console.warn('关闭连接！');
    }
    websocket.onerror = function () {
        console.warn('连接发生了错误！');
    }
}

function toLogin() { //用户重新登陆内容
    let userInfo = window.sessionStorage.getItem('user');
    let user = JSON.parse(userInfo);
    let bean = {
        username: user.username,
        password: user.password
    };
    login(bean).then(response => {
        let res = response.data;
        if (res.code === 200) {
            window.sessionStorage.setItem('token', res.data.auth);
            window.sessionStorage.setItem('wsId', res.data.wsId);
            window.sessionStorage.setItem('user', JSON.stringify(res.data.user));
            Notification.success({
                title: '成功',
                message: '登陆成功！',
                type: 'success'
            });
            let bean = {
                sessionId: res.data.auth,
                url: res.data.wsId
            };
            webSocket(bean);
        } else {
            this.$notify.error({
                title: '错误',
                message: res.msg
            });
            this.$route.push({
                path: '/login'
            });
        }
    }).catch(error => {
        console.warn(error)
    })
}
