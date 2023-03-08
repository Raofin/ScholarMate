import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Student } from '../student/student.entity';
import { Course } from '../course/course.entity';

@Entity('Department')
export class Department {
  @PrimaryGeneratedColumn({ name: 'ID'})
  id: number;

  @Column({ name: 'Name'})
  name: string;

  @Column({ name: 'Description'})
  description: string;

  @Column({ name: 'HeadID'})
  headId: number;

  @Column({ name: 'AdminID'})
  adminId: number;

  @OneToMany(() => Student, student => student.department)
  students: Student[];

  @OneToMany(() => Course, course => course.department)
  courses: Course[];
}