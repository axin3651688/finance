'use strict'
import Vue from 'vue'
export default function treeToArray(data, expandAll, parent = null, level = null) {
  let tmp = []
  Array.from(data).forEach(function (record) {
    // debugger
    let _expanded = false
    if (record._expanded === undefined) {
      Vue.set(record, '_expanded', _expanded)
    }
    let _isHide = false
    if (record._isHide == undefined) {
      Vue.set(record, '_isHide', _isHide)
    }
    tmp.push(record)
    // 如果有父元素
    // if (parent) {
    //   Vue.set(record, 'parent', parent)
    // }

    // if (record.children && record.children.length > 0) {
    //   const children = treeToArray(record.children, expandAll, record, _level)
    //   tmp = tmp.concat(children)
    // }
  })
  return tmp
}