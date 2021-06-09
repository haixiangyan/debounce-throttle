# debounce-throttle

> Github 代码：https://github.com/Haixiang6123/debounce-throttle
> 预览：http://yanhaixiang.com/debounce-throttle/

debounce 和 throttle 是面试时经常会被问到的一道 JS 题。我自己在第一次找工作的时候，就被问过。当时被问得半天说不出两者的区别，说着说着就把自己带入坑了。

今天就跟大家分享一下这两者的区别吧。

## debounce 是什么

中文名：防抖。在开始操作了之后，那么只有在一段 delay 时间段后不再有操作了，才执行操作。

```js
const onClick = debounce(fn, 300)

click // 不执行 fn
click // 不执行 fn
等 200 ms 后再 click // 不执行 fn
等 500 ms 后再 click // 执行 fn
```

相信大家上初中物理都见过音叉

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0de4358a034f44ba999be2e10b2878fc~tplv-k3u1fbpfcp-zoom-1.image)

当有东西碰到它的时候，就会一直在震，防抖可以形象地理解为：当不再震动的时候做一些事情。

最常见的场景就是用户不断点击“提交”按钮，debounce 生成的函数就可以在用户一段时间内不再点击时，再执行“提交”操作。

## debounce 实现

实现思路如下：
1. setTimeout 在 delay ms 后执行
2. 每次调用 debounced 函数时，都直接清除掉 timerId
3. 当一段时间过去了（大于 delay ms），setTimeout 就会自动执行 fn

```js
function debounce(fn, delay) {
  let timerId, context, args

  function debounced() {
    [context, args] = [this, arguments]

    clearTimeout(timerId) // 以后再次调用的时候会清除掉

    timerId = setTimeout(() => {
      fn.apply(context, arguments)  // 到点执行
    }, delay)
  }

  return debounced
}
```

## throttle 是什么

中文名：节流。在开始操作之后，在 delay ms 内只会做一次。

```js
const onMove = throttle(fn, 300)

move // 第一次先执行
move // 300 ms 后执行 fn
过了 3 ms 后 move // 准备在 303 ms 执行 fn
过了 100 ms 后 move // 将上一次的 timerId 去掉，准备 400 ms 执行 fn
过了 301 ms 后 move // 马上执行 fn
```

节流，字面意思就可以理解为 threshold ms 一段时间里做一件事，类似于技能的 CD。当然，这么来理解可能不太准确的，因为 throttle 还有一个条件就是**最多**执行一次。比如，在 CD 值冷却的时候去执行，虽然现在执行不了，但是会在 delay ms 执行。

只有在无限多次执行上面的 move 才会出现 threshold ms 后再执行一次的技能 CD 效果。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b0a798bd0b4b41cca5551a7cb1c86835~tplv-k3u1fbpfcp-zoom-1.image)

## throttle 实现

实现思路如下：
1. 第一次调用的时候就执行了
2. 当上一次时间 + threshold > 当前时间（CD 值在冷却）时调用，会在 thresold ms 后执行
3. 执行 fn 时会记录当前时间为 preivous

```js
function throttle(fn, threshold) {
  let timerId, previous

  function throttled() {
    let [context, args] = [this, arguments]

    const now = Date.now() // 记录当前时间

    if (previous && now < previous + threshold) {
      clearTimeout(timerId) // 以后调用时，清除时间

      timerId = setTimeout(() => { // 重新计时
        previous = now // 记录时间用于以后的比较
        fn.apply(context, args)
      }, threshold)
    } else {
      previous = now //记录时间用于以后的比较，开始一段新的时间段
      fn.apply(context, args)
    }
  }

  return throttled
}
```
