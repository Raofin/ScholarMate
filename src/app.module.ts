import { Module } from "@nestjs/common";
import { StudentModule } from "./student/student.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CoursesModule } from "./course/course.module";
import { DepartmentModule } from "./department/department.module";

@Module({
  imports: [StudentModule, CoursesModule, DepartmentModule, TypeOrmModule.forRoot({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "aiub_portal",
    autoLoadEntities: true,
    synchronize: true
  })]
})
export class AppModule {}
