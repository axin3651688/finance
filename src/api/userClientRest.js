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