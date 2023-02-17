export class CreateFormDto {
  questions: string[];

  constructor(questions: string[]) {
    this.questions = questions;
  }
}
