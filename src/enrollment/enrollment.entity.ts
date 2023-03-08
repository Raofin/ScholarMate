import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Enrollment')
export class Enrollment {
  @PrimaryGeneratedColumn({ name: 'ID'})
  id: number;

  @Column({ name: 'StudentID' })
  studentId: number;

  @Column({ name: 'CourseID' })
  courseId: number;

  @Column({ name: 'Status' })
  status: string;

  @Column({ name: 'EnrollmentDate' })
  enrollmentDate: Date;

  @Column({ name: 'RegistrarID' })
  registrarId: number;
}