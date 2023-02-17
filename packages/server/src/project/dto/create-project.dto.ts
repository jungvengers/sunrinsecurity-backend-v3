export class CreateProjectDto {
  name: string;
  description: string;
  detail: string;
  image: string;
  type: string;
  club: string;
  participants: string;

  constructor(
    name: string,
    description: string,
    detail: string,
    image: string,
    type: string,
    club: string,
    participants: string,
  ) {
    this.name = name;
    this.description = description;
    this.detail = detail;
    this.image = image;
    this.type = type;
    this.club = club;
    this.participants = participants;
  }
}
