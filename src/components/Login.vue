<template>
  <div class="loginWrapper">
    <div class="loginBox">
      <div class="avatar_box">
        <img src="../assets/SZTU.png" alt="" />
      </div>
      <el-form ref="LoginFormRef" :model="LoginForm" :rules="rules" class="elFrom" label-width="80px">
        <el-form-item label="用户账号" prop="username">
          <el-input v-model="LoginForm.username" prefix-icon="el-icon-s-custom"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="password">
          <el-input v-model="LoginForm.password" type="password" prefix-icon="el-icon-lock"></el-input>
        </el-form-item>
        <el-button type="primary" round @click="GoLogin">登录</el-button>
        <el-button type="info" round @click="LoginFormReset">重置</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import {get,post} from '../network/request.js'
export default {
  data(){
    return {
      LoginForm:{
        username:'admin',
        password:'123456'
      },
      rules:{
        username:[
          { required: true, message: '请输入您的名称', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password:[
          { required: true, message: '请输入您的密码', trigger: 'blur' },
            { min: 6, max: 15, message: '密码长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods:{
    LoginFormReset(){
      this.$refs.LoginFormRef.resetFields();
    },
    GoLogin(){
      this.$refs.LoginFormRef.validate(async valid=>{
        const result = await post('http://127.0.0.1:8888/api/private/v1/login',this.LoginForm)
        console.log(result);
        if(result.meta.status!== 200) this.$message.error('登录失败');
        else {
          this.$message.success('登录成功');
          window.sessionStorage.setItem('token',result.data.token)
          this.$router.push('/home')
        }
      })
    }
  }
};
</script>

<style lang="less" scoped>
.loginWrapper {
  background-color: #023692;
  height: 100%;
  width: 100%;
}
label {
  display: inline;
}
.elFrom {
  position: absolute;
  top: 60px;
  width: 300px;
  left: 80px;
   .el-button {
    margin-left: 65px;
  } 
}
.loginBox {
  width: 500px;
  height: 300px;
  background-color: #fff;
  border-radius: 15px;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  margin: auto auto;
}
.avatar_box {
  width: 110px;
  height: 110px;
  border-radius: 50%;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  top: -50px;
  background-color: #fff;
   img {
    width: 100%;
    height: 100%;
  } 
}
</style>