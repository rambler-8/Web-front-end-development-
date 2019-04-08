import Vue from 'vue'
import Router from 'vue-router'
import adminLogin from '@/demo/adminLogin'
import backstage from "@/demo/backstage"
import allSurver from '@/components/allSurver'
import createSurver from '@/components/createSurver'
import editSurver from '@/components/editSurver'
import allUser from '@/components/allUser'
import userLogin from '@/demo/userLogin'
import user from "@/demo/user"
import allReleaseSurver from "@/components/allReleaseSurver"
import editInformation from "@/components/editInformation"
import answerSurver from "@/components/answerSurver"
import surverAnswer from "@/components/surverAnswer"
Vue.use(Router)

export default new Router({
	mode: 'history',
  	routes: [
	    {
	      path: '/adminLogin',
	      name: 'adminLogin',
	      component: adminLogin
	    },
	    {
	      path: '/admin/',
	      name: 'backstage',
	      component: backstage,
	      //默认定位到
	      redirect: '/admin/allsurver',
      	  children: [
        	{
	          path: 'allsurver',
	          name: 'allSurver',
	          component: allSurver
	        },
	        {
	          path: 'createsurver',
	          name: 'createSurver',
	          component: createSurver
	        },
	        {
	          path: 'editsurver/:id',
	          name: 'editSurver',
	          component: editSurver
	        },
	        {
		    	path: 'allUser',
		    	name: 'allUser',
		    	component: allUser
	    	},
	    	{
	    		path: 'surverAnswer/:id',
		    	name: 'surverAnswer',
		    	component: surverAnswer
	    	},
	    	{
	    		path: 'addUser',
		    	name: 'editInformation',
		    	component: editInformation
	    	}
      	  ]
	    },
	    {
		    path: '/userLogin',
		    name: 'userLogin',
		    component: userLogin
	    },
	    {
		    path: '/user/',
		    name: 'user',
		    component: user,
		    redirect: '/user/allReleaseSurver',
		    children: [
		    	{
		    		path: 'allReleaseSurver',
		    		name: allReleaseSurver,
		    		component: allReleaseSurver
		    	},
		    	{
		    		path: 'editInformation',
		    		name: editInformation,
		    		component: editInformation
		    	},
		    	{
		    		path: 'answerSurver/:id',
		    		name: answerSurver,
		    		component: answerSurver
		    	}
		    ]
	    }
  	]
})
