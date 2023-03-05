export function studentId({ grade, class: uclass, number }: Express.User) {
  return `${grade}${('0' + uclass).slice(-2)}${('0' + number).slice(-2)}`;
}
