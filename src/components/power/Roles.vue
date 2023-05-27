<template>
  <div>
    <!-- 面包屑区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary">添加角色</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
export default {
  name: 'VueShopRoles',

  data() {
    return {
      roleList: [],
    }
  },
  created() {
    this.getRoleList()
  },
  mounted() {},

  methods: {
    async getRoleList() {
      const { data: res } = await this.$http.get('/role/tree')
      if (res.meta.status !== 200)
        return this.$message.error('获取角色列表失败')
      // this.$message.success('获取用户列表成功')
      this.roleList = res.data.roles
      console.log(this.roleList)
      // this.total = res.data.total
    },
  },
}
</script>
<style lang="less" scoped></style>
