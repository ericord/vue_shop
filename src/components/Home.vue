<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../assets/heima.png" alt="" />
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px" :width="isCollapse?'64px':'200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!-- 侧边栏菜单区域 -->
        <el-menu
          background-color="#313743"
          text-color="#fff"
          active-text-color="#409eff"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
        >
          <el-submenu :index="item.id" v-for="item in menuList" :key="item.id">
            <!-- 一级菜单的模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <!-- <i :class="iconObj[item.id]"></i> -->
              <i :class="iconObj[item.id]"></i>
              <!-- 文本 -->
              <span>{{ item.name }}</span>
            </template>

            <!-- 二级菜单 -->
            <el-menu-item
              index="1-4-1"
              v-for="i in item.childs"
              :key="i.id"
              :index="i.id"
            >
              <!-- 图标 -->
              <i class="el-icon-menu"></i>
              <!-- 文本 -->
              <span>{{ i.name }}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧内容主题 -->
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  name: 'VueShopHome',

  data() {
    return {
      // 左侧菜单数据
      menuList: [],
      iconObj: {
        '/001': 'icon-font el-icon-user-solid',
        '/002': 'icon-font el-icon-check',
        '/003': 'icon-font el-icon-s-shop',
        '/004': 'icon-font el-icon-s-order',
        '/005': 'icon-font el-icon-s-marketing',
      },
      isCollapse: false,
    }
  },

  mounted() {},
  created() {
    this.getMenuList()
  },
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    async getMenuList() {
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) return this.$message.error('获取菜单失败')
      this.menuList = res.data
      console.log(res)
    },
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
  },
}
</script>
<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: #2f3637;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
  img {
    height: 60px;
  }
}
.el-aside {
  background-color: #313743;
  .el-menu {
    border-right: none;
  }
}
.el-main {
  background-color: #e9edf1;
}

.icon-font {
  margin-right: 10px;
}
.toggle-button {
  background-color: #4a5064;
  line-height: 24px;
  font-size: 10px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;

  // height: 20px;
  // width: 100%;
}
</style>
