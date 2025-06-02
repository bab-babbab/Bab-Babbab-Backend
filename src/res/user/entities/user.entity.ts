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
  proflie: string;

  @Column({ length: 20 })
  school_name: string;

  @Column()
  grade: number;

  @Column()
  class: number;

  @Column({ length: 50 })
  message: string;
}
