define([], function() {
    return {
        init: function() {
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
        },
        banner: function() {
            const $bannerli = $('#banner ul li');
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
        },
        wapp: function() {
            const $list = $('.seckill-content .wrapp ');
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
        },
        wap: function() {
            let index = 0
            let timer = null
            let cd = $('.wrapp>li').length - 1

            $('.seckill-content').on('mouseover', function() {
                $('.bx-prev').css({
                    'display': 'block'
                })
                $('.bx-next').css({
                    'display': 'block'
                })
            })
            $('.seckill-content').on('mouseout', function() {
                $('.bx-prev').css({
                    'display': 'none'
                })
                $('.bx-next').css({
                    'display': 'none'
                })
            })
            $('.bx-prev').on('click', function() {
                if (index == 0) {
                    index = cd
                    $('.wrapp').css({
                        'left': parseInt($('.wrapp>li').css('width')) * -cd
                    })
                }
                index--
                $('.wrapp').stop(true).animate({
                    'left': parseInt($('.wrapp>li').css('width')) * -index
                }, 300)

                console.log(index)
            })
            $('.bx-next').on('click', function() {
                if (index == cd) {
                    index = 0
                    $('.wrapp').css({
                        'left': 0
                    })
                }
                index++
                $('.wrapp').stop(true).animate({
                    'left': parseInt($('.wrapp>li').css('width')) * -index
                }, 300)


            })


        },
        timer: function() {
            function double(n) {
                return n < 10 ? '0' + n : n;
            }
            $starttime = new Date("2020/10/13");
            setInterval(function() {
                $nowtime = new Date();
                $time = $starttime - $nowtime;
                $('.m').html(double(parseInt($time / 1000 / 60 / 60 % 24)));
                $(".h").html(double(parseInt($time / 1000 / 60 % 60)));
                $(".s").html(double(parseInt($time / 1000 % 60)));

            }, 1000);

        },
        topp: function() {
            $('.nav41').on('click', function() {
                $('html,body').animate({
                    scrollTop: 0
                })
            })

        },



    }
})