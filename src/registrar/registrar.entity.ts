import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Registrar')
export class Registrar {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id: number;

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
}