<template>
  <div>
    <!-- 面包屑区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 表格区域 -->
      <el-table :data="userList" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="姓名" prop="userName"> </el-table-column>
        <el-table-column label="邮箱" prop="email"> </el-table-column>
        <el-table-column label="电话" prop="mobile"> </el-table-column>
        <el-table-column label="角色" prop="roleName"> </el-table-column>
        <el-table-column label="状态" prop="status">
          <template v-slot="scope">
            <el-switch
              @change="userStatusChange(scope.row)"
              v-model="scope.row.status"
              :active-value="1"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template v-slot="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
            ></el-button>
            <el-tooltip
              content="管理权限"
              placement="top"
              effect="dark"
              :enterable="false"
            >
              <el-button
                type="warning"
                icon="el-icon-setting"
                size="mini"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
        @size-change="sizeChangeHandle"
        @current-change="currentChangeHandle"
        :page-sizes="[1, 2, 3, 4, 5]"
        :page-size="queryInfo.pageSize"
        :current-page="queryInfo.pageNum"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
      >
      </el-pagination>
    </el-card>
  </div>
</template>
<script>
export default {
  name: 'VueShopUsers',
  created() {
    this.getUserList()
  },

  data() {
    return {
      userList: [],
      total: 0,
      queryInfo: {
        query: '',
        pageNum: 1,
        pageSize: 1,
      },
    }
  },

  mounted() {},

  methods: {
    async getUserList() {
      const { data: res } = await this.$http.get('/users', {
        params: this.queryInfo,
      })
      if (res.meta.status !== 200)
        return this.$message.error('获取用户列表失败')
      this.$message.success('获取用户列表成功')
      this.userList = res.data.users
      this.total = res.data.total
    },
    sizeChangeHandle(nextValue) {
      this.queryInfo.pageSize = nextValue
      this.getUserList()
    },
    currentChangeHandle(nextValue) {
      this.queryInfo.pageNum = nextValue
      this.getUserList()
    },
    async userStatusChange(userInfo) {
      userInfo.status = userInfo.status ? 1 : 2
      const { data: res }  = await this.$http.post('user', userInfo)
      if (res.meta.status !== 200) {
        return this.$message.error('修改用户状态失败')
      }
      this.$message.success('修改用户状态成功')
      this.getUserList()
    },
  },
}
</script>
<style lang="less" scoped>
.el-table {
  margin-top: 15px;
  font-size: 12px;
}
</style>
