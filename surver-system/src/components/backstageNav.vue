<!-- 问卷左侧的菜单组件 -->
<template>
<el-row class="tac">
  <el-col :span="24">
    <el-menu
      :default-active=routes()
      :default-openeds="['1','2']"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      @select="handleselect"
      background-color="#eeeeee"
      text-color="#15428b"
      active-text-color="#fff">
      <el-submenu index="1">
        <template slot="title">
          <span>问卷管理</span>
        </template>
        <el-menu-item index="1-1">所有问卷</el-menu-item>
        <!-- <el-submenu index="1-1">
        <template slot="title">所有问卷</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu> -->

        <el-menu-item index="1-2">新建问卷</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <span>用户管理</span>
        </template>
        <el-menu-item index="2-1">用户信息</el-menu-item>
        <el-menu-item index="2-2">添加用户</el-menu-item>
      </el-submenu>
<!--       <el-submenu index="3">
        <template slot="title">
          <span>退出</span>
        </template>
      </el-submenu> -->
      <el-menu-item index="3">
        <span slot="title">退出</span>
      </el-menu-item>
    </el-menu>
  </el-col>
</el-row>
</template>

<script>
  export default {
    methods: {
      // test(){
      //   console.log(1);
      // }
      // 菜单打开
      handleOpen(key, keyPath) {
        // console.log(key);
      },
      // 菜单关闭
      handleClose(key, keyPath) {
        // console.log(key, keyPath);
      },
      // 菜单选择
      handleselect(index, indexPath) {
        // console.log(index);
        if(3 == index){
          this.$router.push({path: '/'});
        }
        if(indexPath[1] == "1-1"){
          this.$router.push({path: '/admin/allsurver'});
        }else if(indexPath[1] == "1-2"){
          this.$router.push({path: '/admin/createSurver'});
        }else if(indexPath[1] == "2-1"){
          this.$router.push({path: '/admin/allUser'});
        }else if(indexPath[1] == "2-2"){
          this.$router.push({path: '/admin/addUser'});
        }
      },
      routes(){
        // if(this.$route.path.replace('/', ''))
        let path = this.$route.path.split('/')
        if("allsurver" == path[2] || path[3] && "0" != path[3]){
          return "1-1"
        }else if("editsurver" == path[2]){
          return "1-2"
        }else if("allUser" == path[2]){
          return "2-1"
        }else if("addUser" == path[2]){
          return "2-2"
        }
      }
    }
  }
</script>

<style>
.el-menu-item{
  border-bottom: 1px solid blue;
}
.el-submenu__title{
  border-bottom: 1px solid blue;
}
.is-active{
  background-color: #999 !important;
}
</style>