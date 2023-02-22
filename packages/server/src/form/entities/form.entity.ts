import { Club } from 'src/club/entities/club.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  Entity,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Form {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @JoinColumn()
  @OneToOne(() => Club, (club) => club.form)
  club!: Club;

  @Column({ nullable: true })
  question1!: string;

  @Column({ nullable: true })
  question2!: string;

  @Column({ nullable: true })
  question3!: string;

  @Column({ nullable: true })
  question4!: string;

  @Column({ nullable: true })
  question5!: string;

  @Column({ nullable: true })
  question6!: string;

  @Column({ nullable: true })
  question7!: string;

  @Column({ nullable: true })
  question8!: string;

  @Column({ nullable: true })
  question9!: string;

  @Column({ nullable: true })
  question10!: string;
}
