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
				<div v-for="(item, index) in product" class="item">
					<i class="select"></i>
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
							<div class="count f_right">{{item.count}}</div>
						</div>
					</div>
				</div>
				<div v-show="!product.length">购物车为空</div>
			</div>
			<!-- <choice :goods="goods"></choice> -->
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
			totalPrice: 0,
			goods: {}
		}
	},
	methods: {
		selectop(index) {
			this.goods = this.product[index];
			// console.log(this.goods);
		}
	},
	computed: {
		getCarList() {
			this.product = this.$store.state.carList;
		},
		totalPri() {
			this.product.forEach(item => {
			let index = item.opIndex;
			this.totalPrice += item.option[index].pri * item.count;
			})
		}
	},
	mounted(){
		this.getCarList;
		this.totalPri;
	}
}
</script>
<style scoped>
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
	height: 200px;
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
	width: 100%;
	height: 30px;
	margin-top: 5px;
}
.content >.line > .price{
	width: 50%;
	height: 20px;
	color: red;
	padding-right: 10px;
}
.content > .line > .count{
	width: 50%;
	height: 25px;
}
</style>