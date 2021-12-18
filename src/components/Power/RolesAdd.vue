<template>
  <el-dialog
    title="添加用户"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="dialogVisibleChange"
    @close="DialogClose"
  >
    <el-form ref="formRef" :model="addForm" label-width="80px" :rules="rules">
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="addForm.roleName"></el-input>
      </el-form-item>
      <el-form-item label="角色描述" prop="roleDesc" >
        <el-input v-model="addForm.roleDesc"></el-input>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisibleChange">取 消</el-button>
      <el-button type="primary" @click="addUsers">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {post} from '../../network/request'
export default {
  props: {
    dialogVisible: {
      type: Boolean,
    },
  },
  methods: {
    dialogVisibleChange() {
      this.$emit("update:dialogVisible", false);
    },
    DialogClose(){
        this.$refs.formRef.resetFields()
    },
    // 建立新用户
    addUsers(){
        this.$refs.formRef.validate(async valid=>{
            if(!valid){
                this.$message.error('请按要求输入')
                return;
            }
            const data = await post('roles',this.addForm)
            if(data.meta.status!==201){
                this.$message.error('创建失败')
            }
            else{
                this.$message.success('创建成功')
                this.$parent.getRolesList()
                this.dialogVisibleChange()
            }
        })
    }
  },
  data() {
    return {
      addForm: {
        roleName: "",
        roleDesc: "",
      },
      rules: {
        roleName: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          { min: 1, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" },
        ],
      }
    };
  },
};
</script>

<style>
</style>