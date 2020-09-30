define(['jcookie'], function(require, factory) {
    return {
        init: function() {
            //获取cookie的商品和数量
            if ($.cookie('cookiesid') && $.cookie('cookienum')) {
                let sidarr = $.cookie('cookiesid').split(',');
                let numarr = $.cookie('cookienum').split(',');
                console.log(sidarr);
                console.log(numarr);
                for (let i = 0; i < sidarr.length; i++) {
                    renderlist(sidarr[i], numarr[i])
                }
            }


            //渲染
            function renderlist(sid, num) {
                $.ajax({
                    url: "http://192.168.13.7/yangguang/tian/yangguang/php/jingdong.php",
                    dataType: "json",

                }).done(function(data) {
                    $.each(data, function(index, value) {
                        if (value.sid == sid) { //当前传入的sid等于当前数据中存在的sid
                            let $clonebox = $('.goods-item:hidden').clone(true, true);
                            $clonebox.find('.goods-pic img').attr('src', value.url);
                            $clonebox.find('.goods-d-info a').html(value.title);
                            $clonebox.find('.b-price strong').html(value.price);
                            $clonebox.find('.quantity-form input').val(num);
                            $clonebox.find('.b-sum strong').html((value.price * num).toFixed(2));
                            //显示克隆内容
                            $clonebox.css('display', 'block');
                            $('.item-list').append($clonebox);
                            calc(); //计算总价
                        }
                    });
                })

            }

            //小计
            function calc() {
                let $allprice = 0; //商品价格为0
                let $allcount = 0; //商品数目为0
                $('.goods-item:visible').each(function(index, value) {
                    if ($(this).find('.cart-checkbox input').is(':checked')) {
                        $allprice += parseFloat($(this).find('.b-sum strong').html()); //商品价格
                        $allcount += parseInt($(this).find('.quantity-form input').val()); //商品数目
                    }
                })
                $('.amount-sum em').html($allcount);
                $('.totalprice').html('￥' + $allprice.toFixed(2));
            }
        }
    }

});