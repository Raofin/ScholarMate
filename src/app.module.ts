import { Module } from "@nestjs/common";
import { StudentModule } from "./students/student.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CoursesModule } from "./courses/course.module";
import { DepartmentModule } from "./departments/department.module";

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
