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
          <el-input
            placeholder="请输入内容"
            v-model="queryInfo.userName"
            clearable
            @clear="getUserList"
          >
            <el-button
              @click="getUserList"
              slot="append"
              icon="el-icon-search"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true"
            >添加用户</el-button
          >
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
              @click="showEditDialog(scope.row)"
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

    <!-- 添加用户弹框 -->
    <el-dialog
      title="添加用户"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="addDialogClosed"
    >
      <!-- 内容区域 -->
      <el-form
        :rules="addUserRules"
        ref="addUserRef"
        :model="addForm"
        label-width="70px"
      >
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="addForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email" type="email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <!-- 按钮区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button type="info" @click="addDialogVisible = flase"
          >取消</el-button
        >
        <el-button type="primary" @click="addUser">确定</el-button>
      </span>
    </el-dialog>

    <!-- 修改用户弹框 -->
    <el-dialog
      title="修改用户"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="editDialogClosed"
    >
      <!-- 内容区域 -->
      <el-form
        :rules="addUserRules"
        ref="editUserRef"
        :model="editForm"
        label-width="70px"
      >
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="editForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="editForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email" type="email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <!-- 按钮区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button type="info" @click="editDialogVisible = flase"
          >取消</el-button
        >
        <el-button type="primary" @click="editUser">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'VueShopUsers',
  created() {
    this.getUserList()
  },

  data() {
    var checkEmail = (rule, value, cb) => {
      const regEmail =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (regEmail.test(value)) {
        return cb()
      }
      cb(new Error('请输入合法的邮箱'))
    }
    var checkMobile = (rule, value, cb) => {
      const regMobile =
        /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/
      if (regMobile.test(value)) {
        return cb()
      }
      cb(new Error('请输入合法的手机号'))
    }
    return {
      userList: [],
      total: 0,
      queryInfo: {
        userName: '',
        pageNum: 1,
        pageSize: 1,
      },
      addDialogVisible: false,
      addForm: {
        userName: '',
        password: '',
        email: '',
        mobile: '',
      },
      editDialogVisible: false,
      editForm: {
        id: '',
        userName: '',
        password: '',
        email: '',
        mobile: '',
      },
      addUserRules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 11, message: '请输入3~11个字符', trigger: 'change' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '请输入6~15个字符', trigger: 'change' },
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'change' },
        ],
        mobile: [
          { required: true, message: '请输手机号', trigger: 'change' },
          { validator: checkMobile, trigger: 'change' },
        ],
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
      // this.$message.success('获取用户列表成功')
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
      const { data: res } = await this.$http.post('user', userInfo)
      if (res.meta.status !== 200) {
        return this.$message.error('修改用户状态失败')
      }
      this.$message.success('修改用户状态成功')
      this.getUserList()
    },
    addDialogClosed() {
      this.$refs.addUserRef.resetFields()
    },
    editDialogClosed() {
      this.$refs.editUserRef.resetFields()
    },
    addUser() {
      this.$refs.addUserRef.validate(async (valid) => {
        if (!valid) return
        const { data: res } = await this.$http.post('user', this.addForm)
        if (res.meta.status != 200) return this.$message.error('添加用户失败')
        this.$message.success('添加用户成功')
        this.getUserList()
        this.addDialogVisible = false
      })
    },
    editUser() {
      this.$refs.editUserRef.validate(async (valid) => {
        if (!valid) return
        const { data: res } = await this.$http.post('user', this.editForm)
        if (res.meta.status != 200) return this.$message.error('修改用户失败')
        this.$message.success('修改用户成功')
        this.getUserList()
        this.editDialogVisible = false
      })
    },
    showEditDialog(row) {
      this.editForm = row
      console.log(this.editForm)
      this.editDialogVisible = true
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
