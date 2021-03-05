# General JavaScript Knowledge

## Type Coercion

The difference between `==` and `===` boils down to how the two operators determine how their operands are equal. `==` forces types and will determine if two operands are equal solely on their type.

```js
console.log(false == 0); // true
console.log(2 == "2"); // true
console.log(true == 2); // false
```

However, `===` on the other hand does not force types and will return false if two operands of different types are being compared.

```js
console.log(2 === 2); // true
console.log("true" === true); // false
console.log(false === 0); // false
```

## NaN Snafus

NaN stands for _Not a Number_ but is in fact a number. However, if compared to a number it will return false. To accurately determine if a number is NaN use `Number.isNaN()`.

## SetTimeout Snafus

Using setTimeout(some function, 0) will actually be executed after anything not within the timeout. This is due to the lifecycle of javascript. First everything in the script is handled and/or queued up and then the queue is emptied.

```js
console.log(1);
setTimeout(() => {
  console.log(2);
}, 1000);
setTimeout(() => {
  console.log(3);
}, 0);
console.log(4);

// This will print out: 1, 4, 3, 2
```
