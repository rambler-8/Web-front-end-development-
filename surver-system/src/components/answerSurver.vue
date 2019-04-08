<template>
<div class="content">
	<!-- {{question}} -->
 	<!-- [ { "number": 1, "title": "问题一", "type": "radio", "option": { "A": "选项一", "B": "选项二" }, "choose": { "A": 0, "B": 0 } }, { "option": { "A": "选项一", "B": "选项二", "C": "选项三", "D": "选项四" }, "number": 2, "title": "问题二", "type": "checkbox", "choose": { "A": 0, "B": 0, "C": 0, "D": 0 } } ] -->
	<div class="surverTitle">{{questions.surverTitle}}</div>
	<div class="que">
		<ol style="padding-left: 30px;">
			<li v-for="(item, index) in question" class="question">
				<!-- {{item}}
				{ "number": 1, "title": "性别", "type": "radio", "option": { "A": "男", "B": "女" } } -->
				<!-- 序号之前已经排列好了，直接用有序列表就好 -->
				<p>{{item.title}}
					<i id="que-title" v-if="item.type=='radio'">(单选)</i>
					<i id="que-title" v-if="item.type=='checkbox'">(多选)</i>
					<i id="que-title" v-if="item.type=='text'">(问答)</i>
				</p>
				<div class="option" v-if="item.type=='radio' " v-for="(opt, key) in item.option">
					<el-radio v-model="answer[item.number]" :label=key @change="radiochange()">
						{{opt}}
					</el-radio>
				</div>
				<div class="option" v-if="item.type=='checkbox' " v-for="(opt, key) in item.option">
					<el-checkbox v-model="answer[item.number]" :label=key @change="checkboxchange()">
						{{opt}}
					</el-checkbox>
				</div>
			</li>
		</ol>
	</div>
	<div class="confirm">
		<button class="but" @click="submitAnswer()">提交</button>
		<button class="but" @click="back()">取消</button>
	</div>
</div>
</template>

<script>
export default{
	// inject: ['reload'],
	data() {
		return {
			id: parseInt(this.$route.params.id),
			questions: {},
			question: [],
			answer: {

			}
		}
	},
	methods: {
		radiochange() {
			// console.log(this.answer);
		},
		checkboxchange() {
			// console.log(this.answer);
		},
		back() {
			if(window.confirm("确定取消吗")) {
				this.$router.push({path: '/user/allReleaseSurver'});
			}
		},
		submitAnswer() {
			// console.log(this.answer);
			for (let a in this.answer){
				if(this.answer[a] == "" || this.answer[a] == []){
					alert("有题目没做完");
					return;
				}
			}
			for(let i= 1; i<= this.question.length; i++){
				// console.log(typeof(this.answer[i]))
				let a = this.answer[i]
				if(typeof(a) == "string"){
					this.question[i-1].choose[a]++;
				}else {
					for(let s in a){
						// console.log(a[s]);
						this.question[i-1].choose[a[s]]++;
					}
				}
			}
			//提交
			let params = {
				surverid: this.id,
				question: this.question
			}
			this.$http.post('/api/submitAnswer', params).then((response)=>{
				// console.log(response);
				alert("提交成功")
				this.$router.push({path: '/user/allReleaseSurver'});
			})
		}
	},
	mounted() {
		this.$http.get('/api/admin/getquestion/'+this.id).then((response) => {
			// console.log(response.body);
				this.questions = response.body[0] || {};
				// this.questions = this.questions[0] || {};
				this.question = this.questions.question || [];
				//将问题按题目序号排列好，以便渲染到界面，以后只需要改question就行了
				this.question.sort(function(a, b){
					return a.number - b.number;
				})
				for(let i = 0; i< this.question.length; i++){
					if(this.question[i].type == "radio"){
						// this.answer[i+1] = "";
						// this.$set("answer[i+1]", "");
						this.$set(this.answer, i+1, "");  // 这样操作对象可以让页面重新渲染
					}else if(this.question[i].type == "checkbox"){
						// this.answer[i+1] = [];
						// this.$set("answer[i+1]", []);
						this.$set(this.answer, i+1, []);  // 这样操作对象可以让页面重新渲染
					}else{

					}
					
				}
				// console.log(this.answer)
       		});
	}
}
</script>

<style scoped>
.content{
	position: relative;
	width: 100%;
	/*min-height: 500px;*/
	/*height: 100%;*/
	overflow-y: auto;
	background-color: #fff;
}
.surverTitle{
	width: 100%;
	height: 30px;
	font-size: 20px;
	text-align: center;
}
.que{
	width: 100%;
	/*height: 100%;*/
}
.confirm {
	/*position: fixed;
	bottom: 10px;
	left: 0;*/
	position: relative;
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