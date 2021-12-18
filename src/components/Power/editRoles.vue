<template>
  <el-dialog
    title="修改用户信息"
    :visible.sync="editDialogVisible"
    width="30%"
    :before-close="editDialogVisibleChange"
    @close="editDialogClose"
  >
    <el-form
      ref="editDialogFormRef"
      :model="editDialogForm"
      label-width="80px"
      :rules="rules"
    >
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="editDialogForm.roleName"></el-input>
      </el-form-item>
      <el-form-item label="角色描述" prop="roleDesc" >
        <el-input v-model="editDialogForm.roleDesc"></el-input>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="editDialogVisibleChange">取 消</el-button>
      <el-button type="primary" @click="editDialogConfirm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { put } from "../../network/request";
export default {
  props: {
    editDialogVisible: {
      type: Boolean,
    },
    editDialogForm: {
      type: Object,
    },
  },
  methods: {
    editDialogVisibleChange() {
      this.$emit("update:editDialogVisible", false);
    },
    editDialogClose() {
      this.$refs.editDialogFormRef.resetFields();
    },
    editDialogConfirm() {
      this.$refs.editDialogFormRef.validate(async (valid) => {
        if (!valid) {
          this.$message.error("请按要求输入");
          return;
        }
        const data = await put("roles/"+this.editDialogForm.roleId, {
          roleName: this.editDialogForm.roleName,
          roleDesc: this.editDialogForm.roleDesc,
        });
        if (data.meta.status !== 200) {
          this.$message.error("更新失败");
        } else {
          this.$message.success("更新成功");
          this.$parent.getRolesList();
          this.editDialogVisibleChange();
        }
      });
    },
  },
  data() {
    return {
      rules: {
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          }
        ],
      },
    };
  },
};
</script>

<style>
</style>