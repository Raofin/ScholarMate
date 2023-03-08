import { Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Department } from '../department/department.entity';

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

  @ManyToOne(() => Department, department => department.students)
  @JoinColumn({ name: 'DepartmentID' })
  department: Department;
}