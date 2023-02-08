import { Injectable } from '@nestjs/common';
import { Student } from './entities/student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Department } from './constants/students.constants';

@Injectable()
export class StudentService {
  private students: Student[] = [
    {
      id: 1,
      name: 'Raofin',
      studentId: '20-42459-1',
      dept: Department.CSE,
      courses: ['Adv Java', '.Net', 'Adv Webtech'],
    },
    {
      id: 2,
      name: 'Zaid',
      studentId: '21-42459-1',
      dept: Department.EEE,
      courses: ['DLC', 'VLSI'],
    },
    {
      id: 3,
      name: 'Amin',
      studentId: '22-42459-1',
      dept: Department.CSE,
      courses: ['Data Structures', 'Algorithms', 'Design Patterns'],
    },
  ];

  findAll() {
    return this.students;
  }

  findById(id: number) {
    return this.students.find(student => student.id === id);
  }

  findByIds(id: number[]) {
    return this.students.filter(student => id.includes(student.id));
  }

  findByDept(dept: Department) {
    return this.students.filter(student => student.dept === dept);
  }

  create(createStudentDto: CreateStudentDto) {
    this.students.push(createStudentDto);
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    const existingStudent = this.findById(id);

    if (!existingStudent) {
      throw new Error(`Student with id: ${id} not found.`);
    }

    existingStudent.id = updateStudentDto.id || existingStudent.id;
    existingStudent.name = updateStudentDto.name || existingStudent.name;
    existingStudent.studentId = updateStudentDto.studentId || existingStudent.studentId;
    existingStudent.dept = updateStudentDto.dept || existingStudent.dept;
    existingStudent.courses = updateStudentDto.courses || existingStudent.courses;
  }

  remove(id: number) {
    const studentIndex = this.students.findIndex(student => student.id === id);

    if (studentIndex >= 0) {
      this.students.splice(studentIndex, 1);
    }
  }
}
