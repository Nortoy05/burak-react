// Task Y
function findIntersection(arr1: number[], arr2: number[]): number[] {
  const set2 = new Set(arr2);
  return Array.from(new Set(arr1)).filter((item) => set2.has(item));
}

console.log(findIntersection([1, 2, 3], [3, 2, 0])); 


// Task X

// function countOccurrences(obj: object, str: string): number {
//   let count = 0;

//   for (const key in obj) {
//     if (key === str) {
//       count++;
//     }

//     const value = (obj as Record<string, unknown>)[key];

//     if (typeof value === "object" && value !== null) {
//       count += countOccurrences(value, str);
//     }
//   }

//   return count;
// }

// console.log(
//   countOccurrences(
//     { model: "Bugatti", steer: { model: "HANKOOK", size: 30 } },
//     "model"
//   )
// ); 
