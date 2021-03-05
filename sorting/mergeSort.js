const { performance, PerformanceObserver } = require("perf_hooks");

const perfObserver = new PerformanceObserver((items) => {
  items.getEntries().forEach((entry) => {
    console.log(`${entry.name} = ${entry.duration} milliseconds`);
  });
});

perfObserver.observe({ entryTypes: ["measure"], buffer: true });

/**
 * merge two arrays in ascending order
 * @see {@link https://www.geeksforgeeks.org/merge-sort/}
 * @merge
 * @param {number[]} left - the left array to sort.
 * @param {number[]} right - the right array to sort.
 * @returns {number[]} the sorted array.
 */
function merge(left = [], right = []) {
  const array = [];

  while (left.length && right.length) {
    array.push(left[0] < right[0] ? left.shift() : right.shift());
  }

  return [...array, ...left, ...right];
}

/**
 * Sorts the passed in list using the merge sort algorithm.
 * @see {@link https://www.geeksforgeeks.org/merge-sort/}
 * @mergeSort
 * @param {number[]} array - the array to sort.
 * @returns {number[]} the sorted array.
 */
function mergeSort(array = []) {
  if (array.length < 2) return array;

  const middle = Math.floor(array.length / 2);

  const left = mergeSort(array.slice(0, middle));
  const right = mergeSort(array.slice(middle));

  return merge(left, right);
}

const { argv: args } = process;

if (args.length < 3) {
  console.error(
    "Error: Could not find list to sort. Please pass a comma separated list into this script."
  );
}

try {
  const list = args[2].split(",").map((value) => parseInt(value));

  console.log(list);
  performance.mark("merge-sort");
  const mergeSortedList = mergeSort(list);
  performance.measure("Execution Time for: merge sort", "merge-sort");
  console.log(mergeSortedList);
} catch (e) {
  console.error(`System Error: ${e.message}`);
}
