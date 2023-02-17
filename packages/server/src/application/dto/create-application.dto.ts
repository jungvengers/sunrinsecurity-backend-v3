export class CreateApplicationDto {
  clubid!: number;
  answer1!: string;
  answer2!: string;
  answer3!: string;
  answer4!: string;
  answer5!: string;
  answer6!: string;
  answer7!: string;
  answer8!: string;
  answer9!: string;
  answer10!: string;

  constructor(
    clubid: number,
    answer1: string,
    answer2: string,
    answer3: string,
    answer4: string,
    answer5: string,
    answer6: string,
    answer7: string,
    answer8: string,
    answer9: string,
    answer10: string,
  ) {
    this.clubid = clubid;
    this.answer1 = answer1;
    this.answer2 = answer2;
    this.answer3 = answer3;
    this.answer4 = answer4;
    this.answer5 = answer5;
    this.answer6 = answer6;
    this.answer7 = answer7;
    this.answer8 = answer8;
    this.answer9 = answer9;
    this.answer10 = answer10;
  }
}
