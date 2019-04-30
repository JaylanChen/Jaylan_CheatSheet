## 时间格式化

    Date.prototype.Format = function (fmt) {
        var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时
            "H+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };
        var week = {
            "0": "/u65e5",
            "1": "/u4e00",
            "2": "/u4e8c",
            "3": "/u4e09",
            "4": "/u56db",
            "5": "/u4e94",
            "6": "/u516d"
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        if (/(E+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[this.getDay() + ""]);
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    }

    function DateFormat(value, format) {
        if (format == undefined) {
            format = "yyyy-MM-dd";
        }
        if (value == null) {
            return "";
        }
        return new Date(value).Format(format);
    }

## 字符串格式化

    <!-- Date.prototype.Format = function (fmt) {
        for (var i = 0; i <= arguments.length; i++) {
            var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
            this = this.replace(re, arguments[i]);
        }
        return this;
    } -->

    function StringFormat() {
        if (arguments.length === 0)
            return null;
        var str = arguments[0];
        for (var i = 1; i < arguments.length; i++) {
            var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
            str = str.replace(re, arguments[i]);
        }
        return str;
    }

## 节流函数

    /**
    * 节流函数
    * @method 方法
    * @delay 延迟时间 
    * @duration 最长延迟执行时间
    * @return Success
    */
    function throttle(method, delay = 200, duration = 500) {
        var timer = null;
        var begin = new Date();
        return function () {
            var context = this,
                args = arguments;
            var current = new Date();
            clearTimeout(timer);
            if (current - begin >= duration) {
                method.apply(context, args);
                begin = current;
            } else {
                timer = setTimeout(function () {
                    method.apply(context, args);
                }, delay);
            }
        }
    }

## 数字格式化（每3位加逗号）

    function formatNumber(str){
        let reg = new RegExp(/(?<=\d)(?=(\d{3})+(\.\d+)?$)/,'g');
        let i = str.indexOf('.');
        return str.replace(reg,(...args)=>args[args.length-2]<i|i==-1?",":"");
    }