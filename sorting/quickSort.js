const { performance, PerformanceObserver } = require("perf_hooks");

const perfObserver = new PerformanceObserver((items) => {
  items.getEntries().forEach((entry) => {
    console.log(`${entry.name} = ${entry.duration} milliseconds`);
  });
});

perfObserver.observe({ entryTypes: ["measure"], buffer: true });

/**
 * Splits an array into two arrays using a pivot anchor, and returns them in a map.
 * @split
 * @param {number[]} array - the array to split.
 * @param {number} pivot - the anchor.
 * @returns {{ lessThanEqualTo: number[], greaterThan: number[] }} the sorted array.
 */
function split(array, pivot) {
  return array.reduce(
    (map, value) => {
      if (value < pivot) {
        return { ...map, lessThanEqualTo: [...map.lessThanEqualTo, value] };
      } else if (value > pivot) {
        return { ...map, greaterThan: [...map.greaterThan, value] };
      }

      return map;
    },
    {
      lessThanEqualTo: [],
      greaterThan: []
    }
  );
}

/**
 * Sorts the passed in list using the quick sort algorithm.
 * @see {@link https://www.geeksforgeeks.org/quick-sort/}
 * @quickSort
 * @param {number[]} array - the array to sort.
 * @returns {number[]} the sorted array.
 */
function quickSort(array = []) {
  if (array.length < 2) return array;

  const pivot = array[array.length - 1];

  const { lessThanEqualTo, greaterThan } = split(array, pivot);

  const left = quickSort(lessThanEqualTo);
  const right = quickSort(greaterThan);

  return [...left, pivot, ...right];
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
  performance.mark("quick-sort");
  const quickSortedList = quickSort(list);
  performance.measure("Execution Time for: quick sort", "quick-sort");
  console.log(quickSortedList);
} catch (e) {
  console.error(`System Error: ${e.message}`);
}
