import request from 'utils/http'
import {
    id
} from 'postcss-selector-parser';
// import routerNew from './../views/layout/router'
export function fill() {
    return request({
        url: '/fill/query',
        method: 'post'
    })
}

//excel导入
export function importExcel(data) {
    return request({
        url: '/zjb/zjb/upload_excel',
        method: 'post',
        data: data

    })
}

//数据查询
export function inquire(data) {
    return request({
        url: '/zjb/zjb/find_fill_data',
        method: 'post',
        data: data
    })
}

//填报的保存
export function save(data) {
    return request({
        url: '/zjb/zjb/save_fill_data',
        method: 'post',
        data: data
    })
}
//填报模板的下载
export function download(data) {
    return request({
        url: '/zjb/zjb/download_template',
        method: 'post',
        data: data,
        responseType: 'arraybuffer'
    })
}
//删除
export function del(data) {
    return request({
        url: "/zjb/zjb/delete_fill_data?templateId=" + data.templateId + "&id=" + data.nid,
        method: 'delete',
        data: data
    })
}

//融资情况明细表的下拉数据 
export function financingDown(data) {
    return request({
        url: "/zjb/zjb/find_options?scode=" + data,
        method: 'get',
        data: data
    })
}

//融资情况明细表的下拉数据 机构名称
export function mechanism() {
    return request({
        url: "/zjb/zjb/find_banks",
        method: 'get',
    })
}
/**
 * 查询当前公司下的用户。
 * @author szc 2019年4月2日17:43:42
 */
export function queryUserByCompany_old(data) {
    return request({
        url: "/zjb/zjb/fill_report?company=" + data.company,
        method: 'get'
    })
}
/**
 * 查询当前公司下的用户。
 * @author szc 2019年4月2日17:43:42
 */
export function queryUserByCompany(data) {
    return request({
        url: "/zjb/zjb/query_report_users?company=" + data.company,
        method: 'get'
    })
}
export function sendFillMessage(data) {
    return request({
        url: "/zjb/zjb/send_fill_message",
        method: 'post',
        params: data
    })
}
/**
 * 上报按钮的发送请求
 * @author szc 2019年4月30日13:37:52
 */
export function saveReport(params) {
    return request({
        url: '/zjb/zjb/save_fill_message',
        method: 'post',
        data: params
    })
}
/**
 * 审阅的发送请求。
 * @author szc 2019年4月30日13:38:30
 * @param {*} params 
 */
export function saveReview(params) {
    return request({
        url: '/zjb/zjb/update_fill_message',
        method: 'post',
        data: params
    })
}
/**
 * 查询子公司数量。
 * @author szc 2019年5月8日08:59:35
 * /sys/dimcompany/query_son_byspcode
 */
export function querySonByspcode(scode) {
    return request({
        url: '/zjb/sys/dimcompany/query_son_byspcode?scode=' + scode,
        method: 'get'
    })
}
/**
 * 查询报表的状态。
 * @author szc 2019年5月8日08:59:35
 * 
 */
export function queryStateOfTable(params) {
    return request({
        url: '/zjb/zjb/query_filltable_record',
        method: 'post',
        data: params
    })
}
/**
 * 催报
 * @author szc 2019年5月8日08:59:35
 * 
 */
export function urgeToReport(params) {
    return request({
        url: '/zjb/zjb/save_fill_message',
        method: 'post',
        data: params
    })
}
/**
 * 上报流程的操作请求（似公用）
 * @author szc 2019年5月8日08:59:35
 * 
 */
export function publicReport(params) {
    return request({
        url: '/zjb/zjb/update_fill_message',
        method: 'post',
        data: params
    })
}
/**
 * 小铃铛请求。
 * @author szc 2019年5月8日08:59:35
 * 
 */
export function smallBell(params) {
    return request({
        url: '/zjb/zjb/query_fill_messages?pageNum=' + params.pageNum + "&pageSize=" + params.pageSize + "&account=" + params.account,
        method: 'get'
    })
}
/**
 * 消息条数。(暂时没用，2019年5月15日09:43:01)
 * @author szc 2019年5月8日08:59:35
 * 
 */
export function smallBellCount(suser) {
    let me = this,
        router = me.$router;
    return request.call(me, {
        url: '/zjb/sys/Msg/query_nolook_count?user=' + suser,
        method: 'get',
        transformResponse: [function(data) {
            debugger
            return data;
        }],
        validateStatus: function(status) {
            debugger;
            if (status == 911) {
                me.$message({
                    message: "dddd",
                    type: "warning"
                });
                me.clearInterval(interval);
                router.push("/login");
            }
            return status; // 默认的
        },
    })
}
/**
 * 修改信息的状态
 * @author szc 2019年5月8日08:59:35
 * /sys/Msg/change_fill_message_to_read
 */
export function editStateOfMessage(params) {
    return request({
        url: '/zjb/sys/Msg/change_fill_message_to_read?id=' + params.id,
        method: 'get'
    })
}
/**
 * 修改信息的状态
 * @author szc 2019年5月8日08:59:35
 * /sys/Msg/change_fill_message_to_read
 */
export function ageeReturn(params) {
    return request({
        url: '/zjb/zjb/rollback_fill_message',
        method: 'post',
        data: params
    })
}
/**
 * 修改信息的状态
 * @author szc 2019年5月8日08:59:35
 * /sys/Msg/change_fill_message_to_read
 */
export function queryUrgeUsers(params) {
    return request({
        url: '/zjb/zjb/query_urgereport_users?company=' + params.company,
        method: 'get'
    })
}