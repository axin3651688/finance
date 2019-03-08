const messageModule = {
  state: {
    messageStore: {
      sessionActiveItem: null, // session选中的item
      sessionList: null, // session消息队列
      scanStatus: null, // 扫码登陆信息
      serverAck: null, // socket 消息回执
      routeName: '首页', // 路由名字
      newServerMsg: null, // 服务器推送的最新消息
      receiverData: null, // 单聊对象的用户信息
      groupInfo: null, // obj: 群信息
      companyList: null, // [{}.{}] 公司（团队）列表
      miniType: null // 设置消息类型 11016:新朋友、11017:群助手、11021:分析助手
    }
  },

  actions: {
    // 设置所有的状态, 接收一个对象
    ActionSetMessageStore({commit}, dataObj) {
      // debugger;
      if (dataObj instanceof Object) {
        commit('MutationSetMessageStore', dataObj);
      } else {
        console.warn('设置messageStore传入数据类型有误');
        debugger;
      }
    },

    // 更新session消息队列
    ActionUpdateSessionList({commit}, dataObj) {
      // debugger;
      if (dataObj instanceof Object) {
        commit('MutationUpdateSessionList', dataObj);
      } else {
        console.warn('更新messageStore传入数据类型有误');
        debugger;
      }
    }
  },

  mutations: {
    // 设置所有的状态, 接收一个对象
    MutationSetMessageStore(state, dataObj) {
      // debugger;
      for (let dataKey in dataObj) {
        let flag = dataKey;
        for (let messageStoreKey in state.messageStore) {
          if (dataKey === messageStoreKey) {
            flag = false;
            state.messageStore[messageStoreKey] = dataObj[dataKey];
          }
        }
        if (flag) {
          console.error(`messageStore-传入的${flag}没有在state中定义`);
        }
      }
      // 在本地存储中保留一份，方便查看
      try {
        let messageStoreStr = JSON.stringify(state.messageStore);
        localStorage.messageStore = messageStoreStr;
      } catch (e) {
        console.error('设置localStorage.messageStore失败:', e);
      }
    },

    // 更新session消息队列
    MutationUpdateSessionList(state, dataObj) {
      let sessionList = state.messageStore.sessionList;
      switch (dataObj.type) {
        case 'addItem':
          // debugger;
          state.messageStore.sessionList.unshift(dataObj.data);
          break;
        case 'deleteItem':
          debugger;
          break;
        case 'update':
          // debugger;
          for (let index in sessionList) {
            if (sessionList[index].targetId === dataObj.data.targetId) {
              if (dataObj.method === 'addCount') { // 增加消息计数
                sessionList[index].count++;
                sessionList[index].content = dataObj.data.content;
                sessionList[index].originData = dataObj.data.originData;
                break;
              } else { // 'clearCount' 清除消息计数,清除时间
                sessionList[index].count = 0;
                sessionList[index].content = '';
                sessionList[index].sendTime = null;
                break;
              }
            }
          }
          break;
      }
    }
  }

};

export default messageModule;
