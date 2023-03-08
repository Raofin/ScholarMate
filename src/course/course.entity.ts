import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Department } from '../department/department.entity';
import { Registrar } from '../registrar/registrar.entity';
import { Enrollment } from '../enrollment/enrollment.entity';
import { Grade } from '../grade/grade.entity';

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

  @ManyToOne(() => Registrar, registrar => registrar.course)
  @JoinColumn({ name: 'RegistrarID' })
  registrar: Registrar;

  @OneToMany(() => Enrollment, enrollment => enrollment.course)
  enrollment: Enrollment[];

  @OneToMany(() => Grade, grade => grade.course)
  grade: Grade[];
}