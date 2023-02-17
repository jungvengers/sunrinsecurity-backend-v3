import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Notice {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column()
  title!: string;

  @Column()
  content!: string;

  @Column()
  author!: string;

  @CreateDateColumn()
  readonly createdAt!: Date;

  @UpdateDateColumn()
  readonly updatedAt!: Date;
}
