## jQuery 扩展

    (function ($) {
        $.fn.extend({
            'jaylan': function (options) {
                //检测用户传进来的参数是否合法
                if (!isValid(options))
                    return this;
                var opts = $.extend({}, defaluts, options); //使用jQuery.extend 覆盖插件默认参数

                //这里的this 就是 jQuery对象
                //return返回的each()返回结果，支持链式调用
                return this.each(function () { //遍历所有的dom, 当调用 jaylan()插件的是一个集合的时候。

                    var $this = $(this); //获取当前dom 的 jQuery对象，这里的this是当前循环的dom
                    //根据参数来设置 dom的样式
                    $this.css({
                        color: opts.color
                    });
                    $this.text(opts.text);
                    //格式化文本
                    var markup = $this.html();
                    markup = $.fn.jaylan.format(markup);
                    $this.html(markup);
                });
            }
        });

        //默认参数
        var defaluts = {
            color: 'red',
            text: 'Jaylan'
        };
        //公共的格式化方法. 默认是加粗，用户可以通过覆盖该方法达到不同的格式化效果。
        $.fn.jaylan.format = function (str) {
            return "<strong>" + str + "</strong>";
        }
        //私有方法，检测参数是否合法
        function isValid(options) {
            return !options || (options && typeof options === "object") ? true : false;
        }
    })(window.jQuery)