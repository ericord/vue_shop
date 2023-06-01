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
      <el-table border stripe :data="roleList">
        <el-table-column type="expand">
          <template v-slot="scope">
            <el-row
              :class="['bdbottom', i1 === 0 ? 'bdtop' : '']"
              v-for="(item1, i1) in scope.row.children"
              :key="item1.rightId"
            >
              <el-col :span="1">&nbsp;</el-col>
              <el-col :span="4">
                <el-tag>
                  {{ item1.rightName }}
                </el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <el-col :span="19">
                <el-row :class="[i2==0?'':'bdtop']" v-for="(item2, i2) in item1.children">
                  <el-col :span="6">
                    <el-tag type="success">
                      {{ item2.rightName }}
                    </el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                      <el-tag type="warning" v-for="(item3, i3) in item2.children" :key="item3.id">
                      {{ item3.rightName }}
                    </el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作" width="300">
          <template v-slot="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit"
              >编辑</el-button
            >
            <el-button type="danger" size="mini" icon="el-icon-delete"
              >删除</el-button
            >
            <el-button type="warning" size="mini" icon="el-icon-setting"
              >分配权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
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
<style lang="less" scoped>
.el-tag {
  margin: 7px;
}
.bdtop {
  border-top: 1px solid #eee;
}
.bdbottom {
  border-bottom: #eee 1px solid;
}
</style>
