<template>
	<div class="product_car">
		<div class="product">
			{{product}}
			{{totalPrice}}
		<!-- {
			id: 1, name: '牙刷', image: '../static/1.jpg', title: '牙刷 软毛 硬毛 舒适', option: [
				{ op: '蓝色软毛', pri: 6, number: 30},
				{ op: '红色软毛', pri: 6, number: 30},
				{ op: '蓝色硬毛', pri: 8, number: 50}
			], count: 0, opIndex: 0
		} -->
		</div>
	</div>
</template>

<script>
export default{
	name: 'car',
	data() {
		return {
			product: [],
			totalPrice: 0
		}
	},
	methods: {

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
</style>