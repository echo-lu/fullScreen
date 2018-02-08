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

