export function removeFromArray<T>(array: T[], element: T) {
  const index = array.indexOf(element);
  array.splice(index, 1);
}
