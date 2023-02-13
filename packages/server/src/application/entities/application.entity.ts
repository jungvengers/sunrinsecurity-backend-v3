import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from 'typeorm';

export class Application {
  @PrimaryColumn()
  email!: string;

  @Column()
  answer1!: string;

  @Column()
  answer2!: string;

  @Column()
  answer3!: string;

  @Column()
  answer4!: string;

  @Column()
  answer5!: string;

  @Column()
  answer6!: string;

  @Column()
  answer7!: string;

  @Column()
  answer8!: string;

  @Column()
  answer9!: string;

  @Column()
  answer10!: string;

  @CreateDateColumn()
  readonly createdAt!: Date;

  @UpdateDateColumn()
  readonly updatedAt!: Date;
}
