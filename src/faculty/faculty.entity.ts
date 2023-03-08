import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Grade } from '../grade/grade.entity';
import { Department } from '../department/department.entity';
import { Upload } from '../upload/upload.entity';

@Entity('Faculty')
export class Faculty {
  @PrimaryGeneratedColumn({ name: 'ID'})
  id: number;

  @Column({ name: 'FacultyID' })
  facultyId: string;

  @Column({ name: 'Name' })
  name: string;

  @Column({ name: 'Email' })
  email: string;

  @Column({ name: 'Password' })
  password: number;

  @Column({ name: 'Phone' })
  phone: number;

  @Column({ name: 'JoinDate' })
  joinDate: Date;

  @ManyToOne(() => Department, department => department.faculties)
  @JoinColumn({ name: 'DepartmentID' })
  department: Department;

  @OneToMany(() => Grade, grade => grade.faculty)
  grade: Grade[];

  @OneToMany(() => Upload, upload => upload.faculty)
  upload: Upload[];
}