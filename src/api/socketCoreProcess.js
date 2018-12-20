import {
    Message,
    MessageBox,
    Notification
} from 'element-ui'
import {
    login
} from "../api/interface.js";
import {
    isArray
} from 'util';
import cmd1500Handle from './cmd1500Handle'
import {processSingleMessage} from './cmd1500Handle'
/**
 * 消息核心处理
 * author:gjx
 * date:2018-12-03
 */
export default function socketCoreProcess(websocket, datas) {
    let parseData = function (data) {
        let code = data.code;
        console.info(data);
        switch (code) {
            case 1001:
                console.log('socketCoreProcess: 1001');
                break;
            case 1003:
                console.log('socketCoreProcess: 1003');
                break;
            case 1006:
                console.log('socketCoreProcess: 1006');
                break;
            case 1100:
                // 单聊
                console.log('socket单聊: 1100');
                processSingleMessage(data);
                break;
            case 1101:
                // 群聊
                console.log('socketCoreProcess: 1101');
                break;
            case 1500:
                //终端控制处理逻辑 {text:"执行成功"}
                let sendBean = cmd1500Handle(websocket, data);
                // sendBean.device = data.fromDevice;
                // sendBean.code = 15001; //收到口令回执
                // websocket.send(sendBean);
                break;

            default:
        }
    }

    // debugger;
    if (isArray(datas)) {
        datas.forEach(data => {
            parseData(data);
        });
    } else {
        parseData(datas);
    }
}