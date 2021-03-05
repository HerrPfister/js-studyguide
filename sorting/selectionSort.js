const { performance, PerformanceObserver } = require("perf_hooks");

const perfObserver = new PerformanceObserver((items) => {
  items.getEntries().forEach((entry) => {
    console.log(`${entry.name} = ${entry.duration} milliseconds`);
  });
});

perfObserver.observe({ entryTypes: ["measure"], buffer: true });

/**
 * Sorts the passed in list using the selection sort algorithm.
 * @see {@link https://www.geeksforgeeks.org/selection-sort/}
 * @selectionSort
 * @param {number[]} array - the array to sort.
 * @returns {number[]} the sorted array.
 */
function selectionSort(array = []) {
  const subarray = [];

  while (array.length) {
    const lowestIndex = array.reduce((low, val, index) => array[low] < val ? low : index, 0);

    subarray.push(array[lowestIndex])

    array.splice(lowestIndex, 1);
  }

  return subarray;
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
  performance.mark("selection-sort");
  const selectionSortedList = selectionSort(list);
  performance.measure("Execution Time for: selection sort", "selection-sort");
  console.log(selectionSortedList);
} catch (e) {
  console.error(`System Error: ${e.message}`);
}
