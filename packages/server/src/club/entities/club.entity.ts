import { Application } from 'src/application/entities/application.entity';
import { Form } from 'src/form/entities/form.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Club {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column()
  name!: string;

  @Column('text')
  description!: string;

  @Column()
  curriculum!: string;

  @Column()
  image!: string;

  @Column('json')
  links!: { image: string; name: string; link: string }[];

  @OneToMany(() => Application, (application) => application.club)
  applications!: Application[];

  @OneToOne(() => Form, (form) => form.club, {
    cascade: true,
  })
  form!: Form;
}
