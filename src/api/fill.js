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

export function ImportExcel(data) {
    return request({
        url: '/exl/excel/upload_excel2json/?subject=0002',
        method: 'post',   
        data:data

    })
}

export function save(data) {
    return request({
        url: '/api/api/update_precalc',
        method: 'post',   
        data:data
    })
}

