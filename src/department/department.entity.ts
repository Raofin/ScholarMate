import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Student } from '../student/student.entity';
import { Course } from '../course/course.entity';
import { Admin } from '../admin/admin.entity';
import { Faculty } from '../faculty/faculty.entity';

@Entity('Department')
export class Department {
  @PrimaryGeneratedColumn({ name: 'ID'})
  id: number;

  @Column({ name: 'Name'})
  name: string;

  @Column({ name: 'Description'})
  description: string;

  @ManyToOne(() => Admin, admin => admin.departments)
  @JoinColumn({ name: 'AdminID' })
  admin: Admin;

  @OneToMany(() => Student, student => student.department)
  students: Student[];

  @OneToMany(() => Course, course => course.department)
  courses: Course[];

  @OneToMany(() => Faculty, faculty => faculty.department)
  faculties: Faculty[];

  @OneToOne(() => Faculty)
  @JoinColumn({ name: 'HeadID' })
  head: Faculty;
}