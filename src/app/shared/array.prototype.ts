/**
 * Adds a `distinct` method to the `Array` interface, which returns a new array
 * containing only the unique elements of the original array.
 */
interface Array<T> {
    /**
     * Returns a new array containing only the unique elements of the original array.
     * @returns An array with distinct elements.
     */
    distinct(): T[];
}

/**
 * Returns a new array containing only the unique elements of the original array.
 * @typeparam T The type of elements in the array.
 * @returns An array with distinct elements.
 */
Array.prototype.distinct = function <T>(): T[] {
    return Array.from(new Set(this));
};
