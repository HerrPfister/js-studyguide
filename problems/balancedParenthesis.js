class Stack {
  constructor(stack) {
    this.stack = Array.isArray(stack) ? stack : [];
  }

  pop() {
    return this.stack.pop();
  }

  push(value) {
    return this.stack.push(value);
  }

  peek() {
    return this.stack[this.stack.length - 1];
  }

  count() {
    return this.stack.length;
  }
}

const OPEN_BRACKETS = ["[", "(", "<", "{"];

function hasMatchingClosingBracket(openBracket, closingBracket) {
  switch (openBracket) {
    case "[":
      return closingBracket === "]";
    case "(":
      return closingBracket === ")";
    case "{":
      return closingBracket === "}";
    case "<":
      return closingBracket === ">";
    default:
      return false;
  }
}

function balancedParenthesis(equation) {
  const stack = new Stack();
  const brackets = equation.match(/([\[\]\(\)\{\}\<\>])/g);

  while (brackets.length) {
    const nextBracket = brackets.shift();
    const isOpenBracket = OPEN_BRACKETS.some(
      (openBracket) => openBracket === nextBracket
    );

    if (isOpenBracket) {
      stack.push(nextBracket);
    } else {
      const lastOpenBracket = stack.pop();

      if (!hasMatchingClosingBracket(lastOpenBracket, nextBracket)) {
        return false;
      }
    }
  }

  return true;
}

console.log(balancedParenthesis("[]")); // true
console.log(balancedParenthesis("()")); // true
console.log(balancedParenthesis("<>")); // true
console.log(balancedParenthesis("<>")); // true
console.log(balancedParenthesis("><")); // false
console.log(balancedParenthesis("()()")); // true
console.log(balancedParenthesis("[[((<[]>))]]")); // true
console.log(balancedParenthesis("<><><><>)(()()")); // false
console.log(balancedParenthesis("(3+3)*4/(5-(3*2))")); // true
console.log(balancedParenthesis("(3+3)*4/(5-3*2))")); // false
