import {
    isJSON
} from "utils"
import socketCoreProcess from "../api/socketCoreProcess.js";
export default function webSocket(data) {
    // debugger;
    let websocket = null;
    let url = data.url;
    // 首先判断是否 支持 WebSocket
    if ('WebSocket' in window) {
        websocket = new WebSocket(url);
    } else if ('MozWebSocket' in window) {
        websocket = new MozWebSocket(url);
    } else {
        websocket = new SockJS(url);
    }
    // 打开连接时
    websocket.onopen = function (evnt) {
        // debugger;
        console.log("  websocket.onopen  ");
        window.socket = websocket;
    };

    // 收到消息时
    websocket.onmessage = function (evnt) {
        let datas = evnt.data;
        if (isJSON(datas)) {
            socketCoreProcess(websocket, JSON.parse(datas));
        }
    };

    websocket.onerror = function (evnt) {
        console.log("  websocket.onerror  ");
    };

    websocket.onclose = function (evnt) {
        console.log("  websocket.onclose  ");
    }
    return websocket;
}
