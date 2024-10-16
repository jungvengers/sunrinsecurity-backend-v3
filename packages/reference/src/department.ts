export const departments = [
  'security',
  'software',
  'business',
  'design',
] as const;

export function getDepartmentByClass(
  userClass: number,
): (typeof departments)[number] {
  if (userClass < 4) return departments[0];
  else if (userClass < 7) return departments[1];
  else if (userClass < 10) return departments[2];
  return departments[3];
}
