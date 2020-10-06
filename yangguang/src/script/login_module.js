define(['sha1'], function(require, factory) {
    return {
        init: function() {
            $('.btn').on('click', function() {
                $.ajax({
                    type: "post",
                    url: "http://192.168.13.7/yangguang/tian/yangguang/php/login.php",
                    data: {
                        user: $('.username').val(),
                        pass: hex_sha1($('.password').val()),
                    },

                }).done(function(result) {
                    if (result) {
                        location.href = "index1.html";
                        localStorage.setItem('username', $('username').val());
                    } else {
                        $('.password').val('');
                        alert('用户名或密码错误');
                    }
                })
            });

            //1 用户名的验证
            // //得到焦点
            // var nusename = document.querySelector('.nusename');
            // var password = document.querySelector('.password');
            // var aSpan = document.querySelectorAll('#registry span');
            // var submit = document.querySelector('.submit');
            // let $nusefalg = true;

            // let $passfalg = true;
            // $('.nusename').on('focus', function() {
            //     $('span').eq(0).html("汉字英文均可，最长14个汉字7个字符");
            //     $('span').eq(0).css({
            //         color: '#999',
            //     })
            // });

            // //失去焦点
            // //this.value 指向nusename里面的内容；
            // $('. nusename').on('blur', function() {
            //     if ('value' !== '') {
            //         let $strlen = this.value.replace(/[\u4e00-\u9fa5]/g, '**').length;
            //         let $reg = /^[a-zA-Z\u4e00-\u9fa5]+$/;
            //         if ($strlen <= 14) {
            //             if ($reg.test(this.value)) {
            //                 $('span').eq(0).html('√');
            //                 $('span').eq(0).css({
            //                     color: 'green'
            //                 });
            //                 $nusefalg = true;
            //             } else {
            //                 $('span').eq(0).html('长度为14的字符和汉字');
            //                 $('span').eq(0).css({
            //                     color: 'red'
            //                 });
            //                 $nusefalg = false;
            //             }
            //         } else {
            //             $('span').eq(0).html('请输入中文或汉字');
            //             $('span').eq(0).css({
            //                 color: 'red'
            //             });
            //             $nusefalg = false;
            //         }
            //     } else {
            //         $('span').eq(0).html('请输入最长为14个字符或7个汉字');
            //         $('span').eq(0).css({
            //             color: 'red'
            //         });
            //         $nusefalg = false;
            //     }
            // });

            // //5.密码验证
            // //得到焦点
            // $('.password').on('focus', function() {
            //     $('span').eq(1).html('请输入6-12位含有字母特殊字符数字的密码');
            //     $('span').eq(1).css({
            //         color: '#999'
            //     });
            // });

            // //进行密码判断
            // $('.password').on('input', function() {
            //     if (this.value.length >= 6 && this.value.length <= 12) {
            //         let $reg1 = '/\d+/'; //数字字符；
            //         let $reg2 = '/[a-z]+/'; //小写字母；
            //         let $reg3 = ' /[A-Z]+/'; //大写字母；
            //         let $reg4 = '/[\W\_]+/'; //特殊字符；
            //         let $count = 0;
            //         if ($reg1.test(this.value)) {
            //             $count++;
            //         }
            //         if ($reg2.test(this.value)) {
            //             $count++;
            //         }
            //         if ($reg3.test(this.value)) {
            //             $count++;
            //         }
            //         if ($reg4.test(this.value)) {
            //             $count++;
            //         }
            //         switch ($count) {
            //             case 1:
            //                 $('span').eq(1).html('弱');
            //                 $('span').eq(1).css({
            //                     color: 'red'
            //                 });
            //                 $passfalg = false;

            //                 break;
            //             case 2:
            //             case 3:
            //                 $('span').eq(1).html('中');
            //                 $('span').eq(1).css({
            //                     color: 'pink'
            //                 });
            //                 $passfalg = true;

            //                 break;
            //             case 4:
            //                 $('span').eq(1).html('强');
            //                 $('span').eq(1).css({
            //                     color: 'green'
            //                 });
            //                 $passfalg = true;

            //                 break;
            //         }
            //     } else {
            //         $('span').eq(1).html('密码长度必须是6-12位');
            //         $('span').eq(1).css({
            //             color: 'red'
            //         });
            //         $passfalg = false;
            //     }
            // });

            // //失去焦点
            // $('.password').on('blur', function() {
            //     if (this.value !== '') {
            //         if ($passfalg) {
            //             $('span').eq(1).html('√');
            //             $('span').eq(1).css({
            //                 color: 'green'
            //             });
            //         }
            //     } else {
            //         $('span').eq(1).html('密码格式不正确');
            //         $('span').eq(1).css({
            //             color: 'red'
            //         });
            //     }
            // });
            // $(' form').on('submit', function() {
            //     if (nusename.value === '') {
            //         $('span').eq(0).html('用户姓名不能为空');
            //         $('span').eq(0).css({
            //             color: 'red'
            //         })
            //         $nusefalg = false;
            //     }
            //     if (password.value === '') {
            //         $('span').eq(1).html('用户密码不能为空');
            //         $('span').eq(1).css({
            //             color: 'red'
            //         })
            //         $nusefalg = false;
            //     }
            //     if (!$nusefalg || !$passfalg) {
            //         return false; //阻止默认行为；
            //     }
            // });

        }
    }

});