<template>
  <el-tree :data="items" ref="tree2" highlight-current></el-tree>
</template>

<script type="text/ecmascript-6">
export default {
  name: "",
  data() {
    return {
      data: [
        { id: 1, label: "办公管理", pid: 0 },
        { id: 2, label: "请假申请", pid: 0 },
        { id: 3, label: "出差申请", pid: 0 },
        { id: 4, label: "请假记录", pid: 0 },
        { id: 5, label: "系统设置", pid: 0 },
        { id: 6, label: "权限管理", pid: 0 },
        { id: 7, label: "用户角色", pid: 0 },
        { id: 8, label: "菜单设置", pid: 0 }
      ],
      data1: [
        { id: 10, label: "办公管理", pid: 1 },
        { id: 20, label: "请假申请", pid: 1 },
        { id: 30, label: "出差申请", pid: 1 },
        { id: 40, label: "请假记录", pid: 1 },
        { id: 50, label: "系统设置", pid: 1 },
        { id: 60, label: "权限管理", pid: 1 },
        { id: 70, label: "用户角色", pid: 1 },
        { id: 80, label: "菜单设置", pid: 1 }
      ],
      items: []
    };
  },
  created() {
    this.items = this.toTree(this.data);
    console.log(this.items);
  },
  methods: {
    toTree(data) {
      // 删除 所有 children,以防止多次调用
      data.forEach(function(item) {
        delete item.children;
      });
      // 将数据存储为 以 id 为 KEY 的 map 索引数据列
      var map = {};
      data.forEach(function(item) {
        map[item.id] = item;
      });
      console.log(map);
      var val = [];
      data.forEach(function(item) {
        // 以当前遍历项，的pid,去map对象中找到索引的id
        var parent = map[item.pid];
        // 好绕啊，如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
        if (parent) {
          (parent.children || (parent.children = [])).push(item);
        } else {
          //如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级
          val.push(item);
        }
      });
      return val;
    }
  }
};
</script>

<style  lang="scss" scoped>
</style>
