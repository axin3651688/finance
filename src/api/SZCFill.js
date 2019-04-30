import request from 'utils/http'

export function fillBtnOpe(params) {
    return request({
        url: '/zjb/save_fill_message',
        method: 'post',
        data: params
    })
}