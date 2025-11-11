import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('intentions')
export class Intention {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  user: User;

  @Column('text')
  reason: string;

  @Column({ default: 'PENDING' })
  status: string;

  @ManyToOne(() => User, { nullable: true })
  reviewed_by: User;

  @Column({ nullable: true })
  reviewed_at: Date;

  @CreateDateColumn()
  created_at: Date;
}
