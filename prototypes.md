# Prototype Chain

In JavaScript there is no true concept of OO classes. Instead everything is just an object, and inheritance works by chaining objects together. This is known as the prototype chain. The chain continues all the way down until it finds the end of the chain, which is denoted by a prototype property on that last object that is null. Even though null is an object itself it has no prototype.

> Classes, before all the sugary goodness, were created via prototype chains. Functions, objects, arrays are all objects in the end. More importantly, they are object prototype chains all the way down. Confusing, right? So when you write that fancy `Class` statement just remember you're creating a prototype chain under the hood that is actually just a series of nested objects.

```js
// In the OO mindset this creates a "class" Test with a constructor that sets a to 1 and b to 2.
const Test = function () {
  this.a = 1;
  this.b = 2;
};

// However in js it's really a prototype chain of: own props -> function prototype -> object prototype -> null
```

## Property Shadowing

When the next prototype in the chain has the same field set as the previous, but does not get used. It's essentially a form of inheritance using js prototypes.

```js
const original = { a: 1, b: 2 }; // Create original "class"

// Structure of Original = { a: 1, b: 2, prototype: {...} }

console.log(original.a); // 1

const shadow = Object.create(original); // Create new "class" shadow with original as its base.

// Structure of shadow = { prototype: { a: 1, b: 2 } }

console.log(shadow.a); // 1

shadow.a = 3;

console.log(shadow.a); // 3, because of property shadowing.

// Structure of shadow = { a: 3, prototype: { a: 1, b: 2 } }

console.log(shadow.b); // 2, because b doesn't exist in shadow's own properties it looks for b in the next prototype chain for b which is original's own properties.
```

## Classes as Prototype Chains

```js
class Polygon {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
}

// Property structure: own properties -> function prototype -> object prototype  -> null
// { constructor Polygon(), prototype: {...} }

class Square extends Polygon {
  constructor(side) {
    super(side, side);
  }

  get area() {
    return this.height * this.width;
  }

  set side(length) {
    this.height = length;
    this.width = length;
  }
}

// Square structure: own properties -> Polygon prototype -> function prototype -> object prototype -> null
// { constructor Square(), area(), side(length), prototype: { constructor Polygon(), prototype: {...} } }
```
