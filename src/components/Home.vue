<template>
  <el-container>
    <el-header>
      <div>
        <img class="SZTU_img" src="../assets/SZTU_w.png" alt="" />
        <span>深技大后台管理系统</span>
      </div>
      <el-button type="info" round @click="quitClick">退出</el-button>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <MyAside :menusList="menusList"> </MyAside>
      </el-aside>

      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import MyAside from "../components/HomeChildComponents/Aside.vue";
import { get } from "../network/request";

export default {
  data(){
    return{
      menusList:[]
    }
  },
  components: {
    MyAside
  },
  created(){
    this.getMenuList()
  },
  methods: {
    quitClick() {
      this.$router.push("/login");
      window.sessionStorage.clear();
    },
    async getMenuList(){
       const data =await get('menus')
       if(data.meta.status!=200) return this.$message.errror(data.meta.msg)
       this.menusList=data.data
        // console.log(this.menusList);
    }
  },
};
</script>

<style lang="less" scoped>
.el-container {
  .el-header {
    padding-left: 0;
    background-color: #1d2e6e;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    div {
      display: flex;
      text-align: center;
      align-items: center;
    }
  }
  width: 100%;
  height: 100%;
  .el-aside {
    height: 100%;
    background-color: white;
  }
}
.SZTU_img {
  width: 60px;
  height: 60px;
}
</style>