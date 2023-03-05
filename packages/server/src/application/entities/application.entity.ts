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
  name!: string;

  @Column()
  studentId!: string;

  @Column()
  phone!: string;

  // @Column()
  // portfolio!: string;

  @Column('text', { nullable: true })
  answer1!: string;

  @Column('text', { nullable: true })
  answer2!: string;

  @Column('text', { nullable: true })
  answer3!: string;

  @Column('text', { nullable: true })
  answer4!: string;

  @Column('text', { nullable: true })
  answer5!: string;

  @Column('text', { nullable: true })
  answer6!: string;

  @Column('text', { nullable: true })
  answer7!: string;

  @Column('text', { nullable: true })
  answer8!: string;

  @Column('text', { nullable: true })
  answer9!: string;

  @Column('text', { nullable: true })
  answer10!: string;

  @ManyToOne(() => Club, (club) => club.applications)
  club!: Club;

  @CreateDateColumn()
  readonly createdAt!: Date;

  @UpdateDateColumn()
  readonly updatedAt!: Date;
}
