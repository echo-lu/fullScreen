(function($) {
	// 私有方法
	var privateFun = function() {
	}
	// 自执行的匿名函数
	var PageSwitch = (function() {
		function PageSwitch(element,options) {
			// 存放配置参数
			this.settings = $.extend(true,$.fn.PageSwitch.default,options||{});
			this.element = element;
			// 初始化插件
			this.init();
		}	
		PageSwitch.prototype = {
			// 说明：初始化插件
			// 实现：初始化dom结构，布局，分页即绑定事件
			init:function() {
				var me = this; //this指PageSwitch对象
				me.selectors = me.settings.selectors;
				me.sections = me.selectors.sections;
				me.section = me.selectors.section;

				me.direction = me.settings.direction == "vertical"?true:false;
				me.pagesCount = me.pagesCount();
				me.index = (me.settings.index>=0 && me.settings.index <pagesCount)?settings.index:0;
				if(!me.direction) { //如果是横屏
					me._initLayout();
				}
				if(me.settings.pagination) {
					me._initPaging();
				}

				me._initEvent();
			},
			// 说明：获取滑动页面数量
			pagesCount:function(){
				return this.section.length;
			},
			// 说明：获取滑动的宽度（横屏滑动）或高度（竖屏滑动）
			switchLength:function(){
				return this.direction ? this.element.height() : this.element.width();
			},
			// 说明：主要针对横屏情况进行页面布局
			_initLayout:function(){
				var me = this;
				var width = (me.pagesCount * 100) + "%",
					cellWidth = (100/me.pagesCount).toFixed(2) + "%";
				me.sections.width(width);
				me.section.width(cellWidth).css("float","left");

			},
			// 说明：实现分页的dom结构及css样式
			_initPaging:function(){
				var me  = this,
					pagesClass = me.selectors.page.substring(1),
					activeClass = me.selectors.active.substring(1);
				var pageHtml = "<ul class='"+pagesClass+"'>";
				for(var i=0;i<me.pagesCount;i++) {
					pageHtml += "<li></li>"
				}
				me.element.append(pageHtml);
				var pages = me.element.find(me.selectors.page);
				me.pageItem = pages.find("li");
				me.pageItem.eq(me.index).addClass(activeClass);

				if(me.direction) {
					pages.addClass('vertical');
				}else {
					pages.addClass('horizontal');
				}
			},
			// 说明：初始化插件事件
			_initEvent:function(){}
		}
		return PageSwitch;
	})();
	$.fn.PageSwitch = function(options) {
		return this.each(function() {
			// instance存放插件实例
			var me = $(this),instance = me.data("PageSwitch");
			if(!instance) {
				// 如果实例为空则new一个对象
				instance = new PageSwitch(me,options);
				me.data("PageSwitch",instance);
			}
			// 判断用户传递的参数是字符串就实现该方法的调用
			if($.type(options) === "string") return instance[options]();
		})
	}
	// 添加默认的配置参数
	$.fn.PageSwitch.default = {
		selectors: {
			sections:".sections", 	//对应sections的div
			section:".section",		//对应section的div
			page:"pages",			//分页
			active:"active"		//分页被选中时添加的class
		}, 
		index:0,					//对应页面的索引值
		easing:"ease",				//动画效果，默认ease
		duration:500,				//页面滑动动画执行时间，默认500ms
		loop:false,					//页面动画是否循环播放，默认FALSE
		pagination:true,			//是否进行分页处理
		keyboard:true,				//是否触发键盘事件
		direction:"vertical",	    //竖屏/横屏滑动，默认竖屏	
		callback:""					//实现滑屏动画后执行的回调函数
	}
})(jQuery);