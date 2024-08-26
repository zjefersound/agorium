export function printFirstAndLastName(name: string) {
  const names = name.split(" ");
  let visibleName = names[0];

  if (names.length > 1) {
    visibleName += " " + names[names.length - 1];
  }
  return visibleName;
}
