import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Enrollment } from '../enrollment/enrollment.entity';
import { Upload } from '../upload/upload.entity';
import { Course } from '../course/course.entity';

@Entity('Registrar')
export class Registrar {
  @PrimaryGeneratedColumn({ name: 'ID' })
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

  @OneToMany(() => Enrollment, enrollment => enrollment.registrar)
  enrollment: Enrollment[];

  @OneToMany(() => Upload, upload => upload.registrar)
  upload: Upload[];

  @OneToMany(() => Course, course => course.registrar)
  course: Course[];
}