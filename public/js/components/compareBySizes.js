export function compareBySizes(a, b) {
  const fields = ["sizeone", "sizetwo", "sizethree"];
  for (const field of fields) {
    const aVal = a.part[field];
    const bVal = b.part[field];

    if (aVal !== undefined && bVal !== undefined) {
      if (aVal > bVal) return -1;
      if (aVal < bVal) return 1;
    }

    if (aVal !== undefined && bVal === undefined) return -1;
    if (aVal === undefined && bVal !== undefined) return 1;
  }
  return 0;
}