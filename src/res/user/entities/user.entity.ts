import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  email: string;

  @Column({ length: 20 })
  name: string;

  @Column({ length: 20 })
  profile: string;

  @Column({ nullable: true })
  school_name: string;

  @Column({ nullable: true })
  grade: number;

  @Column({ nullable: true })
  class: number;

  @Column({ length: 50 })
  message: string;
}
