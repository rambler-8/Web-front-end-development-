<template>
	<div class="productDetail" v-if='productDet'>
		<div class="nav">
			
		</div>
		<!-- productDet -->
		<!-- {
			id: 1, name: '牙刷', image: '../static/1.jpg', title: '牙刷 软毛 硬毛 舒适', option: [
				{ op: '蓝色软毛', pri: 6, number: 30},
				{ op: '红色软毛', pri: 6, number: 30},
				{ op: '蓝色硬毛', pri: 8, number: 30}
			]
		} -->
		<div class="productImg">
			<img :src="productDet.image" alt="商品图片">
		</div>
		<div class="productOption clearfloat">
			<div class="price" v-if="productDet.option">
				<span>￥ {{productDet.option[changeBor].pri}}</span> 
				<span style="color: #999; font-size: 12px;">余货：{{productDet.option[changeBor].number}}</span>
			</div>
			<div class="option f_left" v-for="(item, index) in productDet.option" :class="{ 'bor':changeBor == index}" @click="bors(index)">
				<!-- {{item}} -->
				{{item.op}}
			</div>
		</div>
		<div class="foot_nav">
			<div class="car f_left"><router-link class="linkCar" style="width: 100%; height: 100%;" to='/car'>购物车</router-link></div>
			<div class="buy_product f_left">立刻购买</div>
			<div class="to_car f_right" @click.prevent="addtoCar({id:productDet.id, op:changeBor})">加入购物车</div>
		</div>
	</div>
</template>

<script>
export default{
	name: 'productDetail',
	data() {
		return {
			//获取传递的参数
			id: parseInt(this.$route.params.id),
			productDet: [],
			changeBor: 0
		}
	},
	computed: {

	},
	methods: {
		setProductDet(id) {
			this.productDet = this.$store.state.productList[id-1];
			// console.log(this.productDet);
		},
		bors(index) {
			this.changeBor = index;
		},
		addtoCar(pro) {
			this.$store.commit('addtoCar', pro);
		}
	},
	mounted() {
		if(this.$store.state.productList == null)
			// console.log(1);
			this.$store.dispatch('getProductList');
		// console.log(this.id);
		// console.log(this.$store.state.productList);
		this.setProductDet(this.id);
	}
}
</script>

<style scoped>
.productDetail{
	position: relative;
	width: 100%;
}
.productDetail > .productImg{
	width: 100%;
}
.productDetail > .productImg > img{
	display: block;
	width: 100%;
}
.productOption{
	width: 100%;
	margin-bottom: 800px;
}
.productOption > .price{
	width: 100%;
	height: 20px;
	text-indent: 15px;
	line-height: 20px;
	color: #764554;
}
.productOption > .option {
	display: block;
	margin-left: 20px;
	margin-top: 10px;
	font-size: 14px;
	height: 20px;
	line-height: 20px;
	background-color: #f2f2f9;
	border-radius: 5px;
	text-align: center;
	min-width: 150px;
}.productOption > .bor{
	border: 1px solid red;
}
.foot_nav{
	position: fixed;
	width: 100%;
	height: 30px;
	bottom: 0px;
	padding-left: 60px;
}
.foot_nav > .car{
	position: absolute;
	top: 0;
	left: 0;
	width: 60px;
	height: 30px;
	background-color: #fff;
}
.foot_nav > .car > .linkCar{
	display: block;
	width: 100%;
	height: 100%;
	font-size: 14px;
	line-height: 30px;
	text-align: center;
	color: #000;
}
.foot_nav > .buy_product{
	width: 50%;
	height: 30px;
	font-size: 18px;
	text-align: center;
	line-height: 30px;
	background-color: blue;
	border: 1px solid #fff;
	border-radius: 10px;
}
.foot_nav > .to_car{
	width: 50%;
	height: 30px;
	font-size: 18px;
	text-align: center;
	line-height: 30px;
	background-color: red;
	border: 1px solid #fff;
	border-radius: 10px;
}
</style>