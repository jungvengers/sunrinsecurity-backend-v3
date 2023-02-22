import { Club } from 'src/club/entities/club.entity';
import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  ManyToOne,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Application {
  @PrimaryGeneratedColumn('uuid')
  readonly id!: string;

  @Column()
  email!: string;

  @ManyToOne(() => Club, (club) => club.applications)
  club!: Club;

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
