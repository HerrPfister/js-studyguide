function debounce(func, timeout) {
  let deferredFunc;

  return function () {
    if (deferredFunc) clearTimeout(deferredFunc);

    deferredFunc = setTimeout(() => {
      func(...arguments);
    }, timeout);
  };
}

const debouncedFunction = debounce((a, b, c) => {
  console.log(a, b, c);
}, 1000);

for (let i = 0, j = 0, k = 0; i < 1000000; i++, j++, k++) debouncedFunction(i, j, k);
