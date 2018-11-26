<template>
	<div class="topnav">
		<div class="backone" @touchstart="goBack"></div>
		<div class="tit">{{tit}}</div>
		<div class="right_nav" @touchstart="show"></div>
		<div class="header_nav" :class="{'hide': shownav}">
			<router-link to='/product'><span>首页</span></router-link>
			<router-link to='/car'><span>购物车</span></router-link>
			<router-link to='/'><span>订单</span></router-link>
		</div>
	</div>
</template>
<script>
export default{
	name: "commonnav",
	data(){
		return {
			tit: this.heading,
			shownav: true
		}
	},
	props:{
		heading: {
			type: String,
			default: ""
		}
	},
	methods: {
		show() {
			console.log(1);
			this.shownav = !this.shownav;
		},
		goBack () {
	      	window.history.length > 1
	        ? this.$router.go(-1)
	        : this.$router.push('/')
    }
	}
}
</script>
<style scoped>
.topnav{
	position: relative;
	width: 100%;
	height: 44px;
}
.topnav > .tit{
	width: 100%;
	height: 44px;
	padding: 0 44px;
	font-size: 20px;
	text-align: center;
	line-height: 44px;
	overflow: hidden;
}
.topnav > .backone{
	position: absolute;
	top: 0;
	left: 0;
	width: 44px;
	height: 44px;
	background: url(/static/backone.png) no-repeat 50%;
	background-size: 20px 20px;
}
.topnav > .right_nav{
	position: absolute;
	top: 0;
	right: 0;
	width: 44px;
	height: 44px;
	background: url(/static/nav.png) no-repeat 50%;
	background-size: 20px;
}
.topnav > .header_nav{
	position: absolute;
	top: 50px;
	right: 10px;
	width: 85px;
	z-index: 50;
}
.topnav > .header_nav span{
	display: block;
	width: 100%;
	height: 40px;
	line-height: 38px;
	border-bottom: 2px solid #666;
	font-size: 16px;
	text-indent: 5px;
	background-color: #000;
	color: #fff;
}
.topnav > .header_nav:before{
    position: absolute;
    top: -5px;
    right: 7px;
    content: "";
    width: 0;
    height: 0;
    border-width: 0 5px 5px;
    border-style: solid;
    border-color: transparent transparent rgba(0,0,0,.9);
}
.topnav > .hide{
	display: none;
}
</style>	