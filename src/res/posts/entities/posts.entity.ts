import { Entity, Column, PrimaryColumn, CreateDateColumn } from 'typeorm';

@Entity('posts')
export class Post {
  @PrimaryColumn()
  id: string;

  @Column()
  user_id: string;

  @Column()
  comment: string;

  @Column({ nullable: true })
  photo_b?: string;

  @Column({ nullable: true })
  photo_l?: string;

  @Column({ nullable: true })
  photo_d?: string;

  @CreateDateColumn()
  created_at: Date;
}
