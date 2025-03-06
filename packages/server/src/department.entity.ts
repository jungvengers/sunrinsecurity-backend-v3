import { Application } from 'src/application/entities/application.entity';
import { Form } from 'src/form/entities/form.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Department {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column()
  name!: string;

  @Column('text')
  description!: string;

  @Column()
  image!: string;

  @Column('json')
  links!: { image: string; name: string; link: string }[];

  @OneToMany(() => Application, (application) => application.Department)
  applications!: Application[];

  @OneToOne(() => Form, (form) => form.Department, {
    cascade: true,
  })
  form!: Form;
}
