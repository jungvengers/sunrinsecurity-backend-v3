import { Column, Entity, PrimaryColumn } from 'typeorm';

export enum AdminRole {
  NONE = 'none',

  ADMIN = 'admin',

  LAYER7 = 'layer7',
  TEAMLOG = 'teamlog',
  UNIFOX = 'unifox',
  NEFUS = 'nefus',
  EMOTION = 'emotion',
}
@Entity()
export class Admin {
  @PrimaryColumn()
  email!: string;

  @Column('enum', {
    enum: AdminRole,
    default: AdminRole.NONE,
  })
  role!: AdminRole;
}
