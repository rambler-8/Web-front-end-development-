<template>
	<!-- product_data: [
		{
			id: 1, name: '牙刷', price: 5, number: 20, image: '../static/1.jpg'
		}
	] -->
	<div class="content">
		<div class="header">
	      <div class="header_title">邻家小超市</div>
	      <div class="header_login">
	      	<router-link to='/'>登陆</router-link>	
	      	<router-link to='/'>注册</router-link>
	      </div>
	    </div>
	    <div class="mainbox">
	    	<!-- {{product_data}} -->
	    	<!-- :to="'/product/' + info.id" -->
	    	<ul>
	    		<li v-for='(item, index) in product_data'>
	    			<router-link :to.prevent="'/productDetail/' + item.id" style="display: block; width: 100%; height: 120px;">
	    				<div class="productImg">
	    					<img :src="item.image" alt="商品图片">
	    				</div>
	    				<div class="productInt">
	    					<div class="productTit">{{item.title}}</div>
	    					<div class="productPri">￥{{item.option[0].pri}}</div>
	    					<div class="productNum">数量:{{item.option[0].number}}</div>
	    					<div class="productToC">
	    						<img src="/static/car.png" alt="addToCar" @touchstart.prevent="productAddtoCar(item.id)">
	    					</div>
	    				</div>
	    			</router-link>
	    		</li>
	    	</ul>
	    </div>
	 </div>
</template>

<script>
export default{
	name: 'product',
	data() {
		return {
			product_data: []
		}
	},
	computed: {
		getProduct() {
			this.$store.dispatch('getProductList').then(() => {
          		this.product_data = this.$store.state.productList;
       		})
		}
	},
	watch: {
    	
    },
	methods: {
		productAddtoCar(id) {
			let pro = {
				id: id,
				op: 0
			};
			this.$store.commit('addtoCar', pro)
		}
	},
	mounted () {
      this.getProduct;
    }
}
</script>

<style scoped>
.content{
	width: 100%;
}
.header{
	width: 100%;
	height: 30px;
	position: relative;
}
.header_title{
	background: #0f5;
	width: 100%;
	text-indent: 15px;
}
.header_login{
	position: absolute;
	width: 80px;
	top: 0px;
	right: 15px;
}
.mainbox{
	width: 100%;
}
ul,li{
	width: 100%;
	position: relative;
	height: 120px;
}
li{
	margin-top: 5px;
}
.productImg{
	width: 120px;
	height: 120px;
	position: absolute;
}
.productImg > img{
	display: block;
	width: 100%;
}
.productInt{
	width: 100%;
	height: 120px;
	padding-left: 125px;
}
.productInt > .productTit{
	width: 100%;
	height: 50px;
	font-size: 16px;
	line-height: 25px;
}
.productInt > .productPri, .productInt > .productNum{
	width: 100%;
	height: 25px;
	font-size: 16px;
	line-height: 25px;
}
.productInt > .productToC{
	width: 100%;
	height: 20px;
	padding-right: 25px;
	position: relative;
}
.productInt > .productToC > img{
	display: block;
	width: 20px;
	height: 20px;
	position: absolute;
	top: 0;
	right: 5px;
}
</style>