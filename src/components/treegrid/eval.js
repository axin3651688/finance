'use strict'
import Vue from 'vue'
export default function treeToArray(data, expandAll, parent = null, level = null) {
  let tmp = []
  Array.from(data).forEach(function (record) {
    debugger
    if (record._expanded === undefined) {
      Vue.set(record, '_expanded', expandAll)
    }
    let _isHide = false
    if (record._isHide == undefined) {
      Vue.set(record, '_isHide', _isHide)
    }

    // 如果有父元素
    if (parent) {
      Vue.set(record, 'parent', parent)
    }
    tmp.push(record)
    if (record.children && record.children.length > 0) {
      const children = treeToArray(record.children, expandAll, record, _level)
      tmp = tmp.concat(children)
    }
  })
  return tmp
}