import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  password_hash: string;

  @Column()
  name: string;

  @Column()
  company: string;

  @Column()
  phone: string;

  @Column({ default: 'USER' })
  role: string;

  @Column({ default: 'PENDING' })
  status: string;

  @Column({ nullable: true, unique: true })
  token: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
