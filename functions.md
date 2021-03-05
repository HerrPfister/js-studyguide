
# Functions

## Named Functions

1. Creates a variable in the current scope with the identifier equal to the function name.
2. The newly created variable is hoisted to the top of the current scope, which means the function can be invoked before the declaration.
3. The function is named, which means that the name property of the function object holds its name. This is useful for debugging purposes.

```js
console.log(add(1, 1)); // => 2
console.log(add.name); // => 'add'
console.log(typeof add); // => 'function'

// The add function can be referenced prior to its declaration because its hoisted to the top of the current scope.

function add(a, b) {
  return a + b;
}
```

## Function Expressions

1. Functional expressions are not hoisted to the top of the current scope.
2. When paired with an named function, functional expressions will override its name property to be the name of the named function.
3. When paired with an anonymous function, functional expressions will set the name property to be the name of the variable. This however will not happen if the anonymous function is passed as a callback in a function.

```js
// Function expression with anonymous function
const add = function () {
  return a + b;
};

// Function expression with named function
const operator = function add() {
  return a + b;
};
```

### Shorthand Functions

```js
const operators = {
  add(a, b) {
    return a + b;
  }
};

class Calculator {
  constructor() {}

  add(a, b) {
    return a + b;
  }
}
```

## Arrow Functions

1. Does not create its own exec context, but takes it lexically from the immediate outer scope.
2. Is anonymous by default, but infers its name from the variable holding it.
3. The arguments object is not available inside an arrow function, but rest parameters are.

```js
const add = (a, b) => a + b;
const add = (a) => (b) => a + b;

class SimpleCalculator {
  a = 0;
  b = 0;

  constructor(a = 1, b = 1) {
    this.a = a;
    this.b = b;
  }

  add = () => {
    return this.a + this.b;
  };
}
```
