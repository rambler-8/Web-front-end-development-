<template>
<el-table
	:data="users"
	height="700"
	border
	style="width: 100%; font-size: 16px; padding: 5px 0 0 8px;">
	<el-table-column
	  prop="name"
	  label="昵称"
	  width="180">
	</el-table-column>
	<el-table-column
	  label="性别"
	  width="200">
	    <template slot-scope="scope">
    		{{ scope.row.sex == "man"?"男":"女"}}
  		</template>
	</el-table-column>
	<el-table-column
	  prop="age"
	  label="年龄"
	  width="140">
	</el-table-column>
	<el-table-column
	  prop="Email"
	  label="邮箱"
	  width="220">
	</el-table-column>
	<el-table-column
	  prop="phone"
	  label="电话"
	  width="170">
	</el-table-column>
	<el-table-column label="操作" width="350">
		<template slot-scope="scope">
		<el-button
			size="mini"
			@click="resetPassword(scope.row)">重置密码
		</el-button>
		<el-button
			size="mini"
			type="danger"
			@click="deleteUser(scope.row)">删除用户
		</el-button>
		<!-- <el-button
			size="mini"
			type="primary"
			@click="addUser(scope.$index, scope.row)">添加用户
		</el-button> -->
	</template>
</el-table-column>
</el-table>
</template>

<script>
export default{
	inject: ['reload'],
	name: 'allUser',
	data() {
		return {
			users : []
		}
	},
	methods: {
		resetPassword(row) {
			// console.log("resetPassword" + row.Email);
			let pramas = {
				Email: row.Email
			}
			this.$http.post('/api/admin/resetPassword/', pramas).then((response) => {
				// console.log(response);
				if("resetPassword successed" == response.body){
					alert("重置成功");
				}
			}).catch((reject)=>{
				console.log(reject);
			})
		},
		deleteUser(row) {
			// console.log(row.Email);
			let pramas = {
				Email: row.Email
			}
			this.$http.post('/api/admin/deleteUser', pramas).then((response) => {
				// console.log(response);
				if("deleteUser successed" == response.body){
					alert("删除成功");
					this.reload();
				}
			}).catch((reject)=>{
				console.log(reject);
			})
		},
		// addUser() {
		// 	console.log("addUser");
		// }
	},
	mounted() {
		this.$http.get('/api/admin/getUsers/').then((response) =>{
			console.log(response);
			this.users = response.body || [];
		}).catch((reject) => {
          console.log(reject)
        });
	}
}
</script>

<style scoped>

</style>