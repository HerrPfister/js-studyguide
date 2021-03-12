# Merge Sort

Merge sort uses the _divide and conquer_ algorithm to sort a list. It cuts the list into halves until it gets down to individual items and then sorts the divisions back into the list.

> Time Complexity:
> Worst => O(nlogn)
> Best => O(nlogn)

```js
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
```
