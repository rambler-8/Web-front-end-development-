<!-- 所有问卷查看组件 -->
<template>
<div class="navwarp">
	<div class="surver_table" v-if="allsurver">
		<!-- {{allsurver}} -->
		<!-- [ { "_id": "5c05e4ebe2e61352c4d27d4c", "name": "大学生睡眠质量调查", "createTime": "2018-12-4", "isrelease": "否", "endtime": "1553961600000" } ] -->
		 <el-table
		    :data="allsurver"
		    height="700"
		    border
		    style="width: 100%">
		    <el-table-column
		    	type="selection">
		    </el-table-column>
		    <el-table-column
		      prop="name"
		      label="问卷名称"
		      width="180">
		    </el-table-column>
		    <el-table-column
		      prop="createTime"
		      label="创建时间">
		    </el-table-column>
		     <el-table-column
		      prop="isrelease"
		      label="是否发布"
		      width="120">
		    </el-table-column>
		     <el-table-column
		      label="结束时间">
		    	<template slot-scope="scope">
    				{{ scope.row.endtime || '暂无' }}
  				</template>
		    </el-table-column>
		    <el-table-column label="操作" width="370">
      			<template slot-scope="scope">
        		<el-button
          			size="mini"
          			@click="handleEdit(scope.row)">编辑/查看
          		</el-button>
        		<el-button
         			size="mini"
          			type="danger"
          			@click="handleDelete(scope.$index, scope.row)">删除
          		</el-button>
          		<el-button
          			size="mini"
          			@click="handleRelease(scope.$index, scope.row)"
          			>发布
          		</el-button>
          		<el-button
          			size="mini"
          			type="primary"
          			@click="handleResult(scope.$index, scope.row)"
          			>查看调查结果
          		</el-button>
      			</template>
    		</el-table-column>
  		</el-table>
	</div>
</div>
</template>

<script>
export default{
	inject: ['reload'],
	data(){
		return {
			allsurver: []
		}
	},
	methods: {
		//编辑问卷，传入编号，直接跳转到对应的问卷详细信息
		handleEdit(row) {
        	// console.log(row.surverId || "not find");
        	// console.log(row.endtime);
        	this.$store.state.endtime = row.endtime;
        	this.$router.push({path: '/admin/editsurver/'+row.surverid});
      	},
      	//删除问卷
      	handleDelete(index, row) {
        	// console.log(index, row);
        	// console.log(row.surverid);
        	if(window.confirm("确定删除吗")){
        		let params = { surverid: row.surverid}
	        	this.$http.post('/api/admin/deleteSurver/', params).then((response) => {
	        		// console.log(response);
	        		if("deleteSurver successed" == response.body) {
	        			alert("删除成功");
	        			// this.$router.push({path: '/admin/allsurver'});
	        			this.reload();
	        		}
	        	}).catch((reject) => {
	        		console.log(reject);
	        	})
        	}
        	return;
      	},
      	//发布问卷
      	handleRelease(index, row) {
      		// console.log(row.endtime);
      		let now = new Date();
    		let a = new Date(row.endtime);
    		// console.log(a > now?true:false);
    		if(a < now){
    			alert("结束时间错误");
    		}else{
    			let params = {
    				surverid: row.surverid
    			}
    			// console.log(params);
    			this.$http.post('/api/admin/releaseSurver', params).then((response)=>{
    				if(response){
    					alert("发布成功");
    					// location.reload();
    					this.reload();
    				}
    			}).catch((reject)=>{
    				console.log(reject);
    			})
    		}
      	},
      	//查看问卷结果
      	handleResult(index, row) {
    		if("否" == row.isrelease){
    			alert("问卷没有发布");
    			return;
    		}
    		this.$router.push({path: '/admin/surverAnswer/' + row.surverid})
      	}
	},
	mounted() {
		this.$http.get('/api/admin/getAllsurver').then((response) => {
          this.allsurver = response.body;
        })
	}
}
</script>

<style scoped>
.navwarp{
	width: 100%;
	height: 100%;
}
.surver_table{
	width: 100%;
	height: 100%;
	padding: 20px 5px 0 0;
}

</style>