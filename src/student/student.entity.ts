import { Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Department } from '../department/department.entity';
import { Upload } from '../upload/upload.entity';
import { Enrollment } from '../enrollment/enrollment.entity';
import { Grade } from '../grade/grade.entity';

@Entity('Student')
export class Student {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id: number;

  @Column({ name: 'StudentID' })
  studentId: string;

  @Column({ name: 'Name' })
  name: string;

  @Column({ name: 'Email' })
  email: string;

  @Column({ name: 'Password' })
  password: string;

  @Column({ name: 'Phone' })
  phone: string;

  @Column({ name: 'CreditsCompleted' })
  creditsCompleted: number;

  @Column({ name: 'CGPA' })
  cgpa: number;

  @Column({ name: 'JoinDate' })
  joinDate: Date;

  @JoinColumn({ name: 'DepartmentID' })
  @ManyToOne(() => Department, department => department.students)
  department: Department;

  @OneToMany(() => Upload, upload => upload.student)
  upload: Upload;

  @OneToMany(() => Enrollment, enrollment => enrollment.student)
  enrollment: Enrollment;

  @OneToMany(() => Grade, grade => grade.student)
  grade: Grade;
}