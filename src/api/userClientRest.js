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
export function saveModuleMsg(datas) {
    console.log("催报消息操作接口");
    console.log(datas);
    // return request({
    //     url: '/api/api/save_module_msg',
    //     method: 'post',
    //     params: {
    //         moduleMsgDto: datas
    //     }
    // })
}
