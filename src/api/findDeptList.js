import request from 'utils/http'
export function findDeptList(data) {
    console.log("调用取数接口");
    console.log(data);
    return request({
        url: '/xiang/find_dept_list',
        method: 'get',
        params: data
    })
}