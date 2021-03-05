function throttle(func, interval) {
  let throttleId;

  return function () {
    if (!throttleId) {
      func(...arguments);

      throttleId = setTimeout(() => {
        func(...arguments);
        clearTimeout(throttleId);
        throttleId = null;
      }, interval);
    }
  };
}

const throttledFunction = throttle((msg) => {
  console.log(msg);
}, 2000);

for (let i = 0; i < 100000; i++) throttledFunction("throttled");
