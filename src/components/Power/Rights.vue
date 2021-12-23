<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/Welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-table :data="rightsList" style="width: 100%" stripe border>
        <el-table-column type="index" label="#"> </el-table-column>
        <el-table-column prop="authName" label="姓名"> </el-table-column>
        <el-table-column prop="path" label="路径"> </el-table-column>
        <el-table-column prop="level" label="级别">
            <template v-slot="slotProps">
                <el-tag v-if="slotProps.row.level=='0'">一级</el-tag>
            <el-tag type="success" v-if="slotProps.row.level=='1'">二级</el-tag>
            <el-tag type="warning" v-if="slotProps.row.level=='2'">三级</el-tag>
            </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { get } from "../../network/request.js";
export default {
  data() {
    return {
      rightsList: [],
    };
  },
  methods: {
    async getRightsList() {
      const res = await get("rights/list");
      if (res.meta.status != 200) {
        return this.message.error("获取列表失败");
      }
      this.rightsList = res.data;
    },
  },
  created() {
    this.getRightsList();
  },
};
</script>

<style>
</style>