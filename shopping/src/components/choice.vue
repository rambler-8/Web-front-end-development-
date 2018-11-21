<template>
	<div class="main" :class="{ 'hide':hide}">
		<div class="header">
			<!-- {{product}} -->
			<!-- {
			id: 1, name: '牙刷', image: '../static/1.jpg', title: '牙刷 软毛 硬毛 舒适', option: [
				{ op: '蓝色软毛', pri: 6, number: 30},
				{ op: '红色软毛', pri: 6, number: 30},
				{ op: '蓝色硬毛', pri: 8, number: 50}
			], count: 0, opIndex: 0
			} -->
			<!-- 返回 -->
			<i @touchstart="hide=!hide"></i>
			<img :src="product.image" alt="图片">
			<p class="pri">￥ {{product.option[product.opIndex].pri}}</p>
			<p class="op"><span style="color: #999">已选：</span>{{product.option[product.opIndex].op}}</p>
		</div>
		<div class="body"></div>
	</div>
</template>
<script>
export default{
	name: 'choice',
	props: {
		goods: {
			type: Object,
			default: {}
		}
	},
	data() {
		return {
			product: this.goods,
			hide: true
		}
	},
	methods: {

	},
	computed: {
		setData(){
			this.product = this.goods;
		}
	},
	watch: {
	    goods() {
	    	// console.log(1);
	      	this.setData;
	    }
  	}

}
</script>
<style scoped>
.hide{
	display: none;
}
.main{
	position: fixed;
	bottom: 0px;
	left: 0px;
	z-index: 50;
	width: 100%;
	height: 400px;
}
.header{
	width: 100%;
	height: 80px;
	padding: 0 0 10px 110px;
	position: relative;
	background-color: #fff;
}
.header img{
	display: block;
	width: 90px;
	height: 90px;
	position: absolute;
	top: -10px;
	left: 10px;
}
.header > .pri{
	width: 100%;
	height: 40px;
	font-style: 12px;
	color: #e4393c;
	line-height: 40px;
}
.header > .op{
	word-break: break-all;
    font-size: 12px;
    height: 20px;
    color: #333;
    line-height: 20px;
    padding-right: 10px;
}
.header > i{
	display: block;
	width: 40px;
	height: 40px;
	position: absolute;
	top: 0;
	right: 0;
}
.header > i{
	content: "";
    position: absolute;
    top: 10px;
    right: 10px;
    width: 17px;
    height: 17px;
    background: url(/static/back.png) no-repeat 1px 1px;
    background-size: 15px;
}
.body{
	width: 100%;
	height: 320px;
	background-color: #fff;
}
</style>