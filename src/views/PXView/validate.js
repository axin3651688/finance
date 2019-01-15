// 手机号验证
export function isvalidPhone(str) {
    const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
    return reg.test(str)
}

//手机号码
//验证规则：11位数字，以1开头。
export function checkMobile(str) {
    const  reg = /^1\d{10}$/
    return reg.test(str)
}


//邮箱
//验证规则：姑且把邮箱地址分成“第一部分@第二部分”这样
// 第一部分：由字母、数字、下划线、短线“-”、点号“.”组成，
// 第二部分：为一个域名，域名由字母、数字、短线“-”、域名后缀组成，
// 而域名后缀一般为.xxx或.xxx.xx，一区的域名后缀一般为2-4位，如cn,com,net，现在域名有的也会大于4位

export function checkEmail(str){
    const reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
    return reg.test(str)
}

//用户名
// 只能输入1-5位：
export function checkUserName(str){
    const reg = /^.{1,5}$/
    return reg.test(str)
}