import request from 'utils/http'
import { id } from 'postcss-selector-parser';

export function fill() {
    return request({
        url: '/fill/query',
        method: 'post'    
    })
}

// export function ImportExcel(data) {
//     return request({
//         url: '/get/api/excel/upload_excel2json/?noTitle=1',
//         method: 'post',   
//         data:data,

//     })
// }

// export function ImportExcel(data) {
//     return request({
//         url: '/exl/excel/upload_excel2json/?subject=0002',
//         method: 'post',   
//         data:data

//     })
// }

// export function save(data) {
//     return request({
//         url: '/api/api/update_precalc',
//         method: 'post',   
//         data:data
//     })
// }

export function ImportExcel(data) {
    return request({
        url: '/exl/upload_excel',
        method: 'post',   
        data:data

    })
}

export function Inquire(data) {
    return request({
        url: '/exl/find_fill_data',
        method: 'post', 
        data:data  
    })
}

//填报的保存
export function save(data) {
    return request({
        url: '/exl/save_fill_data',
        method: 'post',   
        data:data
    })
}
//填报模板的下载
export function download(data) {
    return request({
        url: '/exl/download_template?templateId='+data,
        method: 'get',   
        data:data,
        responseType: 'arraybuffer'
    })
}
//删除
export function del(data) {
    return request({
        url: "/exl/delete_fill_data?templateId="+data.templateId+"&id="+data.nid,
        method: 'delete',   
        data:data
    })
}

