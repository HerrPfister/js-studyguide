# Currying

Function currying is when you transform a function into a chain of functions. Usually, its a chain of single argument functions, but you could do varying arguments.

```js
// Simple currying function
const log = (time) => (importance) => (message) => {
  return `[${time}] - ${importance} - ${message}`;
};

const nowLog = log(new Date());
const dailyReminder = nowLog("Reminder");

const studyReminder = dailyReminder("Learn JavaScript today!");
const dateReminder = dailyReminder("Get ready for your date!");
const cookReminder = dailyReminder(`You're cooking tonight. Get on it!`);

const today = new Date();
const tomorrow = today.setDate(tomorrow.getDate() + 1);
const reminderForTomorrow = log(tomorrow)("REMINDER")("Stop procrastinating!");

// Complex currying function
const curry = function (func) {
  return function curried(...args) {
    if (args.length === func.length) {
      // If the current amount of args is equal to the function args, call the function.
      return func.apply(this, args);
    } else {
      return function (...args2) {
        // Else return a function that will have reference to the current amount of arguments, and call the curried function again.
        return curried.apply(this, args.concat(args2));
      };
    }
  };
};

const log = function (time, importance, message) {
  return `[${time}] - ${importance} - ${message}`;
};

const curriedLog = curry(log);

const nowLog = curriedLog(new Date());

const dailyReminder = nowLog("REMINDER");

const studyReminder = dailyReminder("Learn JavaScript today!");
const dateReminder = dailyReminder("Get ready for your date!");
const cookReminder = dailyReminder(`You're cooking tonight. Get on it!`);

const today = new Date();
const tomorrow = today.setDate(tomorrow.getDate() + 1);
const reminderForTomorrow = curriedLog(tomorrow)("REMINDER")("Stop procrastinating!");
```
