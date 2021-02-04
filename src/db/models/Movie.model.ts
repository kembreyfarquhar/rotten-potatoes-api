import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsString, Length, IsInt } from 'class-validator';
import { User } from './User.model';

@Entity('movies')
export class Movie extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsString()
  @Length(1, 100)
  title: string;

  @Column()
  @IsString()
  @Length(10, 1000)
  plot_summary: string;

  @Column()
  @IsInt()
  duration: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  last_updated: Date;

  @ManyToOne(() => User, user => user.id)
  @IsInt()
  created_by_user: number;

  @ManyToOne(() => User, user => user.id)
  @IsInt()
  last_updated_user: number;
}
