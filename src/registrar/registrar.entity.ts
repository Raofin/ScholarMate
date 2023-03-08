import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsDate, IsEmail, IsString, Length, Matches } from 'class-validator';

@Entity('Registrar')
export class Registrar {
  readonly id: number;

  @IsString({ message: 'Name must be a string' })
  @Length(4, 20, { message: 'Name must be between 4 and 20 characters' })
  readonly name: string;

  @IsEmail({}, { message: 'Email must be a valid email address' })
  readonly email: string;

  @IsString({ message: 'Password must be a string' })
  @Length(6, 20, { message: 'Password must be between 6 and 20 characters' })
  readonly password: number;

  @Matches(/^\d{11}$/, { message: 'Phone must be 11 digits' })
  readonly phone: number;

  @IsDate({ message: 'Join date must be a valid date' })
  readonly joinDate: Date;
}