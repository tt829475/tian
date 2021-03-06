//主入口文件
//调用模块
//require 调用模块，接收第二个参数
//第一个参数是数组，表示依赖的模块
//第二个参数是一个回调函数，当前面指定模块都加载成功后，它将被调用



//模块配置
require.config({
    paths: { //路径
        'jquery': 'https://cdn.bootcdn.net/ajax/libs/jquery/1.12.4/jquery.min',
        'jcookie': 'https://cdn.bootcdn.net/ajax/libs/jquery-cookie/1.0/jquery.cookie.min',
        'jlazyload': 'https://cdn.bootcdn.net/ajax/libs/jquery.lazyload/1.8.3/jquery.lazyload.min'
    },
    shim: { //让不支持AMD的模块，支持AMD模块
        'jcookie': {
            deps: ['jquery'], //依赖的模块
            exports: 'jcookie' //别名
        },
        'jlazyload': {
            deps: ['jquery'],
            exports: 'jlazyload'
        }
    }
});

require(['jquery', 'jcookie', 'jlazyload'], function() {
    let pagemod = $('#currentpage').attr('data-page');
    //2.加载script标签里面约定的模块名。
    require([pagemod], function(page) {
        page.init();
    })

});
// require(['jquery', 'jcookie', 'jlazyload'], function() {
//     let pagemod = $('#currentpage').attr('data-page'); //通过id名或者内部的自定义属性page-origin的值。
//     if (page) {
//         require([pagemod], function(page) {
//             page.init();
//         });
//     }
// });