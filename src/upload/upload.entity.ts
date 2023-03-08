import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Student } from '../student/student.entity';
import { Admin } from '../admin/admin.entity';
import { Faculty } from '../faculty/faculty.entity';
import { Registrar } from '../registrar/registrar.entity';

@Entity('Upload')
export class Upload {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id: number;

  @Column({ name: 'FileName' })
  fileName: string;

  @Column({ name: 'UploadDate' })
  uploadDate: Date;

  @ManyToOne(() => Student, student => student.upload)
  @JoinColumn({ name: 'StudentID' })
  student: Student;

  @ManyToOne(() => Faculty, faculty => faculty.upload)
  @JoinColumn({ name: 'FacultyID' })
  faculty: Faculty;

  @ManyToOne(() => Registrar, registrar => registrar.upload)
  @JoinColumn({ name: 'RegistrarID' })
  registrar: Registrar;

  @ManyToOne(() => Admin, admin => admin.upload)
  @JoinColumn({ name: 'AdminID' })
  admin: Admin;
}