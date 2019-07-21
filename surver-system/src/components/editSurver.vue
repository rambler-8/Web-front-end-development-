<template>
<div class="navwarp" v-if="question">
	<!-- <div class="backone"></div> -->
	<!-- {{questions}} -->
	<div class="edit" v-if=!this.newSurver>编辑问卷</div>
	<div class="edit" v-else>创建问卷</div>
	<div class="surver_con">
		<p contenteditable  @blur="changeSurverTitle($event)">{{questions.surverTitle}}</p>
		<!-- {{questions}} -->
		<!-- {{question}} -->
		<!-- [{ "number": 1, "title": "性别", "type": "radio", "option": { "A": "男", "B": "女" } }] -->
		<ol>
			<li v-for="(item, index) in question" class="question">
				<!-- {{item}}
				{ "number": 1, "title": "性别", "type": "radio", "option": { "A": "男", "B": "女" } } -->
				<!-- 序号之前已经排列好了，直接用有序列表就好 -->
				<p contenteditable @focus="queTitlegetFocus()" @blur="changeQuestionTitle(index, $event)" >{{item.title}}
					<i id="que-title" v-if="item.type=='radio' && queExp ">(单选)</i>
					<i id="que-title" v-if="item.type=='checkbox' && queExp ">(多选)</i>
					<i id="que-title" v-if="item.type=='text' && queExp ">(问答)</i>
				</p>
				<!-- 选项工具 -->
				<div class="option-panel f_left" >
					<ul style="list-style: none;">
		              <li title="上移" @click="optionPositionFront(index)">↑</li>
		              <li title="下移" @click="optionPositionBack(index)">↓</li>
		              <li title="删除" @click="deleteoption(index)">X</li>
		            </ul>
				</div>
				<ul style="padding-left: 30px;" v-if="item.type!= 'text'">
					<!-- {{item.option}} -->
					<li v-for="(opt, key) in item.option">
						<p contenteditable="true" @blur="changeQuestionOption(index, key, $event)">
							{{opt}}
						</p>
					</li>
				</ul>
				<div v-if="item.type !== 'text'" class="add-option">
					<!-- <span class="iconfont">&#xe60f;</span> -->
					<span @click="addOption(index)">添加选项</span>
					<span @click="deleteOption(index)">删除选项</span>
				</div>
			</li>
		</ol>
		<div class="tools">
            <div class="toolbar">
              <span class="btn" @click="addQuestion('radio')"><span class="iconfont">&#xe64e;</span>单选题</span>
              <span class="btn" @click="addQuestion('checkbox')"><span class="iconfont">&#xe64a;</span>多选题</span>
              <span class="btn" @click="addQuestion('text')"><span class="iconfont">&#xe64b;</span>文本题</span>
            </div>
            <div class="add-btn"><span class="iconfont">&#xe60f;</span>添加问题</div>
        </div>
        <!-- 结束日期 -->
        <div calss="endDate">
        	结束日期：
        	<el-date-picker
		      v-model="endDate"
		      type="date"
		      value-format="yyyy-MM-dd"
		      @blur=setEndTime()>
		    </el-date-picker>
		    <span :class=endTimeError style="color:red;font-size: 15px;">结束时间只能在未来的某个时间</span>
        </div>
        <!-- 上传文档生成问卷 -->
        <el-upload
			class="upload-demo"
			action="/api/uploadfile"
			:auto-upload="false"
			:on-preview="handlePreview"
			:on-remove="handleRemove"
			:before-remove="beforeRemove"
			:http-request="upload"
			multiple
			:limit="1"
			:on-exceed="handleExceed"
			:on-change="handleChange"
			:file-list="fileList">
			<el-button size="small" type="primary">点击上传</el-button>
			<div slot="tip" class="el-upload__tip">只能上传tet、word文件，且不超过500kb</div>
		</el-upload>
		<el-button size="small" type="primary" @click="upload">上传并解析</el-button>
	</div>
	<!-- 底部按钮 -->
	<div class="confirm">
		<button class="but" @click="save()">保存</button>
		<button class="but" @click="back()">取消</button>
	</div>
</div>
</template>
<script>
export default{
	name: 'editSurver',
	data() {
		return {
			id: parseInt(this.$route.params.id),
			questions: {},
			question: [],
			Alphabet: ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
			queExp: true,
			// 是新建的问卷还是已经有的问卷
			newSurver: false,
			endDate: "",
			endTimeError: "hide",
			date: new Date(),
			fileList: [],
			uploadSurverTitle: "",
			uploadSurverQuestion: []
		}
	},
	methods: {
		//修改问卷名字
		changeSurverTitle(e) {
			// console.log(this.questions.title);
			// console.log(e.target.textContent);
			this.questions.title = e.target.textContent.trim();
			// console.log(this.questions);
		},
		//修改题目的名字
		//题目是排好序的，直接传递遍历的index也可以，但是要注意加一
		changeQuestionTitle(index, e) {
			this.question[index].title = e.target.textContent.trim().slice(0, e.target.textContent.length -4);
			this.queExp = true;
			// console.log(this.question[index]);
		},
		//修改题目的选项
		changeQuestionOption(index, key, e) {
			// console.log(typeof(key));
			// console.log(this.question[index].option[key]);
			this.question[index].option[key] = e.target.textContent.trim();
			// console.log(this.question[index]);
		},
		//问题获得焦点的时候要删除后面的单选题多选题说明
		queTitlegetFocus() {
			this.queExp = false;
		},
		//保存修改并返回allsurver
		save() {
			if("show" == this.endTimeError){
				return;
			}
			if(!this.endDate){
				this.endTimeError = "show";
				return;
			}
			// console.log(this.id);
			// 保存编辑的问卷
			this.questions.question = this.question;
			// console.log(this.questions);
	        //请求
	        let params = {
	        	surverid: this.questions.surverid,
	        	surverTitle: this.questions.surverTitle,
	        	question: this.questions.question,
	        	endtime: this.endDate
	        }
	        //新问卷
	        if(this.newSurver) {
	        	let p ={
	        		name: this.questions.surverTitle,
	        		createTime: this.date.getFullYear() + '-' + (this.date.getMonth() + 1) + '-' + this.date.getDate(),
	        		isrelease: '否',
	        		endtime: this.endDate,
	        		surverid: this.id
	        	}
	        	//拼接对象
	        	Object.assign(params, p);
	        	// console.log(params);
	        	// console.log("save newsurver");
	        	this.$http.post('/api/admin/saveNewSurver', params).then((response) => {
	        		console.log(response);
	        		if("saveNewSurver successed" == response.body) {
	        			alert("successed");
	        			this.$router.push({path: '/admin/allsurver'});
	        		}
	        	}).catch((reject) => {
	        		console.log(reject);
	        	})
	        	return;
	        }
	        this.$http.post('/api/admin/saveSurver',params).then((response) => {
	        	//找不到response的body就是空的
	        	console.log(response.body);
	        	if("save successed" == response.body) {
	        		alert("successed");
	        		this.$router.push({path: '/admin/allsurver'});
	        	}
	        	// console.log(response.body.length)
	        	// if(response.body.length) {
		        //     this.$router.push({path: '/admin'});
		        // }
		    }).catch((reject) => {
		        console.log(reject)
		       });
	        //返回allsurver界面
			// this.$router.push({path: '/admin/allsurver'});
		},
		//返回查看所有问卷页面allsurver
		back() {
			if(window.confirm("确定取消吗")) {
				this.$router.push({path: '/admin/allsurver'});
			}
		},
 		// [ { "number": 1, "title": "性别", "type": "radio", "option": { "A": "男", "B": "女" } }, { "option": { "A": "大一", "B": "大二", "C": "大三", "D": "大四" }, "number": 2, "title": "年级", "type": "radio" }, { "option": { "A": "理科", "B": "工科", "C": "艺术类", "D": "其他" }, "number": 3, "title": "专业", "type": "radio" }, { "number": 4, "title": "晚睡的原因", "type": "checkbox", "option": { "A": "看书", "B": "玩手机", "C": "玩电脑", "D": "外出玩", "E": "其他" } } ]
 		//添加问题
		addQuestion (type) {
	      let ques = {
	      	number: this.question.length + 1,
	        title: '问题题目',
	        type: type
	      }
	      if (type !== 'text') {
	        ques.option = { "A": "选项1", "B": "选项2" },
	        ques.choose = { "A": 0, "B": 0 }
	      } else {
	      	// 文本题预留
	      	ques.answer = "";
	      }
	      this.question.push(ques);
	      // console.log(this.question);
	    },
	    //排序的函数 
		objKeySort(obj){
			//【1】用Object内置类的keys方法获取要排序对象的属性名
			//【2】用Array原型上的sort方法对获取的属性名进行排序，返回一个新数组newkey 
			var newkey = Object.keys(obj).sort();
			var newObj = {}; //创建一个新的对象，用于存放排好序的键值对 
			for(var i = 0; i < newkey.length; i++) { //遍历newkey数组
				newObj[newkey[i]] = obj[newkey[i]]; //向新创建的对象中按照排好的顺序依次增加键值对 ，
				//newObj[newkey[i].toLowerCase()] = obj[newkey[i]]; 并大写转换小写【做签名验证会用】
			}
			return newObj; //返回排好序的新对象 
		},
	    // 添加选项
   	 	addOption (index) {
   	 		// console.log(index);
   	 		//console.log(Object.keys(this.question[index].option).length);
   	 		if(Object.keys(this.question[index].option).length > 8) {
   	 			alert("选项的最大长度为9");
   	 			return;
   	 		}
   	 		let opNum = 1;
   	 		for(var i in this.question[index].option){
    			opNum++
			};
			let alp = this.Alphabet[opNum-1];
   	 		this.question[index].option[alp] = '选项' + opNum;
   	 		this.question[index].choose[alp] = 0;
   	 		//对键进行排序在渲染，好看新加的选项就一定在下面而不是上面
   	 		// this.question[index].option = objKeySort(this.question[index].option);
   	 		//更新界面数据
   	 		this.$forceUpdate();
   	 		// console.log(this.question[index].option);
      		// this.$dispatch('add-option', qIndex)
    	},
    	//删除选项
    	deleteOption(index) {
    		if(Object.keys(this.question[index].option).length < 3) {
   	 			alert("选项的最小长度为2");
   	 			return;
   	 		}
    		// console.log(this.question[index].option);
    		//得到选项长度
    		let opNum = 0;
   	 		for(var i in this.question[index].option){
    			opNum++
			};
			let alp = this.Alphabet[opNum-1];
			// console.log(alp);
    		delete this.question[index].option[alp];
    		delete this.question[index].choose[alp];
    		//刷新界面
    		this.$forceUpdate();
    	},
    	// transposition (arr, oldIndex, newIndex) {
     //  		let value = arr.splice(oldIndex, 1)[0]
     //  		arr.splice(newIndex, 0, value)
    	// },
    	//问题上移
    	optionPositionFront(index) {
    		// console.log(index);
    		if(0 == index) {
    			alert("已经是第一个了");
    			return;
    		}
    		// console.log(this.question[index].number);
    		this.question[index].number -= 1;
    		this.question[index-1].number +=1;
    		this.question.sort(function(a, b){
          		return a.number - b.number;
          	})
    		// console.log(this.question);
    		// this.$forceUpdate();
    	},
    	//问题下移
    	optionPositionBack(index) {
    		// console.log(index);
    		if(index == this.question.length - 1) {
    			alert("已经是最后一个了");
    			return;
    		};
    		this.question[index].number += 1;
    		this.question[index+1].number -=1;
    		this.question.sort(function(a, b){
          		return a.number - b.number;
          	})
    		// console.log(this.question);
    	},
    	//删除问题
    	deleteoption(index) {
    		// console.log(index);
    		if(1 == this.question.length) {
    			alert("就剩下一个题目了");
    			return;
    		};
    		this.question.splice(index, 1);
    		for (var i = 0; i < this.question.length; i++) {
    			this.question[i].number = i + 1;
    		} 
    	},
    	//设置结束时间
    	setEndTime(){
    		// console.log(this.endDate);
    		let now = new Date();
    		let a = new Date(this.endDate);
    		// console.log(a > now?true:false);
    		if(a < now){
    			this.endTimeError = "show";
    			// this.endDate = this.$store.state.endtime;
    		}else{
    			this.endTimeError = "hide";
    		}
    	},
    	//文件上传相关
    	handleRemove(file, fileList) {
	        // console.log(file, fileList);
		},
		handlePreview(file) {
			console.log(file);
		},
		handleExceed(files, fileList) {
			this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
		},
		beforeRemove(file, fileList) {
			// return this.$confirm(`确定移除 ${ file.name }？`);
		},
		upload(){
			var _this= this;
			var file =this.fileList[0];
			if (!file) { // 若未选择文件
				alert('请选择文件');
				return;
		    }
			let fileType = file.name.split('.')[1];
			if( fileType== "txt"){
				// txt文件则利用h5的readfile直接在本地读取文件
				var reader = new FileReader();
				reader.readAsText(this.fileList[0].raw, "gb2312");
				reader.onload = function(){
					//读取完成后，数据保存在对象的result属性中
					let txt = this.result;
					// console.log(this.result)
					let arr = txt.split('\n');
					_this.uploadSurverQuestion = [];
					// 问卷题目
					_this.uploadSurverTitle = arr[0].trim();
					let len= 1, i= 1, opindex= 0;
					while(i< arr.length){
						if(/^[1-9]/.test(arr[i])){
							//以数字开头的代表当前行描述的为题目的问题
							let tit = arr[i].trim().slice(2, -4);
							let t = "";
							let op = {};
							let cho = {};
							if(/单选/.test(arr[i])){
								t = "radio";
							}
							if(/多选/.test(arr[i])){
								t = "checkbox";
							}
							if(/问答/.test(arr[i])){
								t = "text";
								_this.uploadSurverQuestion.push({
								number: len,
								title: tit,
								type: t,
								answer: ""
								})
								i++;
								len++;
								opindex = 0;
								continue;
							}
							i++;
							while(arr[i]!= undefined && !/^[1-9]/.test(arr[i])){
								let alp= _this.Alphabet[opindex];
								op[alp]= arr[i].trim().slice(2);
								cho[alp] = 0;
								i++;
								opindex++;
							}
							_this.uploadSurverQuestion.push({
								number: len,
								title: tit,
								type: t,
								option: op,
								choose: cho
							})
							len++;
							opindex = 0;		
						}
					}
					// console.log(_this.uploadSurverQuestion);
					_this.questions.surverTitle = _this.uploadSurverTitle;
					_this.question = _this.uploadSurverQuestion;
					_this.$confirm('导入问卷成功');
					return false;
				}
			}else if(fileType== "doc" || fileType== "docx"){
				//word文档就上传解析，本地读取不了
				const formData = new FormData();
		        const headerConfig = { headers: { 'Content-Type': 'multipart/form-data' } };
		        formData.append('file', file.raw);
		        this.$http.post('/api/uploadfile', formData, headerConfig).then(res => {
		          console.log(res.body);
		          if(res.body !={}){
		          	this.questions.surverTitle = res.body.uploadSurverTitle;
					this.question = res.body.uploadSurverQuestion;
					this.$confirm('导入问卷成功');
		          }
		        })
				return;
			}else{
				this.$confirm(`上传文件格式错误`);
				return;
			}
		},
		handleChange(file, fileList){
			this.fileList = fileList;
		}
	},
	watch: {
		question: function() {
    		// var container = this.$el.querySelector(".surver_con");
    		// console.log(container);
    		// container.scrollTop = container.scrollHeight;
    		// console.log(1);
    		// deep: true;
   		}
	},
	mounted() {
		//还原结束时间
		this.endDate = this.$store.state.endtime;
		// console.log(this.endDate);
		// console.log(this.id);
		this.Alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
		if(this.id) {
			this.$http.get('/api/admin/getquestion/'+this.id).then((response) => {
			// console.log(response.body);
				this.questions = response.body[0] || {};
				// this.questions = this.questions[0] || {};
				this.question = this.questions.question || [];
				//将问题按题目序号排列好，以便渲染到界面，以后只需要改question就行了
				this.question.sort(function(a, b){
					return a.number - b.number;
				})
       		});
       		return;
		};
		//新问卷结束时间为空
		this.endDate = ""
		this.questions = {};
		this. question = [];
		this.$http.get('/api/admin/getnextsurverId/').then((response) => {
			// console.log(response.body.length)
			// console.log(response.body);
			let a = response.body;
			a.sort(function(a, b){
				return b.surverid - a.surverid;
			})
			// console.log(a[0].surverid);
			this.id = parseInt(a[0].surverid) + 1;
			// console.log(this.id);
			//是新建的问卷
			this.newSurver = true;
			this.questions = { 
				"question": [ { "number": 1, "title": "问题一", "type": "radio", "option": { "A": "选项一", "B": "选项二" },"choose": { "A": 0, "B": 0 } }, { "option": { "A": "选项一", "B": "选项二", "C": "选项三", "D": "选项四" }, "number": 2, "title": "问题二", "type": "checkbox","choose": { "A": 0, "B": 0, "C": 0, "D": 0 } } ], 
				"surverid": this.id,
				"surverTitle": "问卷题目" 
			}
			// this.questions = this.questions[0] || {};
			this.question = this.questions.question;
			//将问题按题目序号排列好，以便渲染到界面，以后只需要改question就行了
			// this.question.sort(function(a, b){
			// 	return a.number - b.number;
			// }
			// this.$forceUpdate();
		})
			
	}
}
</script>

<style scoped>
.navwarp{
	position: relative;
	width: 100%;
	height: 100%;
	padding-left: 20px;
}
.navwarp > .edit{
	width: 100%;
	height: 44px;
	font-size: 20px;
	line-height: 44px;
	text-align: center;
}
.navwarp > .backone{
	position: absolute;
	top: 12px;
	left: 12px;
	width: 20px;
	height: 20px;
	background: url(../assets/backone.png) no-repeat;
	background-size: 20px 20px;
}
.surver_con{
	position: relative;
	width: 100%;
	height: 100%;
	overflow-y: auto;
}
.surver_con > p{
	width: 100%;
	height: 25px;
	font-size: 20px;
	line-height: 25px;
	text-align: center;
	overflow: hidden;
}
.surver_con > ol {
	width: 100%;
	height: auto;
	padding: 0 80px 0 40px;
}
.surver_con > ol > .question{
	width: 100%;
	min-height: 100px;
	position: relative;
}
.surver_con > ol > .question > .option-panel {
	position: absolute;
	top: 20px;
	left: -10px;
	width: 10px;
	height: 20px;
}
.surver_con > ol > .question > .option-panel > ul > li{
	margin: 0 0 5px 0;
	cursor: pointer;
	color: #222222;
	padding-right: 5px;
}
.surver_con > ol > .question > .add-option {
	color: red;
	font-size: 16px;
	height: 20px;
	width: 100%;
}
.surver_con > ol > .question > .add-option:hover {
	cursor: pointer;
}
.surver_con > ol > .question > .add-option > span {
	margin: 0 7px;
}
/*.iconfont{
	background: #558564;
}*/
.surver_con > .tools{
	text-align: center;
    border-radius: 0;
    margin: 1rem auto;
    border: 1px solid #345355;
    padding-bottom: 5px;
}
.surver_con > .tools:hover .toolbar{
	display: block;
	height: 30px;
	line-height: 30px;
}
.surver_con > .tools > .toolbar{
	display: none;
}
.surver_con > .tools > .toolbar > .btn:hover{
	cursor: pointer;
}
.navwarp > .confirm {
	width: 100%;
	height: 50px;
	padding-bottom: 20px;
	text-align: center;
}
.but{
	width: 50px;
	height: 100%;
	margin: 0 10px;
}
</style>