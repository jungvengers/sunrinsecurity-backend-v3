import { Club } from 'src/club/entities/club.entity';
import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
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

  @Column()
  phone!: string;

  // @Column()
  // portfolio!: string;

  @Column('text')
  answer1!: string;

  @Column('text')
  answer2!: string;

  @Column('text')
  answer3!: string;

  @Column('text')
  answer4!: string;

  @Column('text')
  answer5!: string;

  @Column('text')
  answer6!: string;

  @Column('text')
  answer7!: string;

  @Column('text')
  answer8!: string;

  @Column('text')
  answer9!: string;

  @Column('text')
  answer10!: string;

  @ManyToOne(() => Club, (club) => club.applications)
  club!: Club;

  @CreateDateColumn()
  readonly createdAt!: Date;

  @UpdateDateColumn()
  readonly updatedAt!: Date;
}
