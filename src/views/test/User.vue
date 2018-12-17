<template>
  <div class="userM">
    <el-form :inline="true" :model="searchForm" class="user-form-inline">
      <el-form-item>
        <el-button type="success" @click="handleAdd">添加用户</el-button>
      </el-form-item>

      <el-form-item label="用户名">
        <el-input v-model="searchForm.userName" placeholder="用户名"></el-input>
      </el-form-item>

      <el-form-item label="手机号">
        <el-input v-model="searchForm.phone" placeholder="用户名"></el-input>
      </el-form-item>

      <el-form-item label="状态">
        <el-select v-model="searchForm.enable" placeholder="状态">
          <el-option label="启用" value="1"></el-option>
          <el-option label="禁用" value="0"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch"></el-button>
      </el-form-item>
    </el-form>

    <ex-table
      :data="userdata"
      show-pagination
      :search-method="handleSearch"
      ref="table"
      border
      :stripe="true"
      :highlight-current-row="true"
      style="width: 100%"
    >
      <el-table-column prop="trueName" label="用户名" width="180" header-align="center" sortable></el-table-column>
      <el-table-column prop="phone" label="手机" width="180" header-align="center" sortable></el-table-column>
      <el-table-column prop="enable" label="状态" width="80" header-align="center" sortable>
        <template slot-scope="scope">
          <el-tag :type="scope.row.enable === 1 ? 'success' : 'danger'" disable-transitions>
            <span v-if="scope.row.enable === 1">启用</span>
            <span v-else>禁用</span>
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="deptName" label="部门" width="180" header-align="center" sortable></el-table-column>
      <el-table-column label width="40" header-align="center">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="角色列表" placement="top-start">
            <i class="el-icon-info info" @click="handleOpen(scope.$index, scope.row)"></i>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="操作" header-align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </ex-table>

    <el-dialog title="角色列表" :visible.sync="dialogRolesVisible">
      <el-table :data="rolesData">
        <el-table-column property="id" label="ID" width="150"></el-table-column>
        <el-table-column property="text" label="角色名" width="200"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
import request from "utils/http";
import tools from "utils/tools";
import ExTable from "utils/table";
import store from "@/store";
export default {
  components: {
    ExTable
  },
  created() {},
  data() {
    return {
      searchForm: {},
      userdata: [],

      dialogRolesVisible: false,
      rolesData: []
    };
  },

  watch: {},
  mounted() {
    this.$refs.table.fetchData();
  },
  methods: {
    /**
     * @description 添加用户
     */
    handleAdd() {},
    /**
     * @description 编辑用户
     */
    handleEdit(index, row) {},

    /**
     * @description 删除用户
     */
    handleDelete(index, row) {},

    /**
     * @description 打开弹出层
     */
    handleOpen(index, row) {
      this.dialogRolesVisible = true;
      this.handleInfo(index, row);
    },

    /**
     * @description 查询当前记录详细页
     * @param index 索引
     * @param row 选择行
     * */
    handleInfo(index, row) {
      var _this = this;
      //getters 数据
      var getters = _this.$store.getters;
      request({
        url: "/api/api/role_list",
        method: "get",
        params: {
          companyId: getters.userCompany.id,
          userId: row.id
        }
      }).then(result => {
        if (result.status == 200) {
          if (_.isArray(result.data.data)) {
            _this.rolesData = result.data.data;
          }
        }
      });
    },
    onSubmit() {
      console.log("submit!");
    },

    handleSearch(pagination, { currentPage, pageSize }) {
      this.fetchRemoteData(currentPage, pageSize);
    },

    fetchRemoteData(currentPage, pageSize) {
      //设置分页总数
      const pagination = this.$refs.table.pagination;
      //获取表格数据
      this.findAll(currentPage, pageSize, pagination);
    },

    /**
     * @description 分页查询数据，用于服务端分页
     * @param currentPage 当前页码
     * @param pageSize 每页条数
     * @param pagination
     * @returns 结果返回｛data_list: [...], total: ..｝
     */
    findAll(currentPage, pageSize, pagination) {
      var _this = this;
      //getters 数据
      var getters = _this.$store.getters;
      request({
        url: "/api/api/my_contact_list",
        method: "get",
        params: {
          companyId: getters.userCompany.id
        }
      }).then(result => {
        if (result.status == 200) {
          const data = result.data.data;
          if (_.isPlainObject(data)) {
            //disabled 禁用的用户
            const disableds = data.disabled,
              //normal 使用中的用户
              normals = data.normal;
            var datas = [];
            if (_.isArray(normals)) {
              // _this.userdata.concat(normals);
              datas = _.concat(_this.userdata, normals);
            }
            if (_.isArray(disableds)) {
              datas = _.concat(datas, disableds);
            }
            _this.userdata = datas;
            //手动实现分页

            pagination.total =
              (_.isArray(disableds) ? disableds.length : 0) +
              (_.isArray(normals) ? normals.length : 0);
          }
        }
      });
    }
  }
};
</script>
<style scoped>
.userM {
  margin-top: 10px;
}

.info {
  cursor: pointer;
}
</style>




