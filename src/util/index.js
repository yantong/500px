function throttle(fn, delay = 300) {
  let timer = null;
  return function () {
    if (timer) return;

    fn.apply(this, arguments);
    timer = setTimeout(() => {
      timer = null;
    }, delay);
  };
}

function debounce(fn, delay = 300) {
  let timer = null;

  return function () {
    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      fn.apply(this, arguments);
      timer = null;
    }, delay);
  };
}

export { throttle, debounce };
