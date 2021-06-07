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

document.querySelector('#nothingEl').onmousemove = () => {
  const span = document.querySelector('#nothingEl span')
  span.textContent = String(parseInt(span.textContent) + 1)
}

document.querySelector('#debounceEl').onmousemove = debounce(() => {
  const span = document.querySelector('#debounceEl span')
  span.textContent = String(parseInt(span.textContent) + 1)
}, 200)

document.querySelector('#throttleEl').onmousemove = throttle(() => {
  const span = document.querySelector('#throttleEl span')
  span.textContent = String(parseInt(span.textContent) + 1)
}, 200)
