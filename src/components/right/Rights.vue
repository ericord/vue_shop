<template>
  <div>
    <!-- 面包屑区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card>
      <el-table :data="rightList" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="权限" prop="rightName"> </el-table-column>
        <el-table-column label="路径" prop="path"> </el-table-column>
        <el-table-column label="权限等级" prop="level">
          <template v-slot="scope">
            <el-tag :type="['','success','warning'][scope.row.level-1]">{{['一级','二级','三级'][scope.row.level-1]}}</el-tag>  
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
export default {
  name: 'VueShopRights',

  data() {
    return {
      total: 0,
      queryInfo: {
        pageNum: 1,
        pageSize: 1,
      },
      rightList:[]
    }
  },
  created() {
    this.getRightList()
  },
  mounted() {},

  methods: {
    async getRightList() {
      const { data: res } = await this.$http.get('/rights')
      if (res.meta.status !== 200)
        return this.$message.error('获取权限列表失败')
      // this.$message.success('获取用户列表成功')
      this.rightList = res.data.rights
      // this.total = res.data.total
    },
  },
}
</script>
<style lang="less" scoped></style>
