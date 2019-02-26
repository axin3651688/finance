/*
 * @Author: cnbi.zhh 
 * @Date: 2019-02-15 17:03:07 
 * @Decription: 描述 常用的javaScript正则表达式
 * @Last Modified by: cnbi.zhh
 * @Last Modified time: 2019-02-15 17:18:43
 */

const regex = {
    //电话号码验证 9位含9位以上
    mobileRule: /(?:^1[3456789]|^9[28])\d{9}$/,
    //4到16位（字母，数字，下划线，减号）
    usernameRule: /^[a-zA-Z0-9_-]{4,16}$/,
    //密码 最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
    pwRule: /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/,
    //Email
    emailRule: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
    //URL
    urlRule: /^((https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
}

/**
 * @description 电话号码验证 9位含9位以上
 * @param {*} value 
 */
export function isValiatePhone(value) {
    return regex.mobileRule.test(value);
}

/**
 * @description //4到16位（字母，数字，下划线，减号）
 * @param {*} value 
 */
export function isValiateUsername(value) {
    return regex.usernameRule.test(value);
}

/**
 * @description //密码最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
 * @param {*} value 
 */
export function isValiatePw(value) {
    return regex.pwRule.test(value);
}

/**
 * @description //Email
 * @param {*} value 
 */
export function isValiateEmail(value) {
    return regex.emailRule.test(value);
}

/**
 * @description //URL
 * @param {*} value 
 */
export function isValiateURL(value) {
    return regex.urlRule.test(value);
}

/**
 * @description //为空
 * @param {*} value 
 */
export function isValiateNull(value) {
    return value && value.trim().length === 0;
}

