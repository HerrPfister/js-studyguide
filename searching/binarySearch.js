const { performance, PerformanceObserver } = require("perf_hooks");

const perfObserver = new PerformanceObserver((items) => {
  items.getEntries().forEach((entry) => {
    console.log(`${entry.name} = ${entry.duration} milliseconds`);
  });
});

perfObserver.observe({ entryTypes: ["measure"], buffer: true });

/**
 * Search a sorted list using the binary search technique.
 * @see {@link https://www.geeksforgeeks.org/binary-search/}
 * @binarySearch
 * @param {number} value - the value to search for.
 * @param {number[]} array - the sorted array.
 * @param {number} start - search starting index.
 * @param {number} end - search ending index.
 * @returns {boolean} indication of whether or not the searched value is in the array.
 */
function binarySearch(value, array, start, end) {
  // Break Case
  if (start > end) return false;

  const mid = Math.floor((start + end) / 2);
  const current = array[mid];

  // If the current value in the array is equal to what we are searching for.
  // return true.
  if (current === value) return true;

  // If the current value in the array is greater than what we are searching for.
  // search the lower half of the list since we know the value is less than the current.
  if (current > value) return binarySearch(value, array, start, mid - 1);

  // If the current value in the array is less than what we are searching for.
  // search the upper half of the list since we know the value is greater than the current.
  return binarySearch(value, array, mid + 1, end);
}

const { argv: args } = process;

if (args.length < 3) {
  console.error(
    "Error: Could not find value to search for. Please pass a value to search for into this script."
  );
}

if (args.length < 4) {
  console.error(
    "Error: Could not find sorted list to search. Please pass a sorted comma separated list into this script."
  );
}

try {
  const search = parseInt(args[2]);
  const list = args[3]
    .split(",")
    .map((value) => parseInt(value))
    .sort();

  console.log(search, list);
  performance.mark("binary-search");
  const result = binarySearch(search, list, 0, list.length - 1);
  performance.measure("Execution Time for: binary search", "binary-search");
  console.log(result);
} catch (e) {
  console.error(`System Error: ${e.message}`);
}
