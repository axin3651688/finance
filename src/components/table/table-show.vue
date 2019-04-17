<template>
  <el-table class="table-show" :data="tableData" border style="width: 100%" highlight-current-row>
    <slot name="first"></slot>
    <el-table-column
      sortable
      v-for="col of columns"
      :prop="col.id"
      :label="col.text"
      :min-width="columnsWidth(col)"
      :align="aligner(col)"
      header-align="center"
      :key="col.id"
    >
      <template slot-scope="scope">
        <span v-if="col.cell&&scope.row.isSet">
          <el-input size="small" placeholder="请输入内容" v-model="scope.row[col.id]"></el-input>
        </span>
        <span else>{{ getCellValues(tableData,col,scope)}}</span>
      </template>
    </el-table-column>

    <slot name="last"></slot>
  </el-table>
</template>

<script type="text/ecmascript-6">
import {formatTime} from '@/utils/format';
export default {
  name: 'table-show',
  props: {
    columns: Array,
    tableData: {
      type: Array,
      default: () => [
        {
          type: 'qweqwe',
          addport: '123123',
          user: '123',
          pwd: 'wer',
          info: 'rty'
        },
        {
          type: '456',
          addport: '123123',
          user: '123',
          pwd: 'wer',
          info: 'sdf'
        }
      ]
    }
  },
  data() {
    return {};
  },

  methods: {
    /**
     * @desc    : 根据type类型判断是靠左还是靠右,当然也可以直接传aligner属性
     * @param   col   每一项
     * @author  : mj
     */
    aligner(col) {
      if (col.aligner) {
        return col.aligner;
      }
      switch (col.type) {
        case 'index':
          return 'center';
        case 'string':
          return 'left';
        case 'number':
          return 'center';
        case 'decimal':
          return 'right';
        case 'date':
          return 'center';
        case 'normal':
          return 'center';
        default:
          break;
      }
    },
    /**
     * @desc    : 根据type类型判断列宽,当然也可以直接传width
     * @param   {}
     * @param   {}
     * @author  : mj
     */
    columnsWidth(col) {
      if (col.width) {
        return col.width;
      }
      switch (col.type) {
        case 'index':
          return 80;
        case 'string':
          return 150;
        case 'number':
          return 120;
        case 'decimal':
          return 140;
        case 'date':
          return 120;
        case 'normal':
          return 120;
        default:
          break;
      }
    },
    /**
     * 获取单元格数据
     */
    getCellValues(datas, col, scope) {
      // debugger;
      if (col.type === 'date') {
        return formatTime(scope.row[col.id]);
      }
      if (col.type !== 'decimal') {
        return scope.row[col.id];
      }

      let colId = col.id;
      let row = scope.row;
      let rowId = row.id || row.nid;
      let union = false;
      if (rowId && isNaN(rowId)) {
        if (!row.hasOwnProperty(colId)) {
          return '';
        }
        return '--';
      }
      if (col.subfix || col.subfix === 0) {
        rowId = row['id' + col.subfix]; // 并列行的后缀
        colId = colId.replace(col.subfix, '');
        union = true;
        //  debugger
      }
      // debugger
      if (!row[colId] && !union) {
        let temp = datas.filter(tempRow => {
          return tempRow.id === rowId;
        });
        if (temp.length > 0 && temp[0][colId]) {
          row = temp[0];
        } else {
          return '--';
        }
      }
      let value = 0;
      if (Array.isArray(datas) && datas.length === 0) {
        return '--';
      }
      if (rowId) {
        value = Math.getCellValue(datas, colId, rowId);
      } else if (datas.length >= scope.$index) {
        value = datas[scope.$index][colId];
      } else {
        // console.error('人才搞的配制：' + JSON.stringify(row));
      }
      if (!value) {
        return '--';
      }
      // 千分位  保留两位小数
      value = Math.decimalToLocalString(value);
      return value;
    }

  },
  computed: {}
};
</script>

