define(['pagination', 'jlazyload'], function() {
    return {
        init: function() {
            let array_default = [];
            let array = [];
            let prev = null;
            let next = null;
            const $list = $('.list');
            //第一页的渲染


            $.ajax({
                url: 'http://192.168.13.7/yangguang/tian/yangguang/php/listdata.php',
                dataType: 'json'
            }).done(function(data) {
                let $strhtml = '<ul>';
                $.each(data, function(index, value) {
                    $strhtml += `
                        <li>
                            <a href="detail.html?sid=${value.sid}" target="_blank">
                                <img src="${value.url}" width="200" height="200"/>
                                <p>${value.sid}${value.title}</p>
                                <span class="price">￥${value.price}</span>
                                <span>${value.sailnumber}</span>
                                <span>${value.comment}</span>
                            </a>
                        </li>
                    `;
                });
                $strhtml += '</ul>';
                $list.html($strhtml);
                array_default = [];
                array = [];
                prev = null;
                next = null;
                $('.list li').each(function(index, element) {
                    array[index] = $(this);
                    array_default[index] = $(this);
                });

            });


            // 分页
            $(function() {
                $('.page').pagination({
                    pageCount: 3,
                    jump: true,
                    coping: true,
                    prevContent: '上一页',
                    nextContent: '下一页',
                    homePage: '首页',
                    endPage: '尾页',
                    callback: function(api) {
                        console.log(api.getCurrent());
                        $.ajax({
                            url: 'http://192.168.13.7/yangguang/tian/yangguang/php/listdata.php',
                            data: {
                                page: api.getCurrent()
                            },
                            dataType: 'json'
                        }).done(function(data) {
                            let $strhtml = '<ul>';
                            $.each(data, function(index, value) {
                                $strhtml += `
                    <li>
                        <a href="detail.html?sid=${value.sid}" target="_blank">
                            <img src="${value.url}"/>
                            <p>${value.sid}${value.title}</p>
                            <span class="price">￥${value.price}</span>
                            <span>${value.sailnumber}</span>
                            <span>${value.comment}</span>
                        </a>
                    </li>
                `;
                            });
                            $strhtml += '</ul>';
                            $list.html($strhtml);
                            array_default = [];
                            array = [];
                            prev = null;
                            next = null;
                            $('.list li').each(function(index, element) {
                                array[index] = $(this);
                                array_default[index] = $(this);
                            });
                        });
                    }
                });
            })


            // 默认排序
            $('button').eq(0).on('click', function() {
                $.each(array_default, function(index, value) {
                    $('.list ul').append(value);
                });
                return;
            });
            //升序
            $('button').eq(1).on('click', function() {
                    for (let i = 0; i < array.length - 1; i++) {
                        for (let j = 0; j < array.length - i - 1; j++) {
                            prev = parseFloat(array[j].find('.price').html().substring(1));
                            next = parseFloat(array[j + 1].find('.price').html().substring(1));
                            if (prev > next) {
                                let temp = array[j];
                                array[j] = array[j + 1];
                                array[j + 1] = temp;
                            }
                        }
                    }
                    $.each(array, function(index, value) {
                        $('.list ul').append(value);
                    })
                })
                // 降序
            $('button').eq(2).on('click', function() {
                for (let i = 0; i < array.length - 1; i++) {
                    for (let j = 0; j < array.length - i - 1; j++) {
                        prev = parseFloat(array[j].find('.price').html().substring(1));
                        next = parseFloat(array[j + 1].find('.price').html().substring(1));
                        if (prev < next) {
                            let temp = array[j];
                            array[j] = array[j + 1];
                            array[j + 1] = temp;
                        }
                    }
                }
                $.each(array, function(index, value) {
                    $('.list ul').append(value);
                })
            });

            // 二级菜单
            $(function() {
                $('.he-bottom2').on('mouseover', function() {
                    $('.banner').css({
                        display: 'block',
                    })
                });
                $('.he-bottom2').on('mouseout', function() {
                    $('.banner').css({
                        display: 'none',
                    })
                });
                $('.banner').on('mouseover', function() {
                    $('.banner').css({
                        display: 'block',
                    })
                });
                $('.banner').on('mouseout', function() {
                    $('.banner').css({
                        display: 'none',
                    })
                });
            });

            // 二级菜单
            $(function() {
                const $bannerli = $('.banner ul li');
                const $item = $('.cartlist .item');
                const $cartlist = $('.cartlist');
                $bannerli.on('mouseover', function() {
                    $(this).addClass('active').siblings().removeClass('active');
                    $item.eq($(this).index()).show().siblings('.item').hide();
                    $cartlist.show();
                });
                $bannerli.on('mouseout', function() {
                    $cartlist.hide();
                });
                $(window).on('scroll', function() {

                    let $top = $(window).scrollTop();
                    let $bannertop = $('.banner').offset().top;

                    if ($top > $bannertop) {
                        $cartlist.css({
                            top: $top - $bannertop
                        });
                    } else {
                        $cartlist.css({
                            top: 0
                        });
                    }
                })
                $cartlist.hover(() => {
                    $cartlist.show();
                }, () => {
                    $cartlist.hide();
                })
            });

            //鼠标移入是出现阴影
            $(function() {
                $('.list ').on('mouseover', 'li', function() {
                    $(this).css({
                        boxShadow: "0 15px 15px rgba(0 ,0, 0 ,0.4)"
                    })
                });
                $('.list ').on('mouseout', 'li', function() {
                    $(this).css({
                        boxShadow: "0 0 0 rgba(0 ,0, 0 ,0)"
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