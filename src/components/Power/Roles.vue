<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button
      class="topMargin"
      type="primary"
      @click="dialogVisible = !dialogVisible"
      >添加角色</el-button
    >
    <el-card class="box-card">
      <el-table :data="rolesList" style="width: 100%" stripe border>
        <el-table-column type="expand">
          <template v-slot="slotProps">
            <el-row
              :class="['bdButtom', index === 0 ? 'bdTop' : '', 'vcenter']"
              v-for="(item, index) in slotProps.row.children"
              :key="item.id"
            >
              <el-col :span="5">
                <el-tag closable @close="tagClick(slotProps.row, item.id)">
                  {{ item.authName }}
                </el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <el-col :span="19">
                <el-row
                  v-for="(item1, index1) in item.children"
                  :key="item1.id"
                  :class="[index1 === 0 ? '' : 'bdTop', 'vcenter']"
                >
                  <el-col :span="6">
                    <el-tag
                      type="success"
                      closable
                      @close="tagClick(slotProps.row, item1.id)"
                      >{{ item1.authName }}</el-tag
                    >
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <el-tag
                      v-for="(item2, index2) in item1.children"
                      :key="item2.id"
                      type="warning"
                      closable
                      @close="tagClick(slotProps.row, item2.id)"
                      >{{ item2.authName }}</el-tag
                    >
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index" label="#"> </el-table-column>
        <el-table-column prop="roleName" label="角色名称"> </el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"> </el-table-column>
        <el-table-column prop="level" label="级别">
          <template v-slot="slotProps">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="editDialogVisibleClick(slotProps.row.id)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              icon="el-icon-share"
              size="mini"
              @click="deleteClick(slotProps.row.id)"
              >删除</el-button
            >
            <el-button
              type="warning"
              icon="el-icon-delete"
              size="mini"
              @click="setRightDialogClick(slotProps.row)"
              >分配权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <RolesAdd :dialogVisible.sync="dialogVisible" />
    <EditDialog
      :editDialogVisible.sync="editDialogVisible"
      :editDialogForm="editDialogForm"
    />
    <el-dialog
      title="分配权限"
      :visible.sync="RightDialogVisible"
      width="40%"
    >
      <el-tree
        :data="rightsList"
        :props="defaultProps"
        default-expand-all
        show-checkbox
        :default-checked-keys="defaultCheckedArr"
        node-key="id"
        ref="elTreeRef"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="RightDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateNewRight"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { get, deletefn,post } from "../../network/request.js";
import RolesAdd from "../Power/RolesAdd.vue";
import EditDialog from "../Power/editRoles.vue";
export default {
  components: {
    RolesAdd,
    EditDialog,
  },
  data() {
    return {
      rolesList: [],
      //添加权限显示与否
      dialogVisible: false,
      //编辑权限信息显示与否
      editDialogVisible: false,
      //编辑权限表单信息
      editDialogForm: {},
      //分配权限对话框显示与否
      RightDialogVisible: false,
      //tree的默认规则
      defaultProps: {
          children: 'children',
          label: 'authName'
      },
      //用户权限列表
      rightsList:{},
      //默认勾选的全选列表
      defaultCheckedArr:[],
      newRightsArr:[],
      roleId:null
    };
  },
  methods: {
    //获取角色列表
    async getRolesList() {
      const res = await get("roles");
      if (res.meta.status != 200) {
        return this.message.error("获取列表失败");
      }
      this.rolesList = res.data;
    },
    //权限删除
    tagClick(role, rightId) {
      console.log(role, rightId);
      this.$confirm("此操作将永久删除该权限, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          const data = await deletefn(`roles/${role.id}/rights/${rightId}`);
          console.log(data);
          if (data.meta.status !== 200) {
            return this.$message.error("删除权限失败失败");
          }
          role.children = data.data;
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //编辑角色信息
    async editDialogVisibleClick(id) {
      const data = await get(`roles/${id}`);
      if (data.meta.status !== 200) {
        return this.$message.error("查询用户失败");
      }
      this.editDialogVisible = true;
      this.editDialogForm = data.data;
    },
    //删除该条角色信息
    deleteClick(id) {
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
          const data = await deletefn("roles/" + id);
          if (data.meta.status !== 200) {
            return this.$message.error("删除角色失败！");
          } else {
            this.$message.success("删除角色成功！");
            this.getRolesList();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //分配角色权限
    async setRightDialogClick(role) {
      const data = await get("rights/tree")
      this.roleId=role.id
       if (data.meta.status !== 200) {
        return this.$message.error("获取权限数据失败");
      }
      this.rightsList=data.data
      this.defaultCheckedArr=[]
      this.getDefalutCheckedArr(role,this.defaultCheckedArr)
      this.RightDialogVisible = true;
    },
    //递归寻找第三层节点
    getDefalutCheckedArr(node,arr){
      if(!node.children){
        return arr.push(node.id)
      }
      node.children.forEach(item=>
        this.getDefalutCheckedArr(item,arr))
    },
    async updateNewRight(){
      this.newRightsArr=[...this.$refs.elTreeRef.getCheckedKeys(),...this.$refs.elTreeRef.getHalfCheckedKeys()]
      console.log(this.newRightsArr);
      const rids=this.newRightsArr.join(',')
      console.log(this.roleId);
      const data=await post(`roles/${this.roleId}/rights`,{
        roleId:this.roleId,
        rids:rids
      })
      if (data.meta.status !== 200) {
        return this.$message.error("更新权限数据失败");
      }
      this.RightDialogVisible = false
      this.getRolesList()
    }
  },
  created() {
    this.getRolesList();
  },
};
</script>

<style scoped>
.topMargin {
  margin-top: 20px;
}
.el-tag {
  margin: 8px;
}
.bdButtom {
  border-bottom: 1px solid #eee;
}
.bdTop {
  border-top: 1px solid #eee;
}
.vcenter {
  display: flex;
  align-items: center;
}
</style>