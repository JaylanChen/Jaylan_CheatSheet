# ES6语法学习

## 变量声明 let  const

var的作用域：全局作用域、函数作用域。
let和const的作用域：全局作用域、函数作用域、块级作用域（表示在当前代码块内才有效，即{}中）。

let     作用域严格，用完即销毁，超出作用域则不可用。不会发生变量提升。
const   用于声明常量（即不能被改变的值，声明时必须初始化）
        PS：如常量是个对象或者数组，本身不可改变，但内部的值可变。

## 赋值

    let a = 1, b = 2, c = 3;
    let [a, b, c] = [1, 2, 3];
    let [a, [b, [c]]] = [1, [2, [3]]];
    let [,, c] = [1, 2, 3]; // c = 3
    let [a,...c] = [1, 2, 3] // a = 1, c = [2, 3] PS: ...后面只能有一个值

## Array

合并数组 [1, 2].concat([3, 4])  等价于  [1, 2,...[3, 4]]
map结构：[key,value]结构  字典
generator函数    可以返回多次，斐波那契数列generator写法如下：
    function* fib(max) {
        var
            t,
            a = 0,
            b = 1,
            n = 0;
        while (n < max) {
            yield a;
            [a, b] = [b, a + b];
            n ++;
        }
        return;
    }

Array.of() 将传入的参数返回成数组
find(回调函数)：返回数组中第一个符合条件的成员，没有就是undefined
findIndex(回调函数(value,index,arr))：返回数组中第一个符合条件的成员的位置，没有就是-1。（value当前值，index当前位置，arr数组本身）
fill()给定值填充数组
entries()、keys()、values()遍历数组
includes() 判断是否存在，也可以用来判断字符串的字符，返回boolean，代替indexOf()，比indexOf()更优化
filter()：按条件筛选，返回一个新数组
every()：检测数组的所有元素都符合条件，返回boolean
some()：检测数组中是否有元素符合条件，返回boolean
map()：符合条件的，返回一个新数组，但是map()会保留空位
    而ES6中entries()、keys()、values()、find()和findIndex()会将空位处理成undefined。