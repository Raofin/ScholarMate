import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Dept } from '../departments/department.constants';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  studentId: number;

  @Column()
  dept: Dept;
}