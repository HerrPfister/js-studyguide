# Quick Sort

Quick sort uses the _divide and conquer_ algorithm to sort a list. It cuts the list at a pivot point until it gets down to singular values and the puts the pieces back together around the pivot point.

> Time Complexity:
> Worst => O(nlogn)
> Best => O(nlogn)

```js
/**
 * Splits an array into two arrays using a pivot anchor, and returns them in a map.
 * @see {@link https://www.geeksforgeeks.org/quick-sort/}
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
```
