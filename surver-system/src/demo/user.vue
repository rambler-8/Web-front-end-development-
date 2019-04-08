<template>
<div class="content">
	<div class="top">
		<div class="wellcome">欢迎：{{username}}</div>
	</div>
	<div class="nav">
		<el-menu
			:default-active=routes()
			class="el-menu-demo"
			mode="horizontal"
			@select="handleSelect"
			background-color="#666"
			text-color="#fff"
			active-text-color="#ffd04b">
			<el-menu-item index="1">参与问卷</el-menu-item>
			<el-menu-item index="2">修改信息</el-menu-item>
			<el-menu-item index="3">退出登录</el-menu-item>
		</el-menu>
	</div>
	<div class="nav_con">
		<router-view></router-view>
	</div>
</div>
</template>

<script>
export default{
	data() {
		return {
			username: "",
		}
	},
	methods: {
		handleSelect(key, keyPath) {
       		// console.log(key, keyPath);
       		if(1 == key){
       			this.$router.push({path: '/user/allReleaseSurver'})
       		}else if(2 == key){
       			this.$router.push({path: '/user/editInformation'})
       		}else{
       			this.$router.push({path: '/userLogin'})
       		}
        },
        routes(){
        // if(this.$route.path.replace('/', ''))
	        let path = this.$route.path.split('/');
	        // console.log(path);
	        if("allReleaseSurver" == path[2] || "answerSurver" == path[2]){
		        return "1";
		    }else{
		    	return "2";
		    }
	    }
	},
	mounted() {
		this.username = this.$store.state.username;
		//之后要取消注释
		if(!this.username){
			this.$router.push({path: '/userLogin'});
		}
	}
}
</script>

<style>
.content {
	width: 980px;
	height: 100%;
	/*background-color: #000;*/
	min-width: 980px;
	margin: 0 auto;
	overflow: hidden;
}
.top {
	width: 100%;
	height: 40px;
	background-color: #37718d33;
}
.wellcome{
	width: 100%;
	height: 100%;
	font-size: 18px;
	padding: 9px 0 9px 10px;
}
.nav{
	width: 100%;
	height: 61px;
}
.nav_con{
	position: relative;
	width: 100%;
	height: 100%;
	/*min-height: 500px;*/
}
</style>