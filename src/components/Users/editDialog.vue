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
      <el-form-item label="用户名称" prop="username">
        <el-input v-model="editDialogForm.username" disabled></el-input>
      </el-form-item>
      <el-form-item label="用户邮箱" prop="email">
        <el-input v-model="editDialogForm.email"></el-input>
      </el-form-item>
      <el-form-item label="用户手机" prop="mobile">
        <el-input v-model="editDialogForm.mobile"></el-input>
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
        const data = await put("users/"+this.editDialogForm.id, {
          email: this.editDialogForm.email,
          mobile: this.editDialogForm.mobile,
        });
        if (data.meta.status !== 200) {
          this.$message.error("更新失败");
        } else {
          this.$message.success("更新成功");
          this.$parent.getUserList();
          this.editDialogVisibleChange();
        }
      });
    },
  },
  data() {
    var checkEmail = (rule, value, callback) => {
      const regEmail = /^\w+@\w+(\.\w+)+$/; // 验证邮箱的正则表达式
      if (regEmail.test(value)) {
        return callback(); // 合法邮箱
      }
      // 返回一个错误提示
      callback(new Error("请输入合法的邮箱"));
    };
    // 验证手机的规则
    var checkMobeli = (rule, value, callback) => {
      const regMobile = /^1[34578]\d{9}$/;
      if (regMobile.test(value)) {
        return callback();
      }
      // 返回一个错误提示
      callback(new Error("请输入合法的手机号码"));
    };
    return {
      rules: {
        username: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        email: [
          { required: true, message: "请输入用户邮箱", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" },
        ],
        mobile: [
          { required: true, message: "请输入用户手机号码", trigger: "blur" },
          { validator: checkMobeli, trigger: "blur" },
        ],
      },
    };
  },
};
</script>

<style>
</style>