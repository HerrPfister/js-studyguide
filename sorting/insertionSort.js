const { performance, PerformanceObserver } = require("perf_hooks");

const perfObserver = new PerformanceObserver((items) => {
  items.getEntries().forEach((entry) => {
    console.log(`${entry.name} = ${entry.duration} milliseconds`);
  });
});

perfObserver.observe({ entryTypes: ["measure"], buffer: true });

/**
 * Sorts the passed in list using the insertion sort algorithm.
 * @see {@link https://www.geeksforgeeks.org/insertion-sort/}
 * @insertionSort
 * @param {number[]} array - the array to sort.
 * @returns {number[]} the sorted array.
 */
function insertionSort(array = []) {
  const { length } = array;

  for (let i = 1; i < length; i++) {
    const key = array[i];

    let j = i - 1;
    let current = array[j];
    while (j >= 0 && current > key) {
      array[j + 1] = current;

      j -= 1;
      current = array[j];
    }

    array[j + 1] = key;
  }

  return array;
}

/**
 * Returns the insertion index using binary search.
 * @see {@link https://www.geeksforgeeks.org/binary-insertion-sort/}
 * @binarySearchForInsertionIndex
 * @param {number} value - the value to search for.
 * @param {number[]} array - the array to search.
 * @param {number} start - starting index of search.
 * @param {number} end - ending index of search.
 * @returns {number} the insertion index.
 */
function binarySearchForInsertionIndex(value, array, start, end) {
  if (start === end) return array[start] > value ? start : start + 1;

  if (start > end) return start;

  const mid = Math.floor((start + end) / 2);
  const current = array[mid];

  if (current > value) {
    return binarySearchForInsertionIndex(value, array, start, mid - 1);
  } else if (current < value) {
    return binarySearchForInsertionIndex(value, array, mid + 1, end);
  }

  return mid;
}

/**
 * Sorts the passed in list using the binary insertion sort algorithm.
 * @see {@link https://www.geeksforgeeks.org/binary-insertion-sort/}
 * @binaryInsertionSort
 * @param {number[]} array - the array to sort.
 * @returns {number[]} the sorted array.
 */
function binaryInsertionSort(array = []) {
  const { length } = array;

  for (let i = 0; i < length; i++) {
    const value = array[i];
    const insertionIndex = binarySearchForInsertionIndex(value, array, 0, i - 1);

    array = [
      ...array.slice(0, insertionIndex), // Add all values up to the insertion index
      value, // Add the current value at the insertion index
      ...array.slice(insertionIndex, i), // Add all values from the old value at the insertion index to i
      ...array.slice(i + 1) // Add the remaining values
    ];
  }

  return array;
}

const { argv: args } = process;

if (args.length < 3) {
  console.error(
    "Error: Could not find list to sort. Please pass a comma separated list into this script."
  );
}

try {
  const list = args[2].split(",").map((value) => parseInt(value));

  const insertionSortList = [...list];
  console.log(insertionSortList)
  performance.mark("insertion-sort");
  const insertionSortedList = insertionSort(insertionSortList);
  performance.measure("Execution Time for: insertion sort", "insertion-sort");
  console.log(insertionSortedList);

  const binaryInsertionSortList = [...list];
  console.log(binaryInsertionSortList)
  performance.mark("binary-insertion-sort");
  const binaryInsertionSortedList = binaryInsertionSort(binaryInsertionSortList);
  performance.measure("Execution Time for: binary insertion sort", "binary-insertion-sort");
  console.log(binaryInsertionSortedList);
} catch (e) {
  console.error(`System Error: ${e.message}`);
}
