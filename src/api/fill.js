import request from 'utils/http'
import {
    id
} from 'postcss-selector-parser';

export function fill() {
    return request({
        url: '/fill/query',
        method: 'post'
    })
}

//excel导入
export function importExcel(data) {
    return request({
        url: '/exl/upload_excel',
        method: 'post',
        data: data

    })
}

//数据查询
export function inquire(data) {
    return request({
        url: '/zjb/find_fill_data',
        method: 'post',
        data: data
    })
}

//填报的保存
export function save(data) {
    return request({
        url: '/zjb/save_fill_data',
        method: 'post',
        data: data
    })
}
//填报模板的下载
export function download(data) {
    return request({
        url: '/zjb/download_template?templateId=' + data,
        method: 'get',
        data: data,
        responseType: 'arraybuffer'
    })
}
//删除
export function del(data) {
    return request({
        url: "/zjb/delete_fill_data?templateId=" + data.templateId + "&id=" + data.nid,
        method: 'delete',
        data: data
    })
}

//融资情况明细表的下拉数据 
export function financingDown(data) {
    return request({
        url: "/zjb/find_options?scode=" + data,
        method: 'get',
        data: data
    })
}

//融资情况明细表的下拉数据 机构名称
export function mechanism() {
    return request({
        url: "/zjb/find_banks",
        method: 'get',
    })
}
/**
 * 查询当前公司下的用户。
 * @author szc 2019年4月2日17:43:42
 */
export function queryUserByCompany(data) {
    return request({
        url: "/zjb/fill_report?company=" + data.company,
        method: 'get'
    })
}
export function sendFillMessage(data) {
    return request({
        url: "/zjb/send_fill_message",
        method: 'post',
        params: data
    })
}