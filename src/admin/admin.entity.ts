import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Department } from '../department/department.entity';
import { Upload } from '../upload/upload.entity';

@Entity('Admin')
export class Admin {
  @PrimaryGeneratedColumn({ name: 'ID'})
  id: number;

  @Column({ name: 'Name' })
  name: string;

  @Column({ name: 'Email' })
  email: string;

  @Column({ name: 'Password' })
  password: string;

  @Column({ name: 'Phone' })
  phone: string;

  @Column({ name: 'JoinDate' })
  joinDate: Date;

  @OneToMany(() => Department, department => department.admin)
  departments: Department[];

  @OneToMany(() => Upload, upload => upload.admin)
  upload: Upload[];
}