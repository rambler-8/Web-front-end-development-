// 可能是我的node版本问题，不用严格模式使用ES6语法会报错
"use strict";
const models = require('./db');
const express = require('express');
const router = express.Router();
 
/************** 创建(create) 读取(get) 更新(update) 删除(delete) **************/

//管理员登陆接口
router.post('/api/login',(req, res) => {
    models.Login.find({"account": req.body.account, "password": req.body.password},(err,data) => {
        if (err) {
            res.send(err);
        } else if(data){
            res.send(data);
        }
    });
});

// 创建账号接口
router.post('/api/login/createAccount',(req,res) => {
    // 这里的req.body能够使用就在index.js中引入了const bodyParser = require('body-parser')
    let newAccount = new models.Login({
        account : req.body.account,
        password : req.body.password
    });
    // 保存数据newAccount数据进mongoDB
    newAccount.save((err,data) => {
        if (err) {
            res.send(err);
        } else {
            res.send('createAccount successed');
        }
    });
});
// 获取已有账号接口
router.get('/api/login/getAccount',(req,res) => {
    // 通过模型去查找数据库
    models.Login.find((err,data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
});

//获取所有的问卷接口
router.get('/api/admin/getAllsurver',(req, res) => {
    models.survername.find((err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
})

//获取所有的已经发布的且没有结束的问卷
router.get('/api/getAllReleaseSurver', (req, res) => {
    let date = new Date();
    let y = date.getFullYear(), m = date.getMonth() + 1, d = date.getDate();
    if(m < 10){
        m = '0' + m;
    }
    if(d < 10){
        d = '0' + d;
    }
    let now = y + '-' + m + '-' + d;
    models.survername.find({"endtime":{$gt: now}, "isrelease": "是"},(err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
})

//获取下一个创建问卷的id
router.get('/api/admin/getnextsurverId',(req, res) => {
    models.survername.find( {}, 'surverid' ,(err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
})

//获取某一个问卷的所有题目
router.get('/api/admin/getquestion/:id',(req, res) => {
    var id=req.params.id;
    models.question.find({surverid: id}, 'question surverid surverTitle',(err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
})

//保存编辑的问卷
router.post('/api/admin/saveSurver', (req, res) => {
    let endtime = {endtime: req.body.endtime};
    let conditions = {surverid: req.body.surverid};
    let questionSchema = {
        surverid : req.body.surverid,
        surverTitle : req.body.surverTitle,
        question: req.body.question
    };
    models.survername.update(conditions, endtime, (err,data) => {
        if (err) {
            res.send(err);
        } else {
            models.question.update(conditions, questionSchema, (err,data) => {
                if (err) {
                    res.send(err);
                } else {
                    res.send('save successed');
                }
            });
        }
    });
})

//新建一个问卷
router.get('/api/admin/newSurver', (req, res) => {
    // let conditions = {surverid: req.body.surverid};
    let questionSchema = {
        surverid : req.body.surverid,
        surverTitle : req.body.surverTitle,
        question: req.body.question
    };
    models.question.save(questionSchema, (err,data) => {
        if (err) {
            res.send(err);
        } else {
            res.send('save successed');
        }
    });
})

//保存新的问卷
router.post('/api/admin/saveNewSurver', (req, res) =>{
    let survernameSchema = new models.survername(
    {
        name: req.body.name,
        createTime: req.body.createTime,
        isrelease: req.body.isrelease,
        endtime: req.body.endtime,
        surverid: req.body.surverid
    });
    // let conditions = {surverid: req.body.surverid};
    let questionSchema = new models.question(
    {
        surverid : req.body.surverid,
        surverTitle : req.body.surverTitle,
        question: req.body.question
    });
    survernameSchema.save((err,data) => {
        if (err) {
            res.send(err);
        } else {
            questionSchema.save((err,data) => {
                if (err) {
                    res.send(err);
                } else {
                    res.send('saveNewSurver successed');
                }
            });
        }
    });
})

//删除问卷
router.post('/api/admin/deleteSurver/', (req, res) => {
    let conditions = {
        surverid: req.body.surverid
    }
    models.survername.deleteOne(conditions, (err, data) => {
        if(err) {
            res.send(err);
        }
        else {
            models.question.deleteOne(conditions, (err, data)=> {
                if (err) {
                    res.send(err);
                } else {
                    res.send('deleteSurver successed');
                }
            })
        }
    })
});

//发布问卷
router.post('/api/admin/releaseSurver', (req, res) => {
    let conditions = req.body;
    let data = {
        isrelease: "是"
    }
    models.survername.update(conditions, data, (err, data)=>{
        if(err){
            res.send(err);
        }else{
            res.send(data);
        }
    })
});

//获取所有的用户信息
router.get('/api/admin/getUsers/', (req, res) => {
    models.users.find({}, 'Email name phone age sex' ,(err,data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
})

//获取用户的个人信息
router.get('/api/getInformation/:Email', (req, res) => {
    var p = {
        Email: req.params.Email
    }
    models.users.find(p, 'Email name phone age sex' ,(err,data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
})

//用户修改个人信息
router.post('/api/updateInformation', (req, res) => {
    let conditions = {
        Email: req.body.Email
    }
    let data ={
        name: req.body.name,
        phone: req.body.phone,
        age: req.body.age,
        sex: req.body.sex
    }
    models.users.update(conditions, data ,(err,data) => {
        if (err) {
            res.send(err);
        } else {
            res.send("updateInformation successed");
        }
    });
})

//添加用户
router.post('/api/addUser', (req, res) => {
    let data = new models.users({
        name: req.body.name,
        phone: req.body.phone,
        age: req.body.age,
        sex: req.body.sex,
        Email: req.body.Email,
        password: '123456'
    })
    data.save((err,data) => {
        if (err) {
            res.send(err);
        } else {
            res.send("addUser successed");
        }
    });
})

//删除用户
router.post('/api/admin/deleteUser', (req, res) => {
    let conditions ={
        Email: req.body.Email,
    }
    models.users.deleteOne(conditions, (err, data) => {
        if(err) {
            res.send(err);
        }
        else {
            res.send("deleteUser successed");     
        }
    })
})
//用户登录接口
router.post('/api/uesrLogin',(req, res) => {
    models.users.find({"Email": req.body.Email, "password": req.body.password}, 'name Email', (err,data) => {
        if (err) {
            res.send(err);
        } else if(data){
            res.send(data);
        }
    });
});

//检测Email是否存在
router.get('/api/emailExist/:Email',(req, res) => {
    models.users.find({"Email": req.params.Email}, 'name', (err,data) => {
        if (err) {
            res.send(err);
        } else if(data){
            res.send(data);
            // res.send("exist");
        }
    });
});

//重置密码
router.post('/api/admin/resetPassword/', (req, res) => {
    let params = {
        Email: req.body.Email
    }
    let p = {
        password: "123456"
    }
    models.users.update(params, p, (err, data) => {
        if(err){
            res.send(err);
        }else{
            res.send("resetPassword successed")
        }
    })
})

//用户提交问卷答案
router.post('/api/submitAnswer', (req, res)=> {
    let conditions = {
        surverid: req.body.surverid
    }
    let data = {
        question: req.body.question
    }
    models.question.update(conditions, data, (err,data) => {
        if (err) {
            res.send(err);
        } else {
            res.send('submitAnswer successed');
        }
    });
})
module.exports = router;