# Bubble Sort

Bubble sort is a basic sorting algorithm, that works by repeatably swapping adjacent elements.

> Time Complexity:
> Worst => O(n^2)
> Best => O(n)

```js
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
    const swapped = false;
    const end = length - i - 1;

    for (let j = 0; j < end) {
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
```
