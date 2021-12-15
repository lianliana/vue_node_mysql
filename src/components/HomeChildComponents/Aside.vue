<template>
  <el-row class="tac">
    <el-col :span="24">
      <el-menu  class="el-menu-vertical-demo" unique-opened :router="true" >
        <el-submenu
          :index="item.id + ''"
          v-for="(item,index) in menusList"
          :key="item.id"
        >
          <template slot="title">
            <img class="iconImg" :src="iconArray[index]" alt="">
            <span>{{ item.authName }}</span>
          </template>
          <el-menu-item
            :index="'/'+subItem.path + ''"
            v-for="subItem in item.children"
            :key="subItem.id"
            
          >
            <i class="el-icon-menu"></i>
            {{ subItem.authName }}
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      iconArray:[
        require('../../assets/iconImg1.svg'),
        require('../../assets/iconImg2.svg'),
        require('../../assets/iconImg3.svg'),
        require('../../assets/iconImg4.svg'),
        require('../../assets/iconImg5.svg')
      ]
    };
  },
  props: {
    menusList: {
      type: Array,
    },
  },
};
</script>

<style lang="less" scoped>
.iconImg{
  width: 17px;
  height: 17px;
}
</style>