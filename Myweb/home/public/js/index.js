$(function(){
	// a链接鼠标移上移下的效果
	$('.top a , .midHeader a').not("[class^='NoJsa']").mouseenter(function(){
		$(this).css({'color':'#e00','text-decoration':'underline'});
	});
	$('.top a , .midHeader a').not("[class^='NoJsa']").mouseleave(function(){
		$(this).css({'color':'#999','text-decoration':'none'});
	});
	// 导航菜单鼠标移上移下下菜单显示影藏
	$('.myjiuxian,.sever').mouseenter(function(){
		$(this).find('.myjiuxianTop,.severTop').css({'background':'#fff'});
		$(this).find('li').css({'background':'#fff'});
		$(this).find('a').css({'background':'#fff'});
		$(this).find('.myjiuxianDown,.severDown').css({'display':'inline'});
		$(this).find('.caret').css({'transform':'rotate(180deg)'});
	});
	$('.myjiuxian,.sever,.navigation').mouseleave(function(){
		$(this).find('.myjiuxianTop,.severTop').css({'background':'#f2f2f2'});
		$(this).find('li').css({'background':'#f2f2f2'});
		$(this).find('a').css({'background':'#f2f2f2'});
		$(this).find('.myjiuxianDown,.severDown').css({'display':'none'});
		$(this).find('.caret').css({'transform':'rotate(0deg)'});
	});

	$('.mobil').mouseenter(function(){
		$(this).find('a').css({'text-decoration':'underline'});
	})
	$('.mobil').mouseleave(function(){
		$(this).find('a').css({'text-decoration':'none'});
	})
	$('.navigation').mouseenter(function(){
		$(this).find('.caret').css({'transform':'rotate(180deg)'});
		$(this).find('.navigationTop, .navigationTop a ,.navigationDownTop ,.navigationDownTop table ,.navigationDownTop h3,.navigationDownTop a').css({'background':'#fff'});
		$(this).find('.navigationDownCenter ,.navigationDownCenter table ,.navigationDownCenter h3').css({'background':'#f2f2f2'});
		$(this).find('.navigationDownDown ,.navigationDownDown table ,.navigationDownDown h3 ,.navigationDownDown a').css({'background':'#fff'});
		$(this).find('.navigationDownEnd ,.navigationDownEnd p').css({'background':'#f2f2f2'});
		$(this).find('.navigationDownTop ,.navigationDownCenter ,.navigationDownDown, .navigationDownEnd').css({'display':'inline'});
	})
	$('.navigation').mouseleave(function(){
		$(this).find('.caret').css({'transform':'rotate(0deg)'});
		$(this).find('.navigationTop, .navigationTop a ').css({'background':'#f2f2f2'});
		$(this).find('.navigationDownTop ,.navigationDownCenter ,.navigationDownDown, .navigationDownEnd').css({'display':'none'});
	})
	$('.navWarpmainLeft .navList li').mouseenter(function(){
		$(this).css({'background':'#ce171f'});
		$(this).find('a').css({'color':'#fff'});
	})
	$('.navWarpmainLeft .navList li').mouseleave(function(){
		$(this).css({'background':'#900'});
		$(this).find('a').css({'color':'#fff'});
	})
	$(".navWarpmainLeft .menu ul li").mouseenter(function(){
		var x=$(this).index();
		$(this).css({'border-left':'2px solid #f00','background':'#f2f2f2'})
		$(this).parent().nextAll().eq(x).css({'display':'inline'})
	})
	$('.navWarpmainLeft .menu ul li').mouseleave(function(){
		var x=$(this).index();
		$(this).css({'border-left':'2px solid #fff','background':'#fff'})
		$(this).parent().nextAll().eq(x).css({'display':'none'})
	})
	

	$('.navWarpmainLeft .menu .list-Rcon').mouseenter(function(){
		var x=$(this).index();
		x-=2;
		//console.log(x);
		$(this).parent().find('li').eq(x).css({'background':'#f2f2f2','border-left':'2px solid #f00'})
		$(this).css({'display':'inline'})
	}).mouseleave(function(){
		var x=$(this).index();
		x-=2;
		$(this).parent().find('li').eq(x).css({'background':'#fff','border-left':'2px solid #fff'})
		$(this).css({'display':'none'})
	});
	

	$('.menu .list-two-RCon .one .right .search-list a').hover(function(){
	    $(this).css({'background':'#e00' , 'color':'#fff'});
	    $(this).parent().nextAll('li').children('a').css({'background':'#fff' , 'color':'#999'});
	    $(this).parent().prevAll('li').children('a').css({'background':'#fff' , 'color':'#999'});
	},function(){
		 
	});
	$('.menu .list-two-RCon .one .right .search-list a').hover(function(){
    var a=$(this).text();
    var str = /^[A-Za-z]*$/;
		if (str.test(a)){
			var b='.menu .list-two-RCon .one .right .search-all .'+a;
    	$(b).css({'display':'inline'});
    	$(b).nextAll('p').css({'display':'none'});
    	$(b).prevAll('p').css({'display':'none'});
		}else{
			$('.menu .list-two-RCon .one .right .search-all .all').css({'display':'inline'});
			$('.menu .list-two-RCon .one .right .search-all .all').nextAll('p').css({'display':'none'});
		} 
	},function(){
		
	});
	
  $("#theTarget, #theTarget1, #theTarget2, #theTarget3, #theTarget4, #theTarget5, #theTarget6").skippr({
          transition: 'fade',
          speed: 1000,
          easing: 'easeOutQuart',
          navType: 'bubble',
          childrenElementType: 'div',
          arrows: false,
          autoPlay: true,
          autoPlayDuration: 5000,
          keyboardOnAlways: true,
          hidePrevious: false
  });


  $('.homeMainBody .homeImg .lay-1 .Box .nav ul li:first')
  		.css({'background':'#fff' , 'border-top':'2px solid #e00'});
  $('.homeMainBody .homeImg .lay-1 .indextabBox .nav ul li').mouseenter(function(){
  	$('.homeMainBody .homeImg .lay-1 .indextabBox .nav ul li').css({'background':'#f2f2f2' , 'border-top':'2px solid #f2f2f2'});
  	$(this).css({'background':'#fff' , 'border-top':'2px solid #e00'});
  	var x = $(this).index();
  	$('.homeMainBody .homeImg .lay-1 .indextabBox .indextabConWorp .indextabCon').hide();
  	$('.homeMainBody .homeImg .lay-1 .indextabBox .indextabConWorp .indextabCon').eq(x).show();
  })
  $('.homeMainBody .homeImg .lay-1 .indextabBox .indextabConWorp .indextabCon ul li').mouseenter(function(){

  })
  
  $('.homeMainBody .homeImg .lay-1 .indextabRight .indextabNew .indextabNewNav li:first')
  		.css({'background':'#fff' , 'border-top':'2px solid #e00'});
  $('.homeMainBody .homeImg .lay-1 .indextabRight .indextabNew .indextabNewNav li').mouseenter(function(){
  	$('.homeMainBody .homeImg .lay-1 .indextabRight .indextabNew .indextabNewNav li').css({'background':'#f2f2f2' , 'border-top':'2px solid #f2f2f2'});
  	$(this).css({'background':'#fff' , 'border-top':'2px solid #e00'});
  	var x = $(this).index();
  	$('.homeMainBody .homeImg .lay-1 .indextabRight .indextabNew .indextabNewCon').children().hide();
  	$('.homeMainBody .homeImg .lay-1 .indextabRight .indextabNew .indextabNewCon').children().eq(x).show();
  })
  
  $('.homeMainBody .homeImg .home_youhui .titleRightBox span').on('click', function(){
  	var idx=$(this).index('.homeMainBody .homeImg .home_youhui .titleRightBox span');
  	
  	s=-v*idx;
  	//$('.homeMainBody .homeImg .home_youhui .raceListWarp .receBoxs').css({'margin-left':s+'px'});
  	$('.homeMainBody .homeImg .home_youhui .raceListWarp .receBoxs').animate({'margin-left':s+'px'})
  	$('.homeMainBody .homeImg .home_youhui .titleRightBox span').removeClass('on');
  	$(this).addClass('on');
  });
  s=0;
  v=1198;
  left=-2396;
  $('.homeMainBody .homeImg .home_youhui .raceListWarp .raceRightBtn').click(function(){
  	s-=v;
  	if(s<=left){
  		s=left;
  	}
  	var n=Math.abs(s/v);
  	$('.homeMainBody .homeImg .home_youhui .titleRightBox span').removeClass('on');
  	$('.homeMainBody .homeImg .home_youhui .titleRightBox span').eq(n).addClass('on');
  	$('.homeMainBody .homeImg .home_youhui .raceListWarp .receBoxs').animate({
  		'margin-left':s+'px'
  	},500);
  	//$('.homeMainBody .homeImg .home_youhui .raceListWarp .receBoxs').css({'margin-left':s+'px'});
  });
  
  $('.homeMainBody .homeImg .home_youhui .raceListWarp .raceLeftBtn').click(function(){
  	s+=v;
  	if(s>0){
  		s=0;
  	}
  	var n=Math.abs(s/v);
  	$('.homeMainBody .homeImg .home_youhui .titleRightBox span').removeClass('on');
  	$('.homeMainBody .homeImg .home_youhui .titleRightBox span').eq(n).addClass('on');
  	$('.homeMainBody .homeImg .home_youhui .raceListWarp .receBoxs').animate({
  		'margin-left':s+'px'
  	},500);
  	//$('.homeMainBody .homeImg .home_youhui .raceListWarp .receBoxs').css({'margin-left':s+'px'});
  });

  $('.homeMainBody .homeImg .floot_one .topTenWarp .topTenBox .topTenNavBox .topTenNav a').on('click',function(){
  	var abc = $(this).index();
  		abc=abc/2;
  	$('.homeMainBody .homeImg .floot_one .topTenWarp .topTenBox .topTenConWrap').children().hide();
  	$('.homeMainBody .homeImg .floot_one .topTenWarp .topTenBox .topTenConWrap').children().eq(abc).show();
  });

  $('.rightSidebarBox .rightSidebarCon .user .rsItemName').mouseenter(function(){
  	$(this).next('div').show();
  	$(this).css({'background':'#cc0000'})
  	$(this).find('span').css({'color':'#fff'})
  }).mouseleave(function(){
  	$(this).next('div').hide();
  	$(this).css({'background':'#fff'})
  	$(this).find('span').css({'color':'#000'})
  });
  
  $('.rightSidebarBox .rightSidebarCon .user .sidebarUser').mouseenter(function(){
  	$(this).show();
  }).mouseleave(function(){
  	$(this).hide();
  });

  $('.rightSidebarBox .rightSidebarCon .rSidebarItem .rsItemName').mouseenter(function(){
  	$(this).css({'background':'#cc0000'})
  	$(this).find('span').css({'color':'#fff'})
  }).mouseleave(function(){
  	$(this).css({'background':'#fff'})
  	$(this).find('span').css({'color':'#000'})
  });


  $('.homeMainBody .Recommend .logobox .logoAll li a img').mouseenter(function(){
      $(this).animate({
      'margin-left': '-100px'
    })
  })
   $('.homeMainBody .Recommend .logobox .logoAll li a img').mouseleave(function(){
      $(this).animate({
      'margin-left': '0px'
    })
  })


   $('.homeMainBody .Recommend .titlebox li').mouseenter(function(){
      var x = $(this).index();
      var len = x*105;
      // console.log(x);
      $(this).css({'color': 'red'});
      $(this).siblings().css({'color': '#555'});
      $('.homeMainBody .Recommend .titleSlider').css({'left': len+'px'});
      $('.homeMainBody .Recommend .logobox .logoAll').css({'display': 'none'});
      $('.homeMainBody .Recommend .logobox .logoAll').eq(x).css({'display': 'block'});
   })


});