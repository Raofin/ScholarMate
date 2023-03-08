import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Grade')
export class Grade {
  @PrimaryGeneratedColumn({ name: 'ID'})
  id: number;

  @Column({ name: 'CourseID' })
  courseId: number;

  @Column({ name: 'StudentID' })
  studentId: number;

  @Column({ name: 'FacultyID' })
  facultyId: number;

  @Column({ name: 'Marks' })
  marks: number;
}