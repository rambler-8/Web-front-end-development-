<template>
	<div class="main" v-if="product.option">
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
			<i @touchstart="hide"></i>
			<img :src="product.image" alt="图片">
			<p class="pri">￥ {{product.option[product.opIndex].pri}}</p>
			<p class="op"><span style="color: #999">已选：</span>{{product.option[product.opIndex].op}}</p>
		</div>
		<div class="body">
			<div class="kind">类型</div>
			<div class="choose">
				<span v-for="(item, index) in product.option" :class="{'active':product.opIndex == index}" 
				@touchstart="change(index)">{{item.op}}</span>
			</div>
			<div class="count_choose">
				<div class="num">
					<span class="f_left" @touchstart="sub">-</span>
					<input type="text" :value='product.count' class="f_left" disabled="disabled">
					<span class="f_right" @touchstart="add">+</span>
				</div>
				<p>数量</p>
			</div>
		</div>
		<div class="btn" @touchstart="hide">确认</div>
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
			product: this.goods
		}
	},
	methods: {
		hide(){
			// console.log(1);
			this.$emit('hide');
		},
		sub() {
			if(this.product.count > 1)
				this.product.count --;
		},
		add() {
			this.product.count ++;
		},
		change(i) {
			this.product.opIndex = i;
		}
	},
	computed: {
		setData(){
			this.product = this.goods;
		}
	},
	watch: {
	    goods() {
	      	this.setData;
	    }
  	}
}
</script>
<style scoped>
.hide{
	display: none;
}
.body > .choose > .active{
	background-color: #e4393c;
    color: #fff;
}
.main{
	position: fixed;
	bottom: 0px;
	left: 0px;
	z-index: 50;
	width: 100%;
	min-height: 300px;
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
	min-height: 200px;
	background-color: #fff;
}
.btn{
	width: 100%;
	height: 40px;
	line-height: 40px;
	text-align: center;
	font-size: 20px;
	color: #fff;
	background-color: #e4393c;
	position: absolute;
	bottom: 0;
	left:0;
}
.body > .kind{
	width: 100%;
    height: 33px;
    line-height: 33px;
    font-size: 12px;
    color: #333;
    margin: 0 10px;
}
.body > .choose {
	width: 100%;
	min-height: 35px;
}
.body > .choose > span{
	display: inline-block;
    padding: 0 10px;
    min-width: 20px;
    max-width: 270px;
    overflow: hidden;
    height: 30px;
    line-height: 30px;
    float: left;
    text-align: center;
    margin-left: 10px;
    margin-bottom: 10px;
    border-radius: 4px;
    color: #333;
    background-color: #f7f7f7;
    font-size: 14px;
}
.body > .count_choose{
	width: 100%;
	height: 44px;
	padding: 0 10px 13px 10px;
}
.body > .count_choose > p{
	color: #333;
	font-size: 14px;
    height: 30px;
    line-height: 30px;
    text-align: left;
}
.body > .count_choose > .num{
	position: relative;
    z-index: 0;
    height: 100%;
    width: 110px;
    float: right;
    vertical-align: middle;
}
.body > .count_choose > .num > span{
	position: relative;
	display: block;
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    background-color: #f7f7f7;
}
.body > .count_choose > .num > input{
	position: relative;
	display: block;
	width: 48px;
	height: 30px;
	margin: 0 1px;
	background-color: #f7f7f7;
	border: none;
	outline: none;
	text-align: center;
}
</style>