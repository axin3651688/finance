import request from 'utils/http'
/**
 * 组织成员列表
 * 
 */
export function companyContactList(companyId) {
    console.log("调用成员接口");
    console.log(companyId);

    return request({
        url: '/api/api/my_contact_list',
        method: 'get',
        params: {
            companyId: companyId
        }
    })
}
/**
 * 催报消息操作接口
 *
 */
export function SAVE_MODULE_MSG(datas) {
    console.log("催报消息操作接口");
    // console.log(datas);
    debugger
    return request({
        url: '/api/api/save_module_msg',
        method: 'post',
        data: datas
    })
}

export function ACK_MODULE_MSG(data) {
    console.log("催报消息操作接口");
    // console.log(data);
    debugger
    return request({
        url: '/api/api/ack_module_msg',
        method: 'get',
        params: {
            code: data,
            chat: 2000,
            type: 1102
        }
    })
}