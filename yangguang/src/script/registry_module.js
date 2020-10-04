define([], function(require, factory) {
    return {
        init: function() {
            let $user = $('.username');
            let $usernameflag = true;
            $user.on('blur', function() {
                $.ajax({
                    type: 'post',
                    url: 'http://192.168.13.7/yangguang/tian/yangguang/php/registry.php',
                    data: {
                        username: $user.val()
                    }
                }).done(function(result) {
                    if (!result) { //不存在
                        $('span').html('√').css({
                            color: 'green'
                        });
                        $usernameflag = true;
                    } else {
                        $('span').html('该用户名已经存在').css({
                            color: 'red'
                        });
                        $usernameflag = false;
                    }
                })
            });
            $('form').on('submit', function() {
                if ($user.val() == '') {
                    $('span').html('用户名不能为空').css({ color: "red" });
                    $usernameflag = false;

                }
                if (!$usernameflag) {
                    return false;
                }
            })

        }
    }

});