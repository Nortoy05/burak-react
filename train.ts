// Task X

function countOccurrences(obj: object, str: string): number {
  let count = 0;

  for (const key in obj) {
    if (key === str) {
      count++;
    }

    const value = (obj as Record<string, unknown>)[key];

    if (typeof value === "object" && value !== null) {
      count += countOccurrences(value, str);
    }
  }

  return count;
}

console.log(
  countOccurrences(
    { model: "Bugatti", steer: { model: "HANKOOK", size: 30 } },
    "model"
  )
); 
