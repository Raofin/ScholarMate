import { Dept } from '../departments/department.constants';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  studentId: string;

  @Column()
  dept: Dept;

  @Column('json', { nullable: true })
  courses: string[];
}