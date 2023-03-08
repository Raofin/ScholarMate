import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Department } from '../department/department.entity';

@Entity('Course')
export class Course {
  @PrimaryGeneratedColumn({ name: 'ID'})
  id: number;

  @Column({ name: 'Name'})
  name: string;

  @Column({ name: 'Code'})
  code: string;

  @Column({ name: 'Description'})
  description: string;

  @Column({ name: 'Credit'})
  credit: number;

  @ManyToOne(() => Department, department => department.courses)
  @JoinColumn({ name: 'DepartmentID' })
  department: Department;

  @Column({ name: 'RegistrarID'})
  registrarId: number;
}