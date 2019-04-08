<template>
<el-table
    :data="surver"
    height="700"
    style="width: 100%">
    <el-table-column
      prop="name"
      label="问卷名称"
      width="300">
    </el-table-column>
    <el-table-column label="操作">
		<template slot-scope="scope">
			<el-button
	  			size="mini"
	  			@click="answerSurver(scope.row)">参与问卷
	  		</el-button>
		</template>
	</el-table-column>
</el-table>
</template>

<script>
export default {
	data(){
		return {
			id: parseInt(this.$route.params.id),
			surver: []
		}
	},
	methods: {
		answerSurver(row) {
        	console.log(row.surverid);
        	this.$router.push({path: '/user/answerSurver/'+row.surverid});
      	}
	},
	mounted() {
		this.$http.get('/api/getAllReleaseSurver').then((response) =>{
			// console.log(response);
			this.surver = response.body;
		}).catch((reject) =>{
			console.log(reject);
		})
	}
}
</script>

<style>
.allReleaseSurver{
	width: 100%;
	height: 100%;
}
</style>