const { performance, PerformanceObserver } = require("perf_hooks");

const perfObserver = new PerformanceObserver((items) => {
  items.getEntries().forEach((entry) => {
    console.log(`${entry.name} = ${entry.duration} milliseconds`);
  });
});

perfObserver.observe({ entryTypes: ["measure"], buffer: true });

/**
 * Sorts the passed in list using the bubble sort algorithm.
 * @see {@link https://www.geeksforgeeks.org/bubble-sort/}
 * @bubbleSort
 * @param {number[]} array - the array to sort.
 * @returns {number[]} the sorted array
 */
function bubbleSort(array = []) {
  const { length } = array;

  for (let i = 0; i < length - 1; i++) {
    let swapped = false;

    const end = length - i - 1;

    for (let j = 0; j < end; j++) {
      const current = array[j];
      const next = array[j + 1];

      if (current > next) {
        array[j] = next;
        array[j + 1] = current;
        swapped = true;
      }
    }

    if (!swapped) break;
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

  console.log(list);
  performance.mark("bubble-sort");
  const bubbledSortedList = bubbleSort(list);
  performance.measure("Execution Time for: bubble sort", "bubble-sort");
  console.log(bubbledSortedList);
} catch (e) {
  console.error(`System Error: ${e.message}`);
}
