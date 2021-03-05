# Insertion Sort

Insertion sort is a simple sorting algorithm that works similar to the way you sort playing cards in your hands. The array is virtually split into a sorted and an unsorted part. Values from the unsorted part are picked and placed at the correct position in the sorted part.

> Time Complexity:
> Worst => O(n^2)
> Best => O(n)

```js
/**
 * Sorts the passed in list using the insertion sort algorithm.
 * @see {@link https://www.geeksforgeeks.org/insertion-sort/}
 * @insertionSort
 * @param {number[]} array - the array to sort.
 * @returns {number[]} the sorted array.
 */
function insertionSort(array = []) {
  const { length } = array;

  for (let i = 1, j = 0; i < length; i++, j = i - 1) {
    const key = array[i];
    const current = array[j];

    while (j >= 0 && current > key) {
      array[j + 1] = current;
      j -= 1;
    }

    array[j + 1] = key;
  }
}
```

## Binary Insertion Sort

An improvement to the insertion sorting algorithm. Instead of comparing inline we use binary search to determine where to insert the current value into the list.

> Time Complexity:
> Worst => O(logN)
> Best => O(logN)

```js
function binarySearch(value, array, start, end) {
  if (start === end) return array[start] > val ? start : start + 1;

  if (start > end) return start;

  const mid = Math.floor((start + end) / 2);
  const current = array[mid];

  if (current > value) {
    return binarySearch(value, array, start, mid - 1);
  } else if (current < value) {
    return binarySearch(value, array, mid + 1, end);
  }

  return mid;
}

function binaryInsertionSort(array = []) {
  const { length } = array;

  for (let i = 0; i < length; i++) {
    const value = array[i];
    const insertionIndex = binarySearch(value, array, 0, i - 1);

    array = [
      ...array.slice(0, insertionIndex), // Add all values up to the insertion index
      value, // Add the current value at the insertion index
      ...array.slice(insertionIndex, i), // Add all values from the old value at the insertion index to i
      ...array.slice(i + 1) // Add the remaining values
    ];
  }
}
```
