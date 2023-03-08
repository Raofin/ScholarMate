import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Student } from '../student/student.entity';
import { Faculty } from '../faculty/faculty.entity';
import { Course } from '../course/course.entity';

@Entity('Grade')
export class Grade {
  @PrimaryGeneratedColumn({ name: 'ID'})
  id: number;

  @Column({ name: 'Marks' })
  marks: number;

  @ManyToOne(() => Course, course => course.grade)
  @JoinColumn({ name: 'CourseID' })
  course: Course;

  @ManyToOne(() => Student, student => student.grade)
  @JoinColumn({ name: 'StudentID' })
  student: Student;

  @ManyToOne(() => Faculty, faculty => faculty.grade)
  @JoinColumn({ name: 'FacultyID' })
  faculty: Faculty;
}