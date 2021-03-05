# Binary Search

Binary search is used to quickly search a _sorted_ list. It uses the [Divide and Conquer](https://www.geeksforgeeks.org/divide-and-conquer-algorithm-introduction/) algorithm.

> Time Complexity:
> Worst => O(logN)
> Best => O(logN)

```js
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
```
