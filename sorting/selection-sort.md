# Selection Sort

Selection sort repeatedly finds the minimum element and puts it at the beginning of the array. The good thing about selection sort is it never makes more than O(n) swaps and can be useful when memory write is a costly operation.

> Time Complexity:
> Worst => O(n^2)
> Best => O(n^2)

```js
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
    const lowestIndex = array.reduce((low, val, index) => (array[low] < val ? low : index), 0);

    subarray.push(array[lowestIndex]);

    array.splice(lowestIndex, 1);
  }

  return subarray;
}
```
