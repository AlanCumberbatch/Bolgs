#### 引出的问题：
  1. [块作用域在JS那个版本之后才出现的?---生效的前提!!](./block_scoping.md)
  2. 在词法解析/语法解析上，var和 let、const的根本区别是什么？？--- 这个问题上一个问题的答案里有

```js
//面试中关于 JavaScript 作用域的 5 个陷阱

//1. for 循环内的 var 变量：
//  --- 实验不成功，当前版本不可以通过 for (let i = 0, var l = colors.length; i < l; i++) 方式定义循环内的变量
//  --- 变量定义在外部的话，let，var 都一样
// 如果按照文中所说，我觉得是因为 let，const 定义的变量回和当前作用域进行绑定有关----》具体怎么绑定？？
//  思考如下代码片段：

// const colors = ["red", "blue", "white"];
// let l = colors.length;
// var i = 0;
// for (; i < l; i++) {
//     console.log(colors[i]); // 'red', 'blue', 'white'
// }
// console.log(l); // ??? 3
// console.log(i); // ??? 3

//2. 代码块中的函数声明
// ES2015 env
// {
//     function hello() {
//         return "Hello!";
//     }
// }
// hello(); //? ES2015之前都可以成功执行，之后却不行

//3. 你可以在哪里导入模块？
/*
  ES2015 的模块系统是静态的。通过分析 JavaScript 源代码而不是执行代码来确定模块的依赖关系。
  所以在代码块或函数中不能包含 import 语句，因为它们是在运行时执行的。
*/

//4. 函数参数作用域
let p = 1;
function myFunc(p = p + 1) {
    return p;
}
myFunc(); //! Cannot access 'p' before initialization
//发生这种情况是因为函数的参数具有自己的作用域（与函数作用域分开）。参数 p = p + 1 等效于 let p = p + 1。
/*
具体原因：（关键的点是清楚函数的参数有自己的作用域！！！）
  首先，定义变量 p。
  然后 JavaScript 尝试评估默认值表达式 p + 1，但此时绑定  p  已经创建但尚未初始化（不能访问外部作用域的变量  let p = 1）。
  因此抛出一个错误，即在初始化之前访问了 p。
解决办法：
  可以重命名变量 let p = 1 ，也可以重命名功能参数 p = p + 1。即 q = p + 1， 或者 函数外部 let q = 1;
*/

//5. 函数声明与类声明
if (true) {
    function greet() {
        // function body
    }

    class Greeter {
        // class body
    }
}

greet(); //! ReferenceError
new Greeter(); //! ReferenceError
//function 和 class 声明都是块作用域的。所以在代码块作用域外调用函数 greet() 和构造函数 new Greeter() 就会抛出 ReferenceError

// 总结
/*
  必须注意 var 变量，因为它们是 函数 作用域的，即使是在代码块中定义的。
  由于 ES2015 模块系统是静态的，因此你必须在模块作用域内使用 import 语法（以及 export）。
  函数参数具有其作用域。设置默认参数值时，请确保默认表达式内的变量已经用值初始化。
  在 ES2015 运行时环境中，函数和类声明是块作用域的。但是在 ES2015 之前的环境中，函数声明仅在函数作用域内。
*/
```