 /* 
  * 1500消息处理
  */
 import store from '@/store'
 import modeHandle from "utils/modeHandle";
 export default function cmd1500Handle(websocket, data) {
     let command = data.data
     debugger;
     console.log(command);
     let cmd = {};
     Object.keys(command).forEach(keys => {
         if (command[keys]) {
             switch (keys) {
                 case 'company':
                     console.log(command[keys]);
                     cmd[keys] = command[keys].id;
                     store.dispatch("GetSideMid", {
                         companyName: command[keys].text
                     });
                     break;
                 case 'module':
                     let e = command[keys]
                     store.dispatch("GetSideMid", {
                         openPid: command[keys].pid,
                         activeId: command[keys].code
                     });
                     modeHandle({
                         sourceId: e.sourceId,
                         url: e.url
                     });

                     break;
                 case "month":
                     //  console.log(command[keys].id);
                     let m = command[keys].id
                     switch (m) {
                         case '98':
                             let mt2 = parseInt(store.getters.month) - 2
                             if (mt2 > 0) {
                                 cmd[keys] = mt2
                             } else {
                                 cmd[keys] = 12 + mt2
                                 cmd["year"] = parseInt(store.getters.year) - 1
                             }
                             break;
                         case '99':
                             let mt1 = parseInt(store.getters.month) - 1
                             if (mt1 > 0) {
                                 cmd[keys] = mt1
                             } else {
                                 cmd[keys] = 12 + mt1
                                 cmd["year"] = parseInt(store.getters.year) - 1
                             }
                             break;
                         case '101':
                             let mj1 = parseInt(store.getters.month) + 1
                             if (mj1 < 13) {
                                 cmd[keys] = mj1
                             } else {
                                 cmd[keys] = mj1 - 12
                                 cmd["year"] = parseInt(store.getters.year) + 1
                             }
                             break;
                         case '102':
                             let mj2 = parseInt(store.getters.month) + 2
                             if (mj2 < 13) {
                                 cmd[keys] = mj2
                             } else {
                                 cmd[keys] = mj2 - 12
                                 cmd["year"] = parseInt(store.getters.year) + 1
                             }
                             break;
                         default:
                             cmd[keys] = m
                     }

                     break;
                 case "year":
                     let y = command[keys].id
                     switch (y) {
                         case '9998':
                             cmd[keys] = parseInt(store.getters.year) - 2
                             break;
                         case '9999':
                             cmd[keys] = parseInt(store.getters.year) - 1
                             break;
                         case '10001':
                             cmd[keys] = parseInt(store.getters.year) + 1
                             break;
                         case '10002':
                             cmd[keys] = parseInt(store.getters.year) + 2
                             break;
                         default:
                             cmd[keys] = y
                     }
                     break;
             }
         }
     })
     // debugger
     console.log(cmd);
     store.dispatch("GetSideMid", cmd);
 }