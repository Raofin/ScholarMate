import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Student } from '../student/student.entity';
import { Registrar } from '../registrar/registrar.entity';
import { Course } from '../course/course.entity';

@Entity('Enrollment')
export class Enrollment {
  @PrimaryGeneratedColumn({ name: 'ID'})
  id: number;

  @Column({ name: 'Status' })
  status: string;

  @Column({ name: 'EnrollmentDate' })
  enrollmentDate: Date;

  @ManyToOne(() => Student, student => student.enrollment)
  @JoinColumn({ name: 'StudentID' })
  student: Student;

  @ManyToOne(() => Course, course => course.enrollment)
  @JoinColumn({ name: 'CourseID' })
  course: Course;

  @ManyToOne(() => Registrar, registrar => registrar.enrollment)
  @JoinColumn({ name: 'RegistrarID' })
  registrar: Registrar;
}