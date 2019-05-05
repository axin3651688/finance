const prame = {
    state: {
        command: {
            year: new Date().getFullYear(),
            module_api: 0,
            month: new Date().getMonth() || 1,
            date: new Date().getDate(),
            // 单位转换
            conversion: {
                id: 1,
                text: "元"
            },
            companyName: "登录有问题哦,重新登录吧",
            company: '1',
            openPid: 0,
            activeId: [],
            //下面待实现
            action: 0,
            action2: 0,
            action3: 0,
            defaultOpen: 0,
        },
        treeInfo: {
            cisdel: "N",
            codename: "(1001)天津食品集团有限公司（合并）",
            nisleaf: 0,
            nlevel: 1,
            npercent: 0,
            open: true,
            property1: "0",
            scode: "1001",
            seascomcode: "00000000-0000-0000-0000-000000000000CCE7AED4",
            sindcode: null,
            sname: "天津食品集团有限公司（合并）",
            spcode: "0",
            ssrccode: "0",
            stype: "0"
        },
        // 默认是公司,分开的年,月显示,day不显示,如果需要展现day,
        showDims: {
            company: true,
            year: true,
            month: true,
            day: false,
            // 单位转换
            conversion: false,
        }
    },

    mutations: {
        GET_SIDE_MID: (state, data) => {
            // debugger
            Object.keys(data).forEach(keys => {
                if (data[keys] !== null || undefined) {
                    state.command[keys] = data[keys]
                    if (typeof data[keys] == "object") {
                        localStorage.setItem([keys] + '_cache', JSON.stringify(data[keys]));
                    } else {
                        localStorage.setItem([keys] + '_cache', data[keys]);
                    }
                }
            });
        },
        GET_TRREEINFO: (state, treeInfo) => {
            state.treeInfo = treeInfo
            localStorage.setItem('treeInfo', JSON.stringify(treeInfo));
        },
        SHOW_DIMS: (state, data) => {
            // 此方法即可以接受数组对状态初始化,又可以接受对象更改其状态
            console.log(data);
            if (data.constructor == Array) {
                state.showDims.company = false,
                    state.showDims.year = false,
                    state.showDims.month = false,
                    state.showDims.day = false,
                    state.showDims.conversion = false,
                    data.forEach(ele => {
                        state.showDims[ele] = !state.showDims[ele]
                    });
            } else {
                Object.keys(data).forEach(keys => {
                    state.showDims[keys] = data[keys]
                });
            }
        },
        SET_SIDER_STATE: (state, data) => {
            debugger;
            Object.keys(data).forEach(keys => {
                if (data[keys] !== null || undefined) {
                    state.command[keys] = data[keys];
                }
            });
        }
    },

    actions: {
        GetSideMid: ({
            commit
        }, data) => {
            commit('GET_SIDE_MID', data)
        },
        GettRreeInfo: ({
            commit
        }, data) => {
            commit('GET_TRREEINFO', data)
        },
        ShowDims: ({
            commit
        }, data) => {
            commit('SHOW_DIMS', data)
        },
        //侧边栏的父节点
        setSiderState: ({
            commit
        }, data) => {
            commit('SET_SIDER_STATE', data)
        }
    }
}
export default prame