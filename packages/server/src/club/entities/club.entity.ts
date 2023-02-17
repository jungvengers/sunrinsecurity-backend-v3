import { Application } from 'src/application/entities/application.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Club {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column()
  curriculum!: string;

  @Column()
  image!: string;

  @Column('json')
  links!: { image: string; name: string; link: string }[];

  @OneToMany(() => Application, (application) => application.club)
  applications!: Application[];
}
