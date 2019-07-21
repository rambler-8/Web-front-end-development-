<template>
<el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" style="margin: 15px auto; width:500px;" class="demo-ruleForm">
  <el-form-item label="昵称" prop="name">
    <el-input v-model="ruleForm2.name" ></el-input>
  </el-form-item>
  <el-form-item label="邮箱" prop="Email">
    <el-input v-model="ruleForm2.Email" :disabled="dis"></el-input>
  </el-form-item>
  <el-form-item label="性别">
    <el-select v-model="ruleForm2.sex" placeholder="请选择">
      <el-option label="男" value="man"></el-option>
      <el-option label="女" value="woman"></el-option>
    </el-select>
  </el-form-item>
  <!-- <el-form-item label="性别" prop="sex">
    <el-input v-model="ruleForm2.sex" autocomplete="off"></el-input>
  </el-form-item> -->
  <el-form-item label="年龄" prop="age">
    <el-input v-model.number="ruleForm2.age"></el-input>
  </el-form-item>
  <el-form-item label="电话" prop="phone">
    <el-input v-model.number="ruleForm2.phone"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
    <el-button @click="resetForm('ruleForm2')">取消</el-button>
  </el-form-item>
</el-form>	
</template>

<script>
  export default {
    data() {
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('年龄不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value> 130 || value < 12) {
              callback(new Error('请输入正确的数值'));
            } else {
              callback();
            }
          }
        }, 100);
      };
      var checkName = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入昵称'));
        } else if (value && value.length > 8) {
            callback(new Error('长度最大为8'));
        }else {
          callback();
        }
      };
      var checkPhone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入电话'));
        } else if (!(/^1[34578]\d{9}$/.test(value)) ) {
          callback(new Error('请输入11位的电话号'));
        } else {
          callback();
        }
      };
      var checkEmail = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入邮箱'));
        } else if (!(/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(value)) ) {
          callback(new Error('请输入正确的邮箱'));
        } else {
          this.$http.get('/api/emailExist/'+ value).then((response)=>{
          	// console.log(response.body)
          	if(response.body.length != 0){
          		callback(new Error('此邮箱已存在账号'));
          	}
          	else
          		callback();
          })
        }
      };
      return {
      	dis: true,
      	Email: "",
        ruleForm2: {
          // Email: '',
          // age: 1,
          // name: '',
          // phone: '',
          // sex: ''
        },
        rules2: {
          name: [
            { validator: checkName, trigger: 'blur' }
          ],
          age: [
            { validator: checkAge, trigger: 'blur' }
          ],
          phone: [
            { validator: checkPhone, trigger: 'blur' }
          ],
          Email: [
            { validator: checkEmail, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');
            // console.log(this.ruleForm2)
            if(this.dis){
            	this.$http.post('/api/updateInformation', this.ruleForm2).then((response)=>{
	            	// console.log(response);
	            	if("updateInformation successed" == response.body){
	            		alert("修改信息成功");
	            		this.$router.push({path: '/user/allReleaseSurver'});
	            		return;
	            	}
	            })
            }
            //dis为false 证明是添加用户不是修改信息
            this.$http.post('/api/addUser', this.ruleForm2).then((response)=>{
            	// console.log(response);
            	if("addUser successed" == response.body){
            		alert("添加用户成功");
            		this.$router.push({path: '/admin/allUser'});
            		return;
            	}
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$router.push({path: '/user/allReleaseSurver'});
      }
    },
    mounted() {
    	let path = this.$route.path.split('/')
        if("addUser" == path[2] || "register" == path[1]){
        	//邮箱变为可以编辑
        	this.dis = false;
        	return;
        }
    	this.Email = this.$store.state.Email;
    	if(this.Email){
    		this.$http.get('/api/getInformation/' + this.Email).then((response)=>{
    			// console.log(response);
    			this.ruleForm2 = response.body[0];
    		}).catch((reject)=>{
    			console.log(reject);
    		})
    	}	
    }
  }
</script>
