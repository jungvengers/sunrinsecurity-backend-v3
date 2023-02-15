import { PrimaryColumn } from 'typeorm';

export class Admin {
  @PrimaryColumn('string')
  email!: string;
}
