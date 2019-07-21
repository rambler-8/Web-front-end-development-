<template>
  <div class="bac">
    <div class="login">
      <p>问卷调查用户登录</p>
      <span style="position:absolute; top:0; right: 0" @click="register()">注册</span>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" style="margin: 15px auto; width:500px;" class="demo-ruleForm">
        <el-form-item label="邮箱" prop="Email">
          <el-input v-model="ruleForm.Email" ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" :error="passwordError">
          <el-input type="password" v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
 
<script>
export default {
  data() {
    var checkPassword = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('密码为空'));
      }else if (value.length < 6 || value.length > 10){
        return callback(new Error('密码长度为6到10位'));
      }else if(this.a){
        this.a = false;
        return callback(new Error('密码错误'));
      }else{
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
          if(response.body.length == 0){
            callback(new Error('此邮箱账号不存在'));
          }
          else
            callback();
        })
      }
    };
    return {
      a: false,
      passwordError: "",
      ruleForm: {
        Email: '',
        password: ''
      },
      rules: {
        Email: [
          { validator: checkEmail, trigger: 'blur' }
        ],
        password: [
          { validator: checkPassword, trigger: 'blur' }
        ]
      }
    };
  },
  methods:{
    // login() {
    //   //post请求提交的数据
    // },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!');
          //请求
          this.$http.post('/api/uesrLogin', this.ruleForm).then((response) => {
            //找不到response的body就是空的
            // console.log(response.body);
            if(response.body.length > 0){
              this.$store.state.username = response.body[0].name || "";
              this.$store.state.Email = response.body[0].Email || "";
              // console.log(this.$store.state.username);
              this.$router.push({path: '/user'});
            }else{
              //提示密码错误
              this.a = true;
              this.passwordError = "密码错误"
            }   
          }).catch((reject) => {
            console.log(reject)
          });
        } else {
          // console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    register() {
      this.$router.push({path: '/register'});
    }
  }
}
</script>

<style>
.bac{
  width: 100%;
  height: 100%;
}
.login{
  width: 500px;
  height: 360px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -180px 0 0 -250px;
}
.login > input {
  margin: 10px 0;
}
</style>