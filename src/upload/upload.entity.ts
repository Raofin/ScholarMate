import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Upload')
export class Upload {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id: number;

  @Column({ name: 'FileName' })
  fileName: string;

  @Column({ name: 'UploadDate' })
  uploadDate: Date;

  @Column({ name: 'FacultyID' })
  facultyId: number;

  @Column({ name: 'AdminID' })
  adminId: number;

  @Column({ name: 'RegistrarID' })
  registrarId: number;

  @Column({ name: 'StudentID' })
  studentId: number;
}