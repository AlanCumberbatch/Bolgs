//一文讲懂什么是函数柯里化，柯里化的目的及其代码实现: https://mp.weixin.qq.com/s/Jj_CT1b2ehTh3ehZTMcICA

```js
function curry(f) { // curry(f) 执行柯里化转换
  return function(a) {
    return function(b) {
      return f(a, b);
    };
  };
}
```