<template>
  <div class="Users">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="8"
          ><el-input
            placeholder="请输入内容"
            class="input-with-select"
            v-model="UserListForm.query"
            clearable
            @clear="getUserList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getUserList"
            ></el-button> </el-input
        ></el-col>
        <el-col :span="6"
          ><el-button type="primary" @click="dialogVisible = !dialogVisible"
            >添加用户</el-button
          ></el-col
        >
      </el-row>
      <!-- 表格 -->
      <el-table :data="UserList.users" style="width: 100%" stripe border>
        <el-table-column type="index" label="#"> </el-table-column>
        <el-table-column prop="username" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" width="180">
        </el-table-column>
        <el-table-column prop="mobile" label="电话" width="180">
        </el-table-column>
        <el-table-column prop="role_name" label="角色" width="180">
        </el-table-column>
        <el-table-column prop="mg_state" label="状态" width="180">
          <template v-slot:default="slotProps">
            <el-switch
              v-model="slotProps.row.mg_state"
              @change="userStateChange(slotProps.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template v-slot:default="slotProps">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="editDialogVisibleClick(slotProps.row.id)"
            ></el-button>
            <el-tooltip
              effect="dark"
              content="分配角色"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="warning"
                icon="el-icon-share"
                size="mini"
              ></el-button>
            </el-tooltip>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="DeleteUsersClick(slotProps.row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="UserListForm.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="UserListForm.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>

    <AddDialog :dialogVisible.sync="dialogVisible" />
    <EditDialog
      :editDialogVisible.sync="editDialogVisible"
      :editDialogForm="editDialogForm"
    />
  </div>
</template>

<script>
import { get, put,deletefn } from "../../network/request";
import AddDialog from "../Users/addDialog";
import EditDialog from "../Users/editDialog.vue";
export default {
  components: {
    AddDialog,
    EditDialog,
  },
  data() {
    return {
      // 本地的用户列表
      UserList: [],
      // 提交表单的信息
      UserListForm: {
        query: "",
        pagenum: 1,
        pagesize: 2,
      },
      total: 0,
      dialogVisible: false,
      editDialogVisible: false,
      editDialogForm: {},
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    // axios 请求后端用户列表函数
    async getUserList() {
      const data = await get("/users", this.UserListForm);

      if (data.meta.status !== 200) {
        this.$message.error("获取成员失败");
      } else {
        this.UserList = data.data;
        this.total = data.data.total;
      }
    },
    handleSizeChange(newSize) {
      this.UserListForm.pagesize = newSize
      this.getUserList()
    },
    handleCurrentChange(newPage) {
      this.UserListForm.pagenum = newPage
      this.getUserList()
    },
    //用户状态改变函数
    async userStateChange(data) {
      const res = await put(`users/${data.id}/state/${data.mg_state}`);
      console.log(res);
      if (res.meta.status !== 200) {
        data.mg_state = !data.mg_state;
        this.$message.error("修改状态失败");
      } else {
        this.$message.success("修改状态成功");
      }
    },
    handleDialogVisibleChange() {
      this.dialogVisible = !this.dialogVisible;
    },
    async editDialogVisibleClick(id) {
      const data = await get(`users/${id}`);
      console.log("this is query", data);
      if (data.meta.status !== 200) {
        return this.$message.error("查询用户失败");
      }
      this.editDialogVisible = true;
      this.editDialogForm = data.data;
    },
    DeleteUsersClick(id) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          const data = await deletefn('users/'+ id )
          if(data.meta.status!==200){
            return this.$message.error('删除用户失败！')
          }
          else{
            this.$message.success('删除用户成功！')
            this.getUserList()
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style lang="less" scoped>
</style>