import { Club } from 'src/club/entities/club.entity';
import { PrimaryGeneratedColumn, Column, OneToOne, Entity } from 'typeorm';

@Entity()
export class Form {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @OneToOne(() => Club)
  club!: Club;

  @Column()
  question1!: string;

  @Column()
  question2!: string;

  @Column()
  question3!: string;

  @Column()
  question4!: string;

  @Column()
  question5!: string;

  @Column()
  question6!: string;

  @Column()
  question7!: string;

  @Column()
  question8!: string;

  @Column()
  question9!: string;

  @Column()
  question10!: string;
}
