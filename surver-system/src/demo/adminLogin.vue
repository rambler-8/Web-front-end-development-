<template>
  <div class="bac">
    <div class="login">
      <p>后台登录</p>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" style="margin: 15px auto; width:500px;" class="demo-ruleForm">
        <el-form-item label="账号" prop="account">
          <el-input v-model="ruleForm.account" ></el-input>
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
      }else if (value.length < 2 || value.length > 10){
        return callback(new Error('密码长度为1到10位'));
      }else if(this.a){
        this.a = false;
        return callback(new Error('密码错误'));
      }else{
        callback();
      }
    };
    var checkAccount = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入账户'));
      } else if (value.length > 10) {
        callback(new Error('请输入正确账户'));
      } else {
        callback();
      }
    };
    return {
      a: false,
      passwordError: "",
      ruleForm: {
        account: '',
        password: ''
      },
      rules: {
        account: [
          { validator: checkAccount, trigger: 'blur' }
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
          this.$http.post('/api/login', this.ruleForm).then((response) => {
            //找不到response的body就是空的
            // console.log(response.body);
            if(response.body.length > 0){
              // console.log(this.$store.state.username);
              this.$store.state.adminLogin = true;
              this.$router.push({path: '/admin/allsurver'});
            }else{
              //提示密码错误
              this.a = true;
              // console.log(response.body)
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