<template>
	<div class="product_car">
		<div class="product">
			<!-- {{product}} -->
			<!-- {{totalPrice}} -->
		<!-- {
			id: 1, name: '牙刷', image: '../static/1.jpg', title: '牙刷 软毛 硬毛 舒适', option: [
				{ op: '蓝色软毛', pri: 6, number: 30},
				{ op: '红色软毛', pri: 6, number: 30},
				{ op: '蓝色硬毛', pri: 8, number: 50}
			], count: 0, opIndex: 0
		} -->
			<div class="product_list">
				<div v-for="(item, index) in product" :key="item.id" class="item">
					<i class="select" :class="{'selected': inselects(index)}" @touchstart="selected(index)"></i>
					<div class="item_img">
						<img :src="item.image" alt="图片">
					</div>
					<div class="content">
						<div class="title">{{item.title}}</div>
						<div class="op">
							<p @touchstart="selectop(index)">{{item.option[item.opIndex].op}}</p>
						</div>
						<div class="line clearfloat">
							<div class="price f_left">￥ {{item.option[item.opIndex].pri}}</div>
							<div class="count" style="color: #444; font-size: 14px;">
								<span class="f_left" @touchstart="sub(index)">-</span>
								<input type="text" :value='item.count' class="f_left" disabled="disabled">
								<span class="f_right" @touchstart="add(index)">+</span>
							</div>
						</div>
					</div>
				</div>
				<div class="empty" v-show="!product.length">太棒了，购物车空空如也 <br/> 快去挑选商品吧</div>
			</div>
			<!-- 选择商品类型块 -->
			<choice :goods="goods" v-show="show" @hide="change"></choice>
			<!--  底部结算块 -->
			<div class="fixbar" v-show="product.length">
				<i class="icon" :class="{'selected':product.length == selects.length}" @touchstart="selecteds()">全选</i>
				<div class="total">
					<p class="pri">总计：<strong style="color:#e4393c">￥{{totalPri}}</strong></p>
					<a href="javascript:;" :class="{'disabled': !selects.length}">去结算</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import choice from './choice.vue';
export default{
	name: 'car',
	components: {
      choice
    },
	data() {
		return {
			product: [],
			goods: {},
			show: false,
			selects: []
		}
	},
	methods: {
		selectop(index) {
			this.goods = this.product[index];
			this.show = true;
			// console.log(this.goods);
		},
		change(){
			this.show = !this.show;
		},
		inselects(index){
			if(this.selects.indexOf(index)>-1)
				return true;
			return false;
		},
		selected(index){
			//如果i在selects里面，说明此时是想取消选中
			for(var i=0; i<this.selects.length; i++){
				if(this.selects[i] == index){
					this.selects.splice(i,1);
					return;
				};
			};
			//此时是想选中
			this.selects.push(index);
			// console.log(this.selects);
		},
		selecteds(){
			//没有参数说明是全选和全不选
			if(this.selects.length > 0){
				this.selects.splice(0,this.selects.length);
				return;
			}
			//全选
			this.selects = [];
			for(var i=0; i<this.product.length; i++){
				this.selects.push(i);
			}
		},
		//购买数量add sub
		sub(index) {
			if(this.product[index].count > 1)
				this.product[index].count --;
		},
		add(index) {
			this.product[index].count ++;
		}
	},
	computed: {
		getCarList() {
			this.product = this.$store.state.carList;
		},
		totalPri() {
			var totalPrice = 0;
			for(let i=0; i<this.selects.length; i++){
				let ind = this.selects[i];
				let item = this.product[ind]
				let index = item.opIndex;
				totalPrice += item.option[index].pri * item.count;
			}
			// for(let i=0; i<selects.length; i++){
			// 	this.product.forEach(item => {
			// 		let index = item.opIndex;
			// 		totalPrice += item.option[index].pri * item.count;
			// 	})
			// }
			return totalPrice;
		}
	},
	mounted(){
		this.getCarList;
		this.totalPri;
	}
}
</script>
<style scoped>
.product_list > .item > .selected:after{
	background-image: url(/static/cselect.png) !important;
}
.product_car{
	width: 100%;
}
.product{
	width: 100%;
}
.product_list{
	width: 100%;
}
.product_list > .item{
	width: 100%;
	min-height: 120px;
	padding: 5px 8px 10px 140px;
	position: relative;
}
.product_list > .item > .select{
	display: block;
	position: absolute;
	top: 0;
	left: 0;
	width: 50px;
	height: 100%;
}
.product_list > .item > .select:after{
	position: absolute;
    left: 50%;
    top: 30px;
    content: "";
    display: block;
    width: 20px;
    height: 20px;
    margin-left: -10px;
    background-image: url(/static/select.png);
    background-size: 20px;
}
.product_list > .item > .item_img{
	position: absolute;
	top: 0px;
	left: 50px;
	width: 90px;
	padding-right: 15px;
	height: 100%;
}
.product_list > .item > .item_img > img{
	position: absolute;
	top: 15px;
	left: 0px;
	width: 75px;
	height: 75px;
}
.content{
	width: 100%;
	height: 100%;
}
.content .title{
	width: 100%;
	height: 50px;
	margin: 3px 5px;
	font-size: 16px;
	color: #777;
	line-height: 25px;
	overflow: hidden;	
}
.content > .op{
	width: 100%;
	height: 20px;
	border: 1px solid #e5e5e5;
	padding-right: 14px;
	position: relative;
}
.content > .op:after{
	content: "";
    display: inline-block;
    vertical-align: middle;
    margin-top: -2px;
    width: 6px;
    height: 10px;
    background-image: url(/static/a.svg);
    background-repeat: no-repeat;
    background-size: 100%;
    -webkit-transform: rotate(90deg);
    transform: rotate(90deg);
    position: absolute;
    top: 50%;
    right: 4px;
    margin-top: -5px;
}
.content > .op > p{
	width: 100%;
	height: 100%;
	overflow: hidden;
	font-size: 14px;
	padding-left: 5px;
	line-height: 18px;
}
.content> .line{
	position: relative;
	width: 100%;
	height: 30px;
	margin-top: 5px;
}
.content >.line > .price{
	width: 80px;
	height: 20px;
	color: red;
	padding-right: 10px;
}
.content > .line > .count{
	position: absolute;
	right: 0;
	top: 0;
	width: 110px;
	height: 25px;
}
.content > .line > .count > span{
	position: relative;
	display: block;
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    background-color: #f7f7f7;
}
.content > .line > .count > input{
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
.product_list > .empty{
	width: 100%;
	height: 100px;
	padding-top: 20px;
	background-color: #eee;
	text-align: center;
}
.fixbar{
	width: 100%;
	height: 50px;
	position: fixed;
	bottom: 0;
	left: 0;
}
.fixbar > .total{
	position: absolute;
	top: 0;
	right: 0;
	height: 100%;
}
.fixbar > .total > a{
	float: right;
    display: block;
    width: 110px;
    height: 50px;
    margin-left: 10px;
    line-height: 50px;
    font-size: 16px;
    text-align: center;
    font-weight: 700;
    color: #fff;
    background-color: #e4393c;
}
.fixbar > .total > .disabled{
	cursor: default;
    color: #999;
    background: #d7d7d7;
}
.fixbar > .total > .pri{
	float: left;
	height: 100%;
	line-height: 50px;
	font-weight: 700;
}
.fixbar > .icon{
	position: absolute;
	display: block;
	width: 40px;
	height: 50px;
	padding-top: 35px;
	font-size: 10px;
	font-style: normal;
	text-align: center;
	color: #999;
}
.fixbar > .icon:after{
	position: absolute;
    left: 50%;
    top: 7px;
    content: "";
    display: block;
    width: 20px;
    height: 20px;
    margin-left: -10px;
    background-image: url(/static/select.png);
    background-size: 20px;
}
.fixbar > .selected:after{
	background-image: url(/static/cselect.png);
}
</style>