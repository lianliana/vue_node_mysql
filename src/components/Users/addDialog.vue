<template>
  <el-dialog
    title="添加用户"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="dialogVisibleChange"
    @close="DialogClose"
  >
    <el-form ref="formRef" :model="addForm" label-width="80px" :rules="rules">
      <el-form-item label="用户名称" prop="username">
        <el-input v-model="addForm.username"></el-input>
      </el-form-item>
      <el-form-item label="用户密码" prop="password" >
        <el-input v-model="addForm.password" type="password"></el-input>
      </el-form-item>
      <el-form-item label="用户邮箱" prop="email">
        <el-input v-model="addForm.email"></el-input>
      </el-form-item>
      <el-form-item label="用户手机" prop="mobile">
        <el-input v-model="addForm.mobile"></el-input>
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
            const data = await post('users',this.addForm)
            if(data.meta.status!==201){
                this.$message.error('创建失败')
            }
            else{
                this.$message.success('创建成功')
                this.$parent.getUserList()
                this.dialogVisibleChange()
            }
        })
    }
  },
  data() {
    var checkEmail = (rule, value, callback) => {
      const regEmail = /^\w+@\w+(\.\w+)+$/ // 验证邮箱的正则表达式
      if (regEmail.test(value)) {
        return callback() // 合法邮箱
      }
      // 返回一个错误提示
      callback(new Error('请输入合法的邮箱'))
    }
    // 验证手机的规则
    var checkMobeli = (rule, value, callback) => {
      const regMobile = /^1[34578]\d{9}$/
      if (regMobile.test(value)) {
        return callback()
      }
      // 返回一个错误提示
      callback(new Error('请输入合法的手机号码'))
    }
    return {
      addForm: {
        username: "",
        password: "",
        email: "",
        mobile: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入用户密码", trigger: "blur" },
          { min: 6, max: 15, message: "长度在 6 到 15 个字符", trigger: "blur" },
        ],
        email: [
          { required: true, message: "请输入用户邮箱", trigger: "blur" } ,
          { validator: checkEmail, trigger: 'blur' } 
        ],
        mobile: [
          { required: true, message: "请输入用户手机号码", trigger: "blur" },
          { validator: checkMobeli, trigger: 'blur' }
        ],
      }
    };
  },
};
</script>

<style>
</style>