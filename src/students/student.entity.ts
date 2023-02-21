import { Department } from './students.constants';
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
  dept: Department;

  @Column('json', { nullable: true })
  courses: string[];
}