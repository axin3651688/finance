
  <template >
  <el-table-column :prop="prop" :label="label" :width="width" fixed="left">
    <template slot-scope="scope">
      <div class="tree-ctrl" :class="levelClass(scope.row)" @click="toggleExpanded(scope)">
        <span v-if="iconShow(0,scope.row) ">
          <i v-if="!scope.row._expanded" class="el-icon-plus"></i>
          <i v-else class="el-icon-minus"></i>
          <i class="t-icon"></i>
          {{scope.row[prop]}}
        </span>
        <span v-else class="nochild">{{scope.row[prop]}}</span>
      </div>
    </template>
  </el-table-column>
</template>

<script type="text/ecmascript-6">
export default {
  name: "",
  data() {
    return {};
  },
  props: ["prop", "label", "width", "tableData"],
  methods: {
    // 图标显示
    iconShow(index, record) {
      return (
        (index === 0 && record.leaf == 0) ||
        (record.children && record.children.length > 0)
      );
      // 为了树表异步加载,修改,上面为天津一次性加载,马军2019.1.7
      // return index === 0 && record.leaf == 0;
    },
    // 层级样式
    levelClass(row) {
      //   debugger;
      return row.nlevel ? "leve-" + row.nlevel : "";
    },
    // 切换下级是否展开
    toggleExpanded(trIndex) {
      debugger;
      if (
        this.tableData.hasOwnProperty("async") &&
        this.tableData.async == true
      ) {
        console.log(trIndex);

        // 下面调用JtreeGrid组件,发起异步请求,获取数据  mj
        this.$bus.emit("fetchdata", trIndex); //触发    发送数据
      }
      const record = this.tableData.datas[trIndex.$index];
      record._expanded = !record._expanded;
    }
  }
};
</script>

<style  lang="scss" scoped>
.t-icon {
  display: inline-block;
  width: 14px;
  height: 18px;
  background-size: 100% 100% !important;
  vertical-align: middle;
  margin: -3px 4px 0 4px;

  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAASCAYAAABrXO8xAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MDZEQUMxRDA0Q0U1MTFFODlGQkJCODYxMDNDRkIzQUEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MDZEQUMxRDE0Q0U1MTFFODlGQkJCODYxMDNDRkIzQUEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowNkRBQzFDRTRDRTUxMUU4OUZCQkI4NjEwM0NGQjNBQSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDowNkRBQzFDRjRDRTUxMUU4OUZCQkI4NjEwM0NGQjNBQSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pj8y8UsAAAIjSURBVHjanJPPa9RQEMe/85Jss7v9RVO0UtqDVbR2FbEXEQQP3qTgyX9AEG89KagHRfDi3yAIvfai3qRYUbH0sNJakUV6KOyWLii2btNkNz9enpPEddkfVPALj8mbzGdm3ryElFLwtu4qqjVsre6VKVKboj/3GX2Zj5DqG4jK6NSZp9CTh9FhqCPRQOgFM/hhz1B177puahC5LKD4PQmXE+xDGHNsizEiErAhAddPd1PjXCiC3LMZIF7si2QOMhyDkg+bRVMwScsKI8BvgOKtECnYrq0OsENaDFArYQ/1BJNwats19der41+SDWZ5kRGHMxgd0mqzZHTAsSZgXgaMSfbL9cMrCoaUA2TGGbjBOXji6jRPf3NekfGMuiryxwCdc2W4LVVj6BJDv3ja5dTS0QIiZ7C7VUNLbY2raSJujZf4MxMzOS8Fy9V2ML4CQ0e0tAERBDCs4xz4hv3bUJn4RByvLbMdybWDcVIvYIdEZmQY6BdQuyuo6BdBUQFfdqZRP+B2R323q1UV01kdZPpQZoBbb2/j0QoPZsdDsWTj2MJVfK8MhT2uQ4PulbjF13hRvIIgP42Tzie8Kq1D16qYPzuEO+/ODbaug1Ch0J8gkvAvPF8jZ99YfLlamLA8DCCLpdCErOcxa7nQAmrdIwljklR4X6mfT5z8qaqj9117fHPqQc3era9+Lbn3Tmyct6zq3Nr27PuyO/YhYeIf+X/0W4ABAGLgy0VZgovSAAAAAElFTkSuQmCC)
    no-repeat;
}
.tree-ctrl {
  display: inline-block;
  position: relative;
  cursor: pointer;
  color: #2196f3;
  margin-left: 18px;
}
.leve-1 {
  left: 0px;
}
.leve-2 {
  left: 14px;
}
.leve-3 {
  left: 30px;
}
.leve-4 {
  left: 46px;
}
.leve-5 .td1 {
  left: 62px;
}
.leve-6 .td1 {
  left: 78px;
}
.leve-7 .td1 {
  left: 90px;
}
.before-line {
  content: "";
  position: absolute;
  width: 1px;
  height: 100%;
  background-color: #e8e8e8;
  border: none;
  top: -20px;
  z-index: 1;
  left: 34px;
}
.nochild {
  display: inline-block;
  margin-left: 40px;
}
</style>
