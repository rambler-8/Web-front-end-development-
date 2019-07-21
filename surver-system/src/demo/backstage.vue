<template>
	<div class="content">
		<backstage-top></backstage-top>
		<div class="midd">
			<div class="main">
				<div class="nav">
					<backstage-nav></backstage-nav>
				</div>
				<div class="nav_right">
					<router-view></router-view>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import backstageTop from '../components/backstageTop.vue';
import backstageNav from '../components/backstageNav.vue';
// import allSurver from '../components/allSurver.vue';
export default{
	name: 'backstage',
	components: {
      backstageTop,
      backstageNav
    },
    mounted() {
		// this.adminLogin = this.$store.state.username;
		// 之后要取消注释
		if(!this.$store.state.adminLogin){
			this.$router.push({path: '/adminLogin'});
		}
	}
}
</script>

<style scoped>
.content{
	width: 100%;
	height: 100%;
	background-color: #eee;
}
.midd{
	width: 100%;
	height: 100%;
}
.main{
	width: 100%;
	min-width: 980px;
	height: 100%;
	margin: 0 auto;
	background-color: #fff;
	position: relative;
}
.main > .nav{
	width: 200px;
	height: 100%;
	background-color: rgb(223, 232, 246);
	border: 1px solid #ccc;
	position: absolute;
}
.main > .nav_right{
	width: 100%;
	height: 100%;
	padding: 15px 0 150px 200px;
}
</style>