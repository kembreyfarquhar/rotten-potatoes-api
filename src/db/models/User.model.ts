import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsString, Length, IsAlphanumeric } from 'class-validator';

@Entity('users')
export class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ unique: true })
	@IsAlphanumeric()
	@Length(5, 20)
	username: string;

	@Column()
	@IsString()
	@Length(8)
	password: string;
}
