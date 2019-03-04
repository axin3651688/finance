<template>
   <div>
        <el-button type="text" @click="dialogVisible = true">点击打开</el-button>

<!-- <el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
  <span>这是一段信息</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog> -->
 <el-cascader :options="options" v-model="selectedOptions" @change="handleChange" v-show="dialogVisible"> </el-cascader>
   </div>
</template>
<script>
export default {
     data() {
      return {
        dialogVisible: false,
          options: [{
          value: 'zhinan',
          label: '指南',
          children: [
              {
            value: 'shejiyuanze',
            label: '设计原则',
          }, {
            value: 'daohang',
            label: '导航'
          }]
            }, 
            {
            value: 'zujian',
            label: '组件',
            }, 
            {
            value: 'ziyuan',
            label: '资源',
            }
        ],
        selectedOptions: [],
      };
    },
    methods: {
    //   handleClose(done) {
    //     this.$confirm('确认关闭？')
    //       .then(_ => {
    //         done();
    //       })
    //       .catch(_ => {});
    //   }
    handleChange(value) {
        // this.dialogVisible = true
        console.log(value);
      }
    }
}
</script>

