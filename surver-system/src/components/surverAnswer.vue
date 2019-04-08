<template>
<div class="content">
	<!-- {{question}} -->
 	<!-- [ { "number": 1, "title": "问题一", "type": "radio", "option": { "A": "选项一", "B": "选项二" }, "choose": { "A": 0, "B": 0 } }, { "option": { "A": "选项一", "B": "选项二", "C": "选项三", "D": "选项四" }, "number": 2, "title": "问题二", "type": "checkbox", "choose": { "A": 0, "B": 0, "C": 0, "D": 0 } } ] -->
 	<div class="pageTitle">问卷结果</div>
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
				<div class="chart">
					<ve-pie :data="chartData[item.number]"
					width="500px"
					height="200px"
					:settings="chartSettings"
					style="margin:0 0 0 100px;"></ve-pie>
				</div>
			</li>
		</ol>
	</div>
</div>
</template>

<script>
export default{
	data() {
		this.chartSettings = {
        	radius: 45,
        	offsetY: 120
      	}
		return {
			id: parseInt(this.$route.params.id),
			questions: {},
			question: [],
			Alphabet: ["A", "B", "C", "D", "E", "F", "G", "H", "I"],
			chartData: {

			}
			//日期对应为选项,访问用户对应数量
			//question[i].option.A   question[i].choose.A
		}
	},
	methods: {

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
			for(let i=0; i<this.question.length; i++){
				this.$set(this.chartData, i+1, {
					columns: ['选项', '访问用户'],
					rows: []
				});
				for(let j in this.question[i].option){
					// console.log(this.question[i].option[j]);
					// console.log(this.question[i].choose[j]);
					let op = this.question[i].option[j],
						num = this.question[i].choose[j]
					let ob = {'选项': op, '访问用户': num}
					// this.$set(this.chartData[i+1].rows, i, ob)
					this.chartData[i+1].rows.push(ob);
				}
			}
			console.log(this.chartData);
			// 1: {
	  //         	columns: ['选项', '访问用户'],
	  //         	rows: [
			//         { '选项': 'A', '访问用户': 1393 },
			//         { '选项': 'B', '访问用户': 3530 },
			//         { '选项': 'C', '访问用户': 2923 },
			//         { '选项': 'D', '访问用户': 1723 }
		 //        ]
   //      	}
       	});
	}
}
</script>

<style scoped>
.content{
	position: relative;
	width: 100%;
	/*min-height: 500px;*/
	height: 100%;
	overflow-y: auto;
	background-color: #fff;
}
.pageTitle{
	width: 100%;
	height: 30px;
	font-size: 20px;
	text-align: center;
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
.chart{
	width: 100%;
	height: 200px;
}
</style>