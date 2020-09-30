define(['jcookie'], function(require, factory) {
    return {
        init: function() {
            // 详情页
            $(function() {
                let $datasid = location.search.substring(1).split('=')[1];
                const $spic = $('#spic');
                const $bpic = $('#bpic');
                const $sf = $('#sf');
                const $bf = $('#bf');

                if (!$datasid) {
                    $datasid = 1
                }
                $.ajax({ //通过ajax传给后端
                        url: "http://192.168.13.7/yangguang/tian/yangguang/php/getsid.php",
                        data: {
                            sid: $datasid
                        },
                        dataType: 'json',
                    })
                    .done((data) => {
                        let objdata = data; //转换成对象

                        $('#smallpic').attr('src', objdata.url); //获取图片地址
                        $('#smallpic').attr('src', objdata.datasid);
                        $('.loadtitle').html(objdata.title); //获取标题
                        $('.loadpcp').html(objdata.price); //小图片的地址
                        $('#bpic').attr('src', objdata.url);
                        //渲染放大镜下的小图片
                        let arr = objdata.piclisturl.split(',');
                        let strhtml = ''; //拼接字符串
                        $.each(arr, function(index, value) {
                            //模板字符串   图片的值
                            strhtml += `
                            <li>
                                <img src="${value}">
                            </li>
                            `;
                        })
                        $('#list ul').html(strhtml);
                        hidearrow() //是否显示右箭头；若无法获取的元素，封装一个函数在上面进行调用
                    })
                    //4.放大镜效果
                    //大图/小图 = 大放/小放
                $spic.hover(function() {
                    //显示小放
                    $sf.css({
                            visibility: 'visible'
                        })
                        //显示大放
                    $bf.css({
                            visibility: 'visible'
                        })
                        //计算小图
                    $sf.css({
                        width: $spic.outerWidth() * $bf.outerWidth() / $bpic.outerWidth(), //小图的宽度*大放的宽度/大图的宽度
                        height: $spic.outerHeight() * $bf.outerHeight() / $bpic.outerHeight(), //小图的高度*大放的高度/大图的高度

                    })

                    //计算比列
                    let bili = $bpic.outerWidth() / $spic.outerWidth();
                    //小图的内容移动
                    $spic.on('mousemove', function(e) { //小图移动
                        let left = e.pageX - $('.wrap').offset().left - $sf.width() / 2;
                        let top = e.pageY - $('.wrap').offset().top - $sf.height() / 2;
                        //判断小放移动左边儿的边界
                        if (left <= 0) {
                            left = 0;
                        } else if (left >= $spic.width() - $sf.width()) { //判断小放移动右边儿的边界
                            left = $spic.width() - $sf.width();
                        }
                        //判断小放移动上边儿的边界
                        if (top <= 0) {
                            top = 0;
                        } else if (top >= $spic.height() - $sf.height()) { //判断小放移动下边儿的边界
                            top = $spic.height() - $sf.height();
                        }
                        $sf.css({
                            left: left,
                            top: top
                        })
                        $bpic.css({
                            left: -bili * left,
                            top: -bili * top

                        })
                    })
                }, function() {
                    $sf.css({
                        visibility: 'hidden'
                    })
                    $bf.css({
                        visibility: ' hidden'
                    })
                })

                //通过当前的li找到li的图片地址，赋值给大图和小图
                $('#list ul').on('click', 'li', function() { //点击小图
                    let picurl = $(this).find('img').attr('src'); //存储图片地址
                    $spic.find('img').attr('src', picurl); //小图的地址
                    $bpic.attr('src', picurl); //大图的地址
                })

                //图片切换左右箭头
                let piclen = 6; //图片显示的张数为6
                function hidearrow() {
                    if ($('#list ul li').size() <= piclen) { //图片显示的张数小于等于6的时候，左右箭头隐藏；
                        $('#right').css({
                            color: '#fff'
                        })
                    }
                }

                //点击右箭头
                $('#right').on('click', function() {
                    let liwidth = $('#list ul li').eq(0).outerWidth(true); //一个li的长度
                    if ($('#list ul li').size() > piclen) {
                        //判断li的长度是否是大于6的
                        piclen++; //大于自加
                        $('#left').css({ //左箭头显示
                            color: '#333'
                        })
                    }
                    //li的长度与现实的长度相等时
                    if (piclen === $('#list ul li').size()) {
                        $('#right').css({ //右箭头隐藏
                            color: '#fff'
                        })
                    }
                    $('#list ul').animate({ //向左运动一个长度
                        left: -(piclen - 6) * liwidth
                    })
                })

                //点击左箭头
                $('#left').on('click', function() {
                    let liwidth = $('#list ul li').eq(0).outerWidth(true); //一个li的长度
                    if (piclen > 6) {
                        //判断li的长度是否是大于6的
                        piclen--; //大于自减
                        $('#right').css({ //左箭头触发一次右箭头显示
                            color: '#333'
                        })
                    }
                    //li的长度与现实的长度相等时
                    if (piclen === 6) {
                        $('#left').css({ //左箭头隐藏
                            color: '#fff'
                        })
                    }
                    $('#list ul').animate({ //向左运动一个长度
                        left: -(piclen - 6) * liwidth
                    })
                })

                //购物车
                let arrsid = [] //存储sid数组
                let arrnum = [] //存储num的数组
                function cookietoarray() {
                    if ($.cookie('cookiesid') && $.cookie('cookienum')) { //二者都存在
                        arrsid = $.cookie('cookiesid').split(','); //将取出的cookiesid转换成数组
                        arrnum = $.cookie('cookienum').split(','); //将取出的cookienum转换成数组
                    }
                }
                $('.p-btn a').on('click', function() {
                    cookietoarray();
                    if ($.inArray($datasid, arrsid) === -1) { //当值不存在的时候,添加sid与num
                        //将$datasid添加给数组
                        arrsid.push($datasid);
                        //存储到cookie中
                        $.cookie('cookiesid', arrsid, { expires: 10000000, path: '/' });
                        //将arrnum添加数组中
                        arrnum.push($('#count').val());
                        //将cookienum存储到数组中
                        $.cookie('cookienum', arrnum, { expires: 10000000, path: '/' })
                    } else { //若存在，添加数量
                        let sidindex = $.inArray($datasid, arrsid);
                        let newarrnum = parseInt(arrnum[sidindex]) + parseInt($('#count').val()); //存在的值+当前的值
                        arrnum[sidindex] = newarrnum;
                        $.cookie('cookienum', arrnum, 10000000)
                    }
                    alert('加入购物车');

                })



























            })

            // 鼠标移入是小盒子出现边框
            $(function() {
                $('#list').on('mouseover', 'li', function() {
                    $(this).css({
                        border: "1px solid #e4393c",
                    })
                })
                $('#list').on('mouseout', 'li', function() {
                    $(this).css({
                        border: "1px solid #fff",
                    })
                })
            })

            // 回到顶部
            $(function() {
                $('.nav41').on('click', function() {
                    $('html,body').animate({
                        scrollTop: 0
                    })
                })
            });
















        }
    }

});