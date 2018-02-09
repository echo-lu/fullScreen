# fullScreen
jQuery全屏滚动插件

### 闭包的作用
	(function($) {
		// do something
	})(jQuery);

- 避免全局依赖
- 避免第三方破坏
- 兼容jQuery操作符'$'和jQuery

### jQuery插件开发方式
1. 类级别组件开发
  即给jQuery命名空间下添加新的全局函数，也称为静态方法。 <br /> 
  jQuery.myPlugin = function() {}; <br /> 
  例如：$.Ajax()、$.extend()
2. 对象级别组件开发
  即挂在jQuery原型下的方法，这样通过选择器获取的jQuery对象实例也能共享该方法，也称为动态方法。 <br /> 
  $.fn.myPlugin = function(){};   // 这里 $.fn === $.prototype <br /> 
  例如：addClass()、attr()等，需要创建实例来调用 <br /> 

### jQuery最大优势：链式调用
  实例：$("div").next().addClass() <br /> 
  代码实现：
  $.fn.myPlugin = function() {
    return this.each(function() {
      // do something
    });
  }; <br />   
  代码说明：<br />
  - return this返回当前对象，来维护插件的链式调用 <br /> 
  - each循环实现每个元素的访问 <br /> 

### 单例模式
  $.fn.MyPlugin = function() {
    var me = $(this),
      instance = me.data('myPlugin');
    if(!instance) {
      me.data("myPlugin",(instance = new myPlugin()));
    }
  }; <br />  
  代码说明 <br />
  - 如果实例存在则不再重新创建实例 <br /> 
  - 利用data()来存放插件对象的实例 <br /> 

### 绑定鼠标滚轮事件
js事件有很多需要兼容的地方，鼠标滚轮事件显然也有额外的差异。包括IE6浏览器在内都适用mouseWheel，而只有火狐浏览器使用DOMMouseScroll。
$(document).on("mouseWheel DOMMouseScroll",handler); <br />
### 如何判断鼠标滚轮方向
其他浏览器通过wheeldalta属性来判断，但是火狐浏览器没有这个属性，可通过detail这个属性来判断 <br />
开发中发现每次向下滚动时，wheeldalta都是-120，但是detail却是3，火狐浏览器方向判断的数值正负与其他浏览器是相反的。
### 绑定键盘事件keydown
说明：keydown事件发生在键盘的键被按下的时候。 <br />
原生js中判断按下了哪个键是存在兼容性的： <br />
- IE 只有keyCode属性
- Firefox 有which和charCode属性
- Opera 有keyCode和which属性 <br />
但是jQuery已经解决了这个问题，可通过.which属性和.keyCode属性来确定按下了哪个键： <br />
arrow left 37 <br />
arrow  up 38 <br />
arrow  right 39 <br />
arrow  down 40 <br />

### 转换Transform
转换方式： <br />
- 旋转：rotate transform:rotate(45deg);
- 缩放：scale transform:scale(2,0.5);
- 移动：translate transform:translate(100px,-50px);
- 扭曲：skew transform:skew(45deg,45deg);
- 矩阵变形：matrix(&lt;number&gt;,&lt;number&gt;,&lt;number&gt;,&lt;number&gt;,&lt;number&gt;,&lt;number&gt;)

### 如何判断浏览器是否支持某个css属性
实现思路：通过判断某个element的style中是否存在某个css属性 <br />
实现代码： <br />
(function(temp) {
	if(temp.style["transition"] !== undefined) {
		return true;
	}
	return false;
})(document.createElement("div"));
