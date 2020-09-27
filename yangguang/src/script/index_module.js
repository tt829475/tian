define([], function() {
    return {
        init() {
            list: ! function() {
                const $list = $('.like-inner ul');
                $.ajax({
                        url: 'http://192.168.13.45/yangguang/tian/yangguang/php/jingdong.php',
                        dataType: 'json'
                    })
                    .done((data) => {
                        let $renderdata = data;
                        let $strhtml = '';
                        $.each($renderdata, function(index, value) {
                            $strhtml += `
                        <li>
                                <a href="detail.html?sid=${value.sid}">
                                    <img src="${value.url}" />
                                    <p>${value.title}</p>
                                    <span>￥${value.price}</span>
                                    <span>${value.sailnumber}</span>    
                                </a>
                            </li>
                        `;
                        });
                        $list.html($strhtml);
                    });
                const $listul = $('.like-inner ul');
                $listul.on('mouseover', 'li', function() {
                    $(this).css({
                        border: '1px solid red',
                        width: '234px',
                        height: '315px',
                        margin: '0 0 10px 10px'
                    });
                });

                $listul.on('mouseout', 'li', function() {
                    $(this).css({
                        border: '1px solid #fff',
                    });
                });
            }();
            banner: ! function() {
                const $bannerli = $('#banner ul li'); //18个li
                const $item = $('.cartlist .item'); //18块内容
                const $cartlist = $('.cartlist'); //右边的内容框
                //鼠标移入，添加类名，显示右边的内容框
                $bannerli.on('mouseover', function() {
                    $(this).addClass('active').siblings().removeClass('active');
                    $item.eq($(this).index()).show().siblings('.item').hide(); //当前和li匹配的item显示，其他的隐藏
                    $cartlist.show();
                });
                $bannerli.on('mouseout', function() {
                    $cartlist.hide();
                });
                $(window).on('scroll', function() {

                    let $top = $(window).scrollTop();
                    let $bannertop = $('#banner').offset().top;

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
            }()
            wapp: ! function() {
                const $list = $('.seckill-content .wrapp');
                $.ajax({
                        url: 'http://192.168.13.45/yangguang/tian/yangguang/php/jingdong.php',
                        dataType: 'json'
                    })
                    .done((data) => {
                        let $renderdata = data;
                        let $strhtml = '';
                        $.each($renderdata, function(index, value) {
                            $strhtml += `
                        <li>
                                <a href="detail.html?sid=${value.sid}">
                                    <img src="${value.url}" />
                                    <p>${value.title}</p>
                                    <span>￥${value.price}</span>
                                    <span>${value.sailnumber}</span>    
                                </a>
                            </li>
                        `;
                        });
                        $list.html($strhtml);
                    });
                const $listul = $('.seckill-content .wrapp');
                // $listul.on('mouseover', 'li', function() {
                //     $(this).css({
                //         border: '1px solid red',
                //         width: '234px',
                //         height: '315px',
                //         margin: '0 0 10px 10px'
                //     });
                // });

                // $listul.on('mouseout', 'li', function() {
                //     $(this).css({
                //         border: '1px solid #fff',
                //     });
                // });
            }();
            wap: ! function() {
                let index = null;
                $(".seckill-content").on("mouseover", function() {
                    $(".bx-prev").css({
                        display: "block",
                    });
                    $(".bx-next").css({
                        display: "block",
                    })

                });
                $(".seckill-content").on("mouseout", function() {
                    $(".bx-prev").css({
                        display: "none",
                    });
                    $(".bx-next").css({
                        display: "none",
                    })

                });

                $(".bx-prev").on("click", function() {
                    index += 6;
                    $('.wrapp').css({
                        left: -1 * index * $('.warpp li').width(),
                    })
                    if (index === -6) {
                        $('.wrapp').css({
                            left: index * $('.warpp li').width(),
                        })
                    }
                });
                $(".bx-next").on("click", function() {
                    index += 1 * 170 * 6;
                    $('.wrapp').css({
                        left: index,
                    })
                });

                if (index === -6) {}



            }();

        }
    }
})