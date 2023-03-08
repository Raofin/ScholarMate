import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

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

  departmentId: number;
}