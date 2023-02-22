import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Project {
  /**
   * The id of the project
   * @example 1
   * @format int64
   * @type integer
   * @validationMessage 'Project id must be an integer'
   */
  @PrimaryGeneratedColumn()
  readonly id!: number;

  /**
   * The name of the project
   * @example 'Project 1'
   * @maxLength 255
   * @minLength 1
   * @pattern ^.+$
   * @required
   * @type string
   * @unique
   * @validationMessage 'Project name must be alphanumeric'
   * @validationMessage 'Project name must be between 1 and 255 characters'
   * @validationMessage 'Project name must be unique'
   * @validationMessage 'Project name is required'
   */
  @Column('varchar', { length: 255 })
  name!: string;

  /**
   * Brief description of the project
   * @example 'This is a project'
   * @maxLength 255
   * @minLength 1
   * @pattern ^.+$
   * @required
   * @type string
   * @validationMessage 'Project description must be alphanumeric'
   * @validationMessage 'Project description must be between 1 and 255 characters'
   * @validationMessage 'Project description is required'
   */
  @Column('varchar', { length: 255, name: 'description' })
  description!: string;

  /**
   * Detailed description of the project
   * @example 'This is a project'
   * @maxLength 255
   * @minLength 1
   * @pattern ^.+$
   * @required
   * @type string
   * @validationMessage 'Project detail must be alphanumeric'
   * @validationMessage 'Project detail must be between 1 and 255 characters'
   * @validationMessage 'Project detail is required'
   */
  @Column('text', { name: 'detail' })
  detail!: string;

  /**
   * The image of the project
   * @example 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
   * @format uri
   * @maxLength 255
   * @minLength 1
   * @pattern ^.+$
   * @required
   * @type string
   * @validationMessage 'Project image must be a valid URI'
   * @validationMessage 'Project image must be between 1 and 255 characters'
   * @validationMessage 'Project image is required'
   */
  @Column({ nullable: true })
  image!: string;

  @Column()
  attach!: string[];

  /**
   * The field of the project
   * @example 'Computer Science'
   * @maxLength 255
   * @minLength 1
   * @pattern ^[가-힣 ]+$
   * @required
   * @type string
   * @validationMessage 'Project field must be alphanumeric'
   * @validationMessage 'Project field must be between 1 and 255 characters'
   * @validationMessage 'Project field is required'
   */
  @Column()
  type!: string;

  @Column()
  club!: string;

  @Column()
  participants!: string;
}
