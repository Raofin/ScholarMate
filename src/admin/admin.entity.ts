import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}