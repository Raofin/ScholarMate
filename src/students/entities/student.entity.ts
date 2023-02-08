import { Department } from '../constants/students.constants';

export class Student {
  id: number;
  name: string;
  studentId: string;
  dept: Department;
  courses: string[];
}